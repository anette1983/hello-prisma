import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// async function main() {
// 	//connect the client
// 	await prisma.$connect();
// 	const cats = await prisma.cat.findMany();
// 	console.log(cats);
// }

async function main() {
	await prisma.$connect();
	await prisma.cat.create({
		data: {
			name: 'Sprinkles',
			color: 'Orange',
			breed: {
				create: {
					name: 'Tabby',
				},
			},
		},
	});

	const cats = await prisma.cat.findMany({
		include: {
			breed: true,
		},
	});

	// const cats = await prisma.cat.findMany({
	// });
	console.dir(cats, { depth: null });
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
