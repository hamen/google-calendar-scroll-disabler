var calendar_grid_selector = 'div[role="grid"]';
var body = document.querySelector('body');
var calendar_grid = document.querySelectorAll(calendar_grid_selector);

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
        if (!mutation_breaks_scroll_blocker(mutation)) {
            disable_scroll();
        }
    });
});

var observe_if_calendar_available = function () {
    if (!calendar_grid) {
        window.setTimeout(observe_if_calendar_available, 500);
        return;
    }
    calendar_observer.observe(body, {attributes: true});
};

observe_if_calendar_available();
