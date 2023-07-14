package com.luapetshop.luapetshop.producto;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.luapetshop.luapetshop.repository.IProductoRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductoService {
	private IProductoRepository productoRepository;
	
	@Autowired
	public ProductoService(IProductoRepository productoRepository) {
		this.productoRepository = productoRepository;
	}
	
	public List<Producto> getProductos(String nombre) {
		
		List<Producto> productos = nombre == null? 
				productoRepository.findAll() : 
					productoRepository.findByNombreContaining(nombre);
			
		return productos;
	}

	public List<Producto> getProductosByName(String nombre) {

		return productoRepository.findByNombreContaining(nombre);
	}

	public Page<Producto> getPageProducto(Pageable pageable, String nombre) {
		
		if(nombre == null)
			return productoRepository.findAll(pageable);
		else
			return productoRepository.findByNombreContaining(nombre, pageable);
	}

	public Optional<Producto> getProducto(int id) {
		
		return productoRepository.findById(id);
	}

	@Transactional
	public void agregarProducto(Map<String, Object> datos) {
				
		try {			
			Producto producto = map2Producto(datos);
			productoRepository.save(producto);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private Producto map2Producto(Map<String, Object> datos) {
		Producto producto = new Producto();
		
		int id_producto = (int) datos.get("id_producto");
		//id_producto == 0 --> producto nuevo
		if( id_producto != 0 ) {
			producto.setId_producto(id_producto);
		}

		producto.setNombre( (String) datos.get("nombre"));
		producto.setDescripcion((String) datos.get("descripcion"));
		producto.setPrecio_compra((double) datos.get("precio_compra"));
		producto.setRentabilidad((double) datos.get("rentabilidad"));
		//producto.setCategoria(null);
		//producto.setGanancia(null);
		producto.setStock((int) datos.get("stock"));
        //imagen (almacenar imagen, guardar ruta en producto.imagen
		
		return producto;
	}
}
