package hack.cheese.swiss.rest.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HeartbeatController {

	@RequestMapping(value = "/heartbeat", method = RequestMethod.GET)
	public Map<String, Boolean> heartbeat() {
		
		Map<String, Boolean> result = new HashMap<String, Boolean>();
		result.put("result", true);
		
		return result;
	}
	
}