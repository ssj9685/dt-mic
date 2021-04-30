package kr.easw.dtmic.server.dto;

import java.io.Serializable;
import java.util.UUID;

import lombok.Data;

@Data
public class DrugPrepCompleteParams implements Serializable
{
	private static final long serialVersionUID = 7681708686116200401L;
	private UUID sessionID;
}
