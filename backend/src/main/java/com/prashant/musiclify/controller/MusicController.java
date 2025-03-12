package com.prashant.musiclify.controller;

import com.prashant.musiclify.service.*;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.prashant.musiclify.constant.ApiPath;
import com.prashant.musiclify.exception.NoAccountDataException;
import com.prashant.musiclify.exception.NoAlbumSavedException;
import com.prashant.musiclify.exception.NoTrackSavedException;

import lombok.AllArgsConstructor;

import java.util.*;

@Controller
@AllArgsConstructor
public class MusicController {

	private final TopTrackService topTrackService;
	private final TopArtistService topArtistService;
	private final SavedTrackService savedTrackService;
	private final SavedAlbumService savedAlbumService;
	private final NewReleasedService newReleasedService;
	private final RecentPlayesTrackService recentPlayedTrackService;
	private final FeaturedPlaylistService featuredPlaylistService;
	private final PlaylistService playlistService;

	@GetMapping(value = ApiPath.TOP_TRACKS, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> getTopTracks(
			@RequestParam(value = "term", defaultValue = "1") Integer term, // 0=short, 1=medium, 2=long
			HttpSession session) {
		String token = (String) session.getAttribute("accessToken");
		if (token == null) {
			return ResponseEntity.status(401).body("Unauthorized: No access token found");
		}

		try {
			Object topTracks = topTrackService.getTopTracks(token, term);
			return ResponseEntity.ok(topTracks);
		} catch (NoAccountDataException e) {
			return ResponseEntity.ok(new HashMap<String, Object>() {{
				put("items", new ArrayList<>());
			}});
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error fetching top tracks: " + e.getMessage());
		}
	}

	@GetMapping(value = ApiPath.TOP_ARTISTS, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> getTopArtists(
			@RequestParam(value = "term", defaultValue = "1") Integer term, // 0=short, 1=medium, 2=long
			HttpSession session) {
		String token = (String) session.getAttribute("accessToken");
		if (token == null) {
			return ResponseEntity.status(401).body("Unauthorized: No access token found");
		}

		try {
			Object topArtists = topArtistService.getTopArtists(token, term);
			return ResponseEntity.ok(topArtists);
		} catch (NoAccountDataException e) {
			return ResponseEntity.ok(new HashMap<String, Object>() {{
				put("items", new ArrayList<>());
			}});
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error fetching top artists: " + e.getMessage());
		}
	}

	@GetMapping(value = ApiPath.RECENT_TRACKS, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> getRecentTracks(HttpSession session) {
		String token = (String) session.getAttribute("accessToken");
		if (token == null) {
			return ResponseEntity.status(401).body("Unauthorized: No access token found");
		}

		try {
			Object recentTracks = recentPlayedTrackService.getHistory(token);
			return ResponseEntity.ok(recentTracks);
		} catch (Exception e) { // Adjust exception type if your service throws a specific one
			return ResponseEntity.ok(new HashMap<String, Object>() {{
				put("items", new ArrayList<>());
			}});
		}
	}

//	@GetMapping(value = ApiPath.SAVED_TRACKS, produces = MediaType.TEXT_HTML_VALUE)
//	public String savedTracksHandler(final HttpSession session, final Model model) {
//		try {
//			model.addAttribute("tracks", savedTrackService.getTracks((String) session.getAttribute("accessToken")));
//		} catch (NoTrackSavedException exception) {
//			return Template.NO_TRACK_SAVED;
//		}
//		return Template.SAVED_TRACKS;
//	}

	@GetMapping(value = ApiPath.LIBRARY, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> getLibrary(HttpSession session) {
		String token = (String) session.getAttribute("accessToken");
		if (token == null) {
			return ResponseEntity.status(401).body("Unauthorized: No access token found");
		}

		try {
			List<Map<String, Object>> libraryItems = new ArrayList<>();

			// Fetch and process playlists
			Map<String, Object> playlistsResponse = (Map<String, Object>) playlistService.getPlaylists(token);
			List<Map<String, Object>> playlistItems = (List<Map<String, Object>>) playlistsResponse.get("items");
			if (playlistItems != null) {
				for (Map<String, Object> playlist : playlistItems) {
					playlist.put("type", "playlist"); // Safe: Map<String, Object> accepts String key/value
					libraryItems.add(playlist);
				}
			}

			// Fetch and process albums
			Map<String, Object> albumsResponse = (Map<String, Object>) savedAlbumService.getAlbums(token);
			List<Map<String, Object>> albumItems = (List<Map<String, Object>>) albumsResponse.get("items");
			if (albumItems != null) {
				for (Map<String, Object> item : albumItems) {
					Map<String, Object> album = (Map<String, Object>) item.get("album");
					album.put("type", "album"); // Safe: Map<String, Object> accepts String key/value
					libraryItems.add(album);
				}
			}

			// Return as { "items": [...] }
			return ResponseEntity.ok(new HashMap<String, Object>() {{
				put("items", libraryItems);
			}});
		} catch (Exception e) {
			return ResponseEntity.ok(new HashMap<String, Object>() {{
				put("items", new ArrayList<>());
			}});
		}
	}

//	@GetMapping(value = ApiPath.SAVED_ALBUMS, produces = MediaType.TEXT_HTML_VALUE)
//	public String savedAlbumsHandler(final HttpSession session, final Model model) {
//		try {
//			model.addAttribute("albums", savedAlbumService.getAlbums((String) session.getAttribute("accessToken")));
//		} catch (NoAlbumSavedException exception) {
//			return Template.NO_ALBUM_SAVED;
//		}
//		return Template.SAVED_ALBUMS;
//	}
//
//	@GetMapping(value = ApiPath.NEW_RELEASE, produces = MediaType.TEXT_HTML_VALUE)
//	public String newReleasesHandler(final HttpSession session, final Model model) {
//		model.addAttribute("releases", newReleasedService.getReleases((String) session.getAttribute("accessToken")));
//		return Template.NEW_RELEASES;
//	}

//	@GetMapping(value = ApiPath.FEATURED_PLAYLIST, produces = MediaType.TEXT_HTML_VALUE)
//	public String featuredPlaylistsHandler(final HttpSession session, final Model model) {
//		model.addAttribute("playlists",
//				featuredPlaylistService.getPlaylists((String) session.getAttribute("accessToken")));
//		return Template.FEATURED_PLAYLISTS;
//	}

}
