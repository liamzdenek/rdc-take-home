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
	
	it('should store words of differing case as separate words that match the anagram', () => {
		ctx.putWord(WORD);
		ctx.putWord(WORD_DIFFERENT_CASE);
		expect([...ctx.getAnagramsOfWord(WORD).values()]).toEqual([WORD, WORD_DIFFERENT_CASE]);
	});

	it('should not return words that are seen only once from getResults()', () => {
		ctx.putWord(WORD);

		expect(Object.entries(ctx.getResults())).toEqual([]);
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

	it('should store words with putWord', () => {
		ctx.putWord(WORD);
		expect([...ctx.getAnagramsOfWord(WORD)]).toEqual([WORD]);
	});

	it('should show the number of unique anagram keys stored', () => {
		expect(ctx.size()).toBe(0);
		ctx.putWord(WORD);
		expect(ctx.size()).toBe(1);
		ctx.putWord(WORD_DIFFERENT_CASE);
		expect(ctx.size()).toBe(1);
		ctx.putWord(WORD_MULTIBYTE);
		expect(ctx.size()).toBe(2);
	});

});
