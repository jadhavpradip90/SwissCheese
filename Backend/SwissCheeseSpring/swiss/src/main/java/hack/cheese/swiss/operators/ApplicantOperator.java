package hack.cheese.swiss.operators;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ApplicantOperator {

	public Map<Object, Object> fetchAllApplicantData() {
		
		Map<Object, Object> allApplicantsDataMap = new HashMap<Object, Object>();
		List<Object> allApplicantsDataList = new ArrayList<Object>();
				
		Connection conn = null;
        try {
        	
        	String url = "SwissCheeseDB.sqlite";

            conn = DriverManager.getConnection("jdbc:sqlite:" + url);
            
            System.out.println("Connection to SQLite has been established.");
            
            String query = "select * from applicants_table";
            
            Statement statementSelect = conn.createStatement();
            ResultSet resultSetSelect = statementSelect.executeQuery(query);
            ResultSetMetaData resultSetMetaDataSelect = resultSetSelect.getMetaData();
            
            while(resultSetSelect.next()) {
        		Map<Object, Object> applicantDataMap = new HashMap<Object, Object>();

            	applicantDataMap.put(resultSetMetaDataSelect.getColumnName(1), resultSetSelect.getInt(1));
            	applicantDataMap.put(resultSetMetaDataSelect.getColumnName(2), resultSetSelect.getString(2));
            	applicantDataMap.put(resultSetMetaDataSelect.getColumnName(3), resultSetSelect.getString(3));
            	applicantDataMap.put(resultSetMetaDataSelect.getColumnName(4), resultSetSelect.getString(4));
            	applicantDataMap.put(resultSetMetaDataSelect.getColumnName(5), resultSetSelect.getString(5));
            	applicantDataMap.put(resultSetMetaDataSelect.getColumnName(6), resultSetSelect.getString(6));
            	applicantDataMap.put(resultSetMetaDataSelect.getColumnName(7), resultSetSelect.getString(7));
            	applicantDataMap.put(resultSetMetaDataSelect.getColumnName(8), resultSetSelect.getString(8));
            	applicantDataMap.put(resultSetMetaDataSelect.getColumnName(9), resultSetSelect.getInt(9));
            	applicantDataMap.put(resultSetMetaDataSelect.getColumnName(10), resultSetSelect.getString(10));
            	
            	allApplicantsDataList.add(applicantDataMap);
            } 
        	allApplicantsDataMap.put("data", allApplicantsDataList);
        	allApplicantsDataMap.put("result", 1);

            
        } catch (SQLException e) {
        	allApplicantsDataMap.put("result", 0);
            System.out.println(e.getMessage());
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
		
        return allApplicantsDataMap;
	}
	
	public Map<String, Object> retrieveInterviewSchedule(int id) {
		
		Map<String, Object> allInterviewSchedulesDataMap = new HashMap<String, Object>();
		List<Object> allInterviewSchedulesDataList = new ArrayList<Object>();
		
		Connection conn = null;
		
        try {
        	
        	String url = "SwissCheeseDB.sqlite";

            conn = DriverManager.getConnection("jdbc:sqlite:" + url);
            
            System.out.println("Connection to SQLite has been established.");
            
            String querySelectInterviews = "select * from interview_schedule_table where interviewer_id = ?";
            
            PreparedStatement preparedStatementSelectInterviews = conn.prepareStatement(querySelectInterviews);
            preparedStatementSelectInterviews.setInt(1, id);
            
            ResultSet resultSetSelectedInterviews = preparedStatementSelectInterviews.executeQuery();
            ResultSetMetaData resultSetMetaDataSelectedInterviews = resultSetSelectedInterviews.getMetaData();
            
            while(resultSetSelectedInterviews.next()) {
            	
            	Map<String, Object> interviewScheduleDataMap = new HashMap<String, Object>();
            	
            	interviewScheduleDataMap.put(resultSetMetaDataSelectedInterviews.getColumnName(1), resultSetSelectedInterviews.getInt(1));
            	interviewScheduleDataMap.put(resultSetMetaDataSelectedInterviews.getColumnName(2), resultSetSelectedInterviews.getInt(2));
            	int applicantId = resultSetSelectedInterviews.getInt(3);
            	interviewScheduleDataMap.put(resultSetMetaDataSelectedInterviews.getColumnName(3), applicantId);
            	interviewScheduleDataMap.put(resultSetMetaDataSelectedInterviews.getColumnName(4), resultSetSelectedInterviews.getString(4));
            	interviewScheduleDataMap.put(resultSetMetaDataSelectedInterviews.getColumnName(5), resultSetSelectedInterviews.getInt(5));
            	
            	String query = "select * from applicants_table where applicant_id = ?";
            	
            	PreparedStatement preparedStatement = conn.prepareStatement(query);
            	preparedStatement.setInt(1, applicantId);
            	
            	ResultSet resultSet = preparedStatement.executeQuery();
            	ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
            	
            	while(resultSet.next()) {
            		
            		interviewScheduleDataMap.put(resultSetMetaData.getColumnName(2), resultSet.getString(2));
            		interviewScheduleDataMap.put(resultSetMetaData.getColumnName(3), resultSet.getString(3));
            		interviewScheduleDataMap.put(resultSetMetaData.getColumnName(4), resultSet.getString(4));
            		interviewScheduleDataMap.put(resultSetMetaData.getColumnName(5), resultSet.getString(5));
            		interviewScheduleDataMap.put(resultSetMetaData.getColumnName(6), resultSet.getString(6));
            		interviewScheduleDataMap.put(resultSetMetaData.getColumnName(7), resultSet.getString(7));
            		interviewScheduleDataMap.put(resultSetMetaData.getColumnName(8), resultSet.getString(8));
            		interviewScheduleDataMap.put(resultSetMetaData.getColumnName(9), resultSet.getInt(9));
            		interviewScheduleDataMap.put(resultSetMetaData.getColumnName(10), resultSet.getString(10));
            		
            	}
            	allInterviewSchedulesDataList.add(interviewScheduleDataMap);            	
            }
           
            allInterviewSchedulesDataMap.put("result", 1);
            allInterviewSchedulesDataMap.put("data", allInterviewSchedulesDataList);
            
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            allInterviewSchedulesDataMap.put("result", 0);
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
        
        return allInterviewSchedulesDataMap;
	}
	
}
