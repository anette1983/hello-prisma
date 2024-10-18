import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// ... you will write your Prisma Client queries here
	// Create a new User record
	// const user = await prisma.user.create({
	// 	data: {
	// 		name: 'Alice',
	// 		email: 'alice@prisma.io',
	// 	},
	// });
	// console.log(user);
	// Next, execute the script with the following command:

	// npx ts-node script.ts
	// created first database record with Prisma Client!
	// result: { id: 1, email: 'alice@prisma.io', name: 'Alice' }

	// const users = await prisma.user.findMany();
	// console.log(users);

	// create a User and a Post record in a nested write query.

	// const user = await prisma.user.create({
	// 	data: {
	// 		name: 'Bob',
	// 		email: 'bob@prisma.io',
	// 		posts: {
	// 			create: [
	// 				{
	// 					title: 'Hello World',
	// 					published: true,
	// 				},
	// 				{
	// 					title: 'My second post',
	// 					content: 'This is still a draft',
	// 				},
	// 			],
	// 		},
	// 	},
	// });
	// console.log(user);
	const usersWithPosts = await prisma.user.findMany({
		include: {
			posts: true,
		},
	});
	console.dir(usersWithPosts, { depth: null });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
