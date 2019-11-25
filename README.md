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

# ObjectManager(object)

**Use:** Manipulates a supplied **Array** or **Object** as needed for a variety of use cases.  

<details><summary>Details</summary>
<p>

## Class Variables
* **object**  
the **Array** or **Object** ObjectManager is using.  

* **type**  
**Read Only**  
Whether this.object is an **Array** or **Object**

* **callbacks**  
The array of functions used in **runCallbacks()**


## Methods

### filter (test)
*Has **static** version*  
Applies a function similar to Array.prototype.filter, but can also be applied to Objects. Applied to **this.object**

* **test**  
**Type:** **function**  
**Default:** e => e  
Applied to each entry, and removing entries resolving to **false**.

### runCallbacks()
Runs each function in the **callbacks** array for each entry in **object**

### addCallback(callback)
Adds function to **callbacks** Class Variable.  

* **callback**  
**Type:** **function**  
**Syntax:** callback(entry, index)
The function to be added.

### removeCallback(callback)
Removes a callback from **callbacks** Class Variable.

* **callback**  
**Type: function**  
**Syntax:** callback(entry, index)  
The function to be removed.

### sequential(callback, init, keysOrLength)
Applies a sequentially determined value as key values in **this.object**.

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

## Statics

### fill(val, keys, noOverwrite, object)

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