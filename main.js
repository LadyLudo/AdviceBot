const baseURL = 'https://api.adviceslip.com/advice'


function APIRandomAdvice() {
    fetch (baseURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => console.log(responseJson))
        .catch(err => {
            console.log(`something went wrong: ${err.message}`);
        });

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
        APIRandomAdvice();
        console.log('randomButton pressed');
        $('.homeScreen').toggleClass('hidden');
        $('.loadingScreen').toggleClass('hidden');
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
}
function runPage() {
    watchButtons();
    console.log('Page Loaded. Waiting for input.')
}

$(runPage());