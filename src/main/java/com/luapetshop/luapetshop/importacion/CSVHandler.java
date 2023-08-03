package com.luapetshop.luapetshop.importacion;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.springframework.web.multipart.MultipartFile;

public class CSVHandler {
	
	public String applyCSV(MultipartFile file) {
		StringBuilder sb = new StringBuilder();
		
		try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] fields = line.split(";");

                System.out.println("\n\n# Producto");
                System.out.println("codigo: " + fields[0]);
                System.out.println("precio: " +  Double.valueOf(fields[1]));
                System.out.println("nombre: " + fields[2]);
                
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
		
		return sb.toString();
	}
	
	
	
	
}
