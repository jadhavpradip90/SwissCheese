package hack.cheese.swiss.rest.controllers;

import java.io.IOException;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import hack.cheese.swiss.operators.ApplicantOperator;
import hack.cheese.swiss.utils.DataPopulator;

@RestController
public class ApplicantController {

	@RequestMapping(value = "/all_applicant_data", method = RequestMethod.GET)
	public Map<Object, Object> getAllApplicantData() {
		
		ApplicantOperator applicantOperator = new ApplicantOperator();
		Map<Object, Object> allApplicantDataMap = applicantOperator.fetchAllApplicantData();
		
		return allApplicantDataMap;
		
	}
	
	@RequestMapping(value = "/get_interview_schedule", method = RequestMethod.POST)
	public Map<String, Object> getInterviewSchedule(@RequestBody String requestBody) {
		
		JSONObject jsonObject = new JSONObject(requestBody);
		
		int id = Integer.parseInt("" + jsonObject.get("id"));
		
		ApplicantOperator applicantOperator = new ApplicantOperator();
		
		Map<String, Object> response = applicantOperator.retrieveInterviewSchedule(id);
				
		return response;
	}
	
	@RequestMapping(value = "/populate_applicants", method = RequestMethod.GET)
	public boolean populateApplicants() throws IOException {
		
		DataPopulator dataPopulator = new DataPopulator();
		return dataPopulator.populateApplicants();
		
//		return allApplicantDataMap;
		
	}
}
