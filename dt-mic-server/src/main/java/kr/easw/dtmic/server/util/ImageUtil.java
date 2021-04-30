package kr.easw.dtmic.server.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontFormatException;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ImageUtil
{
	private final FontStore fontStore;
	private final Map<Float, FontImgTempleate> fontMap;
	
	@Autowired
	public ImageUtil(FontStore store)
	{
		this.fontStore = store;
		this.fontMap = new HashMap<>();
		Font hf = this.fontStore.getHandWriteFont();
		this.fontMap.put(12F, new FontImgTempleate(hf, 12F));
		this.fontMap.put(18F, new FontImgTempleate(hf, 18F));
		this.fontMap.put(24F, new FontImgTempleate(hf, 24F));
		this.fontMap.put(36F, new FontImgTempleate(hf, 36F));
		this.fontMap.put(48F, new FontImgTempleate(hf, 48F));
		this.fontMap.put(60F, new FontImgTempleate(hf, 60F));
		this.fontMap.put(72F, new FontImgTempleate(hf, 72F));
	}
	
	public BufferedImage resizeImage(BufferedImage img, float ratio)
	{
		int w = (int)(img.getWidth() * ratio);
        int h = (int)(img.getHeight() * ratio);
        Image resizeImage = img.getScaledInstance(w, h, Image.SCALE_SMOOTH);
        BufferedImage newImage = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = newImage.createGraphics();
        g.drawImage(resizeImage, 0, 0, null);
        g.dispose();
        return newImage;
	}

	public BufferedImage decodeToImage(String completeImageData)
	{
		String imageDataBytes = completeImageData.substring(completeImageData.indexOf(",") + 1);
		BufferedImage image = null;
		byte[] imageByte;
		try
		{
			imageByte = Base64.decodeBase64(imageDataBytes);
			ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
			image = ImageIO.read(bis);
			bis.close();
		} catch (IOException e)
		{
			log.warn("decode fail", e);
		}
		return image;
	}

	public String encodeToBase64(BufferedImage img)
	{
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		String b64 = "";
		try
		{
			ImageIO.write(img, "png", baos);
			baos.flush();
			byte[] imageInByte = baos.toByteArray();
			baos.close();
			b64 = "data:image/png;base64,"+Base64.encodeBase64String(imageInByte);
		} catch (IOException e)
		{
			log.warn("encode fail", e);
		}
		return b64;

	}

	public synchronized BufferedImage stringToImage(float size, String text)
	{
		FontImgTempleate ft = this.fontMap.get(size);
		if(ft == null) return null;
		int width = ft.getWidth(text);
		if(width == 0) return null;
		log.info("convert: "+text);
		BufferedImage img = new BufferedImage(width, ft.height, BufferedImage.TYPE_INT_ARGB);
		Graphics2D g2d = img.createGraphics();
		g2d.setFont(ft.font);
		g2d.setColor(Color.BLACK);
		FontMetrics fm = g2d.getFontMetrics();
		g2d.drawString(text, 0, fm.getAscent());
		g2d.dispose();
		return img;
	}
}

class FontImgTempleate
{
	public final Font font;
	private final BufferedImage tmpImg;
	private final Graphics2D tmpG2d;
	private final FontMetrics tmpfm;
	public final int height;
	
	public FontImgTempleate(Font f, float size)
	{
		this.font = f.deriveFont(size);
		this.tmpImg = new BufferedImage(1, 1, BufferedImage.TYPE_INT_ARGB);
		this.tmpG2d = this.tmpImg.createGraphics();
		this.tmpG2d.setFont(this.font);
		this.tmpfm = tmpG2d.getFontMetrics();
		this.height = this.tmpfm.getHeight();
	}
	
	public int getWidth(String str)
	{
		return this.tmpfm.stringWidth(str);
	}
}
