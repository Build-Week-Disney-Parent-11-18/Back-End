# Disney Parent
As a parent with small children, would you like to make your Disney Experience more fun and economical?  Disney Parent puts the tools in your hands to be able to swap childcare and stroller passes with other parents allowing you save money and enjoy the 'big-kid' rides.
___
## **ENDPOINTS** 
___

### _Base URL_
`https://disneyparentdb.herokuapp.com`

### _Authentication_
| Method        | Request URL            | Description                          |
| ------------- | :--------------------: | ------------------------------------ |
| POST          | `/api/auth/register`   | Create a new user                    |
| POST          | `/api/auth/login`      | Creates token to verify a user       |

### _Users_
| Method        | Request URL            | Description                          |
| ------------- | :--------------------: | ------------------------------------ |
| GET           | `/api/users`           | Gets a list of all users             |

### _Requests_
| Method        | Request URL               | Description                                                                     |
| ------------- | :-----------------------: | ------------------------------------------------------------------------------- |
| GET           | `/api/requests`           | Get a list of all requests                                                      |
| GET           | `/users/requests/:id`       | Joins specific request and user to send back user information |
| GET           | `/api/requests/:id`       | Get a specific request by request id this is only accessible by logged in users |
| POST          | `/api/users/:id/requests` | Post a new request by user id this is only available to logged in users         |
| PUT           | `/api/requests/:id`       | Update request by request id this is only available to logged in users          |
| DELETE        | `/api/requests/:id`       | Delete request by request id this is only available to logged in users          | 

### _Comments_
| Method        | Request URL                                            | Description                                        |
| ------------- | :----------------------------------------------------: | -------------------------------------------------- |
| GET           | `/api/comments`                                        | Get all comments                                   |
| GET           | `/api/users/:id/comments`                              | Get all comments made by user by user id           |
| GET           | `/api/requests/:id/comments`                           | Get all comments on specific request by request id |
| GET           | `/api/comments/:id`                                    | Get specific comment by comment id                 |
| POST          | `/api/users/:userid/requests/:requestid/comments`      | Post new comment. It currently will take the user that is POSTING the comment. |
| PUT           | `/api/comments/:id`                                    | Update a comment by comment id                     |
| DELETE        | `/api/comments/:id`                                    | Delete a comment                                   |
___
## **DATA MODELS**
___

### _Authentication_

#### Register
The POST to `/api/auth/register` request expects the following data:
```
{
  "username": "username",
  "last_name": "last name",
  "first_name": "first name",
  "email": "email",
  "password": "password",
  "role": "role"
}
```

| Property   | Data Type   | Required   | Unique   | Default   |
| ---------- | :---------: | :--------: | :------: | :-------: |
| username   | string      | yes        | yes      | empty     |
| last_name  | string      | yes        | no       | empty     |
| first_name | string      | yes        | no       | empty     |
| email      | string      | yes        | yes      | empty     |
| password   | string      | yes        | no       | empty     |
| role       | string      | yes        | no       | empty     |

#### Login
The POST to `/api/auth/login` request expects the following data:
```
{
  "username": "username",
  "password": "password"
}
```

| Property   | Data Type   | Required   |
| ---------- | :---------: | :--------: |
| username   | string      | yes        |
| password   | string      | yes        |

### _Users_

### _Requests_
POST
GET
PUT
DELETE

### _Comments_


USER
{
"id":1,
"username":"LCoffelt",
"last_name":"Coffelt",
"first_name":"Lorraine",
"password":"$2y$10$zJK0mcAuGXVRQJupICZtm.4iFdbycMVHehNbby6sJ/t8mKtW6koYK",
"role":"volunteer",
"created_at":"2019-11-18T21:23:42.168Z",
"updated_at":"2019-11-18T21:23:42.168Z"
}

REQUEST
{
id":1,
"user_id":3,
"meeting_place":"Mad Tea Party",
"meeting_time":"10:45:00",
"number_of_kids":2,
"description":"childcare switch anyone?",
"created_at":"2019-11-18T21:23:42.175Z",
"updated_at":"2019-11-18T21:23:42.175Z"
}

COMMENT
{
"id":1,
"user_id":1,
"request_id":1,
"comment":"I'll be there!",
"created_at":"2019-11-18T21:23:42.182Z",
"updated_at":"2019-11-18T21:23:42.182Z"
}


This API provides routers for authentication, requests and comments.

 #### Tech
 - NodeJS
 - ExpressJS
 - PostgreSQL
 - Jest
 - Supertest