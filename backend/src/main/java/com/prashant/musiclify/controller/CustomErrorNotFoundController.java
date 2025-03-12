package com.prashant.musiclify.controller;

import com.prashant.musiclify.properties.SpotifyAppConfigurationProperties;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.prashant.musiclify.constant.ApiPath;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class CustomErrorNotFoundController implements ErrorController {
	private final SpotifyAppConfigurationProperties properties;

    public CustomErrorNotFoundController(SpotifyAppConfigurationProperties properties) {
        this.properties = properties;
    }

    @RequestMapping(value = ApiPath.ERROR, produces = MediaType.TEXT_HTML_VALUE)
	public RedirectView handleError(HttpServletRequest request) {
		String originalPath = (String) request.getAttribute("jakarta.servlet.error.request_uri");
		if (originalPath == null) {
			originalPath = "/"; // Fallback to root if path is unavailable
		}

		String frontendUrl = properties.getApp().getFrontendUrl();
		// Redirect to React app with the original path
		String redirectUrl = frontendUrl + originalPath;
		return new RedirectView(redirectUrl);
	}

}