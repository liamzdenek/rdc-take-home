import {anagramShell} from './anagramShell';

async function main(): Promise<void> {
	await anagramShell(process.argv[2]);
	console.log('bye!');
	process.exit(0);
}

main().catch(e => {
	console.log('Error parsing anagrams: ', e);	
});
