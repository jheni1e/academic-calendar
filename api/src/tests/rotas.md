# User

### Post
    http://localhost:8080/api/user/ 

### Get
    http://localhost:8080/api/user/all
    http://localhost:8080/api/user/edv/:edv 
    http://localhost:8080/api/user/id/:id 
    http://localhost:8080/api/user/classes
    http://localhost:8080/api/user/classes/:classId 
    http://localhost:8080/api/user/events 
    http://localhost:8080/api/user/instructors 


### Put
    http://localhost:8080/api/user/:id
    http://localhost:8080/api/user/disable/:id
    http://localhost:8080/api/user/enable/:id
    http://localhost:8080/api/user/event/confirm/:id

# Login

    http://localhost:8080/api/auth/login


# Class

### Post
    http://localhost:8080/api/class 
    http://localhost:8080/api/participant

### Get
    http://localhost:8080/api/class/all
    http://localhost:8080/api/class/:id
    http://localhost:8080/api/class/participants/:id - all participants

### Put
    http://localhost:8080/api/class/:id
    http://localhost:8080/api/class/enable/:id
    http://localhost:8080/api/class/disable/:id

### Delete
    http://localhost:8080/api/class/participants/remove/:id
    http://localhost:8080/api/class/:id

# Room

### Post
    http://localhost:8080/api/room
    http://localhost:8080/api/reservation

### Get
    http://localhost:8080/api/room/all
    http://localhost:8080/api/room/:id
    http://localhost:8080/api/room/reservations/:roomId

### Put
    http://localhost:8080/api/room/:id
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
    http://localhost:8080/api/subject/:id
    http://localhost:8080/api/subject/instructors/:subjectId

### Put
    http://localhost:8080/api/subject/:id

### Delete
    http://localhost:8080/api/subject/:id
    http://localhost:8080/api/subject/participants/remove/:participationId

# Event

### Post
    http://localhost:8080/api/event
    http://localhost:8080/api/event/participants/:eventId

### Get
    http://localhost:8080/api/event/all
    http://localhost:8080/api/event/:id
    http://localhost:8080/api/event/participants/:eventId

### Put
    http://localhost:8080/api/event/:id

### Delete
    http://localhost:8080/api/event/:id
    http://localhost:8080/api/event/participants/remove/:classUserId

# Schedule

### Post
    http://localhost:8080/api/lessons









