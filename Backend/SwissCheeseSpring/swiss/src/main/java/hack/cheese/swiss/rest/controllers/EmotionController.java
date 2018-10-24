package hack.cheese.swiss.rest.controllers;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import hack.cheese.swiss.operators.UserOperator;

@RestController
public class EmotionController {

	@RequestMapping(value = "/push_emotions", method = RequestMethod.POST)
	public /*Map<String, Object>*/ boolean performLogin(@RequestBody String requestBody) {
		
//		JSONObject jsonObject = new JSONObject(requestBody);
//		
//		String username = "" + jsonObject.get("username");
//		String password = "" + jsonObject.get("password");
//		
//		UserOperator userOperator = new UserOperator();
//		
//		Map<String, Object> response = userOperator.authUser(username, password);
//		
//		return response;
		
		return true;
	}
	
}
