package com.prashant.musiclify.service;

import java.util.LinkedHashMap;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecentPlayesTrackService {

	private final RestTemplate restTemplate;
	private static final String URL = "https://api.spotify.com/v1/me/player/recently-played?limit=5";

	public Object getHistory(String token) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + token);

		HttpEntity<String> entity = new HttpEntity<>("paramters", headers);

		ResponseEntity<Object> response = restTemplate.exchange(URL, HttpMethod.GET, entity, Object.class);
		LinkedHashMap result = (LinkedHashMap) response.getBody();

		return result;
	}
}
