const fs = require('fs');

// i ran this with node 12, but it should work on earlier versions

const file = fs.readFileSync(process.argv[2]).toString('utf8');

let history = new Set();
let result = new Set();

//console.log('file', file);

file
	.split("\n")
	.map(word => word.split("").sort().join("").toLowerCase()) // not sure how this works on multibyte chars (emoji, chinese)
	.forEach(word => {
		//console.log('sorted word', word);
		if(history.has(word)) {
			result.add(word);
		}
		history.add(word)
	})
;

result.forEach(k => console.log(k)); // can't use method reference because additional argument is the set
