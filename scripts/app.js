!function(a){var b=a.querySelector("#app");console.log("Road to Polymer 1.0"),window.addEventListener("WebComponentsReady",function(){console.log("Road to Polymer 1.0 WebComponentsReady!",b.smallScreen),b.appName="Road to Polymer 1.0",b.page=0,b.showHideButtonLeft="8px;",b.forumEmbedSrc="https://groups.google.com/forum/embed/?place=forum/polymer-dev&showsearch=true&showpopout=true&showtabs=false&parenturl="+window.location.href,b.async(b.indexResized,1e3),a.querySelector("body").removeAttribute("unresolved")}),b.toggleDrawer=function(){console.log("toggleDrawer: ",b.$.drawer_panel.forceNarrow),"chevron-left"===b.$.show_hide_button.icon?(b.$.show_hide_button.icon="chevron-right",b.showHideButtonLeft="8px;",b.$.show_hide_button.toggleClass("sidebar-menu",!1)):(b.$.show_hide_button.icon="chevron-left",b.$.show_hide_button.toggleClass("sidebar-menu",!0),b.showHideButtonLeft="205px;"),b.$.drawer_panel.togglePanel()},b.selectMenu=function(){console.log("selectMenu: ",b.smallScreen),b.smallScreen&&(b.$.drawer_panel.closeDrawer(),b.$.show_hide_button.icon="chevron-right",b.showHideButtonLeft="8px;",b.$.show_hide_button.toggleClass("sidebar-menu",!1))},b.loadUrl=function(a,b,c){var d=c.attributes.url.value,e=window.open(d,"_blank");e.focus(),console.log("loadUrl: ",d)},b.indexResized=function(){var a=0;window.innerWidth&&(a=window.innerWidth),a>=850?(b.$.show_hide_button.icon="chevron-left",b.$.show_hide_button.toggleClass("sidebar-menu",!0)):(b.$.show_hide_button.icon="chevron-right",b.$.show_hide_button.toggleClass("sidebar-menu",!1),b.showHideButtonLeft="8px;"),console.log("app.indexResized: ",window.innerWidth)}}(document);