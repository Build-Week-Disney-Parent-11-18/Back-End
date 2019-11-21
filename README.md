# Disney Parent
As a parent with small children, would you like to make your Disney Experience more fun and economical?  Disney Parent puts the tools in your hands to be able to swap childcare and stroller passes with other parents allowing you save money and enjoy the 'big-kid' rides.
___
 ## **Tech Used**
 -----------------------------------------------------
 - NodeJS
 - ExpressJS
 - PostgreSQL
 - Jest
 - Supertest
 - Twilio SendGrid Email API
 -----------------------------------------------------
## **ENDPOINTS** 
-----------------------------------------------------

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
| GET           | `/api/users/:id/comments`                              | Get all comments made by a specified user (user id)           |
| GET           | `/api/requests/:id/comments`                           | Get all comments on a specific request (request id) |
| GET           | `/api/comments/:id`                                    | Get a specific comment by comment id                 |
| POST          | `/api/users/:userid/requests/:requestid/comments`      | Post a new comment. It currently will take the user that is POSTING the comment. |
| PUT           | `/api/comments/:id`                                    | Update a comment by comment id                     |
| DELETE        | `/api/comments/:id`                                    | Delete a comment                                   |
___
## **DATA MODELS**
___

### _Authentication_

#### Register
The POST to `/api/auth/register` expects the following data:
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

