package kr.easw.dtmic.server.pubsub;

import org.springframework.messaging.MessageChannel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class PharmacyMessageChannel
{
	private String sessionID;
	private PharmacySessionType type;
	private MessageChannel channel;
}
