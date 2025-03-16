export interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
  popularity: number;
  followers?: { total: number };
}

export interface Track {
  id: string;
  name: string; 
  artists: { name: string; id: string }[];
  album: {
    name: string;
    images: { url: string }[]; 
  };
  duration_ms: number; // number in ms instead of string
  popularity?: number; // Replaces playCount (Spotify uses popularity, not exact play count)
  isPlaying?: boolean; // Optional, for UI state (not from API)
}

// Represents a recently played track from /me/player/recently-played
export interface RecentTrack extends Track {
  played_at: string; // Replaces playedAt (Spotify uses snake_case)
}

// Represents a playlist from /me/playlists
export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  tracks: { total: number };
  owner: {
    display_name: string;
    id: string;
  };
}

//dummy user profile details - do not remove this, I'm using this as default value if non exist.
export const userProfile = {
  username: "music_lover",
  displayName: "Music Enthusiast",
  profileImage: "https://i.pravatar.cc/150?img=68",
  followers: 245,
  following: 178,
  topGenres: ["Indie Rock", "Electronic", "Hip Hop", "Alternative", "Pop"],
  listeningTime: {
    daily: "2.5 hours",
    weekly: "17.3 hours",
    monthly: "73.8 hours",
  },
};

export const personalityTraits = [
  { trait: "Explorer", score: 85, description: "You love discovering new music and artists." },
  { trait: "Enthusiast", score: 92, description: "You're passionate about your favorite genres." },
  { trait: "Diverse", score: 78, description: "Your taste spans multiple genres and eras." },
  { trait: "Consistent", score: 65, description: "You have a core set of favorites you return to." },
  { trait: "Social", score: 70, description: "You enjoy sharing music with others." },
];

// export const topArtists: Artist[] = [
//   {
//     id: "1",
//     name: "Arctic Monkeys",
//     image: "https://i.scdn.co/image/ab6761610000e5eb7da39dea0a72f581535fb11f",
//     genres: ["indie rock", "rock"],
//     popularity: 92,
//   },
//   {
//     id: "2",
//     name: "Daft Punk",
//     image: "https://i.scdn.co/image/ab6761610000e5eb10c60f7a75bc044aeeb06759",
//     genres: ["electronic", "french house"],
//     popularity: 89,
//   },
//   {
//     id: "3",
//     name: "Kendrick Lamar",
//     image: "https://i.scdn.co/image/ab6761610000e5eb437b9e2a82505b3d93ff1022",
//     genres: ["conscious hip hop", "hip hop", "rap"],
//     popularity: 96,
//   },
//   {
//     id: "4",
//     name: "Billie Eilish",
//     image: "https://i.scdn.co/image/ab6761610000e5ebeddb7761e2d4b3ebe30bc5b4",
//     genres: ["pop", "electropop"],
//     popularity: 98,
//   },
//   {
//     id: "5",
//     name: "The Weeknd",
//     image: "https://i.scdn.co/image/ab6761610000e5ebf5c9cb7c03d1e4e5226fc232",
//     genres: ["canadian contemporary r&b", "pop"],
//     popularity: 99,
//   },
//   {
//     id: "6",
//     name: "Radiohead",
//     image: "https://i.scdn.co/image/ab6761610000e5eba03696716c9ee605006047fd",
//     genres: ["art rock", "permanent wave", "rock"],
//     popularity: 87,
//   },
// ];

// export const topTracks: Track[] = [
//   {
//     id: "1",
//     title: "Do I Wanna Know?",
//     artist: "Arctic Monkeys",
//     album: "AM",
//     albumCover: "https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163",
//     duration: "4:32",
//     playCount: 1234567,
//   },
//   {
//     id: "2",
//     title: "Get Lucky",
//     artist: "Daft Punk, Pharrell Williams",
//     album: "Random Access Memories",
//     albumCover: "https://i.scdn.co/image/ab67616d0000b2739b9586a907f0f6c8a707626d",
//     duration: "6:07",
//     playCount: 2345678,
//     isPlaying: true,
//   },
//   {
//     id: "3",
//     title: "HUMBLE.",
//     artist: "Kendrick Lamar",
//     album: "DAMN.",
//     albumCover: "https://i.scdn.co/image/ab67616d0000b273955a038432bb32f770d30ef5",
//     duration: "2:57",
//     playCount: 3456789,
//   },
//   {
//     id: "4",
//     title: "bad guy",
//     artist: "Billie Eilish",
//     album: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
//     albumCover: "https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce",
//     duration: "3:14",
//     playCount: 4567890,
//   },
//   {
//     id: "5",
//     title: "Blinding Lights",
//     artist: "The Weeknd",
//     album: "After Hours",
//     albumCover: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
//     duration: "3:20",
//     playCount: 5678901,
//   },
// ];

