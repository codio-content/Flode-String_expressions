// Load testing framework
var testing = require('/home/codio/workspace/.guides/test-fw/testing')

// Set up inputs and expected result
var str = ['Tester', 'Another string', 'Friday', 'Cold', 'Temperature', 'Mite', 'End']
var str2 = ['Alice', 'Bob', 'Tariq', 'Shahneila', 'Susan', 'Mike', 'Calista']
var index = Math.floor(Math.random() * 6 )
var index2 = Math.floor(Math.random() * 6 )
var a1 = str[index]
var a2 = str[index2]
var expected = str[index] + ' ' + str[index2]

// Call chart
var output = testing.RunGraphWithInputs('join-string2.flode', [a1, a2])

// Check for no output
if (output.length == 0) {
  console.log('Your chart did not output any results.')
  process.exit(1)
}

// Evaluate
if (output[0] === expected) {
  console.log('Well done!');
  process.exit(0);
}
else {
  console.log('You got this wrong! We passed in "' + a1 + '" and "' + a2 + '" then got an output of "' + output[0] + '" instead of "' + expected + '".')
  process.exit(1)
}

