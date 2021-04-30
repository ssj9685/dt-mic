package kr.easw.dtmic.server.email;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class EMailService
{
	private final Properties prop;

	public EMailService()
	{
		this.prop = new Properties();
		
		prop.put("mail.smtp.host", "smtp.gmail.com");
		prop.put("mail.smtp.port", 465);
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.ssl.enable", "true");
		prop.put("mail.smtp.ssl.trust", "smtp.gmail.com");

	}

	public void gmailSend(String email, PDDocument doc, String fileName, String title, String content)
	{
		String user = "dja12123b"; // 네이버일 경우 네이버 계정, gmail경우 gmail 계정
		String password = "gnsdl7710"; // 패스워드

		// SMTP 서버 정보를 설정한다.

		Session session = Session.getDefaultInstance(prop, new Authenticator()
		{
			protected PasswordAuthentication getPasswordAuthentication()
			{
				return new PasswordAuthentication(user, password);
			}
		});
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try
		{
			doc.save(byteArrayOutputStream);
		}
		catch(IOException e)
		{
			log.warn("doc convert fail", e);
		}

		InputStream inputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
		
		try
		{	
			MimeMessage message = new MimeMessage(session);
			
			message.setFrom(new InternetAddress(user));
			
			// 수신자메일주소
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
			
			// Subject
			message.setSubject(title); // 메일 제목을 입력

			// Text
			message.setText(content); // 메일 내용을 입력
			
	        MimeBodyPart messageBodyPart = new MimeBodyPart();

	        Multipart multipart = new MimeMultipart();

	        messageBodyPart = new MimeBodyPart();
	        DataSource source = new InputStreamDataSource("application/pdf", fileName+".pdf", inputStream);
	        messageBodyPart.setDataHandler(new DataHandler(source));
	        messageBodyPart.setFileName( fileName+".pdf");
	        multipart.addBodyPart(messageBodyPart);

	        message.setContent(multipart);
			// send the message
			Transport.send(message); //// 전송
			System.out.println("message sent successfully...");
		}
		catch (Exception e) {
			log.warn("mail send fail", e);
		}
	}

}
