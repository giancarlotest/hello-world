//Functions 
//
//The best thing about JavaScript is its implementation of functions. It got almost every-
//thing right. But, as you should expect with JavaScript, it didn’t get everything right.
//A function encloses a set of statements. Functions are the fundamental modular unit
//of JavaScript. They are used for code reuse, information hiding, and composition.
//Functions are used to specify the behavior of objects. Generally, the craft of pro-
//gramming is the factoring of a set of requirements into a set of functions and data
//structures.
//
//Function Objects
//
//Functions in JavaScript are objects. Objects are collections of name/value pairs hav-
//ing a hidden link to a prototype object. Objects produced from object literals are
//linked to Object.prototype . Function objects are linked to Function.prototype
//(which is itself linked to Object.prototype ). Every function is also created with two
//additional hidden properties: the function’s context and the code that implements
//the function’s behavior.
//Every function object is also created with a prototype property. Its value is an object
//with a constructor property whose value is the function. This is distinct from the
//hidden link to Function.prototype . The meaning of this convoluted construction will
//be revealed in the next chapter.
//Since functions are objects, they can be used like any other value. Functions can be
//stored in variables, objects, and arrays. Functions can be passed as arguments to
//functions, and functions can be returned from functions. Also, since functions are
//objects, functions can have methods.
//The thing that is special about functions is that they can be invoked.

//Function Literal
//
//Function objects are created with function literals:

// Create a variable called add and store a function
// in it that adds two numbers.
var add = function (a, b) {
	return a + b;
};

//A function literal has four parts. The first part is the reserved word function .

//The optional second part is the function’s name. The function can use its name to
//call itself recursively. The name can also be used by debuggers and development
//tools to identify the function. If a function is not given a name, as shown in the previ-
//ous example, it is said to be anonymous.

//The third part is the set of parameters of the function, wrapped in parentheses.
//Within the parentheses is a set of zero or more parameter names, separated by com-
//mas. These names will be defined as variables in the function. Unlike ordinary vari-
//ables, instead of being initialized to undefined , they will be initialized to the
//arguments supplied when the function is invoked.

//The fourth part is a set of statements wrapped in curly braces. These statements are
//the body of the function. They are executed when the function is invoked.

//A function literal can appear anywhere that an expression can appear. Functions can
//be defined inside of other functions. An inner function of course has access to its
//parameters and variables. An inner function also enjoys access to the parameters and
//variables of the functions it is nested within. The function object created by a func-
//tion literal contains a link to that outer context. This is called closure. This is the
//source of enormous expressive power.

//Invocation

//Invoking a function suspends the execution of the current function, passing control
//and parameters to the new function. In addition to the declared parameters, every
//function receives two additional parameters: this and arguments . The this parame-
//ter is very important in object oriented programming, and its value is determined by
//the invocation pattern. There are four patterns of invocation in JavaScript: the
//method invocation pattern, the function invocation pattern, the constructor invoca-
//tion pattern, and the apply invocation pattern. The patterns differ in how the bonus
//parameter this is initialized.

//The invocation operator is a pair of parentheses that follow any expression that pro-
//duces a function value. The parentheses can contain zero or more expressions, sepa-
//rated by commas. Each expression produces one argument value. Each of the
//argument values will be assigned to the function’s parameter names. There is no run-
//time error when the number of arguments and the number of parameters do not
//match. If there are too many argument values, the extra argument values will be
//ignored. If there are too few argument values, the undefined value will be substituted
//for the missing values. There is no type checking on the argument values: any type of
//value can be passed to any parameter.

//The Method Invocation Pattern
//
//When a function is stored as a property of an object, we call it a method. When a
//method is invoked, this is bound to that object. If an invocation expression con-
//tains a refinement (that is, a . dot expression or [subscript] expression), it is
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
//
//When a function is not the property of an object, then it is invoked as a function:
//var sum = add(3, 4); // sum is 7
//When a function is invoked with this pattern, this is bound to the global object.
//This was a mistake in the design of the language. Had the language been designed
//correctly, when the inner function is invoked, this would still be bound to the this
//variable of the outer function. A consequence of this error is that a method cannot
//employ an inner function to help it do its work because the inner function does not
//share the method’s access to the object as its this is bound to the wrong value. For-
//tunately, there is an easy workaround. If the method defines a variable and assigns it
//the value of this , the inner function will have access to this through that variable. By
//convention, the name of that variable is that :

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
document.writeln(myObject.value); // 6

//The Constructor Invocation Pattern
//
//JavaScript is a prototypal inheritance language. That means that objects can inherit
//properties directly from other objects. The language is class-free.
//This is a radical departure from the current fashion. Most languages today are classi-
//cal. Prototypal inheritance is powerfully expressive, but is not widely understood.
//JavaScript itself is not confident in its prototypal nature, so it offers an object-making
//syntax that is reminiscent of the classical languages. Few classical programmers
//found prototypal inheritance to be acceptable, and classically inspired syntax
//obscures the language’s true prototypal nature. It is the worst of both worlds.
//If a function is invoked with the new prefix, then a new object will be created with a
//hidden link to the value of the function’s prototype member, and this will be bound
//to that new object.
//The new prefix also changes the behavior of the return statement. We will see more
//about that next.

