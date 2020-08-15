import {getAnagramsFromFile} from './getAnagramsFromFile';

async function main(): Promise<void> {
	const anagrams = await getAnagramsFromFile(process.argv[2]);

	for(let wordList of Object.values(anagrams)) {
		console.log([...wordList.values()].join(','));
		// can improve performance by calling console.log once with a prepared string
	}
}

main().catch(e => {
	console.log('Error parsing anagrams: ', e);	
});
