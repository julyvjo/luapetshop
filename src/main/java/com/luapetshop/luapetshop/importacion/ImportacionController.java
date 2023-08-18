package com.luapetshop.luapetshop.importacion;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.luapetshop.luapetshop.proveedor.Proveedor;
import com.luapetshop.luapetshop.repository.IProductoRepository;
import com.luapetshop.luapetshop.repository.IProveedorRepository;


@Controller
public class ImportacionController {
	private DownloadHandler downloadHandler;
	private IProductoRepository productoRepository;
	private IProveedorRepository proveedorRepository;
	
	@Autowired
	public ImportacionController(DownloadHandler downloadHandler, IProductoRepository productoRepository,
			IProveedorRepository proveedorRepository) {
		super();
		this.downloadHandler = downloadHandler;
		this.productoRepository = productoRepository;
		this.proveedorRepository = proveedorRepository;
	}
	

	@GetMapping("/importacion")
	public String proveedor(Model model) {
		
		List<Proveedor> proveedores = proveedorRepository.findAll();
		model.addAttribute("proveedores", proveedores);
		
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
	public ResponseEntity<String> handleCSVUpload(
			@RequestParam("csvFile") MultipartFile file,
			@RequestParam("proveedor") int id_proveedor) {
		
		//archivo valido?
		if(file.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El archivo ingresado es erroneo");
		}
		
		//proveedor valido?
		Optional<Proveedor> proveedor = proveedorRepository.findById(id_proveedor);
		if(proveedor.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El proveedor ingresado es erroneo");
		}
		
		CSVHandler csvHandler = new CSVHandler(file, productoRepository, proveedor.get());
		String output;
		try {
			output = csvHandler.process();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

        return ResponseEntity.status(HttpStatus.CREATED).body("Datos importados exitosamente: \n\n" + output);
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
