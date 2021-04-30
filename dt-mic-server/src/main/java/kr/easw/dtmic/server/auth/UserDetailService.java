package kr.easw.dtmic.server.auth;

import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import kr.easw.dtmic.server.auth.user.LoginInfo;
import kr.easw.dtmic.server.auth.user.UserType;
import kr.easw.dtmic.server.pharmacy.PharmacyEntity;
import kr.easw.dtmic.server.pharmacy.PharmacyRepo;

@Component
public class UserDetailService implements UserDetailsService
{
	public static final String ADMINNAME = "admin";

	@Autowired
	private PharmacyRepo pharmacyRepo;
	@Value("${dtmic.admin-password}")
	private String adminPW;

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException
	{
		User info;
		if (userName.equals(ADMINNAME))
		{
			info = new LoginInfo(ADMINNAME, this.adminPW, true, UserType.ADMIN.getRoles())
			{
				private static final long serialVersionUID = 1L;

				@Override
				public Object getEntity()
				{
					return null;
				}

			};
			return info;
		}
		PharmacyEntity pharmacy;
		try
		{
			pharmacy = this.pharmacyRepo.findById(userName).get();
		} catch (NoSuchElementException e)
		{
			throw new UsernameNotFoundException(userName);
		}

		info = new LoginInfo(pharmacy.getUsername(), pharmacy.getPassword(), pharmacy.isEnabled(),
				UserType.PHARMACY.getRoles())
		{
			private static final long serialVersionUID = 1L;

			@Override
			public Object getEntity()
			{
				PharmacyEntity p = UserDetailService.this.pharmacyRepo.findById(userName).get();
				return p;
			}

		};
		return info;
	}

}