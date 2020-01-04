const baseURL = 'https://api.adviceslip.com/advice'


function APIRandomAdvice(searchURL) {
    fetch (searchURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayRandomAdvice(responseJson))
        .catch(err => {
            console.log(`something went wrong: ${err.message}`);
        });

}
function APISpecificAdvice(searchURL) {
    fetch (searchURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displaySpecificAdvice(responseJson))
        .catch(function displayErrorMessage() {
            $('.errorMessage').text("Sorry, I don't have advice on that topic. Try another.");
            $('.loadingScreen').toggleClass('hidden');
            $('.errorScreen').toggleClass('hidden');
        });

}
function displayAudio(response) {
    console.log(response);
    $('#audio').attr("src",response.url).get(0).play();
}
function displayRandomAdvice(responseJson) {
    console.log(responseJson);
    getVideos(responseJson.slip.advice);
    getAudio(responseJson.slip.advice);
    let advice = responseJson.slip.advice;
    $('.adviceText').text(`"${advice}"`);
    $('.loadingScreen').toggleClass('hidden');
    $('.resultsScreen').toggleClass('hidden');
}
function displaySpecificAdvice(responseJson) {
    console.log(responseJson);
    let i = Math.round(Math.random() * responseJson.slips.length);
    getVideos(responseJson.slips[i].advice);
    getAudio(responseJson.slips[i].advice);
    $('.adviceText').text(`"${responseJson.slips[i].advice}"`);
    $('.loadingScreen').toggleClass('hidden');
    $('.resultsScreen').toggleClass('hidden');
}
function displayVideos(responseJson) {
    console.log(responseJson);
    for (let i=0; i<responseJson.items.length; i++) {
        $(`#thumb${i}`).prop('src', responseJson.items[i].snippet.thumbnails.high.url);
        $(`#title${i}`).text(decodeURIComponent(responseJson.items[i].snippet.title).replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
        $(`#description${i}`).text(responseJson.items[i].snippet.description)
    }
}
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${key}=${params[key]}`);
    return queryItems.join('&');
}
function getAudio(adviceText) {
    let audioAPIKey = "0f83c0855aea400a911ad0f1cc4da7fd";
    let audioURL = `https://api.voicerss.org/?key=${audioAPIKey}&hl=en-ca&src=${adviceText}`;
    fetch (audioURL)
        .then(response => {
            if (response.ok) {
                return response;
            }
            throw new Error(response.statusText);
        })
        .then(response => displayAudio(response))
        .catch(err => {
        console.log(`something went wrong with audio: ${err.message}`);
    });

}
function getVideos(adviceText) {
    $('.videoErrorMessage').empty();
    let url= 'https://www.googleapis.com/youtube/v3/search';
    let searchTerm = encodeURI(adviceText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
    let params = {
        part: 'snippet',
        key: 'AIzaSyBrC317ICJQKMjYSFMJB6KKyuztjqIQ1t4',
        q: searchTerm,
        maxResults: 3,
        type: 'video',
        order: 'Relevance',
    };
    let querystring = formatQueryParams(params);
    let searchURL = url + '?' + querystring;
    console.log(searchURL);
    fetch (searchURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayVideos(responseJson));
        /*.catch(function displayVideoErrorMessage() {
            $('.videoErrorMessage').text("Sorry, I was unable to find videos about that advice.");
        }*/
}

function errorRestartButton() {
    $('#errorRestartButton').on('click', function() {
        console.log('errorRestartButton pressed');
        $('.errorScreen').toggleClass('hidden');
        $('.homeScreen').toggleClass('hidden');
    })
}
function specificAdviceButton() {
    $('form').submit(function(event) {
        console.log('getAdviceButton pressed')
        event.preventDefault();
        let query = $('input[name=category]').val();
        let searchURL = baseURL + '/search/' + query;
        APISpecificAdvice(searchURL);
        $('.specificScreen').toggleClass('hidden');
        $('.loadingScreen').toggleClass('hidden');
        }
    )
}
function randomButton() {
    $('#randomButton').on('click', function() {
        APIRandomAdvice(baseURL);
        console.log('randomButton pressed');
        $('.homeScreen').toggleClass('hidden');
        $('.loadingScreen').toggleClass('hidden');
    })
}
function restartButton() {
    $('#restartButton').on('click', function (){
        console.log('restartButton pressed');
        $('.resultsScreen').toggleClass('hidden');
        $('.homeScreen').toggleClass('hidden');
    })
}
function specificButton() {
    $('#specificButton').on('click', function() {
        console.log('specificButton pressed');
        $('.homeScreen').toggleClass('hidden');
        $('.specificScreen').toggleClass('hidden');
    })
}


function watchButtons() {
    randomButton();
    specificButton();
    specificAdviceButton();
    restartButton();
    errorRestartButton();
}
function runPage() {
    watchButtons();
    console.log('Page Loaded. Waiting for input.')
}

$(runPage());