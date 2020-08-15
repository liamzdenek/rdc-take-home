import {AnagramFinderContext} from './AnagramFinderContext';
import {getAnagramsFromFile} from './getAnagramsFromFile';
import readline from 'readline';
import colors from 'colors';
import stream from 'stream';

interface ShellContext {
	shell: readline.Interface,
	input: stream.Readable,
	output: stream.Writable,
	anagramCtx: AnagramFinderContext,
	argv: string[]
	log: typeof console.log,
	shouldExit: boolean
}

interface CommandTable {
	[k: string]: (ctx: ShellContext) => Promise<void>;
}

// TODO: would be cleaner to move this to other files
const commands: CommandTable = {
	// keys in this object are the command. These functions
	// don't follow normal js naming conventions because
	// the key is the command, and i want the user's
	// commands to all be lowercase, like a typical
	// bash shell

	"addfile": async ctx => {
		if(ctx.argv.length !== 2) {
			ctx.log(colors.red(`\`addfile\` expects exactly 1 argument: a file relative to cwd`));
		}

		await getAnagramsFromFile(ctx.argv[1], ctx.anagramCtx);

		ctx.log(colors.green(`The context now contains ${ctx.anagramCtx.size()} anagram identifiers`));
	},

	"printresults": async ctx => {
		if(ctx.argv.length !== 1) {
			ctx.log(colors.red(`\`printresults\` expects zero arguments`));
		}

		const results = ctx.anagramCtx.getResults();

		const resultsArray = Object.values(results);
		for(let result of resultsArray) {
			ctx.log("\t"+colorEachWord([...result.keys()]).join(" "));
		}
		ctx.log(colors.underline(`${resultsArray.length} results`));
	},

	"get": async ctx => {
		if(ctx.argv.length !== 2) {
			ctx.log(colors.red(`\`get\` expects exactly 1 argument: a word to look for anagrams of`));
			return;
		}
		const anagrams = ctx.anagramCtx.getAnagramsOfWord(ctx.argv[1]);

		if(!anagrams) {
			ctx.log(colors.red(`No such word: "${ctx.argv[1]}"`));
			return;
		}

		ctx.log("\t"+colorEachWord([...anagrams.keys()]).join(" "));
	},

	"put": async ctx => {
		if(ctx.argv.length !== 2) {
			ctx.log(colors.red(`\`put\` expects exactly 1 argument: a word to create`));
			return;
		}
		ctx.anagramCtx.putWord(ctx.argv[1]);
	},

	"help": async ctx => {
		ctx.log("Try these commands: ");

		ctx.log("\t"+colorEachWord(Object.keys(commands)).join(" "));
	},

	"exit": async ctx => {
		ctx.shouldExit = true;
	}
}

const colorEachWord = (words: string[]) => {
	const colorFunctions = [colors.green, colors.blue, colors.magenta, colors.yellow];

	return words.map((value, index) =>
		colorFunctions[index % colorFunctions.length](value)
	)
}

const runCommand = async (ctx: ShellContext, argv: string[]): Promise<void> => {
	try {
		ctx.argv = argv;

		if(argv.length === 0 || (argv.length === 1 && argv[0] === "")) {
			return; // give the user a new prompt
		}

		const commandName = argv[0];
		const command = commands[commandName];
		
		if(!command) {
			// TODO: add fuzzaldrin-plus to recommend a
			// "did you mean X"
			ctx.log(colors.red(`No such command "${commandName}"`));
			return;
		}

		await command(ctx);
	} catch(e) {
		ctx.log(colors.red(`Caught exception while trying to process command "${argv}": ${e}\n`)+e.stack+"\n");
	}
};

// util.promisify doesn't work on this method -- i think lack of an error field is causing typescript to break
const promisifyQuestion = (rl: readline.Interface) => (questionText: string): Promise<string> => new Promise(resolve => rl.question(questionText, resolve))

function initShellContext(): ShellContext {
	const input = process.stdin;
	const output = process.stdout;
	
	const ctx: ShellContext = {
		anagramCtx: new AnagramFinderContext(),
		shell: readline.createInterface({
			input,
			output
		}),
		input,
		output,
		argv: null,
		shouldExit: false,
		log: console.log // TODO: hook this up to output. ran into some problems using output.write() for this, not a high priority fix
	};

	return ctx;
}

export async function anagramShell(seedFilename: string): Promise<void> {
	const ctx = initShellContext();

	if(seedFilename) {
		await runCommand(ctx, ["addfile", seedFilename]);
	}
	
	const question = promisifyQuestion(ctx.shell);

	while(!ctx.shouldExit) {
		const arg_string = await question("> ");
		const argv = arg_string.split(" ");
		await runCommand(ctx, argv);
	}
}
