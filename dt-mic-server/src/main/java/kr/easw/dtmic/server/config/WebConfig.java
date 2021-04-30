package kr.easw.dtmic.server.config;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.method.annotation.AuthenticationPrincipalArgumentResolver;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer
{

	/*
	 * @Override protected void addCorsMappings(CorsRegistry registry) {
	 * 
	 * registry.addMapping("/**").allowCredentials(true);
	 * 
	 * }
	 */

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry)
	{
		registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
		// registry.addResourceHandler("/login").addResourceLocations("/login");
		// registry.addResourceHandler("/dashboard/**").addResourceLocations("classpath:/static/");
		// registry.addResourceHandler("/panel/**").addResourceLocations("classpath:/static/");
		// registry.addResourceHandler("/api").addResourceLocations("/api");
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry)
	{
		// registry.addViewController("/login").setViewName("login");
		registry.addViewController("/test").setViewName("forward:/index.html");
		registry.addViewController("/user").setViewName("forward:/index.html");
		registry.addViewController("/dashboard").setViewName("forward:/index.html");
		registry.addViewController("/panel").setViewName("forward:/index.html");
		registry.addViewController("/admin").setViewName("forward:/index.html");
	}/*
		 * @Override public void
		 * addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
		 * argumentResolvers.add(new AuthenticationPrincipalArgumentResolver()); }
		 */

}
