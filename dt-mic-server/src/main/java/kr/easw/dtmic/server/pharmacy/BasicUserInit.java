package kr.easw.dtmic.server.pharmacy;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import kr.easw.dtmic.server.claimSession.ClaimSessionRepo;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class BasicUserInit implements CommandLineRunner
{
	
	@Autowired
	private ClaimSessionRepo csrepo;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private PharmacyRepo repo;
	@Override
	public void run(String... args) throws Exception
	{
		if(repo.existsById("test"))
		{
			log.info("default user check");
			return;
		}

		PharmacyEntity e = new PharmacyEntity("test", this.encoder.encode("1234"), true);

		this.repo.save(e);
		
		log.info("------------------------------");
		log.info("user add:"+e.toString());
		log.info("------------------------------");
	}

}
