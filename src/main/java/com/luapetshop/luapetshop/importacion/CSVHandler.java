package com.luapetshop.luapetshop.importacion;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.luapetshop.luapetshop.producto.Producto;
import com.luapetshop.luapetshop.proveedor.Proveedor;
import com.luapetshop.luapetshop.repository.IProductoRepository;

public class CSVHandler {
	private MultipartFile file;
	private IProductoRepository productoRepository;
	Proveedor proveedor;

	public CSVHandler(MultipartFile file, IProductoRepository productoRepository, Proveedor proveedor) {
		super();
		this.file = file;
		this.productoRepository = productoRepository;
		this.proveedor = proveedor;
	}

	public String process() {
    	StringBuilder sb = new StringBuilder();
    	Integer id_proveedor = this.proveedor.getId_proveedor();
		
		try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
            	if(line.isBlank()) {
            		continue;            		
            	}
            	//los campos son: codigo y precio, el proveedor viene aparte
                String[] fields = line.split(";");
                String codigo = fields[0];
                String precio = fields[1]; //nuevo precio de compra a proveedor
                
                //obtener producto
                Optional<Producto> opt_producto = productoRepository.findProductoByCodigoAndProveedor(codigo, id_proveedor);
                //validacion de existencia de producto
                if(opt_producto.isEmpty()) {
                	//el producto no existe, no se deberia crear en este caso porque es una actualizacion de precios
                	sb.append("ERROR codigo de producto y/o proveedor inexistente: " + codigo + "\n");
                	continue;
                }
                Producto producto = opt_producto.get();
                
                //preparar valores
                Double nuevo_precio_compra = Double.valueOf(precio);
                Double rentabilidad = producto.getRentabilidad();
                Double nuevo_precio_venta = nuevo_precio_compra * (rentabilidad + 1);
                Double nueva_ganancia = nuevo_precio_venta - nuevo_precio_compra;
                //setear valores
                producto.setPrecio_compra(nuevo_precio_compra);
                producto.setPrecio_venta(nuevo_precio_venta);
                producto.setGanancia(nueva_ganancia);
                
                try {
                	productoRepository.save(producto);
                	sb.append("Producto actualizado [" + producto.getCodigo() + "] " + producto.getNombre() + ": precio_compra = " + producto.getPrecio_compra() + " ; precio_venta = " + producto.getPrecio_venta());
				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace();
					System.out.println(e.getMessage());
					sb.append("ERROR al actualizar producto: " + producto.getCodigo());
				}
                sb.append("\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
		
		return sb.toString();
    }
	
	
}

		
