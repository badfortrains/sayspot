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
