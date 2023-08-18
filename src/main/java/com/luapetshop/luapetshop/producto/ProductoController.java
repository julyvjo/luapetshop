package com.luapetshop.luapetshop.producto;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.luapetshop.luapetshop.proveedor.Proveedor;
import com.luapetshop.luapetshop.repository.IProveedorRepository;

@Controller
public class ProductoController {
	private ProductoService productoService;
	private IProveedorRepository proveedorRepository;
	
	@Autowired
	public ProductoController(
			ProductoService productoService, 
			IProveedorRepository proveedorRepository) {
		this.productoService = productoService;
		this.proveedorRepository = proveedorRepository;
	}
	
	@GetMapping("/producto")
	public String producto(
			Model model, 
			@RequestParam Map<String, Object> params) {
		
		int PAGE_SIZE = 20;
		
		List<Categoria> categorias = productoService.getCategorias();
		model.addAttribute("categorias", categorias);
		
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
		
		List<Proveedor> proveedores = proveedorRepository.findAll();
		
		model.addAttribute("proveedores", proveedores);
		model.addAttribute("nombre", nombre);
		model.addAttribute("productos", pageProducto.getContent());
		model.addAttribute("current", page+1);
		model.addAttribute("prev", page);
		model.addAttribute("next", page+2);
		model.addAttribute("last", totalpages);
		
		return "producto";
	}
	
	@GetMapping("/api/producto")
	@ResponseBody
	public List<Producto> getProductos(@RequestParam Map<String, Object> params){
		
		String nombre = params.get("nombre") != null ? 
				(String.valueOf(params.get("nombre"))):null;
		
		return productoService.getProductos(nombre);
	}
	
	@PostMapping("/new/producto")
    public ResponseEntity<String> agregarProducto(@RequestBody Map<String, Object> datos) {
        
		System.out.println(datos.toString());
		
		try {
			
			productoService.agregarProducto(datos);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(datos.toString());
    }
	
	/*
        // codigo_producto: 0, // (0 si no tiene un código de barras asignado)
				"id_producto": 1, (0 si es nuevo, otro si es modif)
        "nombre": "nombre",
				"descripcion":"descripcion",
				// id_proveedor: 0, // (0 si no tiene asignado un proveedor)
        //  "precio_compra": 0.00,
        "precio_compra": "0.00",
        //  "rentabilidad": 0.2, // (porcentaje de ganancia)
        "rentabilidad": "0.20", // (porcentaje de ganancia)
				//  "ganancia": 0.00,
				"ganancia": "0.00",
				//  "precio_venta": 0.00,
				"precio_venta": "0.00",
				"id_categoria": 1, // (no puede ser cero nunca)
				"stock": 0,
				"imagen": "base64"
	*/
	
}
