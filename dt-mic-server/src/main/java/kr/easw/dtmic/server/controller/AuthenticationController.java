package kr.easw.dtmic.server.controller;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.easw.dtmic.server.dto.LoginParams;
import kr.easw.dtmic.server.vo.LoginRes;
import kr.easw.dtmic.server.vo.WhoIsMe;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.security.Principal;

@Slf4j
@RestController
public class AuthenticationController
{
	@Autowired
	private AuthenticationManager authenticationManager;

	@RequestMapping(value = "/api/whoisme", method = RequestMethod.GET)
	public ResponseEntity<WhoIsMe> whoisme(HttpSession session, @AuthenticationPrincipal User user)
	{
		if(user == null)
		{
			return ResponseEntity.ok(new WhoIsMe("", false));
		}
		return ResponseEntity.ok(new WhoIsMe(user.getUsername(), true));

	}
	/*
	@RequestMapping(value = "/api/login", method = RequestMethod.POST)
	// @Secured({"ROLE_PHARMACY"})
	public ResponseEntity<LoginRes> login(@RequestBody LoginParams params, HttpSession session)
	{
		log.info("로그인 시도");
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(params.getUsername(),
				params.getPassword());
		try
		{
			Authentication authentication = this.authenticationManager.authenticate(token);
			Object o = authentication.getPrincipal();
			if (o == null || !(o instanceof User))
			{
				return ResponseEntity.ok(new LoginRes(false, "Login object incorrect"));
			}
			SecurityContextHolder.getContext().setAuthentication(authentication);
			session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
					SecurityContextHolder.getContext());

			log.info(params.getUsername() + " pass:" + params.getPassword() + " true ok session:" + session.getId());
			return ResponseEntity.ok(new LoginRes(true, "ok"));
		} catch (AuthenticationException e)
		{
			log.info(params.getUsername() + " pass:" + params.getPassword() + " fail ", e);
			return ResponseEntity.ok(new LoginRes(false, e.getMessage()));
		}
	}

	@Secured("ROLE_USER")
	@RequestMapping(value = "/api/test", method = RequestMethod.GET)
	public ResponseEntity<Principal> test(Principal principal)
	{
		log.info("test호출");
		return ResponseEntity.ok(principal);
	}

	@Secured("ROLE_USER")
	@RequestMapping(value = "/api/roles", method = RequestMethod.GET)
	public ResponseEntity roles(HttpServletRequest request, HttpSession session)
	{
		log.info("권한조회");
		return ResponseEntity.ok(request.getUserPrincipal());
	}

	// 로그아웃
	@RequestMapping(value = "/api/logout", method = RequestMethod.POST)
	public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response)
	{
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		log.info("로그아웃");
		if (authentication != null)
		{
			new SecurityContextLogoutHandler().logout(request, response, authentication);
			return ResponseEntity.ok(true);
		}
		return ResponseEntity.ok(false);
	}

	// 로그인 체크
	@RequestMapping(value = "/api/check_login", method = RequestMethod.POST)
	public ResponseEntity check_login(HttpServletRequest request, HttpServletResponse response, Principal principal)
			throws IOException, ServletException
	{
		boolean isLogin = request.isUserInRole("ROLE_USER");
		log.info("login조회");
		if (isLogin)
		{
			return ResponseEntity.ok(principal.getName());
		}
		return ResponseEntity.ok(false);
	}*/
}
