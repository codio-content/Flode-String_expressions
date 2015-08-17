// Setup
names = ['John', 'Alice', 'Mike', 'Susan', 'Richard', 'Sally']
index = Math.floor(Math.random() * 6)

// Prepare input
inp0 = names[index]

// Expected result
result = inp0 + ', hello!'

// Get output
out0 = 'Richard, hello!'

// Check
if (out0 == result) {
  console.log('Well done!!')
  process.exit(0)
}
else {
  console.log('You returned "' + out0 + '" but we expected "' + result + '"' )
  process.exit(1)
}

