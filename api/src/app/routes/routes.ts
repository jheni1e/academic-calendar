import { Express } from 'express';
import express from 'express'
import auth from "./auth.routes.ts"

export default function (app: Express) {
app
    .use(express.json())
    .use('/api/auth', auth)
}