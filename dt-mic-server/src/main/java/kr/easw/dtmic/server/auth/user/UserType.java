package kr.easw.dtmic.server.auth.user;

import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

import kr.easw.dtmic.server.auth.Role;

public enum UserType
{
	NONE(),
	PHARMACY(Role.PHARMACY, Role.WEBSOCKET),
	ADMIN(Role.ADMIN, Role.WEBSOCKET);

	private Set<GrantedAuthority> roles;

	private UserType(Role... rolearr)
	{
		this.roles = new HashSet<>(rolearr.length);
		for (Role role : rolearr)
			this.roles.add(role);
	}

	public Set<GrantedAuthority> getRoles()
	{
		Set<GrantedAuthority> l = new HashSet<>(this.roles.size());
		l.addAll(this.roles);
		return l;
	}
}
