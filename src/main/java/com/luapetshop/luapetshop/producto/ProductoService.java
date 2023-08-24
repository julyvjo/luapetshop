package com.luapetshop.luapetshop.producto;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.luapetshop.luapetshop.repository.ICategoriaRepository;
import com.luapetshop.luapetshop.repository.IProductoRepository;
import com.luapetshop.luapetshop.util.Util;

import jakarta.transaction.Transactional;

@Service
public class ProductoService {
	private IProductoRepository productoRepository;
	private ICategoriaRepository categoriaRepository;
	private String IMAGE_DIR = "/imagenes";
	
	@Autowired
	public ProductoService(IProductoRepository productoRepository, ICategoriaRepository categoriaRepository) {
		super();
		this.productoRepository = productoRepository;
		this.categoriaRepository = categoriaRepository;
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
		Double precio_compra = Double.valueOf((String)datos.get("precio_compra"));
		Double rentabilidad = Double.valueOf((String)datos.get("rentabilidad"));
		Double precio_venta = precio_compra + (precio_compra * rentabilidad);
		Double ganancia = precio_compra * rentabilidad;
		producto.setPrecio_compra(precio_compra);
		producto.setRentabilidad(rentabilidad);
		producto.setPrecio_venta(precio_venta);
		producto.setGanancia(ganancia);
		
		Optional<Categoria> optionalCategoria = categoriaRepository.findById( (int) datos.get("id_categoria") );
		producto.setCategoria( optionalCategoria.get() );
		
		producto.setStock((int) datos.get("stock"));
		
		//imagen (almacenar imagen, guardar ruta en producto.imagen
		
		
		return producto;
	}
	
	public List<Categoria> getCategorias() {
		return categoriaRepository.findAll();
	}

	public Producto getProductoByCodigoAndProveedor() {
		
		return null;
	}
	
	protected void saveImagen(MultipartFile file) {
		
		try {
            // Verificar imagen
            if (!file.getContentType().startsWith("image")) {
                //return ResponseEntity.badRequest().body("El archivo proporcionado no es una imagen válida.");
            }

            // Guarda la imagen en el sistema de archivos
           // String fileName = UUID.randomUUID().toString() + "." + FilenameUtils.getExtension(file.getOriginalFilename());
            //Path filePath = Paths.get(IMAGE_DIR, fileName);
            //Files.copy(file.getInputStream(), filePath);

            // Almacena la ruta en la base de datos
//            ImageEntity imageEntity = new ImageEntity();
//            imageEntity.setName(jsonData.getName());
//            imageEntity.setDescription(jsonData.getDescription());
//            imageEntity.setImageUrl(filePath.toString()); // Guarda la ruta completa
//            imageRepository.save(imageEntity);

            //return ResponseEntity.ok("Imagen cargada exitosamente. Ruta: " + filePath.toString());
        } catch (Exception e) {
            //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al cargar la imagen.");
        }
		
		
		
	}
	
	@Transactional
	public String CrearOActualizarProducto(Producto producto, MultipartFile file) {
		
		//contiene imagen?
		if(!file.isEmpty()) {
			//guarda imagen y obtiene ruta
			String imgurlPath = Util.saveImage(file, "productos/");
			//setea ruta de imagen para el producto
			producto.setImagen(imgurlPath);
		}
		
//		System.out.println("nombre: " + producto.getNombre());
//		System.out.println("rentabilidad: " + producto.getRentabilidad());
//		System.out.println("precio_compra: " + producto.getPrecio_compra());
//		System.out.println("proveedor: " + producto.getProveedor().getNombre());
//		System.out.println("proveedor: " + producto.getCategoria().getNombre());
//		System.out.println("imagen?: " + producto.getImagen());
		productoRepository.save(producto);
		
		return "producto creado, id: " + producto.getId_producto();
		
	}
	
	
	
	
	
	
	
	
	
}