| Property   | Data Type   | Required   | Unique   |
| ---------- | :---------: | :--------: | :------: |
| username   | string      | yes        | yes      |
| last_name  | string      | yes        | no       |
| first_name | string      | yes        | no       |
| email      | string      | yes        | yes      |
| password   | string      | yes        | no       |
| role       | string      | yes        | no       |
-----------------------------------------------------
#### Login
The POST to `/api/auth/login` expects the following data:
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
-----------------------------------------------------
### _Users_
The GET to `/api/users` responds with all of the users in the database:
```
[
  {
    "user_id": 1,
    "username": "LCoffelt",
    "last_name": "Coffelt",
    "first_name": "Lorraine",
    "email": "LCoffelt@email.com",
    "password": "$2b$10$zhdAOwev5Jmu0jpiGXc.Uu5wdUs6IICl3vspkaoe5rrNQIyi36n2y",
    "role": "volunteer",
    "created_at": "2019-11-20T03:52:45.557Z",
    "updated_at": "2019-11-20T03:52:45.557Z"
  },
  {
    "user_id": 2,
    "username": "JLopez",
    "last_name": "Lopez",
    "first_name": "Jean",
    "email": "JLopez@email.com",
    "password": "$2b$10$PFdHfI1Ob9AxeipLi/WC6ecgnYnMDGC2UTYocq/N7vCkqV0s/fhAe",
    "role": "volunteer",
    "created_at": "2019-11-20T03:52:45.557Z",
    "updated_at": "2019-11-20T03:52:45.557Z"
  },
  {
    "user_id": 3,
    "username": "lambda",
    "last_name": "Lambda",
    "first_name": "Lambda",
    "email": "lambda@email.com",
    "password": "$2b$10$OsR7Ui2ccJGldqdpOyF1BOCdqdwA6HEZWSRbKM2ojfATUe43DRPkq",
    "role": "volunteer",
    "created_at": "2019-11-20T03:52:45.557Z",
    "updated_at": "2019-11-20T03:52:45.557Z"
  },
]
```
| Property   | Data Type   |
| ---------- | :---------: |
| user_id    | primary key |
| username   | string      |
| last_name  | string      |
| first_name | string      |
| email      | string      |
| password   | string      |
| role       | string      |
| created_at | string      |
| updated_at | string      |
-----------------------------------------------------
### _Requests_
The GET to `/api/requests` responds with all of the requests in the database: 
```
[
  {
    "request_id": 1,
    "user_id": 3,
    "meeting_place": "Mad Tea Party",
    "meeting_time": "10:45:00",
    "number_of_kids": 2,
    "description": "childcare switch anyone?",
    "complete": false,
    "created_at": "2019-11-20T03:52:45.571Z",
    "updated_at": "2019-11-20T03:52:45.571Z"
  },
  {
    "request_id": 2,
    "user_id": 4,
    "meeting_place": "Pirates of the Caribbean",
    "meeting_time": "12:30:00",
    "number_of_kids": 3,
    "description": "Need someone to switch, please and thank you! :)",
    "complete": false,
    "created_at": "2019-11-20T03:52:45.571Z",
    "updated_at": "2019-11-20T03:52:45.571Z"
  },
  {
    "request_id": 3,
    "user_id": 5,
    "meeting_place": "Space Mountain",
    "meeting_time": "15:00:00",
    "number_of_kids": 5,
    "description": "Anyone available at 3?",
    "complete": false,
    "created_at": "2019-11-20T03:52:45.571Z",
    "updated_at": "2019-11-20T03:52:45.571Z"
  }
]
```
| Property       | Data Type                 |
| -------------- | :-----------------------: |
| request_id     | primary key               |
| user_id        | integer                   |
| meeting_place  | string                    |
| meeting_time   | string (format= hh:mm:ss) |
| number_of_kids | string                    |
| description    | string                    |
| complete       | string                    |
| created_at     | string                    |
| updated_at     | string                    |
-----------------------------------------------------
The GET to `/users/requests/:id` responds with the following data about the request user's information:
```
{
  "user_id": 3,
  "first_name": "Lambda",
  "last_name": "Lambda",
  "username": "lambda",
  "email": "lambda@email.com",
  "description": "childcare switch anyone?"
}
```
| Property    | Data Type   |
| ----------- | :---------: |
| user_id     | primary key |
| first_name  | string      |
| last_name   | string      |
| username    | string      |
| email       | string      |
| description | string      |
-----------------------------------------------------
The GET to `/api/requests/:id` responds with the following data:
```
{
  "request_id": 1,
  "user_id": 3,
  "meeting_place": "Mad Tea Party",
  "meeting_time": "10:45:00",
  "number_of_kids": 2,
  "description": "childcare switch anyone?",
  "complete": false,
  "created_at": "2019-11-20T03:52:45.571Z",
  "updated_at": "2019-11-20T03:52:45.571Z"
}
```
| Property       | Data Type                 |
| -------------- | :-----------------------: |
| request_id     | primary key               |
| user_id        | integer                   |
| meeting_place  | string                    |
| meeting_time   | string (format= hh:mm:ss) |
| number_of_kids | string                    |
| description    | string                    |
| complete       | boolean (default = false) |
| created_at     | string                    |
| updated_at     | string                    |
-----------------------------------------------------
The POST to `/api/users/:id/requests`expects the following data:
```
{
  "meeting_place": "place",
  "meeting_time": "00:00:00",
  "number_of_kids": 3,
  "description": "description
}
```
| Property       | Data Type                 | Required |
| -------------- | :-----------------------: | :------: |
| meeting_place  | string                    | yes      |
| meeting_time   | string (format= hh:mm:ss) | yes      |
| number_of_kids | string                    | yes      |
| description    | string                    | yes      |
-----------------------------------------------------
The PUT to `/api/requests/:id` expects at least one of the following fields:
```
{
  "meeting_place": "place",
  "meeting_time": "00:00:00" (format = hh:mm:ss),
  "number_of_kids": 3,
  "description": "description,
  "complete": false
}
```
| Property       | Data Type                 |
| -------------- | :-----------------------: |
| meeting_place  | string                    |
| meeting_time   | string (format= hh:mm:ss) |
| number_of_kids | string                    |
| description    | string                    |
| complete       | boolean (default = false) |

Example change:
```
{
  "number_of_kids": 5,
}
```
It will look like this after changing at least one field:

