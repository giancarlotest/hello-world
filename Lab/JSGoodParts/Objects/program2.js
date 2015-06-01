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
//chance of bad interactions with other applications, widgets, or libraries. Your program
//also becomes easier to read because it is obvious that MYAPP.stooge refers to a
//top-level structure. In the next chapter, we will see ways to use closure for information
//hiding, which is another effective global abatement technique.