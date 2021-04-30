package kr.easw.dtmic.server.claimDoc;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;
import java.util.Map.Entry;

import org.apache.pdfbox.pdmodel.PDDocument;

import kr.easw.dtmic.server.util.ImageUtil;
import kr.easw.dtmic.server.util.PDFUtil;
import kr.easw.dtmic.server.util.SimplePDFObjLocation;
import lombok.Builder;
import lombok.Getter;
import lombok.Singular;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Builder
@Getter
public class ClaimDoc
{
	@Singular
	private Map<String, ClaimDocObjectPosition> textPostions;
	private String company;
	private byte[] originalDoc;

	private final ImageUtil imgUtil;
	private static final String SIGN="signature";
	private static final String BANK="bankName";
	private static final String YEAR="year";
	private static final String MONTH="month";
	private static final String DATE="date";
	private static final TimeZone tz = TimeZone.getTimeZone("KST");

	public PDDocument generatePDDoc(Map<String, String> org)
	{
		Map<String, String> map = new HashMap<>(org.size());
		map.putAll(org);
		PDDocument pdfdoc;
		try
		{
			pdfdoc=PDDocument.load(this.originalDoc);
			log.info("read success"+map.size());
			for(Entry<String, String> e : map.entrySet())
			{
				log.info("key:"+e.getKey()+" value:"+e.getValue()+" type:"+e.getValue().getClass().getName());
			}

		}
		catch(IOException e)
		{
			log.warn("pdf load fail", e);
			return null;
		}
		this.dateFilter(pdfdoc, map);
		this.signFilter(pdfdoc, map);
		this.bankFilter(pdfdoc, map);
		map.forEach((String key, String o) ->
		{
			ClaimDocObjectPosition pos=this.textPostions.get(key);
			if(pos==null)
			{
				log.warn("missing key in metadata: "+key);
				return;
			}
			pos.getPositions().forEach((SimplePDFObjLocation loc, Float fontSize) ->
			{
				BufferedImage img;
				img=this.imgUtil.stringToImage(fontSize, o);
				if(img != null)
				{
					PDFUtil.insertPNGImage(pdfdoc, img, key, loc);
				}
			});
		});

		return pdfdoc;

	}
	
	private void dateFilter(PDDocument pdfdoc, Map<String, String> args)
	{
		Calendar cal=Calendar.getInstance(tz);
		if(this.textPostions.containsKey(YEAR))
		{
			args.put(YEAR, String.valueOf(cal.get(Calendar.YEAR)));
		}
		if(this.textPostions.containsKey(MONTH))
		{
			args.put(MONTH, String.valueOf(cal.get(Calendar.MONTH)+1));
		}
		if(this.textPostions.containsKey(DATE))
		{
			args.put(DATE, String.valueOf(cal.get(Calendar.DATE)));
		}
	}
	
	private void signFilter(PDDocument pdfdoc, Map<String, String> args)
	{
		if(args.containsKey(SIGN))
		{
			if(this.textPostions.containsKey(SIGN))
			{
				BufferedImage img=this.imgUtil.decodeToImage(args.get(SIGN).toString());
				this.textPostions.get(SIGN).getPositions().forEach((SimplePDFObjLocation loc, Float size) ->
				{
					BufferedImage simg = this.imgUtil.resizeImage(img, size);
					PDFUtil.insertPNGImage(pdfdoc, simg, SIGN, loc);
				});
			}
			args.remove(SIGN);
		}
	}
	
	private void bankFilter(PDDocument pdfdoc, Map<String, String> args)
	{
		if(args.containsKey(BANK))
		{
			String realName = args.get(BANK).toString();
			switch(realName)
			{
				case "kb": realName="KB국민은행"; break;
				case "nh": realName="농협중앙회"; break;
				case "kakao": realName="카카오벵크"; break;
			}
			args.put(BANK, realName);
			
		}
	}

}
