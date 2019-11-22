export class ObjectManager {
	constructor(obj){
		if (typeof obj !== 'object'){
			throw "TypeError: ObjectManager requires an object to work with."
		}
		this.object = obj;
	}

	static filterJoin = (arr, joinVal = ' ') => {
		if (ObjectManager.type(arr) !== 'array') {
			throw 'TypeError: filterJoin can only be used with an array.'
		}
		for (const i in arr){
			if(arr[i] && typeof arr[i] === 'object'){
				arr[i] = arr[i][1] ? arr[i][0] : null;
			}
		}
		return arr.filter(a => a).join(joinVal)
	}

	filterJoin = (joinVal = ' ' ) => {
		ObjectManager.filterJoin(this.object);
	}

	static filter = (object, test) => {
		if (ObjectManager.type(object) !== 'object'){
			throw "TypeError: filter is meant only for objects, not arrays."
		}
		//this provides a filter functionality for Objects similar to that within Arrays
		//allowing you to remove values from the Object that don't match a test criteria.
		for (const i in object){
			if (!test(object[i])){
				delete object[i];
			}
		}
	}

	static callbacker = (elements, callback, index = 0) => {
		for (const i in elements){
			callback(elements[i], i)
		}
	}

	callbacker = (callback, length, index) => {
		ObjectManager.callbacker(this.object, callback, index);
	}

	filter = test => {
		ObjectManager.filter(this.object, test);
	}

	get type(){
		return this.object.indexOf ? 'array' : 'object';
	}

	static standardized = (array, index) => {
		if (ObjectManager.type(array) !== 'array'){
			throw 'standardized is only usable on arrays.'
		}
		for (let i = 1; i < array.length; i++){
			if (index){
				if (array[i][index] !== array[i-1][index]){
					return false;
				}
			}
			else if (array[i] !== array[i-1]){
				return false;
			}
		}
		return index 
			? array[0][index] === undefined ? null : array[0][index] 
			: array[0] === undefined ? null : array[0]
	}

	standardized = index => {
		ObjectManager.standardized(this.object, index)
	}

	static type(arrOrObj){
		if (typeof arrOrObj !== 'object'){
			throw 'TypeError: ObjectManage only works with objects or arrays.';
		}
		return arrOrObj.indexOf ? 'array' : 'object';
	}

	objectMap = (callback) => {
		Object.keys(this.object).map(key => callback(this.object[key], key))
	}

	static sameVal = (arrOrObj, val, overwrite) => {
		if (typeof arrOrObj !== 'object'){
			throw 'TypeError: arrOrObj must be an array or object'
		}
		if (ObjectManager.type(arrOrObj) === 'array' && arrOrObj[0] && typeof arrOrObj[0] === 'string' && !overwrite){
			const retval = {};
			for (const i = 0; i < arrOrObj.length; i++){
				retval[arrOrObj[i]] = val;
			}
			return retval;
		}
		for (const i in arrOrObj){
			arrOrObj[i] = val;
		}
		return arrOrObj;
	}

	sameVal = (val, keys) => {
		if (keys && ObjectManager.type(keys) === 'array'){
			for (const i in keys){
				this.object[keys[i]] = val;
			}
		}
		else if (keys){
			throw 'TypeError: if defined, keys must be an array of keys'
		}
		else {
			for (const i in this.object){
				this.object[i] = val;
			}
		}
	}

	splitUp = () => {
		const obj = [...this.object]
		const retval = [obj];
		const root = Math.floor(Math.pow(obj.length, .7))
		const limit = Math.floor(obj.length/root)
		for (let i = 0; i < limit; i++){
			retval[i+1] = retval[i].splice(root);
		}
		return retval;
	}

	sortKeys = callback => {
		const retval = [];
		for (const i in this.object){
			const added = false;
			for (const inner in retval){
				if (!callback(this.object[i], this.retval[inner])) {
					this.retval.splice(inner, 0, i)
					added = true;
					break;
				}
			}
			if (!added){
				retval.push(i);
			}
		}
		return retval;
	}

	static sequential = (
		callback = val => val+1,
		init = 1,
		keysOrLength
	) => {
		let curVal = init;
		switch(typeof keysOrLength){
			case 'object':
				if (ObjectManager.type(keysOrLength) !== 'array'){
					throw 'TypeError: keysOrLength must be a number indicating the length of the array or an array of object keynames'
				}
				const object = {}
				for (const i in keysOrLengthder) {
					object[keyOrder[i]]=curVal;
					curVal = callback(curVal);
				}
			break;
			case 'number':
				for (const i = 0; i < keysOrLength; i++){
					object.push(curVal)
					curVal = callback(curVal);
				}
			break;
			default:
				throw 'TypeError: keysOrLength must be a number indicating the length of the array or an array of object keynames'
		}
	}

	sequential = (
		callback = val => val+1, 
		init = this.object[Object.keys(this.object)[0]],
		keyOrder = Object.keys(this.object)
	) => {
		let curVal = init;
		for (const i in keyOrder) {
			this.object[keyOrder[i]]=curVal;
			curVal = callback(curVal);
		}
	}
}

