import fullpage from 'fullpage.js/dist/fullpage.extensions.min'

new fullpage('#fullpage', {
  scrollHorizontally: true,
  licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
  sectionSelector: '.fpsection'
});

fullpage_api.setAllowScrolling(true);
