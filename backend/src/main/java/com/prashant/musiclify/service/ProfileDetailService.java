package com.prashant.musiclify.service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileDetailService {

	private final RestTemplate restTemplate;
	private static final String URL = "https://api.spotify.com/v1/me";

	public LinkedHashMap getUser(String token) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + token);

		HttpEntity<String> entity = new HttpEntity<>("paramters", headers);

		ResponseEntity<Object> response = restTemplate.exchange(URL, HttpMethod.GET, entity, Object.class);
		LinkedHashMap result = (LinkedHashMap) response.getBody();

		if(result != null)
			result.put("following", getUserTotalFollowing(token));

		return result;
	}

	public String getUsername(String token) {
		LinkedHashMap user = getUser(token);
		return (String) user.get("display_name");
	}

	private int getUserTotalFollowing(String token) {
		String url = "https://api.spotify.com/v1/me/following?type=artist";

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + token);

		ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, new org.springframework.http.HttpEntity<>(headers), Map.class);

		if (response.getBody() != null && response.getBody().containsKey("artists")) {
			Map<String, Object> artistsData = (Map<String, Object>) response.getBody().get("artists");
			if (artistsData.containsKey("total")) {
				return (int) artistsData.get("total"); // Extract total count
			}
		}
		return 0; // Return 0 if not found
	}

}
