package kr.easw.dtmic.server.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class SimpleSessionRequest
{
	private UUID sessionID;
}
