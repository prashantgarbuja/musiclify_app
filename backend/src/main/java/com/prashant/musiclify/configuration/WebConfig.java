package com.prashant.musiclify.configuration;

import com.prashant.musiclify.properties.SpotifyAppConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableConfigurationProperties(SpotifyAppConfigurationProperties.class)
public class WebConfig implements WebMvcConfigurer {

    private final SpotifyAppConfigurationProperties spotifyAppConfig;

    public WebConfig(SpotifyAppConfigurationProperties spotifyAppConfig) {
        this.spotifyAppConfig = spotifyAppConfig;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(spotifyAppConfig.getApp().getFrontendUrl()) // Use frontend URL from properties
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
}