# Backend

## Local execution

Install all dependencies

```bash
npm i
```

Create a local development database

```bash
mysqlsh -u root
\sql
create database `edel_hack_dev`;
```

Create .env file from .env.sample

Initialize database

```bash
npm run migration:run
```

Run

```bash
npm run dev
```

After this server starts, start the data stream server

## TODO

Top gainers
Top losers
Futures and call options and put options
