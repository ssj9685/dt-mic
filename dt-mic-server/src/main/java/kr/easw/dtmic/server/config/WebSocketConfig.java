package kr.easw.dtmic.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import kr.easw.dtmic.server.pubsub.PharmacyWebSocketMgr;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer
{
	private final WSChannelInterceptor intercepter;
	private final PharmacyWebSocketMgr mgr;
	@Autowired
	public WebSocketConfig()
	{
		this.mgr = new PharmacyWebSocketMgr();
		this.intercepter = new WSChannelInterceptor(this.mgr);
	}
	
	@Bean
	public PharmacyWebSocketMgr getPharmacyWebSocketMgr()
	{
		return this.mgr;
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry)
	{

		registry.addEndpoint("/websocket").withSockJS();

		// r.addInterceptors(new HttpHandshakeInterceptor()).withSockJS();

	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry)
	{
		registry.setApplicationDestinationPrefixes("/app");
		registry.enableSimpleBroker("/topic", "/user");
	}

	@Override
	public void configureClientInboundChannel(ChannelRegistration registration)
	{
		
		registration.interceptors(this.intercepter);
	}
	/*
	@Override
	public void configureClientOutboundChannel(ChannelRegistration registration) {
		registration.interceptors(interceptor);
	}*/
	

}
