package kr.easw.dtmic.server.vo;

import org.springframework.messaging.MessageChannel;

import kr.easw.dtmic.server.pubsub.PharmacyMessageChannel;
import kr.easw.dtmic.server.pubsub.PharmacySessionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.Value;

@EqualsAndHashCode
@AllArgsConstructor
@Getter
public class LoginRes
{
	private final boolean result;
	private final String cause;
}
