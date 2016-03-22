$('#gridcontainer').on({
    'mousewheel': function(e) {
        if (e.target.id == 'el') return;
        e.preventDefault();
        e.stopPropagation();
    }
});

$('#mainbody').css("padding-top","0");
$('#gridcontainer').css("margin-top","9px");
$('body').css("overflow","hidden");