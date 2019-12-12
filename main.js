function watchButtons() {
    $('#randomButton').on('click', function() {
        $('.homeScreen').toggleClass('hidden');
        $('.loadingScreen').toggleClass('hidden');
    })
}
function runPage() {
    watchButtons();
    console.log('Page Loaded. Waiting for input.')
}

$(runPage());