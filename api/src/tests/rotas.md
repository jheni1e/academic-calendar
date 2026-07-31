# User

### Post
    http://localhost:8080/api/user/ 

### Get
    http://localhost:8080/api/user/all
    http://localhost:8080/api/user/edv/:edv 
    http://localhost:8080/api/user/id/:userId 
    http://localhost:8080/api/user/classes
    http://localhost:8080/api/user/classes/:classId 
    http://localhost:8080/api/user/events 
    http://localhost:8080/api/user/instructors 
    http://localhost:8080/api/user/subjects


### Put
    http://localhost:8080/api/user/:userId
    http://localhost:8080/api/user/disable/:userId
    http://localhost:8080/api/user/enable/:userId
    http://localhost:8080/api/user/event/confirm/:participationId
    http://localhost:8080/api/user/event/decline/:participationId

# Login

    http://localhost:8080/api/auth/login


# Class

### Post
    http://localhost:8080/api/class 
    http://localhost:8080/api/participant

### Get
    http://localhost:8080/api/class/all
    http://localhost:8080/api/class/:classId
    http://localhost:8080/api/class/participants/:classId - all participants
    http://localhost:8080/api/class/events/:classId

### Put
    http://localhost:8080/api/class/:classId
    http://localhost:8080/api/class/enable/:classId
    http://localhost:8080/api/class/disable/:classId

### Delete
    http://localhost:8080/api/class/:classId

# Room

### Post
    http://localhost:8080/api/room
    http://localhost:8080/api/reservation

### Get
    http://localhost:8080/api/room/all
    http://localhost:8080/api/room/:roomId
    http://localhost:8080/api/room/reservations/:roomId
    http://localhost:8080/api/room/events/:roomId

### Put
    http://localhost:8080/api/room/:roomId
    http://localhost:8080/api/room/deactivate/:roomId

### Delete
    http://localhost:8080/api/room/reservation/:roomId
    http://localhost:8080/api/room/:roomId


# Subject

### Post 
    http://localhost:8080/api/subject
    http://localhost:8080/api/subject/instructor

### Get
    http://localhost:8080/api/subject/all
    http://localhost:8080/api/subject/:subjectId
    http://localhost:8080/api/subject/instructors/:subjectId
    http://localhost:8080/api/subject/instructor/:instructorId/ongoing
    http://localhost:8080/api/subject/class/:classId/ongoing
    http://localhost:8080/api/subject/:subjectId/instructor/:instructorId

### Put
    http://localhost:8080/api/subject/:subjectId

### Delete
    http://localhost:8080/api/subject/:subjectId
    http://localhost:8080/api/subject/:subjectId/instructor/:instructorId

# Event

### Post
    http://localhost:8080/api/event
    http://localhost:8080/api/event/participants/

### Get
    http://localhost:8080/api/event/all
    http://localhost:8080/api/event/:eventId
    http://localhost:8080/api/event/participants/all/:eventId

### Put
    http://localhost:8080/api/event/:eventId
    http://localhost:8080/api/event/block/:eventId
    http://localhost:8080/api/event/unblock/:eventId
    http://localhost:8080/api/event/confirm/:eventId
    http://localhost:8080/api/event/cancel/:eventId


### Delete
    http://localhost:8080/api/event/:id
    http://localhost:8080/api/event/participants/remove/:classUserId

# Schedule

### Post
    http://localhost:8080/api/scheduler/lessons









