package com.luapetshop.luapetshop;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	//ubicación predeterminada para archivos estáticos
    	registry
    	.addResourceHandler("/**")
    	.addResourceLocations("classpath:/static/");
        
    	//Ubicacion para servir imagenes
    	registry
          .addResourceHandler("/productos/**")
          .addResourceLocations("file:productos/");
     }
}
