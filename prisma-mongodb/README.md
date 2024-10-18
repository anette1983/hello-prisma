1. initialize new project
   npm init -y
2. install dependencies
   npm i prisma typescript ts-node @types/node @prisma/client --save-dev
3. initialize typescript
   npx tsc --init
4. set up prisma project
   npx prisma init
5. create connection url
   https://www.prisma.io/docs/orm/reference/connection-urls

   for mongo

```
datasource db {
  provider = "mongodb"
  url      = "mongodb+srv://root:<password>@cluster0.ab1cd.mongodb.net/myDatabase?retryWrites=true&w=majority"
}
```

for local mongo:

```
datasource db {
  provider = "mongodb"
  url      = "mongodb://localhost:27017/myDatabase"
}
```

6. add .env var
7. update schema on schema.prisma
8. regenerate our prisma schema
   npx prisma generate
   rerun this command after every schema change
   npx prisma db push
9. import prisma client

```
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
```

10. run demo
    npx ts-node index.ts

11. create entities in schema

**Запуск монго дб локально**

Якщо MongoDB вже налаштовано як сервіс на вашому комп'ютері, він може автоматично запускатися разом з операційною системою. У такому випадку нічого додатково робити не потрібно.

Якщо MongoDB не запущено як сервіс (мій випадок), потрібно запустити його вручну за допомогою:
в баш як адмін
mongod --config "C:\Program Files\...\mongod.cfg"
(env.LAUNCH_COMMAND)

Переконатися, що MongoDB працює:

в проекті термінал 1
mongosh
Переконайтеся, що ви можете підключитися без помилок.

Ініціалізувати репліка-сет потрібно тільки один раз, якщо ви вже зробили це, то команду rs.initiate() в майбутньому не треба вводити після кожного запуску mongod і mongosh, репліка-сет автоматично працюватиме.

#Prisma
потребує MongoDB, налаштовану як репліка-сет, для підтримки транзакцій. За замовчуванням, локальна установка MongoDB працює як окремий сервер (standalone), а не як репліка-сет.

Щоб вирішити цю проблему, можна налаштувати локальну MongoDB як репліка-сет.
mongod --shutdown
mongod --replSet rs0
mongosh
rs.initiate()
перезапустити додаток
npx ts-node index.ts

bash: mongod: command not found вказує на те, що команда mongod не встановлена або не додана до вашого шляху (PATH).
Перейдіть на MongoDB Downloads Page та завантажте інсталятор для Windows.
Під час встановлення оберіть опцію "Complete" та переконайтеся, що вибрано "Install MongoDB as a Service".
Переконайтесь, що опція "Add MongoDB to PATH" також активована під час інсталяції.
Якщо MongoDB вже встановлено
Знайдіть каталог встановлення MongoDB (наприклад, C:\Program Files\MongoDB\Server\X.X\bin).
Додайте цей шлях до змінної PATH:
Відкрийте "Панель керування" > "Система" > "Додаткові параметри системи".
Натисніть "Змінні середовища".
У розділі "Системні змінні" знайдіть "Path" і додайте шлях до каталогу MongoDB.

https://www.mongodb.com/docs/manual/tutorial/convert-standalone-to-replica-set/
