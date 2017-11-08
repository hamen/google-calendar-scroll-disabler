var calendar_grid = document.querySelector('div[role="grid"]');
var body = document.querySelector('body');

var disable_scroll = function () {
// Get a handle on the calendar grid
    $('div[role="grid"]').on('mousewheel', function (e) {

        // Scrolling.... hahhahahaha I don't think so
        if (e.target.id == 'el') return;
        e.preventDefault();
        e.stopPropagation();
    });
};

var mutation_breaks_scroll_blocker = function (mutation) {
    if (mutation.attributeName && mutation.attributeName == 'data-viewfamily') {
        if ($('body').attr('data-viewfamily') == 'EVENT')
            return true;
    }
};


var calendar_observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation_breaks_scroll_blocker(mutation)) {
            disable_scroll();
        }
    });
});


// Wait for the first part of the page to load
$(document).ready(function () {
    if (!calendar_grid) {
        window.setTimeout(observe_if_calendar_available, 500);
        return;
    }

    // start observer
    calendar_observer.observe(body, {attributes: true});
});