// Create a constructor function called Quo.
// It makes an object with a status property.
var Quo = function (string) {
	this.status = string;
};
// Give all instances of Quo a public method
// called get_status.
Quo.prototype.get_status = function () {
	return this.status;
};
// Make an instance of Quo.
var myQuo = new Quo("confused");
document.writeln(myQuo.get_status()); // confused

//Functions that are intended to be used with the new prefix are called constructors. By
//convention, they are kept in variables with a capitalized name. If a constructor is
//called without the new prefix, very bad things can happen without a compile-time or
//runtime warning, so the capitalization convention is really important.
//Use of this style of constructor functions is not recommended. We will see better
//alternatives in the next chapter.


//The Apply Invocation Pattern
//
//Because JavaScript is a functional object-oriented language, functions can have
//methods.
//The apply method lets us construct an array of arguments to use to invoke a func-
//tion. It also lets us choose the value of this . The apply method takes two parame-
//ters. The first is the value that should be bound to this . The second is an array of
//parameters.

// Make an array of 2 numbers and add them.
var array = [3, 4];
var sum = add.apply(null, array); // sum is 7
// Make an object with a status member.
var statusObject = {
	status: 'A-OK'
};
// statusObject does not inherit from Quo.prototype,
// but we can invoke the get_status method on
// statusObject even though statusObject does not have
// a get_status method.
var status = Quo.prototype.get_status.apply(statusObject);
// status is 'A-OK'

//Arguments
//
//A bonus parameter that is available to functions when they are invoked is the
//arguments array. It gives the function access to all of the arguments that were sup-
//plied with the invocation, including excess arguments that were not assigned to
//parameters. This makes it possible to write functions that take an unspecified num-
//ber of parameters:

// Make a function that adds a lot of stuff.
// Note that defining the variable sum inside of
// the function does not interfere with the sum
// defined outside of the function. The function
// only sees the inner one.
var sum = function () {
	var i, sum = 0;
	for (i = 0; i < arguments.length; i += 1) {
		sum += arguments[i];
	}
	return sum;
};
document.writeln(sum(4, 8, 15, 16, 23, 42)); // 108

//This is not a particularly useful pattern. In Chapter 6, we will see how we can add a
//similar method to an array.
//Because of a design error, arguments is not really an array. It is an array-like object.
//arguments has a length property, but it lacks all of the array methods. We will see a
//consequence of that design error at the end of this chapter.

//Return
//
//When a function is invoked, it begins execution with the first statement, and ends
//when it hits the } that closes the function body. That causes the function to return
//control to the part of the program that invoked the function.
//The return statement can be used to cause the function to return early. When return is
//executed, the function returns immediately without executing the remaining statements.
//A function always returns a value. If the return value is not specified, then undefined
//is returned.
//If the function was invoked with the new prefix and the return value is not an object,
//then this (the new object) is returned instead.

//Exceptions
//
//JavaScript provides an exception handling mechanism. Exceptions are unusual (but
//not completely unexpected) mishaps that interfere with the normal flow of a pro-
//gram. When such a mishap is detected, your program should throw an exception:

var add = function (a, b) {
	if (typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name: 'TypeError',
			message: 'add needs numbers'
		};
	}
	return a + b;
}

//The throw statement interrupts execution of the function. It should be given an
//exception object containing a name property that identifies the type of the exception,
//and a descriptive message property. You can also add other properties.
//The exception object will be delivered to the catch clause of a try statement:

// Make a try_it function that calls the new add
// function incorrectly.
var try_it = function () {
	try {
		add("seven");
	} catch (e) {
		document.writeln(e.name + ': ' + e.message);
	}
}
try_it();

//If an exception is thrown within a try block, control will go to its catch clause.
//A try statement has a single catch block that will catch all exceptions. If your han-
//dling depends on the type of the exception, then the exception handler will have to
//inspect the name to determine the type of the exception.

//Augmenting Types
//
//JavaScript allows the basic types of the language to be augmented. In Chapter 3, we
//saw that adding a method to Object.prototype makes that method available to all
//objects. This also works for functions, arrays, strings, numbers, regular expressions,
//and booleans.
//For example, by augmenting Function.prototype , we can make a method available to
//all functions:

Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
};

//By augmenting Function.prototype with a method method, we no longer have to type
//the name of the prototype property. That bit of ugliness can now be hidden.
//JavaScript does not have a separate integer type, so it is sometimes necessary to
//extract just the integer part of a number. The method JavaScript provides to do that
//is ugly. We can fix it by adding an integer method to Number.prototype . It uses either
//Math.ceiling or Math.floor , depending on the sign of the number:

