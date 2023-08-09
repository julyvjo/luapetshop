package com.luapetshop.luapetshop.importacion;

import org.springframework.web.multipart.MultipartFile;

//import com.luapetshop.luapetshop.importacion.CSVProcessor.CSVProcessorPrecios;
//import com.luapetshop.luapetshop.importacion.CSVProcessor.CSVProcessorTodo;

public class CSVHandler {
	
	public String applyCSV(MultipartFile file, String tipo) throws Exception {
		CSVProcessor proc = null;
		
//		if(tipo == "todo")
//			//proc = new CSVProcessorTodo();
//		else if(tipo == "precios")
//			//proc = new CSVProcessorPrecios();
//		else 
//			throw new Exception("El tipo especificado es incorrecto"); 
//		
		return proc.process(file);
	}
}

		
