
## Goals

* Develop an Application which should resemble Instagram
* Create a Database of User Accounts
	A User should be able to:
  	* create an account
  	* see all image posts
  	* create a new image post with an image and 	description
  	* edit their own image posts
  	* delete their own image posts
  	* "like" other image posts
  	* comment on their own, or others image posts

## Data Models

### 'users'

| Column                | Type                	          |
|-----------------------|---------------------------------|
|`id`                   | INTEGER (PRIMARY KEY)           |
|`username`             | STRING(100) (NOT NULL)(UNIQUE)  |
|`password`             | STRING(1000) (NOT NULL)         |

* ONE to MANY relationship with photos
* ONE to MANY relationship comments

### 'photos'

| Column                | Type                      |
|-----------------------|---------------------------|
|`id`                   | INTEGER (PRIMARY KEY)     |
|`size`                	| INTEGER (NOT NULL)        |
|`originalName`         | STRING (NOT NULL)         |
|`mimeType`             | STRING (NOT NULL)         |
|`description`          | STRING (500)              |

* ONE to MANY relationship with photos comments
* MANY to MANY relationship with tags
* ONE to MANY relationship with photoLikes
* MANY to ONE relationship with users

### 'comments'

| Column                | Type                   |
|-----------------------|------------------------|
|`id`                   | INTEGER (PRIMARY KEY)  |
|`text`                 | STRING (NOT NULL)(250) |

* MANY to ONE relationship with photos
* MANY to ONE relationship with user
* ONE to MANY relationship with commentLikes



### 'tags'

| Column                | Type                         |
|-----------------------|------------------------------|
|`id`                   | INTEGER (PRIMARY KEY)        |
|`name`                 | STRING (NOT NULL)(UNIQUE)    |

* MANY to MANY relationship with photos


### 'Likes'

| Column                | Type                                |
|-----------------------|-------------------------------------|
|`id`                   | INTEGER (PRIMARY KEY)(AUTOINCREMENT)|

* MANY to ONE relationship with photos


### 'commentLikes'

| Column                | Type                               |
|-----------------------|------------------------------------|
|`id`                   | INTEGER (PRIMARY KEY)(AUTOINCREMENT|

* MANY to ONE relationship with comments





## Routes

### GET `/`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `No argument`         | No argument                                                                                 |

* If logged in, displays a page with other users photos to like or comment on, in addition to tags which relate to the photo
* If no user is logged in, redirects to login page


### POST `/`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `comment`             | Text input for a user to enter in comments about a photo                                    |
| `photoLike`           | Indicator of a photo being liked by another user                                            |
| `commentLike`         | Indicator of a photo being liked by another user                                            |

* Endpoint for submitting a comment, "like" on a photo, or "like" on a comment of a photo

### GET `/login`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `No argument`         | No argument                                                                                 |

* Displays a login form which has fields to verify a username and password
* Upon success, redirects 'to photomatic'
* Provides a link to signup page if user does not have an account


### POST `user/login`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `username`            | Username input to verify account                                                            |
| `password`            | Password input to verify account                                                            |

* Endpoint for submitting an account creation post form
* Upon success, redirects to `/user`

### GET `user/signup`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `No argument`         | No argument                                                                                 |

* Displays a page with a signup form for creating an account with a username and password.

### POST `/user/signup`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `username`            | User name created to assign to account.                                                     |
| `password`            | Password created to sign into acount.                                                       |

* Endpoint for submitting an account creation post form
* Upon success, redirects to `/`


### GET `/user`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `user`         	| Specifies which user is being displayed based on the user logged into the session           |

* Displays a page with a user and the photos which they have submitted
* If the user isn't logged into a session, redirects back to 'user/login'

### POST `/user/post`

| Argument              | Description                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------|
| `photo`               | Photo to be posted to the application by the user                                           |
| `description`         | Description to be associated to the photo being posted.                                     |
| `tag`                 | Tag to be associated to the photo being posted, based on a specified topic                  |

* Endpoint for submitting a photo being posted by the user with any associated tags
* Upon success, redirects to `/user` with posted photo


## Inspiration

* Instagram at (www.instagram.com)
* Flickr at (www.flickr.com)

## Heroku Address for Photomatic

* https://photoproject.herokuapp.com/
* To test the app, please use the following information:
username: test
password: test 
