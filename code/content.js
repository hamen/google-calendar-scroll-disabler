// Wait for the first part of the page to load
$(document).ready(function () {

    // Wait for the rest of the fancy dynamic stuff to load.
    // 5 seconds should be enough.
    setTimeout(function () {

        // Get a handle on the calendar grid
        $('div[role="grid"]').on('mousewheel', function (e) {
            
            // Scrolling.... hahhahahaha I don't think so
            if (e.target.id == 'el') return;
            e.preventDefault();
            e.stopPropagation();
        });
    }, 5000);
});
