package com.prashant.musiclify.controller;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.prashant.musiclify.constant.ApiPath;

@Controller
public class LogoutController {

	@GetMapping(value = ApiPath.LOGOUT, produces = MediaType.TEXT_HTML_VALUE)
	public ResponseEntity<Void> logoutHandler(final HttpSession session) {
		session.invalidate();
		return ResponseEntity.ok().build(); // Respond with 200 OK
	}
}
