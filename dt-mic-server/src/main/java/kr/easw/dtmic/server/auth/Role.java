package kr.easw.dtmic.server.auth;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority
{

	ADMIN(ROLES.ADMIN), PHARMACY(ROLES.PHARMACY), WEBSOCKET(ROLES.WEBSOCKET), ANONYMOUS(ROLES.ANONYMOUS);

	public static class ROLES
	{
		public static final String ANONYMOUS = "ROLE_ANONYMOUS";
		public static final String PHARMACY = "ROLE_PHARMACY";
		public static final String ADMIN = "ROLE_ADMIN";
		public static final String WEBSOCKET = "ROLE_WEBSOCKET";
	}

	public final String authority;
	public final String simpName;

	private Role(String authority)
	{
		this.authority = authority;
		this.simpName = authority.replaceFirst("ROLE_", "");
	}

	@Override
	public String getAuthority()
	{
		return this.authority;
	}

}
