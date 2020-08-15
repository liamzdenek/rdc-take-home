import fs from 'fs';
import readline from 'readline';

import {AnagramFinderContext} from './AnagramFinderContext';

const createReadStreamSafely = (filename: string): Promise<fs.ReadStream> => new Promise((resolve, reject) => {
	const rs = fs.createReadStream(filename);

	const doResolve = () => {
		rs.removeListener('error', reject);
		rs.removeListener('open', doResolve);
		resolve(rs)
	};

	rs.pause();
	rs.on('error', reject);
	rs.on('open', doResolve);
});

// expects the file to be formatted as 1 line = 1 word
export async function getAnagramsFromFile(filename: string, context: AnagramFinderContext): Promise<void> {
	const lineReader = readline.createInterface({
		input: await createReadStreamSafely(filename),
	});

	for await (const word of lineReader) {
		context.putWord(word);
	}
}


