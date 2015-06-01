//Using the JavaScript language, have the function SimpleAdding(num) add up all the numbers from 1 to num. For the test cases, the parameter num will be any number from 1 to 1000. 
//
//Use the Parameter Testing feature in the box below to test your code with different arguments.

function SimpleAdding(num) { 

  // code goes here
  var n = 0;
  var i = 1;
  while(i <= num){
    n += i++;
  }  
  return n; 
         
}
   

console.log(SimpleAdding(12));
console.log(SimpleAdding(140)); 