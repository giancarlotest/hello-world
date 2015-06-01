function LongestWord(sen) { 

  // code goes here
  var w = '';  
  var arr = sen.match(/\w+/gi);
  while(arr.length > 0) {
    var xw = arr.splice(0, 1);
    if(xw[0].length > w.length) {
      w = xw[0];
    }
  }  
  return w;
}

console.log(LongestWord('fun&!! time'));
console.log(LongestWord('I love dogs'));