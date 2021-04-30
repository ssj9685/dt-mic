package kr.easw.dtmic.server.email;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.activation.DataSource;

public class InputStreamDataSource implements DataSource
{
	String contentType;
	String name;

	byte[] fileData;

	public InputStreamDataSource(String contentType, String name, InputStream inputStream) throws IOException
	{
		this.contentType = contentType;
		this.name = name;
		/**
		 * It seems DataSource will close inputStream and reopen it. I converted
		 * inputStream to a byte array, so it won't be closed again.
		 */
		fileData = inputStream.readAllBytes();
	}

	public String getContentType()
	{
		return contentType;
	}

	public String getName()
	{
		return name;
	}

	public InputStream getInputStream() throws IOException
	{
		/**
		 * Convert byte array back to inputStream.
		 */
		return new ByteArrayInputStream(fileData);
	}

	public OutputStream getOutputStream() throws IOException
	{
		throw new UnsupportedOperationException("Not implemented");
	}
}