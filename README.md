<p align="center">
  <a href="" rel="noopener">
 <img src="" alt="Project logo"></a>
</p>
<h1 align="center">Option Chain</h1>

<div align="center" >

[![Hackathon](https://img.shields.io/badge/hackathon-Edelweiss-purple.svg)]()

## </div>

<h2 align="center"> 
</h2>

## 🧐 Problem Statement <a name = "problem_statement"></a>

## 💡 Idea / Solution <a name = "idea"></a>

## 🏁 Getting Started <a name = "getting_started"></a>

### Backend

1. Install all dependencies

```bash
npm i
```

2. Create a local development database

```bash
mysqlsh -u root
\sql
create database `edel_hack_dev`;
```

3. Create .env file from .env.sample

4. Initialize database

```bash
npm run migration:run
```

5. Run

```bash
npm run dev
```

### Data Server

```zsh
cd data_server
java -classpath feed-play.jar hackathon.player.Main dataset.csv 8000
```

### Frontend

```zsh
cd frontend
npm i
npm start
```

## ⛓️ Dependencies / Limitations <a name = "limitations"></a>

## 🚀 Future Scope <a name = "future_scope"></a>

## ⛏️ Built With <a name = "tech_stack"></a>

- **Backend**
- **Frontend**

## ✍️ Authors <a name = "authors"></a>

- [@Aditya](https://github.com/pettiboy)
- [@Gautam](https://github.com/pettiboy)
- [@Harshal](https://github.com/HarshalHDave)
- [@Hussain](https://github.com/pettiboy)
- [@Soham](https://github.com/pettiboy)

## 🎉 Acknowledgments <a name = "acknowledgments"></a>

- Hat tip to anyone whose code was used
