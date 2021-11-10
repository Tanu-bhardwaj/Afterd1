package film.com;

import java.io.*;
import java.sql.*;

import javax.servlet.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class demo extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException 
    {  
       PrintWriter out = res.getWriter();  
       res.setContentType("text/html");  
       out.println("<html><body>");  
       try 
       {  
           Class.forName("com.mysql.jdbc.Driver");  
           Connection con = DriverManager.getConnection("jdbc:mysql://localhost/sakila", "root", "root");  
           Statement stmt = con.createStatement();  
           ResultSet rs = stmt.executeQuery("select * from film");  
           System.out.println("cnn");
           
          
           con.close();  
          }  
           catch (Exception e) 
          {  
           out.println("error");  
       }  
   }  
}