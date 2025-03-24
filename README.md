# crypto-monitor
Crypto market monitor and statistics calculator using OKX API and websockets.

## Tech stack
- Javascript (Node.js)
- PostgreSQL with Prisma ORM
- OKX API for crypto market data

## Prerequisites
You need to have Node.js installed, which is a javascript runtime environment. You can download it from [here](https://nodejs.org/en/download/).

You also need to have PostgreSQL installed. You can download it from [here](https://www.postgresql.org/download/). After installing PostgreSQL, you need to create a database called `crypto_monitor`. You can do this by running the following command in the terminal:
```bash
createdb crypto_monitor
```

## Installation
1. Clone the repository
```bash
git clone git@github.com:NontasBak/crypto-monitor.git
```
2. Install the dependencies
```bash
cd crypto-monitor
npm install
```
3. Create a `.env` file in the root directory of the project and add the following environment variables:
```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/crypto_monitor?schema=public"
```
Replace `<username>` and `<password>` with your PostgreSQL username and password.

4. Run the migrations
```bash
npm run build
```
5. Start the server
```bash
npm start
```

## View results
All results are saved in the database. You can view the results by connecting to the database and running SQL queries. You can connect to the database using the following command:
```bash
psql crypto_monitor
```
Then run any of the following queries:
```sql
SELECT * FROM "Measurement";
SELECT * FROM "Average";
SELECT * FROM "Pearson";
```
To exit the psql shell, run the following command:
```bash
\q
```

### Author
Epameinondas Bakoulas

### License
This project is licensed under the MIT License
