# Structure

## Create role
    "name": string

## Create user
    ### Required
    "edv": number;
    "name": string; 
    "birthdate": Date (format ISO-8601);
    "password": string 
    "role" : string[] 

## Create room 
    ### Required
    "title": string;
    "capacity": number;
    "description": string;