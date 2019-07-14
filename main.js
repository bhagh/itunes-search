let song
let searchAttribute

const searchButton = document.querySelector('#search')

//shorthand functions
function q (sel) {
    return document.querySelector(sel)
}
  
function qs (sel) {
    return document.querySelectorAll(sel)
}

//loop through each query result and display the information
function songNode (song) {
    const songDiv = document.createElement('div')
    songDiv.classList.add('card')
    songDiv.innerHTML = `
    <img src="${song.artworkUrl100}">
    <h3 class="wrapping">${song.trackName}</h3>
    <p>Album: ${song.collectionName}</p>
    <button class="sample-song" data-url="${song.previewUrl}">▶︎</button>
    `
    return songDiv
  }


//get song the user wants to listen to, and put it into the audio player
function getSong (songpreviewUrl) {
        const url = songpreviewUrl
        console.log(url)
        const mediaPlayer = q("#mediaplayer");
        mediaPlayer.src = songpreviewUrl
    
  }


//listen for button clicks, starting with the play sample button, followed by the submit button
document.addEventListener('DOMContentLoaded', function () {
    q('#song-list').addEventListener('click', function (event) {
      console.log(event.target)
      if (event.target && event.target.matches('button.sample-song')) {
        getSong(event.target.dataset['url'])
      }
    })

    q('form').addEventListener('submit', function (event) {
        event.preventDefault()
        const searchTerm = q('#search-name').value

        if (document.getElementById('artist').checked) {
          searchAttribute = document.getElementById('artist').value;
        } else if (document.getElementById('song').checked) {
          searchAttribute = document.getElementById('song').value;
        } else if (document.getElementById('album').checked) {
          searchAttribute = document.getElementById('album').value;
        } else {
          searchAttribute = "";
        }

        const cleanName = encodeURIComponent(searchTerm);
        const url = `https://itunes-api-proxy.glitch.me/search?term=${cleanName}&entity=song${searchAttribute}`
    
        const resultsDiv = q('#song-list')
    
        fetch(url)
          .then(response => response.json())
          .then(function (data) {
            console.log (data)
            resultsDiv.innerHTML = ''
            const songList = document.querySelector('#song-list');

            for (let song of data.results){
                resultsDiv.appendChild(songNode(song))
            }
          })
      })
    })


