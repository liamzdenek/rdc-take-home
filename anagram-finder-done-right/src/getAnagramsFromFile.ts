import fs from 'fs';
import readline from 'readline';

import {AnagramFinderContext} from './AnagramFinderContext';

// expects the file to be formatted as 1 line = 1 word
export async function getAnagramsFromFile(filename: string, context: AnagramFinderContext): Promise<void> {
	const lineReader = readline.createInterface({
		input: fs.createReadStream(filename),
	});

	for await (const word of lineReader) {
		context.putWord(word);
	}
}


