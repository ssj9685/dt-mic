package kr.easw.dtmic.server.claimDoc;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternUtils;
import org.springframework.stereotype.Component;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import kr.easw.dtmic.server.util.ImageUtil;
import kr.easw.dtmic.server.util.SimplePDFObjLocation;
import lombok.Getter;
import lombok.Singular;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ClaimDocManager implements CommandLineRunner
{
	@Getter
	@Singular
	private Map<String, ClaimDoc> claimDocs;
	private ResourceLoader resourceLoader;
	private final ImageUtil imgUtil;
	
	@Autowired
	public ClaimDocManager(ResourceLoader resourceLoader, ImageUtil imgUtil)
	{
		this.imgUtil = imgUtil;
		this.claimDocs = new HashMap<>();
	}
	
	private Resource[] loadResources(String pattern) throws IOException {
        return ResourcePatternUtils.getResourcePatternResolver(this.resourceLoader).getResources(pattern);
    }

	
	private ClaimDocObjectPosition getPositionObject(Entry<String, JsonElement> entry)
	{
		ClaimDocObjectPosition.ClaimDocObjectPositionBuilder builder = ClaimDocObjectPosition.builder();
		JsonArray arr = entry.getValue().getAsJsonArray();
		builder.key(entry.getKey());
		for(JsonElement e : arr)
		{
			String str = e.getAsString();
			String[] splitarr = str.split(",");
			SimplePDFObjLocation loc = SimplePDFObjLocation.builder()
			.pageIndex(Integer.parseInt(splitarr[0]))
			.x(Float.parseFloat(splitarr[1]))
			.y(Float.parseFloat(splitarr[2]))
			.build();
			builder.position(loc, Float.parseFloat(splitarr[3]));
		}
		return builder.build();
		
	}
	

	@Override
	public void run(String... args) throws Exception
	{
		try
		{
			Resource[] resources = this.loadResources("claimdoc/*.pdf");
			for(int i = 0; i < resources.length; ++i)
			{
				Resource resource = resources[i];
				String companyName = resource.getFilename().split("_")[0];
				log.info("load pdf "+resource.getURL()+" ("+companyName+")");
				InputStream stream = resource.getInputStream();
				byte[] original = stream.readAllBytes();
				ClaimDoc.ClaimDocBuilder builder = ClaimDoc.builder()
						.company(companyName)
						.originalDoc(original)
						.imgUtil(this.imgUtil);
				ClassPathResource metadatafile = new ClassPathResource("claimdoc/"+companyName+"_metadata.json");
				JsonElement json = JsonParser.parseReader(new InputStreamReader(metadatafile.getInputStream()));
				Set<Map.Entry<String, JsonElement>> entries = json.getAsJsonObject().entrySet();
				
				for (Map.Entry<String, JsonElement> entry: entries) {
					builder.textPostion(entry.getKey(), this.getPositionObject(entry));
				}
				this.claimDocs.put(companyName, builder.build());
			}
		} catch (Exception e)
		{
			log.warn("claim doc load error", e);
		}
		log.info("finish load claim docs ("+this.claimDocs.size()+")");
	}
	
	
	
}