```
{
  "meeting_place": "place",
  "meeting_time": "00:00:00" (format = hh:mm:ss),
  "number_of_kids": 5,
  "description": "description,
  "complete": false
}
```
-----------------------------------------------------
The DELETE to `/api/requests/:id` responds with the 'DELETED' object:
```
{
  "DELETED": {
    "request_id": 3,
    "user_id": 5,
    "meeting_place": "Space Mountain",
    "meeting_time": "15:00:00",
    "number_of_kids": 5,
    "description": "Anyone available at 3?",
    "complete": false,
    "created_at": "2019-11-20T03:52:45.571Z",
    "updated_at": "2019-11-20T03:52:45.571Z"
  }
}
```
-----------------------------------------------------
### _Comments_
The GET to `/api/comments` responds with all of the comments in the database:
```
[
  {
    "comment_id": 1,
    "user_id": 1,
    "request_id": 1,
    "comment": "I'll be there!",
    "created_at": "2019-11-21T04:09:45.040Z",
    "updated_at": "2019-11-21T04:09:45.040Z"
  },
  {
    "comment_id": 2,
    "user_id": 2,
    "request_id": 3,
    "comment": "I will be! See you then.",
    "created_at": "2019-11-21T04:09:45.040Z",
    "updated_at": "2019-11-21T04:09:45.040Z"
  }
]
```
| Property   | Data Type   |
| ---------- | :---------: |
| comment_id | primary key |
| user_id    | integer     |
| request_id | integer     |
| comment    | string      |
| created_at | string      |
| updated_at | string      |
-----------------------------------------------------
The GET to `/api/users/:id/comments` responds with the following data from a particular user:
Example from user 1:
```
{
  "comment_id": 1,
  "user_id": 1,
  "request_id": 1,
  "comment": "I'll be there!",
  "created_at": "2019-11-21T04:09:45.040Z",
  "updated_at": "2019-11-21T04:09:45.040Z"
}
```
| Property   | Data Type   |
| ---------- | :---------: |
| comment_id | primary key |
| user_id    | integer     |
| request_id | integer     |
| comment    | string      |
| created_at | string      |
| updated_at | string      |
-----------------------------------------------------
The GET to `/api/requests/:id/comments` responds with the following data on a particular request:
Example from request 3:
```
{
  "comment_id": 2,
  "user_id": 2,
  "request_id": 3,
  "comment": "I will be! See you then.",
  "created_at": "2019-11-21T04:09:45.040Z",
  "updated_at": "2019-11-21T04:09:45.040Z"
}
```
| Property   | Data Type   |
| ---------- | :---------: |
| comment_id | primary key |
| user_id    | integer     |
| request_id | integer     |
| comment    | string      |
| created_at | string      |
| updated_at | string      |
-----------------------------------------------------
The GET to `/api/comments/:id` responds with the following data about a particular comment:
Example from comment 1:
```
{
  "comment_id": 1,
  "user_id": 1,
  "request_id": 1,
  "comment": "I'll be there!",
  "created_at": "2019-11-21T04:09:45.040Z",
  "updated_at": "2019-11-21T04:09:45.040Z"
}
```
| Property   | Data Type   |
| ---------- | :---------: |
| comment_id | primary key |
| user_id    | integer     |
| request_id | integer     |
| comment    | string      |
| created_at | string      |
| updated_at | string      |
-----------------------------------------------------
The POST to `/api/users/:userid/requests/:requestid/comments` expects the comment field:
```
{
  "comment": "comment"
}
```
| Property   | Data Type   | Required   |
| ---------- | :---------: | :--------: |
| comment    | string      | yes        |
-----------------------------------------------------
The PUT to `/api/comments/:id` expects the comment field:
```
{
	"comment":"See you soon!"
}
```
| Property   | Data Type   | Required   |
| ---------- | :---------: | :--------: |
| comment    | string      | yes        |

It will look like this after changing the comment field:
```
{
  "comment_id": 1,
  "user_id": 1,
  "request_id": 1,
  "comment": "See you soon!",
  "created_at": "2019-11-21T04:09:45.040Z",
  "updated_at": "2019-11-21T04:09:45.040Z"
}
```
-----------------------------------------------------
The DELETE to `/api/comments/:id` responds with the following data:
```
{
  "DELETED": {
    "comment_id": 2,
    "user_id": 2,
    "request_id": 3,
    "comment": "I will be! See you then.",
    "created_at": "2019-11-21T04:09:45.040Z",
    "updated_at": "2019-11-21T04:09:45.040Z"
  }
}
```
-----------------------------------------------------