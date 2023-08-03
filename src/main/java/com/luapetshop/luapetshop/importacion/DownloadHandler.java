package com.luapetshop.luapetshop.importacion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.luapetshop.luapetshop.producto.Producto;
import com.luapetshop.luapetshop.producto.ProductoService;

@Component
public class DownloadHandler {
	
	private ProductoService productService;
	
	@Autowired
	public DownloadHandler(ProductoService productService) {
		super();
		this.productService = productService;
	}

	public String getAllProductsCSV() {
		StringBuilder sb = new StringBuilder();
		List<Producto> productos = productService.getProductos(null);
		
		for(Producto producto : productos) {
			sb.append(prod2CSVLine(producto) + "\n");
		}
		
		return sb.toString();
	}

	private String prod2CSVLine(Producto producto) {
		StringBuilder line = new StringBuilder();
		
		line.append(addSemiColon(String.valueOf(producto.getId_producto())));
		line.append(addSemiColon(producto.getCategoria().getNombre()));
		line.append(addSemiColon(producto.getNombre()));
		line.append(addSemiColon(producto.getImagen()));
		line.append(addSemiColon(producto.getDescripcion()));
		line.append(addSemiColon(String.valueOf(producto.getPrecio_compra())));
		line.append(addSemiColon(String.valueOf(producto.getRentabilidad())));
		line.append(addSemiColon(String.valueOf(producto.getGanancia())));
		line.append(addSemiColon(String.valueOf(producto.getPrecio_venta())));
		line.append(addSemiColon(String.valueOf(producto.getStock())));
		
		return line.toString();
	}
	
	private String addSemiColon(String text) {
		return text + ";";
	}
	
}
