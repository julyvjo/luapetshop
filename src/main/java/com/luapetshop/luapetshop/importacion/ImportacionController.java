package com.luapetshop.luapetshop.importacion;

import java.nio.charset.StandardCharsets;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;


@Controller
public class ImportacionController {
	
	
	@GetMapping("/importacion")
	public String proveedor() {
		
		return "importacion";
	}
	
	@PostMapping("/upload_pdf")
	public ResponseEntity<byte[]> handlePDFUpload(@RequestParam("pdfFile") MultipartFile file) {
		PDFHandler pdfHandler = new PDFHandler();
		
		if(file.isEmpty()) {
			return null;
		}
		
		String output = pdfHandler.processFile(file);
		
		// Convertir a bytes
        byte[] csvBytes = output.getBytes(StandardCharsets.UTF_8);

        // Configurar headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN); // Especificar el tipo de contenido como texto plano
        headers.setContentDispositionFormData("attachment", "datos.csv"); // Establecer el nombre del archivo

        // Retornar csv
        return new ResponseEntity<>(csvBytes, headers, HttpStatus.OK);
	}
	
	
}
