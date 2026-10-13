package com.example.portfolio.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 页面路由映射：把无后缀的干净 URL 映射到 static 下的 html。
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/about").setViewName("forward:/about.html");
        registry.addViewController("/contact").setViewName("forward:/contact.html");
        registry.addViewController("/admin").setViewName("forward:/admin.html");
        registry.addViewController("/project/{id}").setViewName("forward:/project.html");
    }
}
