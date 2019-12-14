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

function displayRandomAdvice(responseJson) {
    console.log(responseJson);
    getVideos(responseJson.slip.advice);
    $('.adviceText').text(`"${responseJson.slip.advice}"`);
    $('.loadingScreen').toggleClass('hidden');
    $('.resultsScreen').toggleClass('hidden');
}
function displaySpecificAdvice(responseJson) {
    console.log(responseJson);
    let i = Math.round(Math.random() * responseJson.slips.length);
    getVideos(responseJson.slips[i].advice);
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
        .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
}
function getVideos(adviceText) {
    $('.videoErrorMessage').empty();
    let url= 'https://www.googleapis.com/youtube/v3/search';
    let searchTerm = encodeURI(adviceText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""));
    let params = {
        part: 'snippet',
        key: 'AIzaSyAaNQoJ4Ns-TAIBQ5ksksOy4gnbTW3k1CM',
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