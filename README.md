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
The LearnCube Virtual Classroom is an online learning environment that allows teachers and students to communicate, interact, collaborate through our video conferencing tool, chat box and interactive whiteboard. You can access all your past classes, upload and store class content, create breakout rooms, record your lessons and conduct classes in Conversation or Whiteboard-Only mode. 

<img src="https://www.learncube.com/images/blog_images/LearnCube-Update-July-2019.png">

<br/>
<br/>

### Quickstart Guide 

LearnCube's Virtual Classroom Client is a simple to use drop-in widget that allows you to embed a fully equipped virtual classroom in any web page or LMS.

LearnCube's Virtual Classroom is only available to LearnCube customers with API access enabled. Getting started is simple. 

- Log in to your [LearnCube Account](https://app.learncube.com/), or [Sign up here for free](https://app.learncube.com/app/create/).
- Get your public and private [API keys here](https://app.learncube.com/app/dashboard/#api) from your LearnCube API Dashboard. (Leave the account mode to testing in order to follow this example)
- Clone the quickstart app to your local machine and cd into the directory

  ```shell 
  git clone https://github.com/LearnCube/virtualclassroomclient.git
  cd virtualclassroomclient
  ```

- Create a configuration file for your application.
  
  ```shell
  cp template.env .env
  ```
  
- Replace the variables in the newly created `.env` file with real data from your LearnCube API account. 

  ```
  # Private Key
  privateKey={privatekeyfromyouraccount}

  # LearnCube user username
  username={usernamefromyouraccount}

  # LearnCube user id
  user_id={useridfromyouraccount}

  # LearnCube user email
  email={emailyouusedtosignup}
  ```
  ***Important: This must match the user data we have stored for the LearnCube account holder.***

- Replace the Classroom participant data in the `index.html` file with user data of a classroom participant. 

  ***Note: This does not have to match the user data in your `.env` file. All your classroom participants, teachers, students and admins, will access the classroom using your LearnCube account details.***
  ```html
      <div id="virtual-classroom-client"></div>
      <link rel="stylesheet" type="text/css" href="https://static.learncube.net/client/virtualclassroom.css">
      <script type="text/javascript" src="https://static.learncube.net/client/virtualclassroom.js"></script>
      <script type="text/javascript">
          const classroom = new VirtualClassroom('#virtual-classroom-client',
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

- Install dependencies and run 
  ```shell
  npm install
  npm start
  ```

- Navigate to http://localhost:3000 and enter your first classroom.

<br/>

[Troubleshooting authentication issues](AUTH.md#troubleshooting)  
[Training Videos](https://www.youtube.com/playlist?list=PLrlg2DdRh_t0k-VHU5R-u5GorWysBNUwp)  
