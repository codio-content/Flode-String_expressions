// Load testing framework
var testing = require('/home/codio/workspace/.guides/test-fw/testing')

// Set up inputs and expected result
var str = ['Tester', 'Another string', 'Friday', 'Cold', 'Temperature', 'Mite', 'End']
var index = Math.floor(Math.random() * 6 )
var a = str[index]
var expected = str[index] + ', hello!'

// Call chart
var output = testing.RunGraphWithInputs('join-string1.flode', [a])

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
  console.log('You got this wrong! We passed in "' + a + '" and got an output of "' + output[0] + '" instead of "' + expected + '".')
  process.exit(1)
}

