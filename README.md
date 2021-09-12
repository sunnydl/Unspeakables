## Mern full stack website: [Unspeakables](https://unspeakables.netlify.app/)

![image](https://user-images.githubusercontent.com/56567343/133001589-6e1968e5-2532-403d-a229-e7348220da4e.png)

### Introduction
In this project I built a full stack website using Mongodb, Expressjs, Reactjs, and Nodejs with CRUD APIs and user authentication functionality that also allows google login.
The website name is Unspeakables, it is a platform where people can come and share their secrets with everyone. What's more, users can choose what kinds of secrets they want
to see using the search bar to select tags that interest them. Each secret post will show the owner of the post, how long it has been posted, a picture of choice from the poster, tags,
title, secret content, and like counts. And of course, only the owner of the secret post can delete their post, the users can click the like button to increase the like counts of a post, and if they click again, it will redo the like action and decrease like counts.

### Technologies I used
* Javascript
* HTML/CSS
* Reactjs for the frontend
* Nodejs and Expressjs for the backend
* Mongodb for the NoSQL database
* JSON Web Token, bcryptjs, and GoogleLogin for user authentication
* Material UI for the user interfaces
* Create-react-app as starting point
* Netlify for frontend deployment
* Heroku for backend deployment

![image](https://user-images.githubusercontent.com/56567343/133001636-ba760ef8-988a-48ac-90d9-9724de667990.png)

### Prerequisite (for local development)
* [Node.js](https://nodejs.org/en/download/)
* Mongodb Atlas

### Basic Instruction
##### This project is currently deployed and you can click [here](https://unspeakables.netlify.app/) to go to the deployed site.
##### The following is for local development purpose
###### Clone/download the project folder in your local machine
###### Go to the server folder, open .env using the editor of your choice
###### Enter your Mongodb Atlas connection url in to the CONNECTION_URL variable
###### Go back to the project folder
###### Open two terminal
###### In terminal 1, do the following
```bash
cd client
npm install
```
###### In terminal 2, do the following
```bash
cd server
npm install
```
###### wait until the packages are installed in both side
###### Then in both terminals
```bash
npm start
```
###### And the website would automatically open in your web browser

### Credits:
* background image src: https://wallpaperboat.com/chill-wallpapers
* icon image src: Photo by <a href="https://unsplash.com/@sebastiaanstam?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">sebastiaan stam</a> on <a href="https://unsplash.com/s/photos/mask?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
* Pre login display pic src: medium:after_download_modal.copy_text.photo: https://www.pexels.com/photo/closeup-photography-of-adult-short-coated-tan-and-white-dog-sleeping-on-gray-textile-at-daytime-731022/
* Post login display pic src: https://giphy.com/gifs/makes-highqualitygifs-Maz1hoeGskARW
* favicon src: https://icons8.com/icon/122769/notre-dame
* UI design was inspired by [Javascript Mastery](https://www.youtube.com/channel/UCmXmlB4-HJytD7wek0Uo97A)
