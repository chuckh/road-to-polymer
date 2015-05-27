(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  console.log('Road to Polymer 1.0');
  // app.page = 0;
  //app.forumEmbedSrc = 'https://groups.google.com/forum/embed/?place=forum/polymer-dev' + '&showsearch=true&showpopout=true&showtabs=false';
  // app.forumEmbedSrc = "https://groups.google.com/forum/embed/?place=forum/polymer-dev&showsearch=true&showpopout=true&showtabs=false&parenturl=http://chuckh.github.io/road-to-polymer/#!forum/polymer-dev"

  // app.forumEmbedSrc = "https://groups.google.com/forum/embed/?place=forum/polymer-dev#!forum/polymer-dev" + "&showsearch=true&showpopout=true&parenturl=" + encodeURIComponent(window.location.href);
  //app.forumEmbedSrc = "https://groups.google.com/forum/embed/?place=forum/polymer-dev" + "&showsearch=true&showpopout=true&parenturl=" +  encodeURIComponent(window.location.href);
  // encodeURIComponent(window.location.href
  console.log('RTP App url', app.forumEmbedSrc);

  // + '&parenturl=' + 'https://github.com/chuckh/road-to-polymer'; //encodeURIComponent(window.location.href)


  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    console.log('Road to Polymer 1.0 WebComponentsReady!',app.smallScreen); //app.forumEmbedSrc,
    app.appName = 'Road to Polymer 1.0';
    app.page = 0;
    app.showHideButtonLeft = "8px;";
    app.forumEmbedSrc = "https://groups.google.com/forum/embed/?place=forum/polymer-dev&showsearch=true&showpopout=true&showtabs=false&parenturl=" + window.location.href;
    app.async(app.indexResized,1000);
    // document.querySelector('body').removeAttribute('unresolved');
  });

  app.toggleDrawer = function(e) {
    console.log("toggleDrawer: ", app.$.drawer_panel.forceNarrow);
    //app.$.drawer_panel.forceNarrow = true;
    if (app.$.show_hide_button.icon == "chevron-left") {
      app.$.show_hide_button.icon = "chevron-right";
      app.showHideButtonLeft = "8px;"
      app.$.show_hide_button.toggleClass("sidebar-menu",false);
    } else {
      app.$.show_hide_button.icon = "chevron-left";
      app.$.show_hide_button.toggleClass("sidebar-menu",true);
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
      app.$.show_hide_button.toggleClass("sidebar-menu",false);
    }
  };

  app.loadUrl = function(e, detail, sender) {
    // var url = "https://plus.google.com/communities/115626364525706131031";
    var url = sender.attributes['url'].value;
    var win = window.open(url, '_blank');
    win.focus();
    console.log("loadUrl: ", url);
  };

  app.indexResized = function() {
    var windowWidth = 0;
    if (window.innerWidth) {
      windowWidth = window.innerWidth;
    }
    if (windowWidth >= 850) { // medium or larger screen
      app.$.show_hide_button.icon = "chevron-left";
      app.$.show_hide_button.toggleClass("sidebar-menu",true);
    } else {
      app.$.show_hide_button.icon = "chevron-right";
      app.$.show_hide_button.toggleClass("sidebar-menu",false);
      app.showHideButtonLeft = "8px;"
    // app.showHideButtonLeft = "205px;"
    }
    console.log("app.indexResized: ",window.innerWidth);
  };

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers (wrap(document))
})(document);
