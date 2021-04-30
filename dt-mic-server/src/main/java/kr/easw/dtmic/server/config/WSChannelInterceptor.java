package kr.easw.dtmic.server.config;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import kr.easw.dtmic.server.auth.user.LoginInfo;
import kr.easw.dtmic.server.pharmacy.PharmacyEntity;
import kr.easw.dtmic.server.pubsub.PharmacySessionType;
import kr.easw.dtmic.server.pubsub.PharmacyWebSocketMgr;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Slf4j
public class WSChannelInterceptor implements ChannelInterceptor
{

	private PharmacyWebSocketMgr mgr;

	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel)
	{
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
		StompCommand cmd = accessor.getCommand();
		if (cmd == StompCommand.CONNECT)
		{
			Principal p = accessor.getUser();
			if (p == null || !(p instanceof UsernamePasswordAuthenticationToken))
			{
				return null;
			}
			UsernamePasswordAuthenticationToken t = (UsernamePasswordAuthenticationToken) p;
			PharmacyEntity e = getEntityLogin(t.getPrincipal());
			PharmacySessionType type = getType(message.getHeaders());
			if (e == null || type == null)
			{
				return null;
			}
			this.mgr.connect(e.getUsername(), accessor.getSessionId(), channel, type, e);
		} else if (cmd == StompCommand.DISCONNECT)
		{
			PharmacyEntity e = getEntityLogout(accessor.getUser());
			if (e == null)
			{
				return null;
			}
			this.mgr.disconnect(e.getUsername(), accessor.getSessionId());
		}

		return message;
	}

	private static PharmacySessionType getType(MessageHeaders header)
	{
		try
		{
			Object o = header.get("nativeHeaders");
			Map<?, ?> map = (Map<?, ?>) o;
			o = map.get("type");
			List<?> list = (List<?>) o;
			o = list.get(0);
			String ts = o.toString();
			return PharmacySessionType.valueOf(ts);
		} catch (Exception e)
		{
			log.info("get session type fail", e);
			return null;
		}
	}

	private static PharmacyEntity getEntityLogin(Object o)
	{
		if (o == null || !(o instanceof LoginInfo))
		{
			return null;
		}
		o = ((LoginInfo) o).getEntity();
		if(o == null || !(o instanceof PharmacyEntity))
		{
			return null;
		}
		PharmacyEntity p = (PharmacyEntity) o;
		return p;
	}
	
	private static PharmacyEntity getEntityLogout(Object o)
	{
		if(o == null || !(o instanceof UsernamePasswordAuthenticationToken))
		{
			return null;
		}
		o = ((UsernamePasswordAuthenticationToken)o).getPrincipal();
		if(o == null || !(o instanceof LoginInfo))
		{
			return null;
		}
		
		o = ((LoginInfo)o).getEntity();
		if(o == null || !(o instanceof PharmacyEntity))
		{
			return null;
		}
		return (PharmacyEntity)o;
	}
}
