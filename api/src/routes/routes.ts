import { Express } from 'express';
import express from 'express'
import auth from "./auth.routes.ts"
import user from "./user.routes.ts"
import event from "./event.routes.ts"
import room from "./room.routes.ts"
import subject from "./subject.routes.ts"
import classs from "./class.routes.ts"
import scheduler from "./schedule.routes.ts"
import { errorMiddleware } from '../shared/middlewares/error.middleware.ts';

export default function (app: Express) {
app
    .use(express.json())
    .use('/api/auth', auth)
    .use('/api/user', user) 
    .use('/api/event', event)
    .use('/api/room', room)
    .use('/api/subject', subject)
    .use('/api/class', classs)
    .use('/api/scheduler', scheduler)
    .use(errorMiddleware);
}