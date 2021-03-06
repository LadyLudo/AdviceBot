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
    const audio = $('#audio');
    audio.attr("src",response.url).get(0).play();
    $('.botImage').addClass("pulse animated");
    audio.on('ended', function() {
        $('.botImage').removeClass("pulse animated");
    });
}
function displayRandomAdvice(responseJson) {
    getAudio(responseJson.slip.advice);
    const advice = responseJson.slip.advice;
    $('.adviceText').text(`"${advice}"`);
    $('.loadingScreen').toggleClass('hidden');
    $('.resultsScreen').toggleClass('hidden');
}
function displaySpecificAdvice(responseJson) {
    let i = Math.round(Math.random() * responseJson.slips.length);
    getAudio(responseJson.slips[i].advice);
    $('.adviceText').text(`"${responseJson.slips[i].advice}"`);
    $('.loadingScreen').toggleClass('hidden');
    $('.resultsScreen').toggleClass('hidden');
}
function getAudio(adviceText) {
    const audioAPIKey = "0f83c0855aea400a911ad0f1cc4da7fd";
    const audioURL = `https://api.voicerss.org/?key=${audioAPIKey}&hl=en-ca&src=${adviceText}`;
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
function errorRestartButton() {
    $('#errorRestartButton').on('click', function() {
        $('.errorScreen').toggleClass('hidden');
        $('.homeScreen').toggleClass('hidden');
    })
}
function specificAdviceButton() {
    $('form').submit(function(event) {
        event.preventDefault();
        const query = $('input[name=category]').val();
        const searchURL = baseURL + '/search/' + query;
        APISpecificAdvice(searchURL);
        $('.specificScreen').toggleClass('hidden');
        $('.loadingScreen').toggleClass('hidden');
        }
    )
}
function randomButton() {
    $('#randomButton').on('click', function() {
        APIRandomAdvice(baseURL);
        $('.homeScreen').toggleClass('hidden');
        $('.loadingScreen').toggleClass('hidden');
    })
}
function restartButton() {
    $('#restartButton').on('click', function (){
        $('.botImage').removeClass("pulse animated");
        $('.resultsScreen').toggleClass('hidden');
        $('.homeScreen').toggleClass('hidden');
    })
}
function specificButton() {
    $('#specificButton').on('click', function() {
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
}
$(runPage());