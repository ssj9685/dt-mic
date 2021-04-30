package kr.easw.dtmic.server.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.imageio.ImageIO;

import org.apache.pdfbox.contentstream.operator.Operator;
import org.apache.pdfbox.cos.COSArray;
import org.apache.pdfbox.cos.COSDocument;
import org.apache.pdfbox.cos.COSStream;
import org.apache.pdfbox.cos.COSString;
import org.apache.pdfbox.pdfparser.PDFStreamParser;
import org.apache.pdfbox.pdfwriter.ContentStreamWriter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.PDPageTree;
import org.apache.pdfbox.pdmodel.PDPageContentStream.AppendMode;
import org.apache.pdfbox.pdmodel.common.PDStream;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.TextPosition;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class PDFUtil
{
	private static final int DPI = 80;
	static int findcnt = 0;



	public static void main(String[] args) throws Exception
	{
		File imgf = new File("C:\\Users\\EOMSEONYONG\\Downloads\\sample.png");
		BufferedImage img = ImageIO.read(imgf);
		File f = new File("C:\\Users\\EOMSEONYONG\\Documents\\카카오톡 받은 파일\\samsong_doc.pdf");
		FileInputStream fis = new FileInputStream(f);
		PDDocument pdd = PDDocument.load(fis);
		//pdd = clonePDF(pdd);
		//insertPNGImage(pdd, img, "sample", 0, 100, 400);
		File out = new File("C:\\Users\\EOMSEONYONG\\Documents\\카카오톡 받은 파일\\new_samsong_doc.pdf");
		pdd.save(out);
		

		/*
		 * 
		 * FileInputStream fis = null; try { fis = new FileInputStream(f); PDDocument
		 * pdd = PDDocument.load(fis);
		 * 
		 * StringReplacer(pdd, map);
		 * pdd.save("C:\\Users\\EOMSEONYONG\\Documents\\카카오톡 받은 파일\\new_samsong_doc.pdf"
		 * ); //extractText(fis); } catch (IOException e) { e.printStackTrace(); }
		 * finally { try { if (fis != null) fis.close(); } catch (IOException ex) {
		 * ex.printStackTrace(); } } String s1 = "asdsad${AA}asdsad${AA}";
		 * System.out.println(s1.indexOf("${AA}"));
		 * 
		 * System.out.println(findcnt);
		 */

	}
	
	public static BufferedImage[] convertPDFtoPNG(String imgName, PDDocument doc)
	{
		int numOfPage = doc.getNumberOfPages();
		BufferedImage[] imgs = new BufferedImage[numOfPage];

		PDFRenderer pdfRenderer = new PDFRenderer(doc);
		for (int page = 0; page < numOfPage; ++page)
		{
			try
			{
				BufferedImage bim = pdfRenderer.renderImageWithDPI(page, DPI, ImageType.RGB);
				ImageIOUtil.writeImage(bim, imgName + "-" + page + ".png", DPI);
				imgs[page] = bim;
			} catch (IOException e)
			{
				log.warn("convert fail", e);
				return null;
			}
		}
		return imgs;
	}
	
	public static void insertPNGImage(PDDocument doc, BufferedImage img, String name, SimplePDFObjLocation loc)
	{
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		try
		{
			ImageIO.write(img, "png", stream);
			PDImageXObject pdImage = PDImageXObject.createFromByteArray(doc, stream.toByteArray(), name);
			PDPage page = doc.getPage(loc.getPageIndex());
			PDPageContentStream contentStream = new PDPageContentStream(doc, page, AppendMode.APPEND, true);
			contentStream.drawImage(pdImage, loc.getX(), loc.getY());
			contentStream.close();
		}
		catch(IOException e)
		{
			log.warn("insert png error", e);
		}
	}

}
