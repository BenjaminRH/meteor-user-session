## User Session - Meteor Smart Package

Provides a `UserSession` object that works just like `Session` does, except it's persistent so you can preserve state across devices *and* sessions. It also provides a few extra useful methods.


### API

*NOTE:* All of the methods defined below are also available on the server, with an additional `userId` argument to specify which user's session variables you want to edit.

 * `UserSession.set(key, value [, server: userId])` ( _anywhere_ ) - Set a new variable in the user session
 * `UserSession.get(key [, server: userId])` ( _anywhere_ ) - Get the value of a user session variable
 * `UserSession.delete(key [, server: userId])` ( _anywhere_ ) - Delete a user session variable, if it exists
 * `UserSession.equals([server: userId])` ( _anywhere_ ) - Test if a user session variable is equal to a value
 * `UserSession.list([server: userId])` ( _anywhere_ ) - Get all the user session variables as an object


### How to use?

1. Install [meteorite](https://github.com/oortcloud/meteorite)
2. `mrt add user-session`


### Maintainers

 * BenjaminRH
 * digilord