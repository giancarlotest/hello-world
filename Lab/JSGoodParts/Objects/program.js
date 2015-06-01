var empty_object = {};

var stooge = {
	"first-name": "Jerome",
	"last-name": "Howard"
}

var flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},
	arrival: {
		IATA: "LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	},
}

//Retrieval
stooge["first-name"];
flight.departure.IATA;

//The undefined value is produced if an attempt is made to retrieve a nonexistent member:
stooge["middle-name"] // undefined
flight.status // undefined
stooge["FIRST-NAME"] // undefined

//The || operator can be used to fill in default values:
var middle = stooge["middle-name"] || "(none)";
var status = flight.status || "unknown";

//Attempting to retrieve values from undefined will throw a TypeError exception. This
//can be guarded against with the && operator:
flight.equipment // undefined
//flight.equipment.model // throw "TypeError"
flight.equipment && flight.equipment.model // undefined

//Update
//A value in an object can be updated by assignment. If the property name already
//exists in the object, the property value is replaced:
stooge['first-name'] = 'Jerome';

//If the object does not already have that property name, the object is augmented:
stooge['middle-name'] = 'Lester';
stooge.nickname = 'Curly';
flight.equipment = {
	model: 'Boeing 777'
};
flight.status = 'overdue';

//Reference
//Objects are passed around by reference. They are never copied:
var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
// nick is 'Curly' because x and stooge
// are references to the same object
var a = {}, b = {}, c = {};
// a, b, and c each refer to a
// different empty object
a = b = c = {};
// a, b, and c all refer to
// the same empty object
 
// Prototype
//Every object is linked to a prototype object from which it can inherit properties. All
//objects created from object literals are linked to Object.prototype, an object that
//comes standard with JavaScript.
//When youmake a new object, youcan select the object that should be its prototype.
//The mechanism that JavaScript provides to do this is messy and complex, but it can
//be significantly simplified. We will add a create method to the Object function. The
//create method creates a new object that uses an old object as its prototype. There
//will be much more about functions in the next chapter.
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
		var F = function () { };
		F.prototype = o;
		return new F();
	};
}
var another_stooge = Object.create(stooge);

//The prototype link has no effect on updating. When we make changes to an object,
//the object’s prototype is not touched:
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

//The prototype link is used only in retrieval. If we try to retrieve a property value from
//an object, and if the object lacks the property name, then JavaScript attempts to
//retrieve the property value from the prototype object. And if that object is lacking the
//property, then it goes to its prototype, and so on until the process finally bottoms out
//with Object.prototype. If the desired property exists nowhere in the prototype chain,
//then the result is the undefined value. This is called delegation.
//The prototype relationship is a dynamic relationship. If we add a new property to a
//prototype, that property will immediately be visible in all of the objects that are
//based on that prototype:
stooge.profession = 'actor';
another_stooge.profession; // 'actor'

//Reflection
//It is easy to inspect an object to determine what properties it has by attempting to
//retrieve the properties and examining the values obtained. The typeof operator can
//be very helpful in determining the type of a property:
typeof flight.number // 'number'
typeof flight.status // 'string'
typeof flight.arrival // 'object'
typeof flight.manifest // 'undefined'

//Some care must be taken because any property on the prototype chain can produce a
//value:
typeof flight.toString // 'function'
typeof flight.constructor // 'function'

//There are two approaches to dealing with these undesired properties. The first is to
//have your program look for and reject function values. Generally, when you are
//reflecting, you are interested in data, and so you should be aware that some values
//could be functions.
//The other approach is to use the hasOwnProperty method, which returns true if the
//object has a particular property. The hasOwnProperty method does not look at the
//prototype chain:
flight.hasOwnProperty('number') // true
flight.hasOwnProperty('constructor') // false

//Enumeration

//The for in statement can loop over all of the property names in an object. The enumeration
//will include all of the properties—including functions and prototype properties
//that you might not be interested in—so it is necessary to filter out the values
//youdon’t want. The most common filters are the hasOwnProperty method and using
//typeof to exclude functions:

var name;
for (name in another_stooge) {
	if (typeof another_stooge[name] !== 'function') {
		document.writeln(name + ': ' + another_stooge[name]);
	}
}

//There is no guarantee on the order of the names, so be prepared for the names to
//appear in any order. If you want to assure that the properties appear in a particular
//order, it is best to avoid the for in statement entirely and instead make an array containing
//the names of the properties in the correct order:

var i;
var properties = [
	'first-name',
	'middle-name',
	'last-name',
	'profession'
];
for (i = 0; i < properties.length; i += 1) {
	document.writeln(properties[i] + ': ' +
		another_stooge[properties[i]]);
}

//By using for instead of for in , we were able to get the properties we wanted without
//worrying about what might be dredged up from the prototype chain, and we got
//them in the correct order.

//Delete
//The delete operator can be used to remove a property from an object. It will remove
//a property from the object if it has one. It will not touch any of the objects in the prototype
//linkage.

//Removing a property from an object may allow a property from the prototype link-
//age to shine through:
another_stooge.nickname // 'Moe'

// Remove nickname from another_stooge, revealing
// the nickname of the prototype.
delete another_stooge.nickname;
another_stooge.nickname // 'Curly'

//Global Abatement
//JavaScript makes it easy to define global variables that can hold all of the assets of
//your application. Unfortunately, global variables weaken the resiliency of programs
//and should be avoided.
//One way to minimize the use of global variables is to create a single global variable
//for your application:
var MYAPP = {};

//That variable then becomes the container for your application:
MYAPP.stooge = {
	"first-name": "Joe",
	"last-name": "Howard"
};
MYAPP.flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2004-09-22 14:55",
		city: "Sydney"
	},
	arrival: {
		IATA: "LAX",
		time: "2004-09-23 10:42",
		city: "Los Angeles"
	}
};
//By reducing your global footprint to a single name, you significantly reduce the
//chance of bad interactions with other applications, widgets, or libraries. Your pro-
//gram also becomes easier to read because it is obvious that MYAPP.stooge refers to a
//top-level structure. In the next chapter, we will see ways to use closure for informa-
//tion hiding, which is another effective global abatement technique.
