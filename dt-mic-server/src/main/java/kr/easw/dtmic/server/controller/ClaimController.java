package kr.easw.dtmic.server.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.easw.dtmic.server.auth.Role;
import kr.easw.dtmic.server.auth.user.LoginInfo;
import kr.easw.dtmic.server.claimDoc.ClaimDoc;
import kr.easw.dtmic.server.claimDoc.ClaimDocManager;
import kr.easw.dtmic.server.claimSession.ClaimSessionEntity;
import kr.easw.dtmic.server.claimSession.ClaimSessionPhase;
import kr.easw.dtmic.server.claimSession.ClaimSessionRepo;
import kr.easw.dtmic.server.dto.AppendClaimSessionDataParams;
import kr.easw.dtmic.server.dto.ClaimDocReqParams;
import kr.easw.dtmic.server.dto.DrugPrepCompleteParams;
import kr.easw.dtmic.server.dto.SimpleSessionRequest;
import kr.easw.dtmic.server.email.EMailService;
import kr.easw.dtmic.server.pharmacy.PharmacyEntity;
import kr.easw.dtmic.server.pubsub.PharmacySocket;
import kr.easw.dtmic.server.pubsub.PharmacyWebSocketMgr;
import kr.easw.dtmic.server.pubsub.Protocol;
import kr.easw.dtmic.server.util.ImageUtil;
import kr.easw.dtmic.server.util.PDFUtil;
import kr.easw.dtmic.server.vo.ClaimDocRes;
import kr.easw.dtmic.server.vo.CreateNewSessionRes;
import kr.easw.dtmic.server.vo.SimpleResult;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@Transactional
public class ClaimController
{
	@Autowired
	private ClaimDocManager mgr;
	@Autowired
	private ImageUtil imgUtil;
	@Autowired
	private ClaimSessionRepo repo;
	@Autowired
	private PharmacyWebSocketMgr socketMgr;
	@Autowired
	private EMailService mailService;
	
	@RequestMapping(value = "/api/createNewSession")
	@Secured(Role.ROLES.PHARMACY)
	public ResponseEntity<CreateNewSessionRes> createNewSession(@AuthenticationPrincipal LoginInfo loginInfo)
	{
		log.info("/api/createNewSession: " + loginInfo.toString());
		PharmacyEntity pharmacy = this.getPharmacyEntity(loginInfo);
		if (pharmacy == null)
		{
			return ResponseEntity.ok(new CreateNewSessionRes(false, null));
		}
		PharmacySocket socket = this.socketMgr.getSessionByID(pharmacy.getUsername());
		
		ClaimSessionEntity presession = pharmacy.getProceedingSession();
		if(presession != null)
		{
			log.warn("duplicated call: "+ presession);
			presession.setPhase(ClaimSessionPhase.fail);
			socket.publishMessage(Protocol.ClaimSession_Finish, presession.getSessionID());
		}

		ClaimSessionEntity claimSession = pharmacy.createSession(this.repo);
		UUID id = claimSession.getSessionID();
		socket.publishMessage(Protocol.ClaimSession_Start, id);
		log.info("session:" + claimSession + " size:" + pharmacy.getDependSessionSize());

		return ResponseEntity.ok(new CreateNewSessionRes(true, id));
	}

	@RequestMapping(value = "/api/drugPrepComplete")
	@Secured(Role.ROLES.PHARMACY)
	public ResponseEntity<SimpleResult> drugPrepComplete(@RequestBody DrugPrepCompleteParams params, @AuthenticationPrincipal LoginInfo loginInfo)
	{
		log.info("/api/drugPrepComplete: " + params.toString());
		PharmacyEntity pharmacy = this.getPharmacyEntity(loginInfo);
		if (pharmacy == null)
		{
			log.warn("pharmacy not found: " + loginInfo);
			return ResponseEntity.ok(new SimpleResult(false));
		}
		
		ClaimSessionEntity session = this.getProceedingSession(pharmacy, params.getSessionID());
		if (session == null)
		{
			log.warn("session not found: " + params.getSessionID() + " " + pharmacy.getProceedingSession());
			return ResponseEntity.ok(new SimpleResult(false));
		}
		session.setPhase(ClaimSessionPhase.drugPrepComplete);
		PharmacySocket socket = this.socketMgr.getSessionByID(pharmacy.getUsername());
		socket.publishMessage(Protocol.ClaimSession_ShowQR, params.getSessionID());
		return ResponseEntity.ok(new SimpleResult(true));
	}
	
	@RequestMapping(value = "/user/api/recvClaimData")
	public ResponseEntity<SimpleResult> recvClaimData(@RequestBody SimpleSessionRequest params, @AuthenticationPrincipal LoginInfo loginInfo)
	{
		log.info("/user/api/recvClaimData: " + params.toString());
		ClaimSessionEntity session = getSessionEntity(params.getSessionID());
		if(session == null)
		{
			log.warn("session not found: " + params.getSessionID());
			return ResponseEntity.ok(new SimpleResult(false));
		}
		session.setPhase(ClaimSessionPhase.claim_selectCompany);
		PharmacySocket socket = this.socketMgr.getSessionByID(session.getPharmacy().getUsername());
		socket.publishMessage(Protocol.ClaimSession_Finish, params.getSessionID());
		return ResponseEntity.ok(new SimpleResult(true));
	}

