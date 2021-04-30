package kr.easw.dtmic.server.auth;

import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class LoginListener implements ApplicationListener<InteractiveAuthenticationSuccessEvent>
{
	@Override
	public void onApplicationEvent(InteractiveAuthenticationSuccessEvent event)
	{
		User userDetails = (User) event.getAuthentication().getPrincipal();
		log.info("LOGIN SUCCESS" + userDetails + "data:" + event);
	}
}