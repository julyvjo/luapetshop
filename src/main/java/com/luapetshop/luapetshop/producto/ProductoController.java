package com.luapetshop.luapetshop.producto;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Pageable;

@Controller
public class ProductoController {
	private ProductoService productoService;
	
	@Autowired
	public ProductoController(ProductoService productoService) {
		this.productoService = productoService;
	}
	
	
	@GetMapping("/producto")
	public String producto(
			Model model, 
			@RequestParam Map<String, Object> params) {
		
		int PAGE_SIZE = 3;
		
		int page = params.get("page") != null ? 
				(Integer.valueOf(params.get("page").toString())-1):0;
		
		
		String nombre = params.get("nombre") != null ? 
				(String.valueOf(params.get("nombre"))):null;
		
		//page -> en que pagina estoy
		//PAGE_SIZE -> que tamanyo tienen las pages
		Pageable pageRequest = (Pageable) PageRequest.of(page, PAGE_SIZE);
		
		//obtengo datos
		Page<Producto> pageProducto = productoService.getPageProducto(pageRequest, nombre);
		
		int totalpages = pageProducto.getTotalPages();
		if(totalpages > 0) {
			List<Integer> pages = IntStream.rangeClosed(1, totalpages).boxed().collect(Collectors.toList());
			model.addAttribute("pages", pages);
		}
		model.addAttribute("nombre", nombre);
		model.addAttribute("productos", pageProducto.getContent());
		model.addAttribute("current", page+1);
		model.addAttribute("prev", page);
		model.addAttribute("next", page+2);
		model.addAttribute("last", totalpages);
		
		
		
		
		return "producto";
	}
	
	
}
