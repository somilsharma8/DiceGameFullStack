# Dice Game - FullStack
(This is a multiplayer Dice Game with both front end and backend functionalities.)

## Front-End functionalities: 

* Home page consists of two entry fields, both mandatory, which require user input for number of players and max/threshold score to end the game (both values should be more than 0). Not entering values or entering incorrect values invokes an alert advising correction.
  * When the Start game button is clicked:
    * A post request is sent to backend system with game details (no of players and max score), which inserts a row into Game data table in MySQL and returns gameID (primary key) as a response.
    * Values entered by user, along with the gameID received from backend, are added as query parameter and app navigates to the main game screen.

* Game page consists of two main sections, one is like the game board area where dice is rolled on a button click. And the other is a player ranking section, sorting player names as per their score.
  * When the Roll Dice button is clicked:
    * The code first verifies if the turn is to be skipped for the current user or not (in case of achieving two consecutive 1s). Upon validation, a random number is generated between [1,6]. 
      After adding this to the respective players' total score, a check is performed to verfiy is score threshold for ending game is reached or not. If it is, only the remaining score (leading to theshold) is added to player score and game is marked as ended.
      This involves sending another post request to update the status of the game in backend (with gameID and winnings player name attached to request body).
    * After current player score and total game score have been updated, the code executes logic to figure out which player's tun is next. In case, current player acquired a 6 on dice throw, they get a second turn.
