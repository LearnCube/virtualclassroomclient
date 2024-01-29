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
The LearnCube Virtual Classroom comes with a built-in content library to host, tag, categorise and search all your teaching resources. 

The Lesson Materials UI is populated using a JSON feed of all the documents that a user, or their school, has uploaded. 
The JSON is fetched using a GET HTTP request from the Virtual Classroom Client. The request looks like this:

```curl
http://{content-library.yourserver.com}/content-library/?userid=1111&student=false
```

An array of content library objects is returned from the server and the Lesson Materials UI is populated with these items.

```json
[
  {
    "category": "",
    "embedLink": "https://res.cloudinary.com/learncube/image/upload/v1543421928/LearnCube/tyqn34bosmp3u5qwpuu3.pdf",
    "contentType": "PDF",
    "title": "flashcards",
    "language": "English",
    "description": "",
    "level": "A1",
    "subType": "PDF",
    "thumbnail": "https://res.cloudinary.com/LearnCube/image/fetch/w_800,h_400,c_limit,f_jpg,q_auto/https://res.cloudinary.com/learncube/image/upload/v1543421928/LearnCube/tyqn34bosmp3u5qwpuu3.pdf",
    "uuid": 241,
    "premium": false
  },
  {
    "category": "",
    "embedLink": "https://res.cloudinary.com/learncube/image/upload/v1631709958/LearnCube/cwgowskamvs6hog6oqgi.pptx.pdf",
    "contentType": "PDF",
    "title": "MakeAnimated PowerPoint Slide by PowerPoint School",
    "language": "",
    "description": "",
    "level": "",
    "subType": "MS Office (Word/Excel/PowerPoint)",
    "lesson_number": null,
    "thumbnail": "https://res.cloudinary.com/learncube/image/fetch/w_800,h_400,c_limit,f_jpg,q_auto/https://res.cloudinary.com/learncube/image/upload/v1631709958/LearnCube/cwgowskamvs6hog6oqgi.pptx.pdf",
    "uuid": 619,
    "premium": true
  }
]
```

### Additional Content Library

The LearnCube Virtual Classroom Client can also fetch additional content from an external library feed.

To enable this, a valid URL must be provided in the class config options. 
The Virtual Classroom Client will make an AJAX request to this URL at the beginning of the class. 
This request must return a valid JSON feed, similar to the one show above, for the contents to be included in the Lesson Materials UI.

```javascript
const userConfig = {
    'token': 'room-token-123', // Eg. first-test-room-token
    'userid': '1111',
    'username': 'API Teacher', // Eg. 'Test Widget Teacher',
    'publicKey': '*****************',
    'userType': 'teacher',
    'validateUrl': '/get-valid-token/',
    'instantClass': true
}

const classConfig = {
    'lesson_materials.library_url': 'http://localhost:3000/content-library/',
    'lesson_materials.premium_url': 'http://localhost:3000/content-library/premium/'
}

const classroom = new VirtualClassroom(el, userConfig, classConfig)
```

### Important
- The GET request is a browser request so ensure that the resource has CORS enabled.
- Each participant must have permission to view the resources added to the whiteboard.
- There is no option to upload to an external library from within the classroom. Any files uploaded during a class will be stored to the LearnCube Content Library.


### Premium Content
Some content might not be freely available over the web, but it must be accessible to all students in order to be used in the classroom. Protected files can be flagged with the `premium` property. 
If a `premium` file is loaded into the whiteboard, a POST request is sent to a premium url, defined by you in the class config. This request should return the true, signed url of the file with which, is subsequently loaded into the whiteboard.

### API Reference

#### Request 
The GET request will be sent to the URL provided along with additional parameters.

#### Options
Name | Type | Description
-----|------|------------|
userId | string | The user id that you have assigned to the classroom participant.
student | boolean | Indicated whether the user is a teacher or student.

#### Response
The response must be an array of objects in a valid JSON format.

Name | Type | Required | Description |
-----|------|------------|------------|
uuid | uuid | true | The unique identifier for the resource.
title | string | true | The display title for the resource.
embedLink | url | true | The location of the resource.
contentType | string | true | The actual content type of the resource. 
subType | string | true | The file type for display and sorting in the UI. 
description | string | false | A short description of the resource and its content.
thumbnail | url | false | The URL of a thumbnail image of the resource.
category | string | false | A category by which to group and filter resources in the UI.
level | string | false | A level by which to group and filter resources in the UI.
language | string | false | A language by which to group and filter resources in the UI.

#### Content Types
The content type is a critical property of any resource to be used in the Virtual Classroom. If defines how the resource is loaded and how it is rendered in the whiteboard. 
The wrong content type will result in a critical failure to load the resource. 
Eg. If a `pdf` file has the content type of `audio`, the client will attempt to load the `pdf` into a HTML5 audio player.

Name | File Type / Extension | Description |
-----|------|------------|
PDF | .pdf | This file type is loaded using a PDF converter function. It must be a standard PDF file. |
audio | .mp3 (recommended) | This file is loaded into a HTML 5 media player. 
video | .mp4 (recommended)| This file is loaded into a HTML 5 media player. 
image | .png, .jpg (recommended) | This file is loaded into a HTML image tag.
youtube | url | The YouTube url of the video to be played. The file will be embedded into a YouTube player.
embedlink | url | This URL will be used as the source for an iFrame. Content must have permission to be displayed in an iFrame.  

#### Sub Types
Sub Types are less restrictive in that any string can be used. 

There are a few standard types that are used in the Lesson Materials UI that have icons attached to them. They are:
'PDF', 'Audio (MP3)', 'Image', 'Video (M4V or MP4)', 'Google Drive Link', 'MS Office (Word/Excel/PowerPoint)', 'YouTube', 'Website Link'.


[comment]: <> (#### Premium Content)

[comment]: <> (For content that is sensitive, LearnCube recommends using dynamic signed urls that restrict access to users that are authenticated. )

[comment]: <> (For content that is marked with the sub-type "Premium", the Virtual Classroom Client will send a POST request to a url endpoint of your choosing. )

[comment]: <> (This endpoint can validate that the user is authorised to access the content and should return the full url of the resource to be loaded.)
