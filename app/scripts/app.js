(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  app.appName = 'Road to Polymer';
  app.showHideButtonLeft = "8px;"
  app.page = 0;
  app.forumEmbedSrc = 'https://groups.google.com/forum/embed/?place=forum/polymer-dev'
  + '&showsearch=true&showpopout=true&showtabs=false';
  // + '&parenturl=' + 'https://github.com/chuckh/road-to-polymer'; //encodeURIComponent(window.location.href)

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function() {
    console.log('Road to Polymer 1.0 is ready to rock!', app.smallScreen); //app.forumEmbedSrc,
  });

  app.toggleDrawer = function(e) {
    // console.log("toggleDrawer: ", app.$.drawer_panel.forceNarrow);
    //app.$.drawer_panel.forceNarrow = true;
    if (app.$.show_hide_button.icon == "chevron-left") {
      app.$.show_hide_button.icon = "chevron-right";
      app.showHideButtonLeft = "5px;"
    } else {
      app.$.show_hide_button.icon = "chevron-left";
      app.showHideButtonLeft = "205px;"
    }
    app.$.drawer_panel.togglePanel();
  };

  app.selectMenu = function(e) {
    console.log("selectMenu: ", app.smallScreen);
    if (app.smallScreen) {
      app.$.drawer_panel.closeDrawer();
      app.$.show_hide_button.icon = "chevron-right"
      app.showHideButtonLeft = "8px;"
    }
  };

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
