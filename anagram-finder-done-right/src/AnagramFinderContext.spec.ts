import {AnagramFinderContext, toSortedWord} from './AnagramFinderContext';

describe('AnagramFinderContext', () => {
	const WORD = "WORD";
	const WORD_DIFFERENT_CASE = "WoRd";
	const WORD_MULTIBYTE = "我喜欢美国菜😍";
	//const WORD_2 = "WORD_2";

	let ctx: AnagramFinderContext = null;

	beforeEach(() => {
		ctx = new AnagramFinderContext();
	});

	it('should keep track of which words it has seen before', () => {
		expect(ctx.putAndCheckWord(WORD)).toBe(false);
		expect(ctx.putAndCheckWord(WORD)).toBe(true);
	});

	it('should keep track of which words it has seen before, putWord version', () => {
		ctx.putWord(WORD);
		expect(ctx.putAndCheckWord(WORD)).toBe(true);
	});

	it('should recognize words with different case as the same word', () => {
		ctx.putWord(WORD);

		expect(ctx.putAndCheckWord(WORD_DIFFERENT_CASE)).toBe(true);
	});

	it('should not return words that are seen only once from getResults()', () => {
		ctx.putWord(WORD);

		expect(Object.entries(ctx.getResults()).length).toBe(0);
	});

	it('should return words that are seen at least once from getResults()', () => {
		ctx.putWord(WORD);
		ctx.putWord(WORD);
		ctx.putWord(WORD); // important to do this at least three times to ensure the output result only has it once

		const results = ctx.getResults();

		expect(Object.entries(results).length).toBe(1);
		expect([...results[toSortedWord(WORD)]]).toEqual([WORD]);
	});

	it('should handle multibyte characters correctly', () => {
		expect(ctx.putAndCheckWord(WORD_MULTIBYTE)).toBe(false);
		expect(ctx.putAndCheckWord(WORD_MULTIBYTE)).toBe(true);

		const results = ctx.getResults();
		expect([...results[toSortedWord(WORD_MULTIBYTE)]]).toEqual([WORD_MULTIBYTE]);
	});

});
