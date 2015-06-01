//Function Literal
//Function objects are created with function literals:

// Create a variable called add and store a function
// in it that adds two numbers.
var add = function (a, b) {
	return a + b;
};

//The Method Invocation Pattern
//When a function is stored as a property of an object, we call it a method. When a
//method is invoked, this is bound to that object. If an invocation expression contains
//a refinement (that is, a . dot expression or [subscript] expression), it is
//invoked as a method:

// Create myObject. It has a value and an increment
// method. The increment method takes an optional
// parameter. If the argument is not a number, then 1
// is used as the default.

var myObject = {
	value: 0,
	increment: function (inc) {
		this.value += typeof inc === 'number' ? inc : 1;
	}
};
myObject.increment();
document.writeln(myObject.value); // 1
myObject.increment(2);
document.writeln(myObject.value); // 3

//A method can use this to access the object so that it can retrieve values from the
//object or modify the object. The binding of this to the object happens at invocation
//time. This very late binding makes functions that use this highly reusable. Methods
//that get their object context from this are called public methods.

//The Function Invocation Pattern
//When a function is not the property of an object, then it is invoked as a function:

var sum = add(3, 4); // sum is 7

//When a function is invoked with this pattern, this is bound to the global object.
//This was a mistake in the design of the language. Had the language been designed
//correctly, when the inner function is invoked, this would still be bound to the this
//Invocation | 29
//variable of the outer function. A consequence of this error is that a method cannot
//employ an inner function to help it do its work because the inner function does not
//share the method’s access to the object as its this is bound to the wrong value. Fortunately,
//there is an easy workaround. If the method defines a variable and assigns it
//the value of this, the inner function will have access to this through that variable. By
//convention, the name of that variable is that:

// Augment myObject with a double method.
myObject.double = function () {
	var that = this; // Workaround.
	var helper = function () {
		that.value = add(that.value, that.value);
	};
	helper(); // Invoke helper as a function.
};
// Invoke double as a method.
myObject.double();
document.writeln(myObject.getValue()); // 6