# Snake in JavaScript Using Phaser
> Through the use of the framework Phaser, I have created a game of Snake with a score, the ability to wrap around the screen, and three different types of food which the snake can eat.


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)



## General Information
- For those who are unfamiliar with Snake, the following is a brief description of the game: the player is to use the directional keys to guide a snake (in this game it will be pictured as a simple square) to the food which is located onscreen. As the snake eats the food, its body will grow in length, and the food repositioned. The goal is to eat as much food as possible without running into one's own body. If one does run into their own body, they have lost the game.
- In the case of this particular implementation of Snake, there will always be two pieces of food onscreen, and eating either one will cause both to be repositioned and the one that was eaten to have its type shuffled. There are three types of food, as follows:
    1. Flowers: flowers are the basic food type, increasing the size of the body and the score by one.
    2. Fruit: fruit will increase the size of the body by five, but only increase the score by one.
    3. Candy: candy will increase the body by one, but will increase the score by five, which will in turn speed the game up slightly.
Try to get as as many points as possible. If the player manages to grow their body to the point that it fills the entire screenm they have cleared the game.
- I undertook this project in order to get more familiar with the Phraser framework, and also as an exercise in Object Oriented Design. I found it to be a very instructive and enjoyable process, and feel that I have grown much more comfortable with reading documentation and understanding game design.



## Technologies Used
- Phaser - version 3.3



## Features
- Wrap-Aound: Escape sticky situations by wrapping around the screen!
- Score Counter: This game is not just about growing your body. Try to get the highest score possible!
- Different Food Types: Play it safe with the flower, or get big boosts to your score or body!



## Setup
In order to load the different assets for the game, you will need a local server. I used xampp, following this tutorial to get xampp installed and running: https://www.youtube.com/watch?v=Nopzvr_Bzy4

The first six minutes of the video will outline the setup process. Once you have your folders set up, download my Snake project from Github and save it within the "games" folder that you created inside of the "htdocs" subfolder of xampp. Once you have done so, you can type in "localhost/games" (if you did not name your folder "games", put the name of your folder in where games is written above) inside of your web browser's search bar, and then click on the "Snake" hyperlink to start the game.



## Project Status
This project is still in progress, with further comments and small refinements still to be added.


## Room for Improvement

Room for improvement:
- Although this project does utilize Object-Oriented Design, this approach can still be optimized.
- The comments within the source code further still need to be fleshed out, giving greater insight into the logic and components of their corresponding blocks of code

To do:
- Having a way of keeping track of a player's high score across multiple games would nicely flesh out the scoring feature of the game
- Currently, the game only uses a single screen to operate. The addition of a start screen and/or a game over screen could round out the user interface.


## Acknowledgements
- This project was based on the Phaser tutorial for Snake.


## Contact
Created by [@Cory-gip](cory.gipson@gmail.com) - feel free to contact me!
