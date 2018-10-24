package hack.cheese.swiss.operators;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class UserOperator {

	public Map<String, Object> authUser(String username, String password) {
		
		String dbPass = "";
		Connection conn = null;
		
		Map<String, Object> response = new HashMap<String, Object>();
		
        try {
        	String url = "SwissCheeseDB.sqlite";
        	
            conn = DriverManager.getConnection("jdbc:sqlite:" + url);
            
            System.out.println("Connection to SQLite has been established.");
            
            String query = "select * from interviewer_table where username = ?";
            
            PreparedStatement preparedStatementPassword = conn.prepareStatement(query);
            preparedStatementPassword.setString(1, username);
            
            ResultSet resultSet = preparedStatementPassword.executeQuery();
            ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
            
            resultSet.next();
            dbPass = resultSet.getString(5);
            
            if(!dbPass.equals(password))
            	response.put("result", 0);
            else {
            	
            	response.put("result", 1);
            	
            	Map<String, Object> dataMap = new HashMap<String, Object>();
            	dataMap.put(resultSetMetaData.getColumnName(1), resultSet.getInt(1));
            	dataMap.put(resultSetMetaData.getColumnName(2), resultSet.getString(2));
            	dataMap.put(resultSetMetaData.getColumnName(3), resultSet.getString(3));
            	dataMap.put(resultSetMetaData.getColumnName(4), resultSet.getString(4));
            	
            	response.put("data", dataMap);
            	
            }
            
            
        } catch (SQLException e) {
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
		
        return response;
	}
			
}
