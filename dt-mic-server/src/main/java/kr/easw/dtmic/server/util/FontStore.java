package kr.easw.dtmic.server.util;

import java.awt.Font;
import java.awt.FontFormatException;
import java.io.IOException;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Component
public class FontStore
{
	private final Font handWriteFont;
	
	public FontStore()
	{
		ClassPathResource fontFile=new ClassPathResource("font/Bazzi.ttf");
		Font f = null;
		try
		{
			f=Font.createFont(Font.TRUETYPE_FONT, fontFile.getInputStream());
		}
		catch(FontFormatException|IOException e)
		{
			log.warn("font load fail", e);
		}
		this.handWriteFont = f;
		
	}


}