	/*
	@RequestMapping(value = "/user/api/reqClaimDocPreview")
	public ResponseEntity<ClaimDocRes> reqClaimDocPreview(@RequestBody ClaimDocReqParams params)
	{

		log.info("/user/api/reqClaimDocPreview" + params.toString());
		ClaimSessionEntity session = getSessionEntity(params.getSessionID());
		if(session == null)
		{
			return ResponseEntity.ok(new ClaimDocRes(false, null));
		}
		session.setPhase(ClaimSessionPhase.claim_createPreview);
		return this.claimDocPreviewWork(params, session);
	}*/

	@RequestMapping(value = "/user/api/reqClaimDocComplete")
	public ResponseEntity<ClaimDocRes> reqClaimDocCompleatePreview(@RequestBody ClaimDocReqParams params)
	{

		log.info("/user/api/reqClaimDocComplete: " + params.toString());
		ClaimSessionEntity session = getSessionEntity(params.getSessionID());
		if(session == null)
		{
			log.warn("session not found: " + params.getSessionID());
			return ResponseEntity.ok(new ClaimDocRes(false, null));
		}
		session.setPhase(ClaimSessionPhase.claim_createCompPreview);
		return this.claimDocPrep(params, session);
	}
	
	@RequestMapping(value = "/user/api/sendEmail")
	public ResponseEntity<SimpleResult> sendEmail(@RequestBody SimpleSessionRequest params)
	{
		
		log.info("/user/api/sendEmail" + params.toString());
		ClaimSessionEntity session = getSessionEntity(params.getSessionID());
		if(session == null)
		{
			log.warn("session not found: " + params.getSessionID());
			return ResponseEntity.ok(new SimpleResult(false));
		}
		//PharmacySocket socket = this.socketMgr.getSessionByID(session.getPharmacy().getUsername());
		//socket.publishMessage(Protocol.ClaimSession_Finish, params.getSessionID());
		session.setPhase(ClaimSessionPhase.complete);
		String mail = session.getData().get("email");
		log.info("send mail to: "+mail);
		session.setCompany(session.getCompany());
		ClaimDoc original = this.mgr.getClaimDocs().get(session.getCompany());
		PDDocument doc = original.generatePDDoc(session.getData());
		StringBuilder emailTitle = new StringBuilder();
		emailTitle.append("보헙금 자동청구 시스템("+session.getData().get("name")+")");
		StringBuilder content = new StringBuilder();
		
		content.append("이름: "+session.getData().get("name")+"\n")
		.append("일자: " + session.getDateFromData("yyyy년 MM월 dd일"));
		
		this.mailService.gmailSend(mail, doc, "generated_"+session.getCompany(), emailTitle.toString(), content.toString());
		return ResponseEntity.ok(new SimpleResult(true));
	}

	private ResponseEntity<ClaimDocRes> claimDocPrep(ClaimDocReqParams params, ClaimSessionEntity session)
	{
		session.setCompany(params.getCompany());
		ClaimDoc original = this.mgr.getClaimDocs().get(session.getCompany());
		ClaimDocRes.ClaimDocResBuilder builder = ClaimDocRes.builder();
		if (original == null)
		{
			log.warn("document load fail: " + session.getCompany()+"("+this.mgr.getClaimDocs().entrySet().stream().map(e -> e.getKey()).collect(Collectors.joining(", "))+")");
			;
			builder.result(false);
			return ResponseEntity.ok(builder.build());
		}
		session.appendData(params.args);
		PDDocument doc = original.generatePDDoc(session.getData());
		BufferedImage[] imgs = PDFUtil.convertPDFtoPNG(original.getCompany(), doc);
		for (BufferedImage img : imgs)
		{
			if (img == null)
			{
				continue;
			}
			String b64img = this.imgUtil.encodeToBase64(img);
			builder.doc(b64img);
		}
		builder.result(true);
		try
		{
			doc.close();
		} catch (IOException e)
		{
			log.warn("pdf close fail", e);
		}
		return ResponseEntity.ok(builder.build());
	}

	private PharmacyEntity getPharmacyEntity(LoginInfo loginInfo)
	{
		Object o = loginInfo.getEntity();
		if (o == null || !(o instanceof PharmacyEntity))
		{
			return null;
		}
		PharmacyEntity entity = (PharmacyEntity) o;
		return entity;
	}

	private ClaimSessionEntity getProceedingSession(PharmacyEntity entity, UUID id)
	{
		ClaimSessionEntity session = entity.getProceedingSession();
		if (session == null || !session.getSessionID().equals(id))
		{
			return null;
		}
		return session;
	}
	
	private ClaimSessionEntity getSessionEntity(UUID uuid)
	{
		ClaimSessionEntity session = null;
		try
		{
			session = this.repo.findById(uuid).get();
		}
		catch(NoSuchElementException e)
		{
			log.warn("session not found: "+uuid, e);
		}
		return session;
	}
}
