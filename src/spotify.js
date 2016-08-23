/* @flow */

function getSearch(query: string){
  var url = 'https://api.spotify.com/v1/search';
  url += `?q=${query}&type=track,artist,album&market=US`
  console.log('get search',url)
  return fetch(url).then((res) => res.json())
}

function getEditDistance(a, b){
  console.log('start edit', a, b)
  if(a.length == 0) return b.length;
  if(b.length == 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  console.log('end distance')
  return matrix[b.length][a.length];
};

export type ImageType = {
  height: number,
  width: number,
  url: string
};

export type Track = {
  album: Album,
  artists: Array<Artist>,
  available_markets: Array<string>,
  disc_number: number,
  duration_ms: number,
  explicit: boolean,
  id: string,
  name: string,
  popularity: string,
  track_number: number
}

export type Album = {
  album_type: "album" | "single" | "compilation",
  available_markets: Array<string>,
  id: string,
  images: Array<ImageType>,
  name: string
}

export type PageingRes<T> = {
  items: Array<T>,
  limit: number,
  next: string,
  offset: number,
  previous: string,
  total: number
}

export type Artist = {
  id: string,
  images: Array<ImageType>,
  name: string,
  popularity: number
}

export type FullArtist = {
  artist: Artist,
  albums: PageingRes<Album>,
  topTracks: Array<Track>
}

export function getArtist(artist: string) : Promise<FullArtist> {
  const artistUrl = `https://api.spotify.com/v1/artists/${artist}`;
  const atistTrackUrl = `https://api.spotify.com/v1/artists/${artist}/top-tracks?country=US`;
  const artistAlbums = `https://api.spotify.com/v1/artists/${artist}/albums?market=US`;

  return Promise.all([
    fetch(artistUrl).then(res => res.json()),
    fetch(atistTrackUrl).then(res => res.json()),
    fetch(artistAlbums).then(res => res.json())
  ]).then(([artist, tracks, albums]) => ({
    artist: artist,
    topTracks: tracks,
    albums: albums
  }));
}

export function getAlbumTracks(album : {id: string}) : Object{
  var url = `https://api.spotify.com/v1/albums/${album.id}?market=US`
  console.log(url)
  return fetch(url).then((res) => res.json())
}

export function getArtistTracks(artist : {id: string}): Object{
  var url = `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?country=US`
  console.log(url)
  return fetch(url).then((res) => res.json())
}

export function getBest(query: string) {
  return getSearch(query).then((res) => {
    console.log('got search',res)
    var artist = res.artists.items[0];
    var album = res.albums.items[0];
    var track = res.tracks.items[0];

    var artistDistance = artist ? getEditDistance(artist.name, query) : 900;
    var albumDistance = album ? getEditDistance(album.name, query) : 900;
    var trackDistance = track ? getEditDistance(track.name, query) : 900;

    console.log('got distanes')

    if (artistDistance <= albumDistance && artistDistance <= trackDistance) {
      console.log('get artists')
      return getArtistTracks(artist);
    } else if(albumDistance <= artistDistance && albumDistance <= trackDistance) {
      console.log('get albums')
      return getAlbumTracks(album);
    } else if(trackDistance <= artistDistance && trackDistance <= albumDistance) {
      console.log('get artists')
      return Promise.resolve({tracks: [track]});
    }

  })
}