/*Number.method('integer', function () {
	return Math[(this < 0) ? 'ceiling' : 'floor'](this);
});
document.writeln((-10 / 3).integer()); // -3*/

//JavaScript lacks a method that removes spaces from the ends of a string. That is an
//easy oversight to fix:

String.method('trim', function () {
	return this.replace(/^\s+|\s+$/g, '');
});
document.writeln('"' + " neat ".trim() + '"');

//Our trim method uses a regular expression. We will see much more about regular
//expressions in Chapter 7.

//By augmenting the basic types, we can make significant improvements to the expres-
//siveness of the language. Because of the dynamic nature of JavaScript’s prototypal
//inheritance, all values are immediately endowed with the new methods, even values
//that were created before the methods were created.
//The prototypes of the basic types are public structures, so care must be taken when
//mixing libraries. One defensive technique is to add a method only if the method is
//known to be missing:

// Add a method conditionally.
Function.prototype.method = function (name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
	}
};

//Another concern is that the for in statement interacts badly with prototypes. We
//saw a couple of ways to mitigate that in Chapter 3: we can use the hasOwnProperty
//method to screen out inherited properties, and we can look for specific types.

//Recursion
//
//A recursive function is a function that calls itself, either directly or indirectly. Recur-
//sion is a powerful programming technique in which a problem is divided into a set of
//similar subproblems, each solved with a trivial solution. Generally, a recursive func-
//tion calls itself to solve its subproblems.
//The Towers of Hanoi is a famous puzzle. The equipment includes three posts and a
//set of discs of various diameters with holes in their centers. The setup stacks all of
//the discs on the source post with smaller discs on top of larger discs. The goal is to
//move the stack to the destination post by moving one disc at a time to another post,
//never placing a larger disc on a smaller disc. This puzzle has a trivial recursive solution:

var hanoi = function (disc, src, aux, dst) {
	if (disc > 0) {
		hanoi(disc - 1, src, dst, aux);
		document.writeln('Move disc ' + disc +
			' from ' + src + ' to ' + dst);
		hanoi(disc - 1, aux, src, dst);
	}
};
hanoi(3, 'Src', 'Aux', 'Dst');

//It produces this solution for three discs:
//Move disc 1 from Src to Dst
//Move disc 2 from Src to Aux
//Move disc 1 from Dst to Aux
//Move disc 3 from Src to Dst
//Move disc 1 from Aux to Src
//Move disc 2 from Aux to Dst
//Move disc 1 from Src to Dst
//
//The hanoi function moves a stack of discs from one post to another, using the auxil-
//iary post if necessary. It breaks the problem into three subproblems. First, it uncov-
//ers the bottom disc by moving the substack above it to the auxiliary post. It can then
//move the bottom disc to the destination post. Finally, it can move the substack from
//the auxiliary post to the destination post. The movement of the substack is handled
//by calling itself recursively to work out those subproblems.
//
//The hanoi function is passed the number of the disc it is to move and the three posts
//it is to use. When it calls itself, it is to deal with the disc that is above the disc it is
//currently working on. Eventually, it will be called with a nonexistent disc number. In
//that case, it does nothing. That act of nothingness gives us confidence that the func-
//tion does not recurse forever.
//
//Recursive functions can be very effective in manipulating tree structures such as the
//browser’s Document Object Model (DOM). Each recursive call is given a smaller
//piece of the tree to work on:

// Define a walk_the_DOM function that visits every
// node of the tree in HTML source order, starting
// from some given node. It invokes a function,
// passing it each node in turn. walk_the_DOM calls
// itself to process each of the child nodes.
var walk_the_DOM = function walk(node, func) {
	func(node);
	node = node.firstChild;
	while (node) {
		walk(node, func);
		node = node.nextSibling;
	}
};

// Define a getElementsByAttribute function. It
// takes an attribute name string and an optional
// matching value. It calls walk_the_DOM, passing it a
// function that looks for an attribute name in the
// node. The matching nodes are accumulated in a
// results array.

var getElementsByAttribute = function (att, value) {
	var results = [];
	walk_the_DOM(document.body, function (node) {
		var actual = node.nodeType === 1 && node.getAttribute(att);
		if (typeof actual === 'string' &&
			(actual === value || typeof value !== 'string')) {
			results.push(node);
		}
	});
	return results;
};

//Some languages offer the tail recursion optimization. This means that if a function
//returns the result of invoking itself recursively, then the invocation is replaced with a
//loop, which can significantly speed things up. Unfortunately, JavaScript does not
//currently provide tail recursion optimization. Functions that recurse very deeply can
//fail by exhausting the return stack:

// Make a factorial function with tail
// recursion. It is tail recursive because
// it returns the result of calling itself.
// JavaScript does not currently optimize this form.
var factorial = function factorial(i, a) {
	a = a || 1;
	if (i < 2) {
		return a;
	}
	return factorial(i - 1, a * i);
};
document.writeln(factorial(4)); // 24