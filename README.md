# event-calendar-frontend
Event Calendar Frontend

# Steps to run locally:

(Nosde js must be installed)
1. clone the repository
2. within the directory there is a frontend directory
3. Go inside the frontend directory
4. then run the command "npm i" to install required packages
5. then run command "npm start" to run the project locally


# Thought Process
No basic sockets were used to connect with the django backend
React Bootstrap was used to make the whole calendar. 
Event State changes were done on socket.onmessage function. 
And those state elements were sent to the modal functional components as props. So whenever an interaction with the backend is made, all the states is changed all the data in the frontend is changed.



