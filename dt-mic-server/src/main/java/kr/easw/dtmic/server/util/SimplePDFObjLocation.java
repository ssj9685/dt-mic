package kr.easw.dtmic.server.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
@EqualsAndHashCode
public class SimplePDFObjLocation
{
	private int pageIndex;
	private float x, y;
}
