package com.luapetshop.luapetshop.importacion;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.luapetshop.luapetshop.producto.Producto;
import com.luapetshop.luapetshop.producto.ProductoService;

public abstract class CSVProcessor {
	
	private ProductoService productoService;
	
	@Autowired
	public CSVProcessor(ProductoService productoService) {
		super();
		this.productoService = productoService;
	}
	
    public String process(MultipartFile file) {
    	StringBuilder sb = new StringBuilder();
		
		try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] fields = line.split(";");

                //falta agregarle los parametros, conviene pedirlos por csv?
                //es decir, que la primera linea tenga los nombres de las columnas
                //Producto producto = productoService.getProductoByCodigoAndProveedor();
                
                //String output = processFields(producto, fields);
                
                //sb.append(output + "\n");
                
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
		
		return sb.toString();
    }
    
    protected abstract String processFields(Producto producto, String[] fields);

    
    
    
    
    
    
//	public static class CSVProcessorPrecios extends CSVProcessor {
//
//		public CSVProcessorPrecios(ProductoService productoService) {
//			super(productoService);
//		}
//
//		@Override
//		protected String processFields(String[] fields) {
//			
//			
//			
//			return null;
//		}
//
//        
//    }
//
//    public static class CSVProcessorTodo extends CSVProcessor {
//
//		public CSVProcessorTodo(ProductoService productoService) {
//			super(productoService);
//		}
//
//		@Override
//		protected String processFields(String[] fields) {
//			
//			
//			
//			
//			return null;
//		}
//
//        
//    }
}
