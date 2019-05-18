# Roman Lamsal's Swedish Vocabulator
I wanted to learn some swedish vocabs but was not satisfied with existing solutions for learning vocabs with index cards.

Thus, I created this application which consists of a backend (CRUD service for lectures, authentication and progress
tracking by user) and a web UI for creating, editing and learning the saved lectures.

## It's German
The code is of course in english, but the UI is entirely german.

## Stack

The stack of the application includes:
* React
* plain javascript (if I find the time, I'll upgrade to typescript)


* Kotlin
* Spring Boot
* Spring Security
* Spring Web
* [Nitrite](https://github.com/dizitart/nitrite-database/tree/master/potassium-nitrite) as a simple yet powerful file
based database
* Jackson

## The UI
Go and checkout the [UI's readme](https://github.com/romanlamsal/swedishvocabulator/blob/master/src/app/README.md)

## How To Start
Build and start the application with the following properties set:
* nitrite.filepath
    * empty string: starts the nitrite database in-memory only, create for testing
    * non-empty string: filepath to the database file for nitrite
* authfile.filepath: Must be set to point to a JSON file containing "username:password" value pairs
(e.g. `{username: "superPassword"}`)


## ToDo List
* redo the UI test-driven and with typescript
* support encryption of passwords in authfile
* more quizzes
