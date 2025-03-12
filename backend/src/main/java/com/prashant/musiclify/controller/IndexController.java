package com.prashant.musiclify.controller;

import com.prashant.musiclify.constant.ApiPath;
import com.prashant.musiclify.service.SpotifyUrlService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;

@Controller
@AllArgsConstructor
public class IndexController {

    private final SpotifyUrlService spotifyUrlService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> showIndex(final HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        String token = (String) session.getAttribute("accessToken");
        Long expiration_time = (Long) session.getAttribute("expiration_time");
//        System.out.println("Expiration time:" + expiration_time);

        if (token != null && isTokenValid(expiration_time)) {
//            return "redirect:" + ApiPath.REDIRECT;
            response.put("isAuthenticated", true);
            response.put("redirect", ApiPath.REDIRECT);
            return ResponseEntity.ok(response);
        }
        response.put("isAuthenticated", false);
        response.put("authUrl", spotifyUrlService.getAuthorizationURL());
        return ResponseEntity.ok(response);
    }

    boolean isTokenValid(Long expiration_time) {

        return System.currentTimeMillis() < expiration_time;
    }
}
