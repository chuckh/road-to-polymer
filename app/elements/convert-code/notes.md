#Road to Polymer (RTP) convert-code steps

##Convert-code
1. Load http://chuckh.github.io/road-to-polymer/convert-code.html
2. Copy custom-element code and paste into "Paste your 0.5 code here" OR
click Choose File and select local file to convert.
3. Review convert code
4. Save converted code to file OR click copy icon to copy to clipbard

##Edit converted code
1. Add <link rel="import" href="../iron-flex-layout/iron-flex-layout.html"> if using layout attributes
2. Move style tags to <dom-module> from <template>
3. Move style import such as `<link rel="stylesheet" href="convert-code.css">` <dom-module> from <template>
3  Remove {{}} from on-click, on-tap, on-xxx, others.



### cleanup `iron-ajax` was core-ajax
response -> last-response
on-core-reponse -> on-repsone   remove {{}}
on-core-error -> on-error   remove {{}}
handleAs -> handle-as  

<core-ajax id="get_code5_ajax"
      url="https://api.github.com/repos/{{owner}}/{{repoName}}/contents/{{repoName}}.html?ref=master",
      params='{"access_token": "d71d11c7725375ee53e649ef5cb4cf7ff805eb51"}'
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
