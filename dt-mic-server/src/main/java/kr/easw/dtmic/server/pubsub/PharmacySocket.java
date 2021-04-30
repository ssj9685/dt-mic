package kr.easw.dtmic.server.pubsub;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.support.MessageBuilder;

import kr.easw.dtmic.server.pharmacy.PharmacyEntity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class PharmacySocket
{
	@NonNull private SimpMessageSendingOperations messagingTemplate;
	@NonNull private String name;
	@NonNull private PharmacySessionType sessionType;
	@NonNull private PharmacyEntity entity;
	private int sessionCnt = 0;

	private Map<String, PharmacyMessageChannel> messageCh = new HashMap<>();
	/*
	public synchronized void sendMessage(PharmacySessionType type, String key, String value)
	{
		Message<String> msg = MessageBuilder.withPayload(value).setHeader("destination", value).build();
		for(PharmacyMessageChannel ch : this.messageCh)
		{
			
			if(ch.getType() == type)
			{
				ch.getChannel().send(msg);
			}
		}
	}*/
	
	public void publishMessage(String key, Object value)
	{
		this.messagingTemplate.convertAndSendToUser
		(this.entity.getUsername()
				, key
				, value);
	}
	
	public synchronized void addMessageCh(String sessionID, PharmacySessionType type, MessageChannel ch)
	{
		PharmacyMessageChannel pharmacyCh = new PharmacyMessageChannel(sessionID, type, ch);
		this.messageCh.put(sessionID, pharmacyCh);
		this.sessionCnt = this.messageCh.size();
	}
	
	public synchronized void removeMessageCh(String sessionID)
	{
		this.messageCh.remove(sessionID);
		this.sessionCnt = this.messageCh.size();
	}
	
	public synchronized Set<PharmacyMessageChannel> getMessageCh()
	{
		Set<PharmacyMessageChannel> set = new HashSet<>(this.messageCh.size());
		set.addAll(this.messageCh.values());
		return set;
	}
	
	

}
