// Import styles
require('./style.scss');

// Setup fullpage.js
import fullpage from 'fullpage.js/dist/fullpage.extensions.min'

new fullpage('#fullpage', {
  scrollHorizontally: true,
  verticalCentered: false,
  licenseKey: '2r2oF0TJ-V2mGnzfR-R6EUUmgX-tSZEpvMO',
  sectionSelector: '.fpsection'
});

fullpage_api.setAllowScrolling(true);

// Setup burger menu on mobile devices
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});
