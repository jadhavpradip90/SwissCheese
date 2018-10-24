package hack.cheese.swiss.utils;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

public class DataPopulator {

	public boolean populateApplicants() throws IOException {

		Connection conn = null;
		try {

			String url = "SwissCheeseDB.sqlite";

			conn = DriverManager.getConnection("jdbc:sqlite:" + url);

			System.out.println("Connection to SQLite has been established.");

			BufferedReader br = new BufferedReader(new FileReader("/home/prathmesh/Downloads/dataSep-6-2018.json"));

			String interString = br.readLine();
			String jsonString = "";

			while (interString != null) {
				jsonString += interString;
				interString = br.readLine();
			}
			
			br.close();
			
			JSONObject jsonObject = new JSONObject(jsonString);
			
			JSONArray listData;
			
			listData = jsonObject.getJSONArray("data");
			
			Iterator<Object> iteratorJSON = listData.iterator();
			
			while(iteratorJSON.hasNext()) {
				
				JSONArray applicant = (JSONArray) iteratorJSON.next();
				Iterator<Object> iteratorApplicant = applicant.iterator();
				
				String query = "insert into applicants_table values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
				
				PreparedStatement preparedStatement = conn.prepareStatement(query);
				
				iteratorApplicant.next();
				
				int cnt = 1;
				int savedData = -1;
				while(iteratorApplicant.hasNext()) {
					
					if(cnt == 8) {
						savedData = Integer.parseInt("" + iteratorApplicant.next());
						cnt++;
						continue;
					}
					else 
						preparedStatement.setString(++cnt, "" + iteratorApplicant.next());
					
				}
				
				preparedStatement.setInt(9, savedData);
				
				preparedStatement.execute();
				
				preparedStatement.close();
				
			}
			return true;
			
		} catch (SQLException e) {
//        	allApplicantsDataMap.put("result", 0);
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
		
		return false;

	}

}
