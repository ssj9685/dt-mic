package kr.easw.dtmic.server.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.util.List;

import kr.easw.dtmic.server.auth.user.UserType;

@Data
public class LoginParams implements Serializable {
	private static final long serialVersionUID = 7710662072308044971L;

	private String username;
	private String password;
	private String userType;
}

