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

LearnCube offers recording in the Virtual Classroom. Classes can be set to record automatically, or can be started and stopped manually from within the class.

<img src="https://downloads.intercomcdn.com/i/o/301690546/08cd7769c8a6a877755b475a/image.png" />

***Note: Class recording is a paid add-on feature. Contact support for pricing***

Recorded classes can be played back using the LearnCube Recording Playback Client. The Recording Playback Client is initialised in a similar way to the LearnCube Virtual Classroom. 

- Follow the [Virtual Classroom Quickstart Guide](README.md) to get a class running and recorded.

- Once you a class has been successfully recorded replace the recording participant data in the `recording.html` file with user data of a virtual classroom participant. 
  
***Note: Classes have to be successfully recorded before playback is available.***

  ```html
      <div id="recording-client"></div>
      <link rel="stylesheet" type="text/css" href="https://static.learncube.net/client/recordings.css">
      <script type="text/javascript" src="https://static.learncube.net/client/recordings.js"></script>
      <script type="text/javascript">
          const recording = new VcRecording('#recording-client',
              {
                  'token': {{UNIQUE ROOM TOKEN HERE}}, // Eg. first-test-room-token
                  'userid': {{FAKE USER ID HERE}}, // Eg. 12345G
                  'username': {{FAKE USERNAME HERE}}, // Eg. 'Test Widget Teacher',
                  'publicKey': {{YOUR PUBLIC KEY HERE}}',
                  'validateUrl': '/get-valid-token/'
              });
      </script>
  ```
- Restart the application 
  ```shell
  npm start
  ```

- Navigate to http://localhost:3000/recording/ to playback the recorded class.
***Note: Recorded video streams need to be compiled before they are ready for playback. This can take up to a few hours after the class ends.***

<br/>

### Authentication
All API calls from the Recording Playback Client must be authenticated using JSON Web Tokens. For more information on this see [Authentication](AUTH.md#authentication)

### API Reference

#### Constructor
```javascript
const recording = new VcRecording(el, userConfig, classConfig)
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
    'avatar': {{PARTICIPANTTHUMBNAIL}},
    'userType': {{'teacher'|'student'}},
    'validateUrl': {{auth.your-server.com}}
}
```
Name | Type | Required | Default  | Description
-----|---------|-----|---------|---|
publicKey | string | yes | n/a | The unique [public key](https://app.learncube.com/app/dashboard/#api) that is associated with your LearnCube account. This is how we identify you and what we use for authenticating API calls.|
token | string | yes | n/a  | We use this to fetch the correct recording from the LearnCube database. |
userid | string | yes | n/a  | This is the id of the participant that is entering the recording. |
username | string | no | ' ' | This is the display name of the participant that is entering the recording. |
avatar | string | no | ' ' | A URL of a thumbnail that will be used to represent the user in various places of the Virtual Classroom. |
userType | string | no | student | Optional user type to overwite any settings for an already created class. |
validateUrl | url | yes | n/a  | URL endpoint to do the validation on your server. |

#### Class Config
```javascript
const classConfig = {
  'lesson_materials.library_url': '/content-library/'
}
```
*** Important: These values all have permanent settings that are saved in your account. The front-end configuration is a way to overwrite the saved configuration.

Name | Type | Required | Default | Description
-----|------|----------|---------|------------|
lesson_materials.library_url | url | no | null  | A URL of an additional content library to use in the classroom. [More info](LIBRARY.md) |

#### Events
Name | Triggered By | Example Payload | 
-----|--------------|---------|
enterRecording | Entering a recording playback | `{user: {userid: "12345G"}, timestamp: 1629448350461}` 
exitRecording | Exiting a recording playback | `{user: {userid: "12345G"}, timestamp: 1629448350461}` 

