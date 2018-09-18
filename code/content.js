
// Catch all top-level scroll events
window.addEventListener('mousewheel', function(e){
  // In "Schedule" view, there is more than one "rowgroup"
  // In other views, there is only one "rowgroup"
  if (document.querySelectorAll('div[role="rowgroup"]').length < 2)
  {
    // Ignore scoll events for all views except "Schedule" view
    e.preventDefault();
    e.stopPropagation();
  }
}, true);
