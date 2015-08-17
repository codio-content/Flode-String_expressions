// Setup
i0 = Math.floor(Math.random() * 100)
i1 = Math.floor(Math.random() * 100)
inp0 = i0.toString()
inp1 = i1.toString()

// Expected output
result = inp0 + inp1

// Get output
out0 = 111

// Check
if (out0 === result) {
  console.log('Well done!!')
  process.exit(0)
}
else {
  console.log('We input ' + inp0 + ' and ' + inp1 + '. You returned "' + out0 + '" but we expected "' + result + '"' )
  process.exit(1)
}

