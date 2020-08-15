import {file} from 'tmp-promise';
import {writeFileSync} from 'fs';

import {getAnagramsFromFile} from './getAnagramsFromFile';
import {AnagramFinderContext} from './AnagramFinderContext';

jest.mock('./AnagramFinderContext');

const TEST_FILE_CONTENTS_1 = `alphabet
Alphabet
`;

describe('getAnagramsFromFile', () => {
	it('should read a file from disk, and add each word to the provided anagram context', async () => {
		const tmpFile = await file();

		writeFileSync(tmpFile.path, TEST_FILE_CONTENTS_1);

		const ctx = new AnagramFinderContext();

		await getAnagramsFromFile(tmpFile.path, ctx);

		expect(ctx.putWord).toBeCalledWith('alphabet');
		expect(ctx.putWord).toBeCalledWith('Alphabet');
	});
});
