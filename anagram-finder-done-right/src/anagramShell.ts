import {AnagramFinderContext} from './AnagramFinderContext';
import {getAnagramsFromFile} from './getAnagramsFromFile';
import readline from 'readline';
import colors from 'colors';

interface CommandTable {
	[k: string]: (ctx: AnagramFinderContext, shell: readline.Interface, argv: string[]) => Promise<void>;
}

// TODO: would be cleaner to move this to other files
const commands: CommandTable = {
	// keys in this object are the command. These functions
	// don't follow normal js naming conventions because
	// the key is the command, and i want the user's
	// commands to all be lowercase, like a typical
	// bash shell

	"addfile": async (ctx: AnagramFinderContext, shell: readline.Interface, argv: string[]): Promise<void> => {
		if(argv.length !== 1) {
			shell.write(colors.red(`\`addfile\` expects exactly 1 argument: a file relative to cwd`));
		}

		await getAnagramsFromFile(argv[0], ctx);
	},

	"printresults": async (ctx: AnagramFinderContext, shell: readline.Interface, argv: string[]): Promise<void> => {
		if(argv.length !== 0) {
			shell.write(colors.red(`\`printresults\` expects zero arguments`));
		}

		const results = ctx.getResults();

		for(let result of Object.values(results)) {
			shell.write("\t"+colorEachWord([...result.keys()]).join(" "));
		}
	}
}

const colorEachWord = (words: string[]) => {
	const colorFunctions = [colors.green, colors.blue, colors.magenta];

	return words.map((value, index) =>
		colorFunctions[index % colorFunctions.length](value)
	)
}

const runCommand = async (
	ctx: AnagramFinderContext,
	shell: readline.Interface,
	argv: string[]
): Promise<void> => {
	try {
		if(argv.length === 0) {
			return; // give the user a new prompt
		}

		const commandName = argv[0];
		const command = commands[commandName];
		
		if(!command) {
			// TODO: add fuzzaldrin-plus to recommend a
			// "did you mean X"
			shell.write(colors.red(`No such command "${commandName}"`));
			return;
		}

		command(ctx, shell, argv.slice(1));
	} catch(e) {
		shell.write(colors.red(`Caught exception while trying to process command "${argv}": ${e}\n`)+e.stack+"\n");
	}
};

// util.promisify doesn't work on this method -- i think lack of an error field is causing typescript to break
const promisifyQuestion = (rl: readline.Interface) => (questionText: string): Promise<string> => new Promise(resolve => rl.question(questionText, resolve))

export async function anagramShell(seedFilename: string): Promise<void> {
	const ctx = new AnagramFinderContext();

	const shell = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	if(seedFilename) {
		runCommand(ctx, shell, ["addfile", seedFilename]);
	}
	
	const question = promisifyQuestion(shell);

	// TODO: improve this by migrating session into an app context object, so we don't have to rely on process.exit() or ^C to termiante
	while(true) {
		const arg_string = await question("> ");
		const argv = arg_string.split(" ");
		console.log('argv', argv);
	}
}
