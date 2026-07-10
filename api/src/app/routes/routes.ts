import { Express } from 'express';
import express from 'express'
import auth from "./auth.routes.ts"
import user from "./user.routes.ts"
import role from "./role.routes.ts"

export default function (app: Express) {
app
    .use(express.json())
    .use('/api/auth', auth)
    .use('/api/user', user)
    .use('/api/role', role) 
}