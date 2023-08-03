package com.luapetshop.luapetshop.importacion;

import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;


@Controller
public class ImportacionController {
	private DownloadHandler downloadHandler;
	
	@Autowired
	public ImportacionController(DownloadHandler downloadHandler) {
		super();
		this.downloadHandler = downloadHandler;
	}

	@GetMapping("/importacion")
	public String proveedor() {
		
		return "importacion";
	}
	
	@PostMapping("/upload_pdf")
	public ResponseEntity<byte[]> handlePDFUpload(
			@RequestParam("pdfFile") MultipartFile file,
			@RequestParam("pages") String pages) {
		PDFHandler pdfHandler = new PDFHandler();
		
		if(file.isEmpty()) {
			return null;
		}
		
		String output = pdfHandler.processFile(file, pages);
		
		// Convertir a bytes
        byte[] csvBytes = output.getBytes(StandardCharsets.UTF_8);

        // Configurar headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN); // Especificar el tipo de contenido como texto plano
        headers.setContentDispositionFormData("attachment", "datos.csv"); // Establecer el nombre del archivo

        // Retornar csv
        return new ResponseEntity<>(csvBytes, headers, HttpStatus.OK);
	}
	
	
	@PostMapping("/upload_csv")
	public ResponseEntity<String> handlePDFUpload(
			@RequestParam("csvFile") MultipartFile file) {
		PDFHandler pdfHandler = new PDFHandler();
		
		if(file.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El archivo ingresado es erroneo");
		}
		
		CSVHandler csvHandler = new CSVHandler();
		csvHandler.applyCSV(file);

        return ResponseEntity.status(HttpStatus.CREATED).body("Datos importados exitosamente");
	}
	
	@GetMapping("/download/productos")
	public ResponseEntity<byte[]> downloadProductosCSV() {
		
		String output = downloadHandler.getAllProductsCSV();
		
		// Convertir a bytes
        byte[] csvBytes = output.getBytes(StandardCharsets.UTF_8);

        // Configurar headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN); // Especificar el tipo de contenido como texto plano
        headers.setContentDispositionFormData("attachment", "productos.csv"); // Establecer el nombre del archivo

        // Retornar csv
        return new ResponseEntity<>(csvBytes, headers, HttpStatus.OK);
	}
	
	
}
