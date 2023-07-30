process.stdin.on('data', (data) => {
    const dataArray = Array.from(data.toString().trim());
    const result = dataArray.reverse();
    const red = result.join('');
    process.stdout.write(red);
});

process.stdin.on("end", () => {
  console.log("Input stream ended");
});

console.log("Enter some text:");
