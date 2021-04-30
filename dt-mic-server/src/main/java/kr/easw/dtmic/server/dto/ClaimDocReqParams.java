package kr.easw.dtmic.server.dto;

import java.io.Serializable;
import java.util.Map;
import java.util.UUID;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class ClaimDocReqParams implements Serializable
{
	private static final long serialVersionUID = 4780243602597358688L;
	private UUID sessionID;
	private String company;
	public Map<String, String> args;
}
