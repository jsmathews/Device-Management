## Table of contents
* [General info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)

# Live Demo
* http://ec2-18-184-49-238.eu-central-1.compute.amazonaws.com:3000/

## General info
This is a simple Device management app using React.js as frontend framework, Node.js for backend and MySQL for database. This allows the uer to create, read, update and delete the data.
They are then containirised using Docker and served through Docker-compose.

![DeviceManagement](https://github.com/jsmathews/ReactAppWithTypeScript/assets/38797524/d11b1131-a3c1-4691-b96d-a8d296753494)

## Features
- User can create new device information.
- User can view the list of all stored device information.
- User can update the stored device information.
- User can delete the stored device information.

## Technologies
Project is created with:
* React.js
* JavaScript + TypeScript
* Node.js
* MySQL
* Docker
* Docker-compose
	
## Setup
To run this project, follow the below steps:

```
$ Clone the project and execute the below commands in the root directory of the project.
$ docker-compose build
$ docker-compose up
```
* After docker running successfully, open the link: http://localhost:3000
