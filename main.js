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