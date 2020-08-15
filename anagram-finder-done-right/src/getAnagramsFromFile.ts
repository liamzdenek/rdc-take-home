import fs from 'fs';
import readline from 'readline';

import {AnagramFinderContext, AnagramHashTable} from './AnagramFinderContext';

// expects the file to be formatted as 1 line = 1 word
export async function getAnagramsFromFile(filename: string): Promise<AnagramHashTable> {
	const lineReader = readline.createInterface({
		input: fs.createReadStream(filename),
	});

	const anagramFinderContext = new AnagramFinderContext();

	for await (const word of lineReader) {
		anagramFinderContext.putAndCheckWord(word);
	}

	return anagramFinderContext.getResults();
}


