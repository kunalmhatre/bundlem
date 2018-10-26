import app from './app';

app.set('port', process.env.PORT || 1337)
	.listen(
		app.get('port'),
		() => console.log(`Bundlem running on port: ${app.get('port')}`)
	);