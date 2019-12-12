const baseURL = 'https://api.adviceslip.com/advice'


function APIRandomAdvice(searchURL) {
    fetch (searchURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayAdvice(responseJson))
        .catch(err => {
            console.log(`something went wrong: ${err.message}`);
        });
}
function displayAdvice(responseJson) {
    console.log(responseJson);
    $('.adviceText').text(`"${responseJson.slip.advice}`);
    $('.loadingScreen').toggleClass('hidden');
    $('.resultsScreen').toggleClass('hidden');
}


function getAdviceButton() {
    $('form').submit(function(event) {
        console.log('getAdviceButton pressed')
        event.preventDefault();
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
    getAdviceButton();
    restartButton();
}
function runPage() {
    watchButtons();
    console.log('Page Loaded. Waiting for input.')
}

$(runPage());