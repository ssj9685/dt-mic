package kr.easw.dtmic.server.vo;

import java.util.List;

import org.springframework.messaging.MessageChannel;

import kr.easw.dtmic.server.pubsub.PharmacyMessageChannel;
import kr.easw.dtmic.server.pubsub.PharmacySessionType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Singular;

@Builder
@EqualsAndHashCode
@AllArgsConstructor
@Getter
public class ClaimDocRes
{
	private boolean result;
	@Singular
	private List<String> docs;
}
