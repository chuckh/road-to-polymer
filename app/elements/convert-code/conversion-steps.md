#Road to Polymer (RTP) convert-code steps

##Convert-code
1. Load http://chuckh.github.io/road-to-polymer/convert-code.html
2. Copy custom-element code and paste into "Paste your 0.5 code here" OR
click Choose File and select local file to convert.
3. Review convert code
4. Save converted code to file OR click copy icon to copy to clipbard

##Edit converted code
1. Add `<link rel="import" href="../iron-flex-layout/iron-flex-layout.html">` if using layout attributes
2. Update imports
2. Move style tags to <dom-module> from <template>
3. Move style import such as `<link rel="stylesheet" href="convert-code.css">` <dom-module> from <template>
3. Remove {{}} from on-click, on-tap, on-xxx, others. In Atom editor use {{(.*?)}} to find and $1 using Regex option
1. Fix Flex css classes
1. Fix other css classes as need
1. Add span wrappers for bindings `<span>{{}}</span>`
1. Update



### cleanup `iron-ajax` was core-ajax
1. response -> last-response
1. on-core-reponse -> on-repsone   remove {{}}
1. on-core-error -> on-error   remove {{}}
1. handleAs -> handle-as
1. contentType -> content-type
1. remove loading and progress  

<core-ajax id="get_code5_ajax"
      url="https://api.github.com/repos/{{owner}}/{{repoName}}/contents/{{repoName}}.html?ref=master",
      params='{"access_token": "xxx"}'
      handleAs="json"
      loading="{{loading5}}"
      progress="{{progress5}}"
      response="{{code5Data}}"
      on-core-response="{{handleCode5Response}}"
      on-core-error="{{handleCode5ErrorResponse}}">
    </core-ajax>


### mixin to Behaviors
Polymer(Polymer.mixin({ to Polymer({
}, window.convertMixin)); to blank remove


### cleanup iron-media-query


### convert  to paper-dialog


### transition="core-transition-center"
