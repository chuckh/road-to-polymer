@maciej-leszczynski: i tried computed property like this
`data:{
         computed:'filterByString(data,nameFilter)'
       }`
Then  in template as `items="{{data}}"`
And Function as `filterByString: function (items, letters){....}`
`nameFilter` and `data` are defined using properties
`filterByString` function called but with `letters` param value empty and also it is called about 3 times do you have any idea about that?????
In console i'm getting this _"Uncaught RangeError: Maximum call stack size exceeded"_ `polymer.html:1` (edited)

maciek-leszczynski [6:46 AM]
Computed property must have other name than computed values. For example: computeFullName: function(first, last) {}

maciek-leszczynski [6:48 AM]
Must have a different name. Sorry for my English...

suhtech [6:53 AM]
@maciek-leszczynski: sorry but i didn't understand you can you please tell me from my post what i need to do?

maciek-leszczynski [7:00 AM]
filteredData: { // This name must be different than argument for filterByString
        computed: 'filterByString(data, nameFilter)'
}

maciek-leszczynski [7:05 AM]
'filteredData' will be computed when 'data' or 'nameFilter' change. So maybe use this.nameFilter in 'filterByString' instead.

suhtech [7:32 AM]
@maciek-leszczynski:  hmm now i understand thanks  i will try it

suhtech [7:54 AM]
@maciek-leszczynski: thanks its working now.

------

sjmiles [12:19 PM]
remember that _properties_ are a basic feature of JavaScript

sjmiles [12:19 PM]
_attributes_ are a custom database that exist on an Element, a pure DOM concept

sjmiles [12:20 PM]
_attributes_ are useful primarily for HTML, and a tiny bit for `querySelector*` and css matching


sjmiles [10:20 AM]
`properties` is not intended to imply _public_ ... convention is to use an underscore to denote a private (_protected_, if you like)  property

sjmiles [10:21 AM]
you are not required to put an entry in `properties` in order to use a property for binding, you only need the entry if you want to modify one of the properties' settings


------

smokybob [10:40 AM]
@sjmiles: just to be sure, am I correct saying there is no way to create a `really private' property on the element (like in only the element can see and use the property)?

smokybob [10:40 AM]
but it's just a matter of conventions

sjmiles [10:41 AM]
You can create _really private_ properties with tricks involving closures, or with Weak Maps, and/or private symbols (when those are shipped) but I wouldn't recommend any of that

smokybob [10:42 AM]
ok, so an alternative to be sure that from the parent I don't get a property changed should be using read only?

mbleigh [10:42 AM]
@smokybob: JavaScript generally has no way to create truly private properties outside of hiding variables with closures

diddledan [10:43 AM]
even closures don't guarantee privacy - you can still be leaky

smokybob [10:44 AM]
@mbleigh: I know :disappointed: ; was hoping for some "magic"

mbleigh [10:44 AM]
i think readOnly is what you're looking for

mbleigh [10:44 AM]
it annihilates the setter for the property

mbleigh [10:44 AM]
so you won't have accidental changes

diddledan [10:44 AM]
ZAP!]

diddledan [10:44 AM]
kill all teh setters! :stuck_out_tongue:

smokybob [10:45 AM]
yep but for things like secret_key I would love that the parent wasn't able to read the property too

aerolith [10:45 AM]
@diddledan i read that as kill all the settlers

aerolith [10:45 AM]
and was confused

diddledan [10:45 AM]
lol

diddledan [10:47 AM]10:47
smokybob: yeah private keys are a pain in completely transparent languages such as html+javascript

------

<link href="https://rawgit.com/polymer/polymer/0.8-preview/polymer.html" rel="import">
<link href="https://rawgit.com/PolymerElements/iron-selector/master/iron-selector.html" rel="import">
<link href="https://rawgit.com/PolymerElements/iron-signals/master/iron-signals.html" rel="import">
<link href="https://rawgit.com/PolymerElements/paper-button/master/paper-button.html" rel="import">
<link href="https://rawgit.com/PolymerElements/paper-dialog/master/paper-dialog.html" rel="import">
<link href="https://rawgit.com/PolymerElements/paper-input/master/paper-input.html" rel="import">
<link href="https://rawgit.com/PolymerElements/paper-material/master/paper-material.html" rel="import">
<link href="https://rawgit.com/PolymerElements/paper-menu/master/paper-menu.html" rel="import">
<link href="https://rawgit.com/PolymerElements/paper-styles/master/paper-styles.html" rel="import">


-------
index.html option loading...

<!-- build:js bower_components/webcomponentsjs/webcomponents-lite.min.js -->
  <script>
      if( !('registerElement' in document &&
            'import'          in document.createElement('link') &&
            'content'         in document.createElement('template'))){
              document.write('<script src="bower_components/webcomponentsjs/webcomponents-lite.js"><\/script>');
      }
    </script>
  <!-- endbuild -->
