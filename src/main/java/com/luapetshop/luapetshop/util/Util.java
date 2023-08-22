package com.luapetshop.luapetshop.util;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.multipart.MultipartFile;

public class Util {

	public Util() {
		
	}
	
	public static String saveImage(MultipartFile image, String imgurlDir) {
		
		//solo actualiza imagen si hay una
		if(image.isEmpty()) {
			return null;
		}
		
		int randomNumber = (int) ((Math.random() * (1000000 - 0)) + 0);
		String random = String.valueOf(randomNumber);
		
		//String baseDir = "src/main/resources/static";
		String baseDir = "static";
		//String completeDir = baseDir + "/" + imgurlDir;
		String completeDir = baseDir + "/" + imgurlDir;
		
		//imagen
		Path filePath = Paths.get(completeDir,random+image.getOriginalFilename());
		Path databasePath = Paths.get(imgurlDir,random+image.getOriginalFilename());
		
		
		OutputStream os;
		try {
			os = Files.newOutputStream(filePath.toAbsolutePath());
			os.write(image.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return databasePath.toString();
	}
	

}
