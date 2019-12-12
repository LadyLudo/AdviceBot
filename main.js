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
        .catch(err => {
            console.log(`something went wrong: ${err.message}`);
        });
}
function displayRandomAdvice(responseJson) {
    console.log(responseJson);
    $('.adviceText').text(`"${responseJson.slip.advice}`);
    $('.loadingScreen').toggleClass('hidden');
    $('.resultsScreen').toggleClass('hidden');
}
function displaySpecificAdvice(responseJson) {
    console.log(responseJson);
    $('.adviceText').text(`"${responseJson.slips[0].advice}`);
    $('.loadingScreen').toggleClass('hidden');
    $('.resultsScreen').toggleClass('hidden');
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
function replayButton() {

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
}
function runPage() {
    watchButtons();
    console.log('Page Loaded. Waiting for input.')
}

$(runPage());