import deepcopy from 'deepcopy';

// this is the hash key. If two strings have the same
// return value of this function, they are assumed to
// be anagrams
export const toSortedWord = (word: string): string =>
	word.toLowerCase().split("").sort().join("");

// This is an object where the key is the result of the
// toSortedWord function, and the value is a Set of all
// of the known strings that match that set
export interface AnagramHashTable {
	[k: string]: Set<string> 
}

// a context object should be created per execution.
export class AnagramFinderContext {
	private sortFunction = toSortedWord;
	
	// anagramHashTable tracks *all* strings
	private anagramHashTable: AnagramHashTable = {};

	// anagramHashTable is a subset of entries in anagramHashTable where the value list has at least 2 items
	private anagramHashTableResults: AnagramHashTable = {};


	putAndCheckWord(word: string): boolean {
		const sortedWord = this.sortFunction(word);
		let returnValue = this.anagramHashTable.hasOwnProperty(sortedWord);
		this._putWord(sortedWord, word);
		return returnValue;
	}

	putWord(word: string): void {
		this._putWord(this.sortFunction(word), word);
	}

	size(): number {
		return Object.keys(this.anagramHashTable).length;
	}

	private _putWord(sortedWord: string, word: string): void {
		if(!this.anagramHashTable[sortedWord]) {
			// if the sortedWord key has not been seen before, this cannot possibly be the second word, so there is no need to update the Results hashtable
			this.anagramHashTable[sortedWord] = new Set([word]);
		} else {
			// if this key has been seen before, it must meet the criteria to be in the Results hashtable
			const wordSet = this.anagramHashTable[sortedWord];
			wordSet.add(word);

			// this uses a reference to the same Set instance
			// which means we should never mutate the
			// Results set directly
			this.anagramHashTableResults[sortedWord] = wordSet;
			
		}
	}

	// either make this object immutable (deepfreeze),
	// or return a copy. I chose
	// deepcopy because it supports more use cases by
	// allowing the client to continue to use the
	// AnagramFinderContext, although it has a much
	// higher cost than a deepfreeze()
	//
	// without a freeze or copy, this is essentially
	// a builder and no other methods in the context
	// should be called, and the context should be
	// discarded. But nothing enforces that, so it's 
	// dangerous
	//
	// in case the internal details are changed, we
	// do not want users to rely on mutation semantics
	// of the return value of this function
	getResults(): AnagramHashTable {
		return deepcopy(this.anagramHashTableResults)
	}


}
