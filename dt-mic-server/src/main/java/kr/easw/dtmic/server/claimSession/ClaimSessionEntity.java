package kr.easw.dtmic.server.claimSession;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapKeyColumn;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.springframework.transaction.annotation.Transactional;

import kr.easw.dtmic.server.pharmacy.PharmacyEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "claim_session")
public class ClaimSessionEntity implements Serializable
{
	
	private static final long serialVersionUID = 1L;

	@ManyToOne
	@JoinColumn(name="pharmacy_id", nullable=false)
	private PharmacyEntity pharmacy;

	@Id
	@Column(length=36)
	@Type(type="uuid-char")
	private UUID sessionID;

	@CreationTimestamp
	private Date createTime;

	private long sessionTime;
	@ElementCollection
	@MapKeyColumn(length=50)
    @Column(columnDefinition="LONGTEXT")
	private Map<String, String> data=new HashMap<>();
	
	private boolean attached;
	
	private ClaimSessionPhase phase;
	
	private String company;
	
	public ClaimSessionEntity(UUID id, PharmacyEntity pharmacy)
	{
		this.sessionID = id;
		this.pharmacy = pharmacy;
	}
	
	public void setPhase(ClaimSessionPhase phase)
	{
		this.phase = phase;
		
		if(phase.step >= ClaimSessionPhase.claim_selectCompany.step && this.attached)
		{
			this.attached = false;
			this.pharmacy.compleateSession(this);
		}
	}
	
	public void appendData(Map<String, String> map)
	{
		this.data.putAll(map);
	}
	
	public String getDateFromData(String formatStr)
	{
		//SimpleDateFormat format = new SimpleDateFormat(formatStr);
		//int year = Integer.parseInt(this.data.get("year"));
		//int month = Integer.parseInt(this.data.get("month"));
		//int date = Integer.parseInt(this.data.get("date"));
		
		//Calendar c = Calendar.getInstance();
		//c.set(year, month, date);
		return LocalDate.now().format(DateTimeFormatter.ISO_DATE);
	}
}