// export const recentlyPlayed: RecentTrack[] = [
//   {
//     id: "1",
//     title: "Everything In Its Right Place",
//     artist: "Radiohead",
//     album: "Kid A",
//     albumCover: "https://i.scdn.co/image/ab67616d0000b273de3c04b5fc750b68899b20a9",
//     duration: "4:11",
//     playCount: 123456,
//     playedAt: "Today, 1:30 PM",
//   },
//   {
//     id: "2",
//     title: "Levitating",
//     artist: "Dua Lipa",
//     album: "Future Nostalgia",
//     albumCover: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946",
//     duration: "3:23",
//     playCount: 234567,
//     playedAt: "Today, 12:45 PM",
//   },
//   {
//     id: "3",
//     title: "Bohemian Rhapsody",
//     artist: "Queen",
//     album: "A Night At The Opera",
//     albumCover: "https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b",
//     duration: "5:55",
//     playCount: 345678,
//     playedAt: "Yesterday, 8:20 PM",
//   },
//   {
//     id: "4",
//     title: "Redbone",
//     artist: "Childish Gambino",
//     album: "Awaken, My Love!",
//     albumCover: "https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699",
//     duration: "5:27",
//     playCount: 456789,
//     playedAt: "Yesterday, 7:15 PM",
//   },
//   {
//     id: "5",
//     title: "Stairway to Heaven",
//     artist: "Led Zeppelin",
//     album: "Led Zeppelin IV",
//     albumCover: "https://i.scdn.co/image/ab67616d0000b27351c02a77d09dfcd53c8676d0",
//     duration: "8:02",
//     playCount: 567890,
//     playedAt: "2 days ago, 6:30 PM",
//   },
// ];

// export const featuredPlaylists: Playlist[] = [
//   {
//     id: "1",
//     name: "Today's Top Hits",
//     description: "The most popular tracks right now",
//     coverImage: "https://i.scdn.co/image/ab67706f00000002c2f1efa9ee9863a150b1d932",
//     trackCount: 50,
//     owner: "Spotify",
//   },
//   {
//     id: "2",
//     name: "Chill Vibes",
//     description: "Mellow songs to help you relax",
//     coverImage: "https://i.scdn.co/image/ab67706f000000024e504d303b521ca782b360dc",
//     trackCount: 75,
//     owner: "Spotify",
//   },
//   {
//     id: "3",
//     name: "Rock Classics",
//     description: "Rock legends & epic songs",
//     coverImage: "https://i.scdn.co/image/ab67706f000000025e0cbc33cfc4345d9f1a06b5",
//     trackCount: 100,
//     owner: "Spotify",
//   },
//   {
//     id: "4",
//     name: "Discover Weekly",
//     description: "Your weekly mixtape of fresh music",
//     coverImage: "https://i.scdn.co/image/ab67706f00000002fe4b3f829013414122a3b9d2",
//     trackCount: 30,
//     owner: "Spotify",
//   },
// ];

// export const newReleases = [
//   {
//     id: "1",
//     name: "New Album Release",
//     artist: "Popular Artist",
//     coverImage: "https://i.scdn.co/image/ab67616d0000b2736feb6d9ed7891f40e9a524dd",
//     releaseDate: "2023-05-15",
//   },
//   {
//     id: "2",
//     name: "Single Release",
//     artist: "Upcoming Artist",
//     coverImage: "https://i.scdn.co/image/ab67616d0000b273b65a9aa77a7a94a968eb4ce4",
//     releaseDate: "2023-05-10",
//   },
//   {
//     id: "3",
//     name: "EP Release",
//     artist: "Indie Band",
//     coverImage: "https://i.scdn.co/image/ab67616d0000b2733e93d25b7edb3dbc22819228",
//     releaseDate: "2023-05-08",
//   },
// ];
