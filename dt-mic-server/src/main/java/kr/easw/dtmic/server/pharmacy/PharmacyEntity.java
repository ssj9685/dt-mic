package kr.easw.dtmic.server.pharmacy;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.easw.dtmic.server.claimSession.ClaimSessionEntity;
import kr.easw.dtmic.server.claimSession.ClaimSessionPhase;
import kr.easw.dtmic.server.claimSession.ClaimSessionRepo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;


@Slf4j
@Getter
@ToString
@Service
@Entity
@NoArgsConstructor
@Table(name="pharmacy")
@Setter
public class PharmacyEntity
{
	@Id
	@Column(length=50)
	private String username;
	private String password;
    private boolean isEnabled;
    @Transient
    private Collection<? extends GrantedAuthority> authorities;
	@CreationTimestamp
	private Date createTime;

	@UpdateTimestamp
	private Date updateTime;

	@OneToMany(mappedBy="pharmacy")
	@lombok.ToString.Exclude
	private List<ClaimSessionEntity> dependSessions=new ArrayList<>();
	@OneToOne
	@lombok.ToString.Exclude
	private ClaimSessionEntity proceedingSession;
	
	@Formula("(select count(*) from claim_session s where s.pharmacy_id = username)")
	private int dependSessionSize;
	
	public PharmacyEntity(String id, String pw, boolean enable)
	{
		this.username = id;
		this.password = pw;
		this.isEnabled = enable;
	}
	
	public void compleateSession(ClaimSessionEntity session)
	{
		if(this.getProceedingSession() != null && this.proceedingSession.getSessionID().equals(session.getSessionID()))
		{
			this.proceedingSession = null;
		}
	}

	public ClaimSessionEntity createSession(ClaimSessionRepo repo)
	{
		if(this.getProceedingSession() != null)
		{
			log.warn("already has session");
			return null;
		}
		UUID claimSessionID = UUID.randomUUID();
		log.info("!!create new session!! "+claimSessionID.toString() + " " + this.username);
		ClaimSessionEntity session=new ClaimSessionEntity(claimSessionID, this);
		session.setPhase(ClaimSessionPhase.start);
		session.setAttached(true);
		repo.saveAndFlush(session);
		this.proceedingSession = session;
		return session;
	}
}
