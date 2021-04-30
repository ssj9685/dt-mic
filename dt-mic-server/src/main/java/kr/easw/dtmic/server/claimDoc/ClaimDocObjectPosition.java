package kr.easw.dtmic.server.claimDoc;

import java.util.Map;

import kr.easw.dtmic.server.util.SimplePDFObjLocation;
import lombok.Builder;
import lombok.Getter;
import lombok.Singular;

@Builder
@Getter
public class ClaimDocObjectPosition
{
	private String key;
	@Singular
	private Map<SimplePDFObjLocation, Float> positions;
}
