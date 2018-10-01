var calendar_main_selector = 'div[role="main"]';
var body = document.querySelector('body');

var mousewheelHander = function (e) {
    if (e.target.id == 'el')
        return;
    e.preventDefault();
    e.stopPropagation();
}

var disable_scroll = function () {
    for (var live_selector of document.querySelectorAll(calendar_main_selector)) {
        // Remove the event handler before adding a new one to make sure
        // we don't have multiple event handlers registered.
        live_selector.removeEventListener('mousewheel', mousewheelHander, true);
        live_selector.addEventListener('mousewheel', mousewheelHander, true);
    }
};

var calendar_observer = new MutationObserver(function (mutations) {
    // A change on the webpage may replace the "main" div, so we need to
    // re-register the event handler.
    disable_scroll();
});
calendar_observer.observe(body, {attributes: true});

// Disable scrolling once at startup just in case no mutations occur at page load.
disable_scroll();
