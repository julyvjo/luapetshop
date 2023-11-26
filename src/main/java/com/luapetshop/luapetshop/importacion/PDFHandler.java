package com.luapetshop.luapetshop.importacion;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.web.multipart.MultipartFile;

public class PDFHandler {
	
	String CADENA_RELLENO = "Código Descripción MDP Y";
	
	public String processFile(MultipartFile file, String pages) {
		StringBuilder sb = new StringBuilder();
		ArrayList<Integer> parsedPages = parsePages(pages);
		
		for(Integer page : parsedPages) {
			sb.append(procesarPagina(file, page) + "\n");
		}
		
		return sb.toString();
	}
	
	
	protected String procesarPagina(MultipartFile file, int targetPageNumber) {
		
		StringBuilder sb = new StringBuilder();
		
		try (InputStream inputStream = file.getInputStream()) {
			
			PDDocument document = PDDocument.load(inputStream);
            // Verifica que el número de página esté en el rango válido
            if (targetPageNumber <= 0 || targetPageNumber > document.getNumberOfPages()) {
                System.out.println("Número de página inválido. El PDF tiene " + document.getNumberOfPages() + " páginas.");
            } else {
                // Crea una instancia de PDFTextStripper
                PDFTextStripper pdfTextStripper = new PDFTextStripper();

                // Establece el rango de páginas que deseas leer (en este caso, solo una página)
                pdfTextStripper.setStartPage(targetPageNumber);
                pdfTextStripper.setEndPage(targetPageNumber);

                // Obtiene el texto de la página específica y guárdalo en una cadena
                String text = pdfTextStripper.getText(document);
                
                //Obtiene el texto línea por línea
                String[] lines = pdfTextStripper.getText(document).split("\\r?\\n");
                // Procesa cada línea
                for (String line : lines) {
                	if(!line.contains(","))
                    	continue;
                	String lineaCSV = procesarLinea(line);
                    sb.append(lineaCSV + "\n");
                }
            }
        }catch (IOException e) {
        	e.printStackTrace();
        }
		return sb.toString();
		
		
	}
	
	
	protected  String procesarLinea(String line) {
		
		if (line.startsWith(CADENA_RELLENO)) {
            line = line.substring(CADENA_RELLENO.length()).trim();
		}
		
        //index de la coma
        int commaIndex = line.indexOf(',');
        // Aplica la expresión regular para separar el precio del nombre
        String beforeComma = line.substring(0, commaIndex + 1); // Incluye la coma
        String afterComma = line.substring(commaIndex + 1);
        // Agrega el espacio después de la coma
        String parsedLine = beforeComma + afterComma.substring(0, 2) + " " + afterComma.substring(2);
        
        int firstSpaceIndex = parsedLine.indexOf(' ');
        int secondSpaceIndex = parsedLine.indexOf(' ', firstSpaceIndex + 1);

        String firstPart = parsedLine.substring(0, secondSpaceIndex);
        String secondPart = parsedLine.substring(secondSpaceIndex + 1);
    
        String[] splitResult = firstPart.split(" ");

        // Extrae los campos resultantes
        String lineaCSV = splitResult[0].trim() + ";" + splitResult[1].trim() + ";" + secondPart.trim();
        
        return lineaCSV;
		
	}
	
	protected ArrayList<Integer> parsePages(String pages){
		ArrayList<Integer> parsedPages = new ArrayList<Integer>();
		
		//separamos por comas
		String[] rangos =  pages.split(",");
		
		for( String rango : rangos ) {
			//si no contiene - entonces lo agrego como numero simple
			if(!rango.contains("-")) {
				parsedPages.add(Integer.parseInt(rango));
				continue;
			}
			
			//si contiene - obtengo el rango completo
			String[] fromTo = rango.split("-");
			Integer from = Integer.parseInt(fromTo[0]);
			Integer to = Integer.parseInt(fromTo[1]);
			while(from <= to) {
				parsedPages.add(from);
				from++;
			}
		}
		
		return parsedPages;
	}
	
}
