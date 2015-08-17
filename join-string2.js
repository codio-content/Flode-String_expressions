// Setup
names = ['John', 'Alice', 'Mike', 'Susan', 'Richard', 'Sally']
index = Math.floor(Math.random() * 6)

// Prepare inputs
inp0 = 'Hello'
inp1 = names[index]

// Expected output
result = inp0 + ' ' + inp1

// Get output
out0 = 'Hello Richard'

// Check
if (out0 == result) {
  console.log('Well done!!')
  process.exit(0)
}
else {
  console.log('You returned "' + out0 + '" but we expected "' + result + '"' )
  process.exit(1)
}

