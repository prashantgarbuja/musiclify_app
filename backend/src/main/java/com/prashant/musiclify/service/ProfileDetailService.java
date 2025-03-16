package com.prashant.musiclify.service;

import java.util.*;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prashant.musiclify.exception.NoAccountDataException;
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
	private final TopArtistService topArtistService;
	private static final String URL = "https://api.spotify.com/v1/me";

	public LinkedHashMap getUser(String token) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + token);

		HttpEntity<String> entity = new HttpEntity<>("paramters", headers);

		ResponseEntity<Object> response = restTemplate.exchange(URL, HttpMethod.GET, entity, Object.class);
		LinkedHashMap result = (LinkedHashMap) response.getBody();

		if(result != null)
			result.put("following", getUserTotalFollowing(token));

		List<String> topGenres = getTopGenres(token);
		result.put("topGenres", topGenres);

		return result;
	}

	private List<String> getTopGenres(String token) {

		ObjectMapper mapper = new ObjectMapper();
		// Fetch top artists data
		Object response = topArtistService.getTopArtists(token, 2);

		// Return empty list if response is null
		if (response == null) {
			return Collections.emptyList();
		}

		try {
			// Convert Object to JsonNode
			JsonNode jsonResponse = mapper.valueToTree(response);

			// Check if the response has the expected structure
			if (!jsonResponse.has("items") || !jsonResponse.get("items").isArray()) {
				return Collections.emptyList();
			}

			// Map to count genre occurrences
			Map<String, Integer> genreCount = new HashMap<>();

			// Process each artist
			JsonNode items = jsonResponse.get("items");
			for (int i = 0; i < items.size(); i++) {
				JsonNode artist = items.get(i);

				// Process genres only if the artist has them
				if (artist.has("genres") && artist.get("genres").isArray()) {
					JsonNode genres = artist.get("genres");

					for (int j = 0; j < genres.size(); j++) {
						String genreName = genres.get(j).asText().trim();
						if (!genreName.isEmpty()) {
							genreCount.put(genreName, genreCount.getOrDefault(genreName, 0) + 1);
						}
					}
				}
			}

			// Sort by frequency and get top genres
			List<String> sortedGenres = genreCount.entrySet()
					.stream()
					.sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
					.map(Map.Entry::getKey)
					.limit(5) // Limit to 5 results directly in the stream
					.collect(Collectors.toList());

			System.out.println("Sorted Genres:"+sortedGenres);
			return sortedGenres; // This list will have at most 5 elements
		} catch (Exception e) {
			// Log the exception for debugging
			System.err.println("Error processing top genres: " + e.getMessage());
			return Collections.emptyList(); // Return empty list on any error
		}
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
