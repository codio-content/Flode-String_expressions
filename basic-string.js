
// Expected result
result = 'Hello World'

// Get output
out0 = 'Hello world'

// Check
if (out0 == result) {
  console.log('Well done!!')
  process.exit(0)
}
else {
  console.log('You returned "' + out0 + '" but we expected "' + result + '"' )
  process.exit(1)
}

