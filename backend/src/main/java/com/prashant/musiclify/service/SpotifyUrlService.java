package com.prashant.musiclify.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;

import com.prashant.musiclify.properties.SpotifyAppConfigurationProperties;
import com.prashant.musiclify.utility.CodeChallengeUtility;
import com.prashant.musiclify.utility.CodeVerifierUtility;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Service
@RequiredArgsConstructor
@EnableConfigurationProperties(SpotifyAppConfigurationProperties.class)
public class SpotifyUrlService {

	private final SpotifyAppConfigurationProperties spotifyAppConfigurationProperties;
	private String codeVerifier;

	public String getAuthorizationURL() {
		final var properties = spotifyAppConfigurationProperties.getApp();
		final var codeVerifier = CodeVerifierUtility.generate();
		setCodeVerifier(codeVerifier);
//		System.out.println("Code Verifier is" + codeVerifier);
		return "https://accounts.spotify.com/en/authorize?client_id=" + properties.getClientId()
				+ "&response_type=code&redirect_uri=" + properties.getRedirectUrl()
				+ "&code_challenge_method=S256&code_challenge=" + CodeChallengeUtility.generate(codeVerifier)
				+ "&scope=ugc-image-upload,user-read-playback-state,user-modify-playback-state,user-read-currently-playing,streaming,app-remote-control,user-read-email,user-read-private"
				+ ",playlist-read-collaborative,playlist-modify-public,playlist-read-private,playlist-modify-private,user-library-modify,user-library-read,user-top-read,user-read-playback-position,user-read-recently-played,user-follow-read,user-follow-modify";
	}

}
