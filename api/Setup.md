# BackEnd Setup

## Dependencies

- React Router Dom
- Express
- Prisma
- DotEnv

## Structure

General - src/modules/academic  
Specific -
src/modules/features    

feature/    
...... controllers
...... usecases     
...... repositories
...... dto
...... routes

### UseCases
Makes the business rule work.
### Repository
Comunicates directly with the Database

## Installed


### TypeScript
add typescript tsx @types/node --dev
npx tsc --init

### Prisma

npm install prisma @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg pg dotenv
npx prisma init

### Dotenv and Express

npm install dotenv

npm install express
npm install -D @types/express
npm install cors dotenv
npm install -D @types/cors

## Get Prisma Database

npx prisma db push

## Setup

Create .env

git pull
npm install
npx prisma generate
npx prisma migrate dev