# Back-End

### **Disney Parent**
As a parent with small children, would you like to make your Disney Experience more fun and economical?  Disney Parent puts the tools in your hands to be able to swap childcare and stroller passes with other parents allowing you save money and enjoy the 'big-kid' rides.

#### MVP
 - An on-boarding process for parents
 - On-boarding process for a volunteer experienced business owner
 - Ability to easily create and post a request (including meeting place/ride and time, and number of kids you have)
 - Ability to easily edit / delete a question
 - Ability for anyone to easily search / find posted requests (filter by time, location place, general search)
 - Ability for a second parent user to log in and respond to the request

 #### Tech
 - NodeJS
 - ExpressJS
 - PostgreSQL
 - Jest
 - Supertest

 _REQUESTMODEL_
  - POST
  - UPDATE
    - FOUND MATCH (BOOLEAN)
  - DELETE
  

 _COMMENTMODEL_
  - POST
  - UPDATE
  - DELETE

### LEFT OFF
- request and comments
  - models and routers
- deployment to heroku using pg
  - reminder: there's an ah and tk video for this
- note endpoints
- clean code