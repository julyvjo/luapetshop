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
		
		createDirIfNotExists(imgurlDir);
		
		//solo actualiza imagen si hay una
		if(image.isEmpty()) {
			return null;
		}
		
		int randomNumber = (int) ((Math.random() * (1000000 - 0)) + 0);
		String random = String.valueOf(randomNumber);
		
		//String baseDir = "src/main/resources/static";
		//String baseDir = "static";
		//String completeDir = baseDir + "/" + imgurlDir;
		//String completeDir = baseDir + "/" + imgurlDir;
		String completeDir = imgurlDir;
		
		//imagen
		Path filePath = Paths.get(completeDir,random+image.getOriginalFilename());
		Path databasePath = Paths.get(imgurlDir,random+image.getOriginalFilename());
		
		System.out.println("filePath: " + filePath.toString());
		System.out.println("dataBasePath: " + databasePath.toString());
		
		OutputStream os;
		try {
			os = Files.newOutputStream(filePath.toAbsolutePath());
			os.write(image.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return databasePath.toString();
	}

	private static void createDirIfNotExists(String imgurlDir) {
		
		String currentDirectory = System.getProperty("user.dir");
        System.out.println("Directorio actual: " + currentDirectory);
        
        System.out.println("imgurlDir: " + imgurlDir);
		
		// Convierte la ruta en un objeto Path
        Path path = Paths.get(imgurlDir);

        // Verifica si el directorio ya existe
        if (!Files.exists(path)) {
            try {
                // Crea el directorio
                Files.createDirectories(path);
                System.out.println("directorio creado: " + path.toString());
            } catch (IOException e) {
                System.err.println("Error al crear el directorio: " + e.getMessage());
            }
        }else {
        	System.out.println("El directorio ya existia: " + path.toString());
        }
	}
	

}
