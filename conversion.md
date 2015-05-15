# Polymer 0.5 to 0.9 conversion process
See Polymer 0.9 Migration Guide and Release Notes  
**https://www.polymer-project.org/0.9/docs/migration.html**  
or for latest https://github.com/Polymer/docs/blob/master/0.9/docs/migration.md  
and **https://www.polymer-project.org/0.9/docs/release-notes.html**  

---

These high level conversion steps are a work in progress and don't cover every step yet.

### HTML Conversion Process

####polymer-element to dom-module -- see https://www.polymer-project.org/0.9/docs/migration.html#registration
1. polymer-element to dom-module
  - `<polymer-element id=` name to `<dom-module id=`
1. polymer-element attribute/property camelCase to dash-case
  - change from  `<my-element fooBar=` to `<my-element foo-bar`
1. polymer-element attributes="xxx xxxx" add to javascript properties
1. polymer-element covert the notation attribute?="{{value}}" to attribute$="{{value}}"
  - `<div hidden?="{{isHidden}}">Boo!</div>` to `<div hidden$="{{isHidden}}">Boo!</div>`
  - see https://www.polymer-project.org/0.9/docs/migration.html#attribute-bindings
  - From Scott Miles of Google, for the record, most Boolean bindings (formerly known as ?=) will work today simply with '='. One only needs $ if one really wants to bind directly to an attribute. It's a bit of a gray area and generally using '$=' won't be harmful, just wanted to clarify.  

```
<!-- Attribute binding -->
<my-element selected$="{{value}}"></my-element>
<!-- results in <my-element>.setAttribute('selected', this.value); -->

<!-- Property binding -->
<my-element selected="{{value}}"></my-element>
<!-- results in <my-element>.selected = this.value; -->
```
1. Layout attributes replaced by layout classes
  - from `<div layout horizontal center>` to `<div class="layout horizontal center">`
  - add `<link rel="import" href="../PolymerElements/classes/iron-flex-layout.html">`
  - see https://www.polymer-project.org/0.9/docs/migration.html#layout-attributes
  - **note:** this could change in Polymer 1.0
  - From Chris Joel of Google " `PolymerElements/iron-flex-layout.html` contains mixins for styling things like `:host` in your element. `PolymerElements/classes/iron-flex-layout.html` contains the classes as used in the older `polymerelements/layout` styles. My recommendation is that, for now, you try to stick to `classes` if possible, because some new styling syntax coming down the pipe in the core library is going to change the use cases for the mixin versions of the layout styles."
1. polymer-element layout `<polymer-element name="x-foo" layout horizontal wrap>`
  - Breaking Change: hostAttributes changes - the **`class` attribute can no longer be set from `hostAttributes`**.
  - If you need to set classes on the host, you can do so imperatively (for example, by calling `classList.add` from the ready callback).
  - add `<link rel="import" href="../PolymerElements/classes/iron-flex-layout.html">` to top with other imports
  - see https://www.polymer-project.org/0.9/docs/release-notes.html#host-attributes
  - see https://www.polymer-project.org/0.9/docs/migration.html#layout-attributes notes box.
  - **note:** this could change in Polymer 1.0
1. polymer-element move up `<link rel="import" type="css" href="my-awesome-button.css">` from `<template>` to `<dom-module>`
1. polymer-element move up `<style></style>` from `<template>` to `<dom-module>`
  - see https://www.polymer-project.org/0.9/docs/devguide/local-dom.html
1. polymer-element default attributes such as `tabindex="0"` move to `hostAttributes: {  tabindex: 0}`
  - https://www.polymer-project.org/0.9/docs/migration.html#default-attributes
1. Correct JSON quotes required, change `<my-element foo="{ 'title': 'Persuasion', 'author': 'Austen' }">` to `</my-element> to <my-element foo='{ "title": "Persuasion", "author": "Austen" }'></my-element>`
  - see https://www.polymer-project.org/0.9/docs/migration.html#attr

####template
see https://www.polymer-project.org/0.9/docs/migration.html#template-repeat

