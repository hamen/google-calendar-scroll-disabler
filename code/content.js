var body = document.querySelector('body');
var calendar_grid_selector = 'div[role="grid"]';
var calendar_grid = document.querySelectorAll(calendar_grid_selector);
var element_to_observe = document.querySelector('div[class="BXL82c"]');

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
    return (mutation.attributeName && mutation.attributeName == 'data-viewfamily' && body.getAttribute('data-viewfamily') == 'EVENT');
};

var overlay_observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (!mutation_breaks_scroll_blocker(mutation)) {
            disable_scroll();
        }
    });
});

var calendar_observer = new MutationObserver(function (mutations) {
    disable_scroll();
});

var observe_if_calendar_available = function () {
    if (!calendar_grid) {
        window.setTimeout(observe_if_calendar_available, 500);
        return;
    }
    overlay_observer.observe(body, {attributes: true});
    calendar_observer.observe(element_to_observe, {childList: true});
};

observe_if_calendar_available();
