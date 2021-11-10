package film.com;

import java.io.IOException;
import java.io.PrintWriter;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonElement;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

/*import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;

*/
/**
 * Servlet implementation class dummyServlet
 */
@WebServlet("/DummyServlet")
public class DummyServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;  // Know about this-----
	  
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DummyServlet() {
        super();
        
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    final String DB_URL = "jdbc:mysql://localhost:3306/sakila";
	//Database Credentials
	 final String USER = "root";
	 final String PASSWORD = "root"; 
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
		
		 
		try {
			//registering the jdbc driver
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection con = DriverManager.getConnection(DB_URL, USER, PASSWORD);
			System.out.println("conn. established");
			////Statement smt = con.createStatement();
			// diff btw int and integer
			Integer offset = Integer.parseInt(request.getParameter("start")), limit = Integer.parseInt(request.getParameter("limit"));  
			System.out.println("got values");
		System.out.println(offset);
		System.out.println(limit);
			String query = "SELECT film.film_id,film.title, film.Description,film.Director,language.name, film.release_year, film.Rating, film.Special_features from film INNER JOIN language ON film.language_id = language.language_id where isDeleted=0  LIMIT ? OFFSET ?";
			PreparedStatement stmt=con.prepareStatement(query);// Read about this
			
			stmt.setInt(2, offset);
			stmt.setInt(1, limit);
			ResultSet rs = stmt.executeQuery();
			// list and arraylist
			ArrayList<Response> details = new ArrayList<>();
			while(rs.next()) {
				Response detail = new Response();
				detail.setFilm_id(rs.getInt("film_id"));
				detail.setTitle(rs.getString("title"));
				detail.setDescription(rs.getString("Description"));
				detail.setDirector(rs.getString("Director"));
				detail.setLanguage_name(rs.getString("language.name"));
				detail.setYear(rs.getInt("release_year"));
				
				detail.setRating(rs.getString("Rating"));
				detail.setSpecial_Features(rs.getString("Special_features"));
				
				details.add(detail);
				}
			// map and hashmap
			HashMap<String, ArrayList<Response>> films = new HashMap<>();
			films.put("films", details);
			
			Integer totalRows = 0;
			stmt = con.prepareStatement("SELECT COUNT(*) AS total FROM film where isDeleted=0 ");
			System.out.println(stmt.toString());
			// methods for executing a query other than execute query
			 rs = stmt.executeQuery();
			rs.next();
			totalRows = rs.getInt("total");
			
			Gson gson = new Gson();
			JsonElement jsonElement = gson.toJsonTree(films);
			jsonElement.getAsJsonObject().addProperty("total", totalRows);
			//String data = gson.toJson(jsonElement);
			
			response.setContentType("application/json");
			// read about utf 8
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			
		 
			String res = gson.toJson(jsonElement);
			
			out.print(res);
			System.out.println(res);
			//response.setStatus(200);
			out.flush();
			stmt.close();
			con.close();
		} catch(Exception e) {
			System.out.println(e);
		}
	}
}

