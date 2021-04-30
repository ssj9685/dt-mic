package kr.easw.dtmic.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry;
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer;

@Configuration
public class WebSocketSecurityConfig extends AbstractSecurityWebSocketMessageBrokerConfigurer
{
	@Override
	protected void configureInbound(MessageSecurityMetadataSourceRegistry messages)
	{
		messages.anyMessage().authenticated();//("PHARMACY");
		//messages.anyMessage().hasAnyRole("");
	}


	/*
	 * @Override protected void
	 * configureInbound(MessageSecurityMetadataSourceRegistry messages) {
	 * messages.simpDestMatchers("/**").authenticated(); }
	 */
	@Override
	protected boolean sameOriginDisabled()
	{
		return true;
	}
}

