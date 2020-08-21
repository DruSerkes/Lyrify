# Capstone #2 Project Proposal  
Dru Serkes

---

### The Pitch  
Do you love music? 
Do you listen to music on Spotify?
Do you frequently find yourself looking up song lyrics as you listen?    

Welcome to: **Lyrify**
A website where active music listeners can automaticaly view the lyrics to songs as they listen.

---

### Tech  

##### Front End: 
* React
* Redux 
* Material UI 

##### Back End: 
* Node/Express
* PostgreSQL

---

### Focus 
As this project will require a working knowledge of the Spotify API, the focus of this project will be on learning how to work with their popular interface and integrate it with my app, which also utilizes a secondary API for lyric data. 

To help balance my time between UI and server, I also plan to learn and make use of [Material UI](https://material-ui.com/) components. 

--- 

### The User  

Users of this app are music lovers. People who listen actively, people who have opinions about what they spend their time listening to, and people who are naturally curious.

---

### The Data  

Currently, I plan to utilize the [Spotify API](https://developer.spotify.com/documentation/web-api/) for data about the music our user is currently streaming. 

In addition I will be making use of [this simple lyrics api](https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search) for lyric retrieval. 

---

### The Approach  

1. Users will login with their Spotify account. 
2. User data will be stored in a PostgreSQL database, with unique user ID placed into localStorage to keep a user logged in - this app will not store a  password or sensitive data. 
3. User data will then be stored in state (previously registered users will begin at this step) along with necessary auth token and refresh token for API requests.
4. Server will fetch "currently playing" from the Spotify API for this user
5. Server will fetch lyrics for the title / artist of the currently playing song
6. Server will send the lyrics to the front end, where they will be displayed on the DOM. 

Possible further study considerations... 
7. Possible navbar with options to view lyrics by artist/song search, in addition to default "currently playing" tab.  

---

### User Flow  

This app will employ a clean UI with simple use. 

1. User will create an account by logging in with their Spotify account, then be redirected back to the app. 
2. Lyrics for whatever is "now playing" will be the default lyrics displayed to the user as the main content. 

---

### Stretch goals  

As this is my first React/Node project where I define the expectations, I'm currently not fully confident in my ability to accurately judge how long this will take me (my last project took upwards of 100 hours when I expected to put in ~60). 

Fortunately, I believe the MVP here is useful without too many bells and whistles. 

If I end up with extra time and want to add more functionality, I would like to add the ability for users to search for lyrics by artist name and song title. I might also try to make it so users with Spotify Premium accounts can view/utilize a player with web playback directly in the app. 

