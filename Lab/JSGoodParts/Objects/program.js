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
flight.equipment.model // throw "TypeError"
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