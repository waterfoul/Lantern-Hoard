const yargs = require('yargs');

module.exports = yargs
  .env('LH')
  .showHelpOnFail(true)
  .help('help')
  .config('config')
  .options({
	verbose: {
		alias: 'v',
		count: true,
		description: 'Increases verbosity 0 times = Warnings+, 1 = Debug+, 2 = Verbose+'
	},
	port: {
		alias: 'p',
	  default: 1337,
		number: true
	},
	facebookClientId: {
		description: 'Oauth facebook client Id'
	},
	facebookClientSecret: {
		description: 'Oauth facebook client Secret'
	}
})
  .argv;
