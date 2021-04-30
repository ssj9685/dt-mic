package kr.easw.dtmic.server.dto;

import java.io.Serializable;
import java.util.Map;
import java.util.UUID;

import lombok.Data;

@Data
public class AppendClaimSessionDataParams implements Serializable
{
	private static final long serialVersionUID = -8876563770385102714L;
	private UUID sessionID;
	private Map<String, String> args;
}
