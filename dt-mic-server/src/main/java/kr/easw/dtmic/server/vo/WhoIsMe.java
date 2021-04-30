package kr.easw.dtmic.server.vo;

import org.springframework.messaging.MessageChannel;

import kr.easw.dtmic.server.pubsub.PharmacyMessageChannel;
import kr.easw.dtmic.server.pubsub.PharmacySessionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@EqualsAndHashCode
@AllArgsConstructor
@Getter
public class WhoIsMe
{
	private String name;
	private boolean result;
}