1. template `repeat` to `is="dom-repeat"` and `repeat=` to `items=`
  - (example: http://jsbin.com/totibudowo/2/watch?html,output)
1. template `is="auto-binding"`  to `is="dom-bind"`
1. template `if=` to `is="dom-if"` or use display block or none

Custom elements renamed:
```
x-if -> dom-if  
x-repeat -> dom-repeat  
x-template -> dom-template  
x-autobind -> dom-bind  
x-array-selector -> array-selector  
x-style -> custom-style  
```

####Bindings / other

1. textContent binding from `<div>First: {{first}}</div>` TO `First: <span>{{first}}</span><br>`  
  - To bind to a child element’s textContent, you can simply include the annotation inside the child element. The binding annotation must currently span the entire content of the tag:
1. elements `on-click="{{handleClick}}"` to `on-click="handleClick"`
1. lots of changes to `Data Bindings` see doc at https://www.polymer-project.org/0.9/docs/devguide/data-binding.html

### Javascript Conversion Process
1. polymer-element name to `Polymer({ is:`
1. polymer-element `attributes=""` to javascript `properties: { }`
1. Use use underscore prefix for private functions `_functionname` 
1. Array mutation methods: 0.9 replaces the array observers with a set of array mutation methods. For array changes to be observed by data bindings, computed properties, or observers, you must use the provided helper methods: `push, pop, splice, shift, and unshift`. Like set, the first argument is a string path to the array.
```
this.push('users', { first: "Stephen", last: "Maturin" });
```
1. Use WebComponentsReady instead of polymer-ready
```
window.addEventListener('WebComponentsReady', function(e) {
  // imports are loaded and elements have been registered
  console.log('Components are ready');
});
```
  - see https://github.com/webcomponents/webcomponentsjs#webcomponentsready
2. Breaking Change: Mixins replaced by behaviors -- Convert `Polymer(Polymer.mixin({` to
  ```
  Polymer({
    is: 'super-element',
    behaviors: [SuperBehavior]
});
```
  - see https://www.polymer-project.org/0.9/docs/devguide/behaviors.html  

### CSS Conversion Process
see https://www.polymer-project.org/0.9/docs/migration.html#styling

1. polymer-element move up `<style></style>` from `<template>` to `<dom-module>` (as noted above)
  - see https://www.polymer-project.org/0.9/docs/migration.html#styling
1. If you are using layout attributes change from `<div layout horizontal center>` to `<div class="layout horizontal center">`
2. if using layout attributes add hostAttributes ''`hostAttributes: {class: "layout horizontal wrap"}` to Polymer({
  - see https://www.polymer-project.org/0.9/docs/migration.html#layout-attributes

### Core and Paper Elements Conversion
The core-x and paper-x are moving to PolymerElements at https://github.com/PolymerElements.
- core-x non visible elements are changing to iron-x, such as core-ajax to iron-ajax. Visible core-x are being changed to paper-x such as core-drawer-panel to paper-drawer-panel.
- paper-x are staying paper-x.
- gold-x business elements have been added
- neon-x are being added
- molecules are element wrappers for third-party libraries such as firebase-element and marked-element
- see http://chuckh.github.io/road-to-polymer/repos-compare.html?load=true for what has been converted and renamed.

### New paper-x that where core-x (partial list)

| core-x            | paper-x            | comment           |
|:----------------- |:------------------ |:----------------- |
| core-drawer-panel | paper-drawer-panel | released          |
| core-header-panel | paper-header-panel | released          |
| core-toolbar      | paper-toolbar      | released          |
| core-menu         | paper-menu         | released          |
| core-item         | paper-item         | released          |
| core-item w/ icon | paper-icon-item    | released          |

### New paper-x that where not in Polymer 0.5 (partial list)

| paper-x              | Description                            |
|:-------------------- |:-------------------------------------- |
| paper-material       | is a container that renders two shadows on top of each other to create the effect of a lifted piece of paper. |
| paper-styles         | imports color.html, default-theme.html, layout.html, typography.html, shadow.html |
| paper-behaviors  | common behaviors used across paper-* elements |  
http://chuckh.github.io/road-to-polymer/repos-compare.html?load=true

### Changed core-x to iron-x (partial list)

| core-x            | iron-x             | comment           |
|:----------------- |:------------------ |:----------------- |
| core-media-query  | iron-media-query   | released          |
| core-icon         | iron-icon          | released          |
| core-icons        | iron-icons         | released          |
| core-iconset      | iron-iconset       | released          |
| core-iconset-svg  | iron-iconset-svg   | released          |

### New iron-x that where not core-x in Polymer 0.5 (partial list)

| iron-x               | Description                            |
|:-------------------- |:-------------------------------------- |
| iron-meta            | is a element for creating and accessing self-organizing meta-database |
| iron-state-behaviors | bahaviors that manage control states like 'focused', 'disabled', and 'active' |


### Difference example of paper-button conversion by Polymer team
http://chuckh.github.io/road-to-polymer/compare-code.html?el=paper-button

### Difference example of core-item auto conversion by compare-code
http://www.mergely.com/Be505kqQ/

## Attributes explained by Scott Miles of Google
1. Boolean attributes in HTML/DOM are expressed as either 'existing or not existing'. So, to HTML 'foo="false" is Boolean true'. This is how HTML works, this isn't a Polymer thing.

2. An attribute value appearing on an element *as a property* is always a special case in native DOM. IOW, that 'checked' property on input reflects 'checked' attribute on input, is special sauce of input. IOW, there is no rule for how that should work exactly.

3. If you mark a property as Boolean, in Polymer 0.8, the attribute will be handled properly without any need for the special syntax that was needed in 0.5. The only reason you folks saw weirdness above was that the element itself did not initialize it's property in the first place. Because this is up to the element to decide, the Boolean property can start out as undefined. If you define the property with 'value: false' it will show true/false just like input.checked.

4. I prefer to suggest you just use '{{ }}' all the time. Most bindings are automatic, and are two-way only if they make sense. You never *need* to use [[ ]] unless you want to *restrict* an otherwise two-way binding to be only one-way, which is very rare. It's true that some people like to use [[ ]] as a hint to themselves about the nature of the data-flow, I think Rob is in this camp, which is entirely valid. Personally, I like to simplify and stick with {{ }}.

5. Types in Polymer are only used when decoding property values from attributes. Attribute values are always Strings, so Polymer type-converts when converting from attribute to property. Polymer does not type-check direct property assignments.

see https://html.spec.whatwg.org/#boolean-attributes

## Scott Miles explains
Polymer wants you to use elements with templates, and elements with templates use Mediator pattern, which is to say the _host_ mediates all communication between elements in the subtree.

We generally try to avoid parent/child communication outside of the shadow/shady root, so this becomes hard to talk about without a lot of deep background on application architecture.

The five second answer is: parent/child, ***use events yes***

Siblings, use a controller/mediator/parent to manage communication

Document-wide: bad application design, use scoping otherwise, yes, iron-meta

## Scott Miles explains hidden?=, hidden$= and hidden=
see example at: http://plnkr.co/edit/2yaJJPJ008j1LEfJaJY8?p=preview

The Question:

```
For 0.5 hidden?="{{hideElement}}" for 0.8 can be hidden$="{{hideElement}}" for two-way binding
or hidden="[[hideElement]" for one-way binding, is this correct?
```

Here is a long answer, there is a lot of detail, but I'm hopeful this will help everyone.

```
For 0.5 hidden?="{{hideElement}}"
```

In 0.5, `name?` created a "boolean attribute binding". This was special because Boolean attributes are either **'existing' (true) or 'not-existing' (false)**, which is specifically not what you get if you do setAttribute('hidden", false) (which _creates_ the attribute, and therefore makes it true, this is inherent wackiness in DOM).

In 0.8, bindings are by default to _properties_. Therefore, on browsers where `hidden` is implemented as a property, you can do:

```
hidden="{{hideElement}}"
```

And this will bind directly to the property, which has no weirdness about Boolean values. The browser itself will translate this to the correct attribute.

Polymer elements work this same way, which is to say, if you poke properties they can update the attributes appropriately for you (if `reflectToAttribute` is true for that property). The general notion here is to use _properties_ rather than _attributes_ wherever possible because of the better handling for types other than String.

Sadly, `hidden` is not actually implemented on IE, so this is kind of a bad example.

Typically, Polymer apps will create a style like: [hidden] { display: none; }. This sort of makes `hidden` look like it works, even on IE, but at this point one _must_ use an attribute, because there is no property support (on IE) for hidden.

In this situation, one can use the specific syntax for attribute binding, which is <name$>:

```
hidden$="{{hideElement}}"
```

In this case, the binding only ever affects the _attribute_ `hidden` and doesn't go through any property.

The "{{ }}" syntax means "allow two-way binding, if the target element supports it", otherwise known by me as "automatic mode". The only time "{{ }}" will actually result in upward data-flow is if the target element is a Polymer element that has `notify: true` set for the bound property. In other words,

```
<x-foo foo="{{bar}}"></x-foo>
```

Data will ever only flow into `bar`if x-foo has marked `foo` as `notify: true`. You can use "[[ ]]" if you want to _force_ this binding to be one-way, but this is actually a pretty rare need.

Most importantly: attribute bindings are never two-way. It doesn't matter if you use "{{ }}" or "[[ ]]", this binding:

```
<x-foo foo$="{{bar}}"></x-foo>
```

will never cause data to flow into `bar` from `foo`.

Some folks like to use "[[ ]]" and "{{ }}" to make it clearer to themselves what bindings are expected to be two-way and which ones aren't. I understand that, but I worry it adds complexity to the discussion, where most of the time, it's clear from context what things might push back data.

Example:

```
<iron-ajax url="{{url}}" response="{{response}}"></iron-ajax>
```

Most people seem to understand that `url` flows down and `response` flows up. I haven't seen folks having real trouble with this, but anyway, it's arguable.

HTH, Scott

Michael Bleigh of Divshot.com comments:

I actually like using `[[]]` for all downward bindings and `{{}}` only for potentially upward ones. helps me reason about dataflow as i'm working. Use a visual mnemonic: square brackets are walls that don't let anything out. curly brackets are pointed from the data coming back up

Per Scott comments:

Just remember `{{}}` only 'allows' upward data, it doesn't cause it to happen. More specifically, `[[ ]]` 'prevents' upward data flow

<br>

<br>
<br>
