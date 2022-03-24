# LearnCube Virtual Classroom Client

### [Overview](README.md)
  * [Quickstart](README.md#quickstart)

### [Production Use](PRODUCTION.md)
  * [Routes](PRODUCTION.md#routes)
  * [Browser Support](PRODUCTION.md#browser)
  * [Authentication](AUTH.md#authentication)
  * [Events](PRODUCTION.md#events)
  * [Breakout Rooms](PRODUCTION.md#breakout-rooms)
  * [Client Api Reference](PRODUCTION.md#api-reference)

[comment]: <> (### [Rest Api]&#40;RESTAPI.md&#41;)

[comment]: <> (  * [Classrooms]&#40;RESTAPI.md#classrooms&#41;)

[comment]: <> (  * [Participants]&#40;RESTAPI.md#participants&#41;)

### [RECORDINGS](RECORDINGS.md)
  * [Overview](RECORDINGS.md#overview)

### [HOMEWORK](HOMEWORK.md)
  * [Overview](HOMEWORK.md#overview)

### [Content Library](LIBRARY.md)
  * [Custom Content Library](LIBRARY.md#custom-content-library)


### Overview
The LearnCube Homework Client is a learning tool that complements LearnCube Virtual Classroom. 
Teachers can augment the learning process by creating assignments and tasks for students to complete between lessons. 
Students can log on in their own time, and complete the tasks individually. 
Assignments can then easily be included in follow-up classes to create continuity in the learning process.

<img src="https://downloads.intercomcdn.com/i/o/301707860/2ac498520bcd5b6d025af057/image.png" />

<br/>
<br/>

### Quickstart

LearnCube Homework is only available to LearnCube API customers with homework access enabled. Getting started is simple. 

LearnCube's Homework Client is intialised in a very similar way to the LearnCube Virtual Classroom. 

- Follow the [Virtual Classroom Quickstart Guide](README.md) to get the application running.

- Replace the Homework participant data in the `homework.html` file with user data of a homework participant. 
  
***Note: Re-using the data for a LearnCube Virtual Classroom, such as token, user id etc, will add the same participants to the homework as were in the classroom.***

  ```html
      <div id="homework-client"></div>
      <link rel="stylesheet" type="text/css" href="https://static.learncube.net/client/homework.css">
      <script type="text/javascript" src="https://static.learncube.net/client/homework.js"></script>
      <script type="text/javascript">
          const homework = new VcHomework('#homework-client',
              {
                  'token': {{UNIQUE ROOM TOKEN HERE}}, // Eg. first-test-room-token
                  'userid': {{FAKE USER ID HERE}}, // Eg. 12345G
                  'username': {{FAKE USERNAME HERE}}, // Eg. 'Test Widget Teacher',
                  'publicKey': {{YOUR PUBLIC KEY HERE}}',
                  'userType': 'teacher',
                  'validateUrl': '/get-valid-token/'
              });
      </script>
  ```
- Restart the application 
  ```shell
  npm start
  ```

- Navigate to http://localhost:3000/homework/ and create your first homework assignment.

<br/>

[![Homework Overview Video](http://img.youtube.com/vi/cbw6se606Aw/0.jpg)](https://youtu.be/cbw6se606Aw)

<br/>

### Authentication
All API calls from the Homework Client must be authenticated using JSON Web Tokens. For more information on this see [Authentication](AUTH.md#authentication)

### Routes
The Homework Client uses hash routes to navigate you through the various views available. To avoid any conflicts, please ensure that the page where the client code is embedded does not use hash routes.

The available views are:

 - `#/teacher/` - The main route for a teacher in a homework event
 - `#/teacher/ended/` - Socket connections are closed and the user can submit feedback about the class
 - `#/teacher/review/{student_id}` - Route where the teacher can set and correct homework for each individual student
 - `#/student/` - The main route for a student in a homework event
 - `#/student/ended/` - Socket connections are closed and the user can submit feedback about the homework


### API Reference

#### Constructor
```javascript
const homework = new VcHomework(el, userConfig, classConfig)
```

#### Parameters
Name | Type | Required | Description
-----|---------|-----|---------|
el | string | yes | The id attribute of the DOM element in which to embed the Homework |
userConfig | object | yes | Contains user data to validate and connect to the homework |
classConfig | object | no | Contains specific options about the homework event |

#### Returns
The constructor returns the DOM element passed in as the first parameter. Event listeners can be attached to this element to handle custom events dispatched from the LearnCube Homework Client.


#### User Config
```javascript
const userConfig = {
    'publicKey': {{PUBLICKEY}},
    'token': {{ROOMTOKEN}},
    'userid': {{PARTICIPANTID}},
    'username': {{PARTICIPANTNAME}},
    'email': {{PARTICIPANTEMAIL}},
    'avatar': {{PARTICIPANTTHUMBNAIL}},
    'userType': {{'teacher'|'student'}},
    'validateUrl': {{auth.your-server.com}},
    'instantClass': {{true | false}}
}
```
Name | Type | Required | Default  | Description
-----|---------|-----|---------|---|
publicKey | string | yes | n/a | The unique [public key](https://app.learncube.com/app/dashboard/#api) that is associated with your LearnCube account. This is how we identify you and what we use for authenticating API calls.|
token | string | yes | n/a  | We use this to create a classroom record in the LearnCube database, so it must be unique. You can create the classroom using our REST API, or if the classroom doesn't exist when you access it here, it will be created. |
userid | string | yes | n/a  | This is the id of the participant that is entering the homework. Each user must have a unique id to complete the homework tasks individually. |
username | string | no | ' ' | This is the display name of the participant that is entering the homework. Although this is not strictly required, it is highly recommended for the teacher to differentiate whiteboard annotations and chat messages. |
email | string | no | ' ' | This is the email of the participant that is entering the homework. Used to send notifications when the homework is ready to view. |
avatar | string | no | ' ' | A URL of a thumbnail that will be used to represent the user in various places of the Virtual Classroom. |
userType | string | no | student | Optional user type to overwite any settings for an already created class. |
validateUrl | url | yes | n/a  | URL endpoint to do the validation on your server. |
instantClass | boolean | no | false | Creates a class if one does not already exist with the token provided. |

#### Class Config
```javascript
const classConfig = {
  'lesson_materials.can_upload': true,
  'lesson_materials.library_url': '/content-library/',
  'whiteboard.enable_math_tools': true
}
```
*** Important: These values all have permanent settings that are saved in your account. The front-end configuration is a way to overwrite the saved configuration.

Name | Type | Required | Default | Description
-----|------|----------|---------|------------|
lesson_materials.can_upload | boolean | no | Teacher: true Student false | Gives the user permission to upload content to the whiteboard during the class. |
lesson_materials.library_url | url | no | null  | A URL of an additional content library to use in the classroom. [More info](LIBRARY.md) |
whiteboard.enable_math_tools | boolean | no | false | Enables maths tools to use on the whiteboard. |

#### Events
Name | Triggered By | Example Payload | 
-----|--------------|---------|
enterHomework | Entering a homework event | `{user: {userid: "12345G"}, timestamp: 1629448350461}` 
exitHomework | Exiting a homework event | `{user: {userid: "12345G"}, timestamp: 1629448350461}` 
updateHomeworkStatus | Updating the homwework status | `{classStatus: "in-progress", timestamp: 1629448350461}`

