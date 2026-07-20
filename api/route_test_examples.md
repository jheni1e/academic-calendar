# Structure

## User

### Create user
#### Required
    "edv": number;
    "name": string; 
    "birthdate": Date (format ISO-8601);
    "password": string 
    "role" : string[] 

### Update user
#### Required
    "name"?: string;
    "birthdate"?: Date;
    "roleToAdd"?: string
    "roleToRemove"?: string

---
## Class

### Create class
#### Required
    "name" : string;
    "isActive" : boolean;

### Update class
#### Required
    "name"? : string;
    "isActive"? : boolean;
---

## Role

### Create role
#### Required
    "name": string

### Update role
#### Required
    "name"?: string
---
## Assignment

### Create Assignment
#### Required
    "userId": number;
    "roleId": number;
---
## Room

### Create room 
#### Required
    "title": string;
    "capacity": number;
    "description": string;

### Update room 
#### Required
    "title": string;
    "capacity": number;
    "description": string;
    "is_active"?: boolean;
---
## Subject

### Create Subject
#### Required
    "classId": number;
    "name": string;
    "workload": number;
    "startDate": Date;
    "endDate": Date;

### Update Subject
#### Required
    "classId"?: number;
    "name"?: string;
    "workload"?: number;
    "startDate"?: Date;
    "endDate"?: Date;
---
## Event

### Create Event
#### Required
    "title": string;
    "description"?: string;
    "eventTypeId": number;
    "subjectId"?: number;
    "classId"?: number;
    "createdBy": number;

### Update Event
#### Required
    "title"?: string;
    "description"?: string;
    "eventTypeId"?: number;
    "subjectId"?: number;
    "classId"?: number;
---
## Event Role

### Create Event Role
#### Required
    "name": string;

### Update Event Role
#### Required
    "name"?: string;
    