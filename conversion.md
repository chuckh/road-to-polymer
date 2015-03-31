## Polymer 0.5 to 0.8 custom element conversion process

### Select source code
* Allow to pasted into textarea or
* Select file on Github or
* Select file local

### HTML Conversion Process
1. polymer-element to dom-module
2. polymer-element name to <dom-module id=
3. polymer-element attributes camel case to dash-case
4. polymer-element attributes to javascript properties
4. add <link rel="import" href="../layout/layout.html">???
5. template repeat to is="x-repeat"
6. template is="auto-binding"  to is="x-binding" 
7. template if to ???
8. textContent binding from ```<div>First: {{first}}</div> <span>{{first}}</span><br>```


### Javascript Conversion Process
1. polymer-element name to Polymer({ is: 
2. polymer-element attributes to javascript properties: {
3. 
 

### CSS Conversion Process
1. ???


### Finish
1. Review converted code
2. Save or copy converted code
 

---


## Migration Notes from Polymer 0.8 PRIMER.md
https://raw.githubusercontent.com/Polymer/polymer/0.8-preview/PRIMER.md

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
