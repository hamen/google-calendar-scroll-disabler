var calendar_grid_selector = 'div[role="grid"]';
var body = document.querySelector('body');

var disable_scroll = function () {
    for (var live_selector of document.querySelectorAll(calendar_grid_selector)) {
        live_selector.addEventListener('mousewheel', function (e) {
            if (e.target.id == 'el') return;
            e.preventDefault();
            e.stopPropagation();
        });
    }
};

var mutation_breaks_scroll_blocker = function (mutation) {
    if (mutation.attributeName && mutation.attributeName == 'data-viewfamily') {
        if (body.getAttribute('data-viewfamily') == 'EVENT')
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
calendar_observer.observe(body, {attributes: true});

// Disable scrolling once at startup just in case no mutations occur at page load.
disable_scroll();
