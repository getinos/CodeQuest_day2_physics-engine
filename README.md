# CodeQuest_day2_physics-engine

# Ball Collision Simulation Game

This project is a fun, interactive simulation where a ball bounces around a container and interacts with a stickman. The game tracks the ball's speed, momentum, and impact force during collisions with the stickman. Based on the impact force, the game provides a real-world comparison and determines whether the stickman survives or is "broken."

## Features
- **Physics Engine:** Simulates gravity, friction, and ball movement.
- **Impact Force Calculation:** Calculates the impact force when the ball collides with the stickman.
- **Real-World Comparisons:** The game offers humorous comparisons of the impact force based on real-world scenarios.
- **Stickman Interaction:** When the ball hits the stickman, it either gets pushed back or "broken," depending on the force.
- **Animation:** Fun and engaging animations of the ball bouncing and the stickman being hit.

## Technologies Used
- HTML
- CSS
- JavaScript

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ball-collision-simulation.git
Open the index.html file in your browser:

bash
Copy
Edit
open index.html
Enjoy the game!

How It Works
The game works by calculating the momentum and impact force of the ball when it collides with the stickman. The following parameters are involved:

Ball Mass: Set by the user.

Ball Speed: Set by the user.

Impact Force: Calculated based on the ball's horizontal and vertical speed.

Threshold: If the impact force exceeds a certain threshold (200 N), the stickman is "broken."

Physics Formulae
Momentum: p = mass × velocity

Impact Force: force = |horizontal speed| + |vertical speed|

The force is compared to various thresholds, and the game provides a sarcastic commentary on the impact.

Game Interaction
The ball will bounce off the container's walls and the stickman.

If the ball hits the stickman with enough force, the stickman will either be "pushed back" or "broken."

The game compares the impact to real-world scenarios like getting hit by a sledgehammer or being bumped by a toddler.

Example Impact Comparisons:
Impact Force > 50 N: "Like getting hit by a sledgehammer swung by a professional wrestler 💥"

Impact Force > 30 N: "Like being tackled hard in rugby 🏉"

Impact Force > 10 N: "Like being hit by a scooter at moderate speed 🛴"

Impact Force > 5 N: "Like a solid shove in a basketball game 🏀"

Impact Force < 2 N: "Barely a nudge – like a pillow fight gone wrong 🛌🥊"

Contributing
Feel free to fork this repository and submit pull requests! If you find any issues or have suggestions for improvements, please open an issue in the GitHub repository.\
