pitch paragraph: Have you ever been on campus and wanted to meet up for lunch or a study session but didnt know who was available? With my new web application you will be able to see what classmates are avaialble and on campus so that you can meet up. All you have to do is put in the times that you aren't available and turn on your location sharing. If you want to meet up for lunch or a study session, just hop on the app to see what friends are available in your proximity.

key features: login sharing location friending other people through contacts seeing other people's location on a map seeing when people will get out of class and have time for a break messaging other people turning off your location friend requests

images: image

http://3.17.104.113/ ssh -i ~/keys/production.pem ubuntu@3.17.104.113

$ ./deployFiles.sh -k ~/keys/production.pem -h jasonstorey.click -s simon -s creates an outter link ex. simon/jasonstorey.click learned about correct file structure

code. to open up cloned repository

pwd shows you where you are at currently

got to bootstrap website to see how you can implement different styles

make sure css file is in same folder

can go to differnt inserts and find an embed html code

make sure you make a copy of files when putting them into vs code instead of moving the folder in

use 'this' to make a direct reference to varible in realm of function

use ${ to enter variable into a string

look at the netwrok tab to see errors on why something may not be functioning properly

add event listener waits for user to do something

use .setattribute to manipulate specific part of html tag

use methods such as app.get(), app.post(), app.put(), app.delete() to define the different HTTP methods

use built-in middleware, such as express.json() and express.urlencoded() for handling JSON and URL-encoded requests

use the app.use() method to define an error-handling middleware function

dont have a # in your password for your data base haha

go to environment variables to setup credentials for startup

use bcrypt to encypt password when storing them in a database

use cookie parser middleware to manage user authentication tokens stored in cookies

Create a new WebSocket server object wss and attach it to the HTTP server.

Define an array connections to keep track of all the connections made to the WebSocket server.

When a new connection is established, add it to the connections array and set up event listeners for the WebSocket object ws:

a. Listen for incoming messages and forward them to all other connections except for the sender.

b. Listen for the close event and remove the closed connection from the connections array.

c. Listen for pong messages and mark the connection as alive.

Use setInterval to ping all connections every 10 seconds and kill any connection that doesn't respond to the ping.

Export the PeerProxy class for use in other modules.
