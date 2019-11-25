# svz-managers

This module provides four management classes for manipulating Numbers, Objects, Cookies, and Dates in ways with multiple use cases I've employed on a number of occasions.

## Installation
To install, in terminal type

```
	npm i --save svz-managers
```

then, in your react project,

```
import {[Desired Class]} from svz-managers;
```  


# ObjectManager(object, callbacks)
<details><summary>Manipulates a supplied **Array** or **Object** as needed for a variety of use cases.</summary>
<p>

## Class Variables
* **object**  
the **Array** or **Object** ObjectManager is using.  

* **type**  
**Read Only**  
Whether **this.object** is an **Array** or **Object**

* **callbacks**  
**Type:** **Array** of **function**s || **function**
The array of functions used in **runCallbacks()**, or the first function in that array.


## Methods

### filter (test)
<details><summary>Applies a function similar to Array.prototype.filter, but can also be applied to Objects. Applied to **this.object**</summary>

*Has **static** version*  
* **test**  
**Type:** **function**  
**Default:** e => e  
Applied to each entry, and removing entries resolving to **false**.</details>

### runCallbacks()
Runs each function in the **callbacks** array for each entry in **object**

### addCallback(callback)
<details><summary>Adds function to **callbacks** Class Variable.</summary>

* **callback**  
**Type:** **function**  
**Syntax:** callback(entry, index)
The function to be added.</details>

### removeCallback(callback)
<details><summary>Removes a callback from **callbacks** Class Variable.</summary>

* **callback**  
**Type: function**  
**Syntax:** callback(entry, index)  
The function to be removed.</details>

### sequential(callback, init, keysOrLength)
<details><summary>Applies a sequentially determined value as key values in **this.object**.</summary>

* **callback**  
**Optional**  
**Type:** **function**  
**Default:** val => val+1  
Transformation of the previous value into the next value.

* **init**  
**Optional**  
**Default:** 0  
First value. The second value is callback(init), and so forth.

* **keys**  
**Optional**  
**Type:** **Array**  
List of keys in order of which to apply the growing value.
</details>

## Statics

### fill(object, val, keys, overwrite)
<details><summary>operates as a targeted fill function for an existing **Array** or **Object.**</summary>

* **object**
**Type:** **Array** || **Object**
The target of the function.

* **val**
The value that will be used to fill each specified key value.

* **keys**
**Type: Array**
The keys targeted by the function. If not specified, all existing keys will be targeted.

* **overwrite**
**Type: Boolean**
**Default: true**
Determines whether to overwrite currently not undefined values.

</details>

### filter (object, test)
Applies a function similar to Array.prototype.filter, but is also usable on Objects.

* **object**  
**Type: Object**  
The object that is being filtered.

### filterJoin (arr, joinVal)
Filters out values in **arr** and returns a string of the remaining values in order, joined together.

* **arr**  
**Type: Array**  
**Syntax:** values can be either **String**||**Number**, a **falsy** value or a sub-array pair of [**String**||**Number**, **Boolean**]. This is converted to a string including the non-**falsy** values and sub-array pairs' **String**||**Number** where the **Boolean** resolves to **true**.

* **joinVal**  
**Type: String** || **Number**  
**Default:** " "  
The join between each of the active values.

### forEach(object, callback)
Runs a function for each entry in the **Object** or **Array**

* **object**  
**Type: Object** or **Array**  
The target of the function.

* **callback**  
**Type: function**  
**Syntax:** **callback**(value, key)  
The function run for each of the values in the **Object** or **Array**.

### makeFill(val, keysOrLength)
<details><summary>creates an **Array** or **Object** with the specified key values or length.</summary>

* **val**
The value which will be used for each entry.

* **keysOrLength**
**Type:** **Array** || **Number**
Either a an **Array** of the keys to which the value will be initialized or a **Number** stating how long the **Array** will be.

</details>

### map(object, callback)
Runs a map function through each entry in the **Object** or **Array**

* **object**  
**Type: Object** or **Array**  
The target of the function.

* **callback**  
**Type: function**  
**Syntax:** **callback**(value, key)  
The function run for each of the values in the **Object** or **Array**.

</p>
</details>