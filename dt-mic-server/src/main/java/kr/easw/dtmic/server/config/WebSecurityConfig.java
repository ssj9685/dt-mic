package kr.easw.dtmic.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import kr.easw.dtmic.server.auth.Role;
import kr.easw.dtmic.server.auth.UserDetailService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter
{
	@Autowired
	private UserDetailService userService;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception
	{
		//auth.authenticationProvider(this.authenticationProvider());
		auth.userDetailsService(this.userService).passwordEncoder(this.encoder());
		// auth.inMemoryAuthentication().withUser("test").password(passwordEncoder().encode("1234")).roles("ADMIN",
		// "USER");

	}

	@Override
	public void configure(WebSecurity web) throws Exception
	{
		//web.ignoring().antMatchers("/user/**");
		//super.configure(web);
		//web.ignoring().antMatchers("/user/**");
		
		//web.ignoring().antMatchers("/api/login");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception
	{
		http.cors().and().csrf().disable().authorizeRequests()
		.and().headers().frameOptions().sameOrigin()
		.and().anonymous().authorities(Role.ROLES.ANONYMOUS)
		.and().authorizeRequests().antMatchers("/dashboard/**").hasRole(Role.PHARMACY.simpName)
		.and().authorizeRequests().antMatchers("/panel/**").hasRole(Role.PHARMACY.simpName)
		.and().authorizeRequests().antMatchers("/admin/**").hasRole(Role.ADMIN.simpName)
		.and().authorizeRequests().antMatchers("/websocket/**").hasRole(Role.WEBSOCKET.simpName)
		//.antMatchers("/**").permitAll().anyRequest().authenticated()
		.and().formLogin().permitAll()
		.and().logout();
		//super.configure(http);
		//csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER)
		//http.authorizeRequests().antMatchers("/**").permitAll();
		/*http.authorizeRequests()
		.antMatchers("/api/**").authenticated();*/

	}
    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }


	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception
	{
		return super.authenticationManagerBean();
	}


/*
	@Bean
	public HeaderHttpSessionStrategy headerHttpSessionStrategy()
	{
		return new HeaderHttpSessionStrategy();
	}*/

}
