package kr.easw.dtmic.server.pubsub;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

import kr.easw.dtmic.server.pharmacy.PharmacyEntity;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class PharmacyWebSocketMgr
{
	private Map<String, PharmacySocket> phamacySockets = new HashMap<>();
	@Autowired
	private SimpMessageSendingOperations messagingTemplate;
	
	

	public synchronized PharmacySocket connect(String userID, String sessionID, MessageChannel ch,
			PharmacySessionType type, PharmacyEntity e)
	{
		PharmacySocket socket = this.phamacySockets.get(userID);
		if (socket == null)
		{
			socket = new PharmacySocket(this.messagingTemplate, userID, type, e);
			this.phamacySockets.put(userID, socket);
		}
		socket.addMessageCh(sessionID, type, ch);
		log.info("create websocket session user:"+userID+" type:"+type+" remain:"+socket.getSessionCnt());
		return socket;
	}

	public synchronized void disconnect(String userID, String sessionID)
	{
		PharmacySocket socket = this.phamacySockets.get(userID);
		if (socket == null)
		{
			log.warn("session not managed");
			return;
		}
		socket.removeMessageCh(sessionID);
		if (socket.getSessionCnt() == 0)
		{
			this.phamacySockets.remove(userID);
		}
		log.info("close websocket session user:"+userID+" remain:"+socket.getSessionCnt());
	}

	public synchronized PharmacySocket getSessionByID(String userID)
	{
		PharmacySocket socket = this.phamacySockets.get(userID);
		return socket;
	}


}