export class NumberManager {
	constructor(number, exact){
		this.number = number;
		this.exact = exact;
	} 

	//toPhone converts a number or string to a US phone number format.
	toPhone = (number = this.number) => "(" + (''+number).substr(0,3) + ") " + (''+number).substr(3,3) + "-" + (''+number).substr(6)

	//toDollars returns either the NumberMan's number or an inputted number to currency format
	toDollars = (number = this.number) => "$" + (number ? this.addZeroes(2, true, this.capDigits(number, 2)) : '0.00');

	//addZeroes adds zeroes as a prefix or as decimal places until the test evaluates as false.
	addZeroes = (digits, toEnd = true, number) => {
		const {trailingDigits, maxDigits, addZeroes, addZero} = this;
		//prevent exceeding maximum defined digits.
		const addMore = (toEnd ? trailingDigits(''+number || this.number) <= digits : (''+(number || this.number)).length <= digits) && !(toEnd && (trailingDigits(''+(number || this.number)) === maxDigits))
		//if the test function evaluates to true, add a decimal place if toEnd is true and we haven't reached the maximum decimal places specified, and add a prefix 0 if toEnd is false.
		if (addMore){
			if (number) {
				return addZeroes(digits, toEnd, addZero(toEnd, number));
			}
			else {
				this.number = addZeroes(digits, toEnd, addZero(toEnd, this.number))
			}
		} else {
			return number;
		}
	}

	static confine = (number, max, min) => {
		if(max !== null && number > max){
			return max;
		}
		if (min !== undefined && min !== null && number < min){
			return min;
		}
		return number;
	}

	confine(max, min){
		NumberManager.confine(this.number, max, min);
	}

	static isPositive = (number) => {
		if (number > 0){
			return 1;0
		}
		if (number < 0){
			return -1
		} 
		return 0;
	}

	isPositive = () => {
		NumberManager.isPositive(this.number);
	}


	set places (digits) {
		this.maxDigits = typeof digits === 'string' ? this.trailingDigits(digits) : digits;
		this.number = this.number;
	}

	sizeOf = (numberVal, trailing = true) => trailing ? (''+numberVal).includes('.') ? (''+numberVal).substring((''+numberVal).indexOf('.')+1).length : 0 : 0;

	addZero = (toEnd, number) => (!toEnd ? '0' : '') + number + (toEnd ? (''+number).includes('.') ? '0' : '.0' : '')

	capDigits = (number, digits = this.maxDigits) => Math.round(Number.parseFloat(number)*Math.pow(10,digits))/Math.pow(10,digits);

	exactPlaces = digits => {
		this.maxDigits = digits;
		if (this.trailingDigits() > digits){
			this.number = this.capDigits(this.number);
		}
		this.numberVal = this.addZeroes(digits)
	}

	set number (numberValue) {
		//ensure that the number's value does not exceed the maximum trailing digits set for this NumberMan.
		if (!numberValue){
			return false;
		}
		if (this.maxDigits && this.trailingDigits(numberValue) > this.maxDigits) {
			this.numberVal = ''+numberValue;
			this.exactPlaces(this.maxDigits)
		} else {
			this.numberVal = ''+numberValue;
			if (this.exact){
				this.exactPlaces(this.maxDigits)
			}
		}
	}

	get number(){
		return this.numberVal
	}


	// trailingDigits returns the number of decimal places
	trailingDigits = number => {
		if (number){
			return this.sizeOf(number);
		}
		return this.sizeOf(this.number);
	}

	// toDigits accepts a string to test against, an array of values to test against or a number of digits
	// and either adds zeroes as prefixes or zeroes as decimal places.
	toDigits = (digitsOrNumberArray, trailing = true) => {
		const {addZeroes, trailingDigits} = this;
		const newLength = (current, test) => {
			const digits = trailing ? trailingDigits(test) : test.length;
			return Math.max(digits, current);
		}
		let toLength = trailing ? trailingDigits() : this.number.length;
		if (typeof digitsOrNumberArray === 'object'){
			for (const i in digitsOrNumberArray){
				toLength = newLength(toLength, ''+digitsOrNumberArray[i])
			}
		}
		else if(typeof digitsOrNumberArray === 'string'){
			toLength =  newLength(toLength, digitsOrNumberArray);
		}
		else if(typeof digitsOrNumberArray === 'number'){
			toLength = Math.max(toLength, digitsOrNumberArray);
		}
		addZeroes(toLength, trailing);
		return this.number;
	}

