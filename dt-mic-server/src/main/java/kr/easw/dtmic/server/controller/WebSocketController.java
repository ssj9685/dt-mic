package kr.easw.dtmic.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import kr.easw.dtmic.server.auth.Role;
import kr.easw.dtmic.server.pubsub.PharmacyWebSocketMgr;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class WebSocketController
{
	@Autowired
	private PharmacyWebSocketMgr mgr;

	@MessageMapping("/test")
	@Secured(Role.ROLES.WEBSOCKET)
	public void receive(@AuthenticationPrincipal User user, @Payload String msg)
	{
		log.info("receive message:" + msg);
		this.mgr.getSessionByID(user.getUsername()).publishMessage("/test", msg);
	}

}