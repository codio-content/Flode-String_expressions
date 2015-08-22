// Load testing framework
var testing = require('/home/codio/workspace/.guides/test-fw/testing')

// Set up inputs and expected result
// No inputs in this test
expected = 'Hello World'

// Call chart
var output = testing.RunGraphWithInputs('basic-string.flode', [])

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
  console.log('You got this wrong! You output "' + output[0] + '" instead of "Hello World".')
  process.exit(1)
}

