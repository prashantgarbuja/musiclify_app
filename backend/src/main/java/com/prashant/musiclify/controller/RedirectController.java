package com.prashant.musiclify.controller;

import com.prashant.musiclify.service.SpotifyUrlService;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;

import com.prashant.musiclify.constant.ApiPath;
import com.prashant.musiclify.service.CurrentPlayingService;
import com.prashant.musiclify.service.ProfileDetailService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@AllArgsConstructor
public class RedirectController {
//
//	private final SpotifyUrlService spotifyUrlService;
//	private final ProfileDetailService userDetails;
//	private final CurrentPlayingService currentPlaying;
//
//	@GetMapping(value = ApiPath.REDIRECT, produces = MediaType.TEXT_HTML_VALUE)
//	public RedirectView redirectToCallbackSuccess(final HttpSession session) {
//		String token = (String) session.getAttribute("accessToken");
//		Long expirationTime = (Long) session.getAttribute("expiration_time");
//
//		if (token == null || !isTokenValid(expirationTime)) {
//			// Redirect to React landing page with an auth URL or error
//			return new RedirectView("http://localhost:8080/?authUrl=" + spotifyUrlService.getAuthorizationURL());
//		}
//
//		// User is authenticated, redirect to React /index
//		return new RedirectView("http://localhost:8080/index");
//	}
//
//	private boolean isTokenValid(Long expirationTime) {
//		return expirationTime != null && System.currentTimeMillis() < expirationTime;
//	}
}
