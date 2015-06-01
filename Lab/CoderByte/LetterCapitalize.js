//Using the JavaScript language, have the function LetterCapitalize(str) take the str parameter being passed and capitalize the first letter of each word. Words will be separated by only one space. 
//
//Use the Parameter Testing feature in the box below to test your code with different arguments.

function LetterCapitalize(str) { 

  // code goes here  
  var arr = str.split(' ');
  return arr.map(function(s){
    return s.charAt(0).toUpperCase() + s.slice(1);
  }).join(' ');      
}
   
console.log(LetterCapitalize('hello world'));  
console.log(LetterCapitalize('i ran there'));  