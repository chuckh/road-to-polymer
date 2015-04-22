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

### Core and Paper Elements Conversion
The core-x and paper-x are moving to PolymerElements at https://github.com/PolymerElements.
- core-x non visible elements are changing to iron-x, such as core-ajax to iron-ajax. Visible core-x are being changed to paper-x such as core-drawer-panel to paper-drawer-panel.
- paper-x are staying paper-x.

### New paper-x that where core-x (partial list)

| core-x            | paper-x            | comment           |
|:----------------- |:------------------ |:----------------- |
| core-drawer-panel | paper-drawer-panel | wip               |
| core-header-panel | paper-header-panel | wip               |
| core-toolbar      | paper-toolbar      | wip               |
| core-menu         | paper-menu         | wip               |
| core-item         | paper-item         | wip               |
| core-item w/ icon | paper-icon-item    | wip               |

### New paper-x that where not in Polymer 0.5 (partial list)

| paper-x              | Description                            |
|:-------------------- |:-------------------------------------- |
| paper-card           | is a container that renders two shadows on top of each other to create the effect of a lifted piece of paper.|
| paper-styles         | imports color.html, default-theme.html, layout.html, typography.html, shadow.html |
| paper-toggle-button  | a Material Design toggle button |

### Changed core-x to iron-x (partial list)

| core-x            | iron-x             | comment           |
|:----------------- |:------------------ |:----------------- |
| core-media-query  | iron-media-query   | wip               |
| core-icon         | iron-icon          | wip               |
| core-icons        | iron-icons         | wip               |
| core-iconset      | iron-iconset       | wip               |
| core-iconset-svg  | iron-iconset-svg   | wip               |

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
 
## Scott Miles explains
Polymer wants you to use elements with templates, and elements with templates use Mediator pattern, which is to say the _host_ mediates all communication between elements in the subtree.

We generally try to avoid parent/child communication outside of the shadow/shady root, so this becomes hard to talk about without a lot of deep background on application architecture.

The five second answer is: parent/child, ***use events yes***

Siblings, use a controller/mediator/parent to manage communication

Document-wide: bad application design, use scoping otherwise, yes, iron-meta

## Scott Miles explains hidden?=, hidden$= and hidden=
```For 0.5 hidden?=“{{hideElement}}” for 0.8 can be hidden$=“{{hideElement}}” for two-way binding or hidden=“[[hideElement]” for one-way binding, is this correct?```

Here is a long answer, there is a lot of detail, but I'm hopeful you can help me communicate these things everybody else!
```For 0.5 hidden?=“{{hideElement}}”``` 
In 0.5, `name?` created a "boolean attribute binding". This was special because Boolean attributes are either 'existing' (true) or 'not-existing' (false), which is specifically not what you get if you do setAttribute('hidden", false) (which _creates_ the attribute, and therefore makes it true, this is inherent wackiness in DOM).

In 0.8, bindings are by default to _properties_. Therefore, on browsers where `hidden` is implemented as a property, you can do:

```hidden="{{hideElement}}"```

And this will bind directly to the property, which has no weirdness about Boolean values. The browser itself will translate this to the correct attribute. 

Polymer elements work this same way, which is to say, if you poke properties they can update the attributes appropriately for you (if `reflectToAttribute` is true for that property). The general notion here is to use _properties_ rather than _attributes_ wherever possible because of the better handling for types other than String.

Sadly, `hidden` is not actually implemented on IE, so this is kind of a bad example. 

Typically, Polymer apps will create a style like: [hidden] { display: none; }. This sort of makes `hidden` look like it works, even on IE, but at this point one _must_ use an attribute, because there is no property support (on IE) for hidden.

In this situation, one can use the specific syntax for attribute binding, which is <name$>:

```hidden$=“{{hideElement}}”```

In this case, the binding only ever affects the _attribute_ `hidden` and doesn't go through any property.

The "{{ }}" syntax means "allow two-way binding, if the target element supports it", otherwise known by me as "automatic mode". The only time "{{ }}" will actually result in upward data-flow is if the target element is a Polymer element that has `notify: true` set for the bound property. In other words,

```<x-foo foo="{{bar}}"></x-foo>```

Data will ever only flow into `bar`if x-foo has marked `foo` as `notify: true`. You can use "[[ ]]" if you want to _force_ this binding to be one-way, but this is actually a pretty rare need. 

Most importantly: attribute bindings are never two-way. It doesn't matter if you use "{{ }}" or "[[ ]]", this binding:

```<x-foo foo$="{{bar}}"></x-foo>```

will never cause data to flow into `bar` from `foo`.

Some folks like to use "[[ ]]" and "{{ }}" to make it clearer to themselves what bindings are expected to be two-way and which ones aren't. I understand that, but I worry it adds complexity to the discussion, where most of the time, it's clear from context what things might push back data.

Example:

```<iron-ajax url="{{url}}" response="{{response}}"></iron-ajax>```

Most people seem to understand that `url` flows down and `response` flows up. I haven't seen folks having real trouble with this, but anyway, it's arguable.

HTH,
Scott

<br>

---

<br>

### see Polymer 0.8 Migration Guide
#### https://github.com/Polymer/docs/blob/master/0.8/docs/migration.md

## Migration Notes from Polymer 0.8 PRIMER.md as 4/22/2015
https://github.com/Polymer/polymer/blob/0.8-preview/PRIMER.md#migration-notes

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
    * May bind entire inline style from one property to `style` _attribute_:
      `<div style$="{{styles}}">`
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
