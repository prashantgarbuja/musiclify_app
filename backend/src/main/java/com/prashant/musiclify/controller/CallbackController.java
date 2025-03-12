package com.prashant.musiclify.controller;

import com.prashant.musiclify.constant.ApiPath;
import com.prashant.musiclify.properties.SpotifyAppConfigurationProperties;
import com.prashant.musiclify.service.AccessTokenService;
import com.prashant.musiclify.service.SpotifyUrlService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@AllArgsConstructor
public class CallbackController {

    private final AccessTokenService accessToken;
    private final SpotifyAppConfigurationProperties properties;
//    private final SpotifyUrlService spotifyUrlService;

    @GetMapping(value = ApiPath.CALLBACK, produces = MediaType.TEXT_HTML_VALUE) // Change back to HTML for redirect
    public RedirectView handleCallback(
            @RequestParam(value = "code", required = false) final String code,
            @RequestParam(value = "error", required = false) final String error,
            HttpServletRequest request) {

        HttpSession session = request.getSession();
        String frontendUrl = properties.getApp().getFrontendUrl(); // Dynamically fetch from properties

        if (error != null) {
            // Redirect back to frontend login page with an error
            return new RedirectView(frontendUrl+"/?error=" + error);
        }

        if (code == null) {
            return new RedirectView(frontendUrl+"/?error=no_code_provided");
        }

        String token = accessToken.getToken(code);
        String expiresIn = accessToken.getExpiresIn();
        Long expirationTime = System.currentTimeMillis() + Integer.parseInt(expiresIn) * 1000L;

        session.setAttribute("accessToken", token);
        session.setAttribute("expiration_time", expirationTime);

        // Redirect to React's /index page
//        return new RedirectView("http://localhost:9090"+ApiPath.REDIRECT);
        return new RedirectView(frontendUrl+"/index");
    }
}
