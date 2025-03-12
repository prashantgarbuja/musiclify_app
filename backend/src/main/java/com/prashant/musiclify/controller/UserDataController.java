package com.prashant.musiclify.controller;

import com.prashant.musiclify.exception.NoTrackPlayingException;
import com.prashant.musiclify.service.CurrentPlayingService;
import com.prashant.musiclify.service.ProfileDetailService;
import com.prashant.musiclify.service.SpotifyUrlService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@AllArgsConstructor
public class UserDataController {

//    private final SpotifyUrlService spotifyUrlService;
    private final ProfileDetailService userDetails;
    private final CurrentPlayingService currentPlaying;

    @GetMapping(value = "/user-data", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> getUserData(HttpSession session) {
        Map<String, Object> response = new HashMap<>();

        String token = (String) session.getAttribute("accessToken");
        Long expirationTime = (Long) session.getAttribute("expiration_time");

        if (token == null || !isTokenValid(expirationTime)) {
            response.put("isAuthenticated", false);
//            response.put("authUrl", spotifyUrlService.getAuthorizationURL());
            return ResponseEntity.ok(response);
        }

        response.put("isAuthenticated", true);
        response.put("accessToken", token);
//        response.put("userName", userDetails.getUsername(token));

        // Fetch full user profile
        Map<String, Object> userProfile = userDetails.getUser(token);
        response.put("user", userProfile);

        try {
            response.put("currentPlaying", currentPlaying.getCurrentPlaying(token));
            response.put("display", 1);
        } catch (NoTrackPlayingException exception) {
            response.put("display", 0);
        }

        return ResponseEntity.ok(response);
    }

    private boolean isTokenValid(Long expirationTime) {
        return expirationTime != null && System.currentTimeMillis() < expirationTime;
    }
}
