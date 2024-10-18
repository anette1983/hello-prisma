Models in the Prisma schema have two main purposes:

Represent the tables in the underlying database
Serve as foundation for the generated Prisma Client API

#Run a migration to create your database tables with Prisma Migrate
At this point, you have a Prisma schema but no database yet. Run the following command in your terminal to create the SQLite database and the User and Post tables represented by your models:

npx prisma migrate dev --name init

To send queries to the database, you will need a TypeScript file to execute your Prisma Client queries. Create a new file called script.ts for this purpose:

touch script.ts

create a User and a Post record in a nested write query. Afterwards, you'll see how you can retrieve the relation from the database using the include option.

By default, Prisma Client only returns scalar fields in the result objects of a query. That's why, even though you also created a new Post record for the new User record, the console only printed an object with three scalar fields: id, email and name.
In order to also retrieve the Post records that belong to a User, you can use the include option via the posts relation field

```ts
const usersWithPosts = await prisma.user.findMany({
	include: {
		posts: true,
	},
});
console.dir(usersWithPosts, { depth: null });
```

```
[
  { id: 1, email: 'alice@prisma.io', name: 'Alice', posts: [] },
  {
    id: 2,
    email: 'bob@prisma.io',
    name: 'Bob',
    posts: [
      {
        id: 1,
        title: 'Hello World',
        content: null,
        published: true,
        authorId: 2
      },
      {
        id: 2,
        title: 'My second post',
        content: 'This is still a draft',
        published: false,
        authorId: 2
      }
    ]
  }
]
```

Prisma ORM comes with a built-in GUI to view and edit the data in your database. You can open it using the following command:

npx prisma studio

Check out the
prisma-examples
repository on GitHub to see how Prisma ORM can be used with your favorite library. The repo contains examples with Express, NestJS, GraphQL as well as fullstack examples with Next.js and Vue.js, and a lot more.
