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
The LearnCube Virtual Classroom API is used to create and schedule classes, enrol participants in classes and to set the default properties of a LearnCube Virtual Classroom. 

<br />

### Classrooms
Each instance of the LearnCube Virtual Classroom represents an individual class, with a unique id, start time, end time, and other properties that define what type of class it will be.

<br />

#### List Classrooms
Classrooms can be retrieved in a list or individually by providing the LearnCube uuid.


```curl
# Fetch classroom list
GET https://app.learncube.com/api/virtual-classroom/classrooms/
```

#### Example
```json 
//GET https://app.learncube.com/api/virtual-classroom/classrooms/

{
  "count": 101,
  "next": "https://app.learncube.com/api/virtual-classroom/classrooms/?page=2",
  "previous": null,
  "results": [
    {
      "uuid": "b4b7a6d7-77ff-4245-896e-5291645d98c3",
      "creation_date": "2021-06-28T16:31:07.022477Z",
      "room_token": "vc-client-sample-1",
      "cancelled": false,
      "description": "",
      "start": "2021-08-26T19:30:00Z",
      "end": "2021-08-26T20:30:00Z",
      "teacher_attended": false,
      "teacher_attended_time": null,
      "actual_class_start": null,
      "actual_class_end": null,
      "actual_duration": 0
    }
  ]
}
```


#### Query Parameters
The Classroom list can be filtered by providing the following query parameters.

```curl
GET https://app.learncube.com/api/virtual-classroom/classrooms/?start_before=2021-07-20T16:02:15Z&page=3
```

#### Options
Name | Type | Description
-----|------|------------|
page | number| A page number of the result set. A page contains a maximum of 100 results
room_token | string | The unique token you provide to identify the room
start_before | datetime | Shows only classes scheduled to start before the date / time provided
start_after | datetime | Shows only classes scheduled to start after the date / time provided
teacher_attended | boolean | True if the teacher has attended the class
<!-- teacher_id | string | Show classes only for a particular teacher -->

<br />

#### Create Classroom
A Classroom can be created with a POST or updated with a PUT request to the same URL endpoint. The only required parameter is the unique room token, but there are many additional options to customise the classroom.

```
POST https://app.learncube.com/api/virtual-classroom/classrooms/
{
  "room_token": "august-13-1"
}
```

#### Read Classroom
An individual Classroom can be fetched with a GET request to the same URL root with the unique LearnCube id

```
# Fetch single classroom
GET https://app.learncube.com/api/virtual-classroom/classrooms/{uuid}/
```

#### Update Classroom
A Classroom can be updated with a PUT request with the unique LearnCube id

```
PUT https://app.learncube.com/api/virtual-classroom/classrooms/{uuid}/
{
  "room_token": "august-13-1",
  "description": "English Course 1: Class 3"
}
```

