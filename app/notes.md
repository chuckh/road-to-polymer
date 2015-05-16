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
