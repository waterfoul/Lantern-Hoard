const db = require('.');

// const seedUsers = () => db.Promise.map([
// 	{name: 'so many', email: 'god@example.com', isAdmin: true, password: '1234'},
// 	{name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
// ], user => db.model('users').create(user));

db.didSync
	.then(() => db.sync({ force: true }))
	// .then(seedUsers)
	// .then(users => console.log(`Seeded ${users.length} users OK`))
	// This is just a utility, not part of the server
	// eslint-disable-next-line no-console
	.catch((error) => console.error(error))
	.finally(() => db.close());