	static calcAdditive = (number, maxVal) => {
		let i = 0;
		let calcTotal = 0;
		while (Math.abs(calcTotal) < Math.abs(number)) {
			i++;
			const addTo = maxVal && i > maxVal ? maxVal*Number.isPositive(number) : Number.isPositive(number)*i;
			calcTotal += addTo;
		}
		return i;
	}

	calcAdditive = maxVal => {
		NumberManager.calcAdditive(this.number, maxVal);
	}
}

export class CookieManager {

	static set (name, value, expiration) {
		if (name && value){
			let cookieString = name + '=' + value + ';';
			if (expiration){
				const date=new Date(expiration);
				cookieString += ' expires=' + date.toLocalString + ';';
			}
			cookieString += ' path=/;';
			document.cookie = cookieString;
		}
		else {
			return 'Requires name and value as (name, value)';
	    }
	}

    static get (name) {
		const cookieStrings = (decodeURIComponent(document.cookie).split(';'));
		name = name+'=';
		for ( let i in cookieStrings) {
			i = Number.parseInt(i);
			let curr = cookieStrings[i].trim();
			if (curr.indexOf(name) === 0){
				curr = curr.substring(name.length);
				return curr;
			}
		}
		return decodeURIComponent(document.cookie).split(';');
    }

    static delete(name, path) {
    	document.cookie= path ? name+'==; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=' + path + ';' : name+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }

}

export class TimeManager {
	constructor(ms){
		this.time = ms;
	}

	trim = time => {
		while ((time.charAt(0) === '0' || time.charAt(0) === ':') && time.length > 1){
			time = time.substring(1);
		}
		return time;
	}

	set time(entry){
		if (entry === undefined){
			this.date = new Date();
		}
		else{
			this.type = typeof entry === 'number' ? 'ms' : 'date';
			this.date = new Date(entry);
		}
	}

	get fromToday(){
		let today = new Date()
		return today + this.date;
	}

	set millisecond(milliseconds){ this.type === 'ms' ? this.date.setTime(milliseconds) : this.date.setMilliseconds(milliseconds) }

	set second(seconds){ this.type === 'ms' ? this.date.setTime(this.date.getTime() % 1000 + 1000*seconds) : this.date.setSeconds(seconds) }

	set hour(hours){ this.type === 'ms' ? this.date.setTime(this.date.getTime() % 3600000 + 3600000*hours) : this.date.setHours(hours) }

	set minute(minutes){ this.type === 'ms' ? this.date.setTime(this.date.getTime() % 60000 + 60000*minutes) : this.date.setMinutes(minutes) }

	get milliseconds(){ return this.type === 'ms' ? this.date.getTime() : this.date.getMilliseconds() }

	get millisecond(){return this.milliseconds }

	get second(){ return this.type === 'ms' ? this.milliseconds/1000 : this.date.getSeconds()}

	get seconds(){ return this.second}
	
	get minutes(){ return this.type === 'ms' ? Math.floor(this.milliseconds/60000) : this.date.getSeconds()}

	get minute(){ return this.type === 'ms' ? this.minutes + this.date.toTimeString().substr(5,3) : this.date.getSeconds()}

	get hours(){ return this.type === 'ms' ? Math.floor(this.milliseconds/3600000) : this.date.getHours()}

	get hour (){ return this.type === 'ms' ? this.hours + this.date.toTimeString().substr(2,6) : this.date.getHours()}

	get day () { return this.type === 'ms' ? Math.floor(this.milliseconds/86400000) : this.date.getDate() }

	get weekday () { return this.type === 'ms' ? new Date(this.date - 320400000).getDay() : this.date.getDay()}

	millisecondsFrom = (inputDate, absolute = true) => absolute ? Math.abs(this.date - new Date(inputDate)) : this.date - new Date(inputDate);

	secondsFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/1000)

	minutesFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/60000)
	
	hoursFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/3600000)

	daysFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/86400000)
	
	yearsFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/31536000000)
	
	centuriesFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/3153600000000)

	milleniaFrom = (inputDate, absolute) => Math.floor(this.millisecondsFrom(inputDate, absolute)/31536000000000)
}