#### POST / PUT Options
Name | Type | Required | Default | Description
-----|------|----------|---------|------------|
room_token | string | yes | n/a | The unique token you provide to identify the room. Required for POST and PUT requests
start| datetime | no | current time | The scheduled start time / date of the class
end | datetime | no | current time + 1 hour | The scheduled end time / date of the class
cancelled | boolean | no | false | True if the teacher has attended the class
description | string | no | '' | Your text description of the class
breakout_parent_token | string | no | '' | The unique token of the main parent room. (Only to be included in creating [breakout rooms](PRODUCTION.md#breakout-rooms).)

<!-- max_participants | number | no | 1 | The maximum amount of allowed participants per class
audio_only | boolean | no | false | The class does not use video if set to true. Good for lower speed connections
whiteboard_only | boolean | no | false | The class has only the whiteboard if set to True
return_url | string | no | '' | Show classes only for a particular teacher
record_class | boolean | no | false | True if the teacher has attended the class -->

<br />

#### Destroy Classroom
A Classroom can be destroyed with a DELETE request with the unique LearnCube id.
```
DELETE https://app.learncube.com/api/virtual-classroom/classrooms/{uuid}/
```

<br />

#### Classroom Properties
Name | Type | Description
-----|------|------------|
uuid | string | Internal LearnCube unique id for tracking your class event
room_token | string | The unique token you provide to identify the room
cancelled | boolean | Flag for if the class is cancelled or not
description | string | Your text description of the class
start | datetime | The scheduled start time / date of the class
end | datetime | The scheduled end time / date of the class
teacher_attended | boolean | True if the teacher has attended the class
teacher_attended_time | datetime | The time / date the teacher first attended the class
actual_class_start | datetime | The real time the class started
actual_class_end | datetime | The real time the class ended
actual_duration | number | The total duration of the class
<!-- company_slug | string | Company name formatted to create a searchable string 
teacher_first_name |  string | The first name of the teacher for display in the UI 
teacher_last_name | string | The last name of the teacher for display in the UI 
teacher_avatar | url | The URL of the teachers avatar for disaply in the UI
creation_date | datetime | The date the class was created
cancelled_by | string | The id of the user that cancelled the class
max_participants | number | The maximum amount of allowed participants per class
audio_only | boolean | The class does not use video if set to true. Good for lower speed connections
whiteboard_only | boolean | The class has only the whiteboard. Good for use with 3rd party video providers (Zoom, Skype, Meet...) 
slug | string | The LearnCube in-class identifier
\* return_url | url | The URL to redirect to after the class has ended
\* room_url | url | The hosted URL of the class
\* room_review_url | url | The URL of the class review
\* recorded_class_url | url | The URL of the class recording if available -->

<br />
<br />

### Participants
Each unique user that attends a LearnCube Classroom is called a Participant. A Participant can be a student or a teacher and is created as soon as they enter the classroom. The Participants API allows you to track how many classes your teachers and students have attended.

#### List Participants
Participants can be retrieved in a list at the following endpoint.


```curl
# Fetch participant list
GET https://app.learncube.com/api/virtual-classroom/participants/
```

#### Example
```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "uuid": "bd95ef31-20cd-41e1-b04c-70a26c743b84",
      "event_uuid": "6ce843b7-9331-44a6-9c05-c1ae53a256c7",
      "userid": "example-user-g6nIX0",
      "room_token": "vc-client-sample-1",
      "teacher": "Test Teacher",
      "user_role": "teacher",
      "username": "Test Teacher",
      "avatar": "https://randomuser.me/api/portraits/thumb/women/95.jpg",
      "cancelled": false,
      "attended": true,
      "attended_time": "2021-05-26T15:28:43.638172Z",
      "ended_time": "2021-05-26T16:30:14.638172Z",
      "class_rating": "",
      "class_review": ""
    }
  ]
}
```

#### Query Parameters
The Participant list can be filtered by providing one or more query parameters.

```curl
GET https://app.learncube.com/api/virtual-classroom/participants/?room_token=vc-client-sample-1&user_role=student
```

#### Options
Name | Type | Description
-----|------|------------|
page | number| A page number of the result set. A page contains a maximum of 100 results
room_token | string | The unique token you provide to identify the room
userid | string | The unique id provided by you to identify the user
user_role | string | Filter by student or teacher
teacher | string | Filter by the teacher username
attended_time_before | datetime | Shows only classes the participant attended before the date / time provided
attended_time_after | datetime | Shows only classes the participant after the date / time provided
ended_time_before | datetime | Shows only classes that ended before the date / time provided
ended_time_after | datetime | Shows only classes that ended after the date / time provided
class_rating_lte | number | Shows classes less than or equal to this star rating (1-5)
class_rating_gte | number | Shows classes greater than or equal to this star rating (1-5)
<!-- attended | boolean | True if the teacher has attended the class -->
<!-- teacher_id | string | Show classes only for a particular teacher -->

<br />
