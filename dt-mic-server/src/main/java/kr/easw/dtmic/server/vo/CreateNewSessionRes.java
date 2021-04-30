package kr.easw.dtmic.server.vo;

import java.util.UUID;

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
public class CreateNewSessionRes
{
	private boolean result;
	private UUID sessionID;
}
