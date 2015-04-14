# Polymer 0.5 to 0.8 conversion process
### see Polymer 0.8 Migration Guide
#### https://www.polymer-project.org/0.8/docs/migration.html
or for latest https://github.com/Polymer/docs/blob/master/0.8/docs/migration.md

These conversion steps are a work in progress and don't cover every step yet.

### HTML Conversion Process

**polymer-element** 
see https://www.polymer-project.org/0.8/docs/migration.html#registration

1. polymer-element to dom-module
1. polymer-element name to ```<dom-module id=```
1. polymer-element attribute/property camelCase to dash-case, change from  `<my-element fooBar=` to `<my-element foo-bar`
1. polymer-element attributes="xxx xxxx" add to javascript properties
2. polymer-element covert the notation attribute?="{{value}}" to attribute$="{{value}}" or attribute$="[[value]]"???
  - see https://www.polymer-project.org/0.8/docs/migration.html#attribute-bindings
  - From Scott Miles of Google, for the record, most Boolean bindings (formerly known as ?=) will work today simply with '='. One only needs $ if one really wants to bind directly to an attribute. It's a bit of a gray area and generally using '$=' won't be harmful, just wanted to clarify.
1. polymer-element layout ```<polymer-element name="x-foo" layout horizontal wrap>``` 
  - add ```<link rel="import" href="../layout/layout.html">``` to top with other imports
  - add hostAttributes ''`hostAttributes: {class: "layout horizontal wrap"}``` to Polymer({
  - see https://www.polymer-project.org/0.8/docs/migration.html#layout-attributes
1. polymer-element move up ```<link rel="import" type="css" href="my-awesome-button.css">``` from ````<template> to <dom-module>``` 
1. polymer-element move up ```<style></style>``` from ```<template>``` to ```<dom-module>```
  - see https://www.polymer-project.org/0.8/docs/devguide/local-dom.html
1. polymer-element default attributes such as `tabindex="0"` move to `hostAttributes: {  tabindex: 0}`
  - https://www.polymer-project.org/0.8/docs/migration.html#default-attributes
1. Correct JSON quotes required, change `<my-element foo="{ 'title': 'Persuasion', 'author': 'Austen' }">` to `</my-element> to <my-element foo='{ "title": "Persuasion", "author": "Austen" }'></my-element>`
  - see https://www.polymer-project.org/0.8/docs/migration.html#attr

**template**
see https://www.polymer-project.org/0.8/docs/devguide/experimental.html

1. template repeat to is="x-repeat" and repeat= to items= - _(temporary)_
1. template is="auto-binding"  to is="x-binding" - _(temporary)_
1. template if= to is="x-if" - _(temporary)_ or use display block or none

**other**

1. textContent binding from ```<div>First: {{first}}</div>``` TO ```<span>{{first}}</span><br>```
1. elements ```on-click="{{handleClick}}"``` to ```on-click="handleClick"```

### Javascript Conversion Process
1. polymer-element name to Polymer({ is: 
1. polymer-element attributes="" to javascript ```properties: { }```
2. Polymer(Polymer.mixin({ change mixins use mixins: [mixinName] after is:, use html import for mixin
  - https://www.polymer-project.org/0.8/docs/devguide/registering-elements.html#prototype-mixins
 
### CSS Conversion Process
see https://www.polymer-project.org/0.8/docs/migration.html#styling  

1. polymer-element move up ```<style></style>``` from ```<template>``` to ```<dom-module>``` (as noted above)
  - see https://www.polymer-project.org/0.8/docs/migration.html#styling
1. if using layout add hostAttributes ''`hostAttributes: {class: "layout horizontal wrap"}``` to Polymer({
  - see https://www.polymer-project.org/0.8/docs/migration.html#layout-attributes


### Difference example of paper-button conversion by Polymer team
http://chuckh.github.io/road-to-polymer/compare-code.html?el=paper-button

### Difference example of core-item auto conversion by compare-code
http://www.mergely.com/Be505kqQ/

## Auto Conversion program
### Select source code
* Allow to pasted into textarea or
* Select file on Github or 
* Select file local
* Load file or pasted code
* Auto Convert

### Finish
1. Review converted code
1. Save or copy converted code


<br>

---

<br>

## Migration Notes from Polymer 0.8 PRIMER.md
https://raw.githubusercontent.com/Polymer/polymer/0.8-preview/PRIMER.md

### see Polymer 0.8 Migration Guide
#### https://github.com/Polymer/docs/blob/master/0.8/docs/migration.md


This section covers how to deal with yet-unimplemented and/or de-scoped features in Polymer 0.8 as compared to 0.5.  Many of these are simply un-implemented; that is, we will likely have a final "solution" that addresses the need, we just haven't tackled that feature yet as we address items in priority order.  Other solutions in 0.8 may be lower-level as compared to 0.5, and will be explained here.

As the final 0.8 API solidifies, this section will be updated accordingly.  As such, this section should be considered answers "how do I solve problem xyz <em>TODAY</em>", rather than a representation of the final Polymer 0.8 API.

## Property casing

TL;DR: When binding to camel-cased properties, use "dash-case" attribute names to indicate the "camelCase" property to bind to.

Example: bind `this.myValue` to `<x-foo>.thatValue`:

BEFORE: 0.5

```html
<x-foo thatValue="{{myValue}}"></x-foo>
```

AFTER: 0.8

```html
<x-foo that-value="{{myValue}}"></x-foo>
```

In 0.5, binding annotations were allowed to mixed-case properties (despite the fact that attribute names always get converted to lower-case by the HTML parser), and the Node.bind implementation at the "receiving end" of the binding automatically inferred the mixed-case property it was assumed to refer to at instance time.

In 0.8, "binding" is done at prorotype time before the type of the element being bound to is known, hence knowing the exact JS property to bind to allows better efficiency.

## Binding limitations

Current limitations that are on the backlog for evaluation/improvement are listed below, with current workarounds:

* Sub-textContent/property binding
    * You cannot currrently do any of the following:
    
      ```html
      <div> stuff here: {{stuff}}</div>
      <div class$="{{thing}} {{another}}"></div>
      <x-custom prop="{{thing}} {{another}}"></x-custom>
      ```
    
    * Instead, use `<span>`'s to break up textContent into discrete elements:

      ```html
      <div> stuff here: <span>{{stuff}}</span></div>
      ```
      
    * Use computed properties for concatenating into properties/attributes:

      ```html
      <div class$="{{computeDivClass(thing, another)}}"></div>
      <x-custom prop="{{computeCustomProp(thing, another}}"></x-custom>
      ```

* CSS class binding:
    * May bind entire class list from one property to `class` _attribute_:
      `<div class$="{{classes}}">`
    * Otherwise, `this.classList.add/remove` from change handlers
* CSS inline-style binding:
    * May bind entire inline style from one property to `style` _property_:
      `<div style="{{styles}}">`
    * Otherwise, assign `this.style.props` from change handlers

## Structured data and path notification

To notify non-bound structured data changes, use `setPathValue` and `notifyPath`:

```js
this.setPathValue('user.manager', 'Matt');
```

Which is equivalent to:

```js
this.user.manager = 'Matt';
this.notifyPath('user.manager', this.user.manager);
```

## Repeating elements

Repeating templates is moved to a custom element (HTMLTemplateElement type extension called `x-repeat`):

```html
<template is="x-repeat" items="{{users}}">
  <div>{{item.name}}</div>
</template>
```

## Array notification

This area is in high flux.  Arrays bound to `x-repeat` are currently observed using `Array.observe` (or equivalent shim) and `x-repeat` will reflect changes to array mutations (push, pop, shift, unshift, splice) asynchronously.

**In-place sort of array is not supported**.  Sorting/filtering will likely be provided as a feature of `x-repeat` (and possibly other array-aware elements such as `x-list`) in the future.

Implementation and usage details will likely change, stay tuned.

<a name="todo-inheritance"></a>
## Mixins / Inheritance

TODO - use composition for now

## Gesture support

TODO - use standard DOM for now until gesture support is ported

<br>
<br>
