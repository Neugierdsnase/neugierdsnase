---
title: Python's most underrated game engine for beginners
author: Konstantin <mail@vomkonstant.in>
published: '2018-11-08'
illustration: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250">
    <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5" stroke-width="5"><path d="M206.993 80.897c23.523 40.434 5.156 89.568-30.854 118.461-28.994 23.264-84.795 29.399-123-11.86-21.456-23.172-25.306-61.89-12.482-94.75M63.288 58.174c5.754-5.595 12.326-10.479 19.704-14.41 29.815-15.888 72.622-16.661 102.123 6.846" stroke-width="13.8889"/><path d="M160.417 131.78c-2.42 19.089-12.17 37.793-26.951 44.106-22.954 9.803-41.983-16.17-41.192-44.54 23.124-5.06 45.738-4.923 69.019-6.907M70.475 66.462c3.711-5.705 10.545-11.87 16.052-13.49 10.17-2.994 22.457 8.114 20.852 18.527-1.265 8.215-6.785 15.053-11.972 21.199-7.552 8.954-15.662 17.558-24.729 25.005-12.764-9.735-34.317-22.902-37.625-39.852-2.826-14.469 4.854-30.304 21.118-24.914 6.911 2.29 12.098 7.996 16.304 13.525zM178.756 57.654C182.51 51.88 189.427 45.641 195 44.002c10.293-3.031 22.729 8.211 21.104 18.748-1.282 8.316-6.865 15.236-12.115 21.457-7.643 9.063-15.853 17.772-25.028 25.307-12.918-9.852-34.73-23.18-38.08-40.332-2.858-14.645 4.913-30.671 21.375-25.216 6.995 2.317 12.243 8.09 16.5 13.688z" stroke-width="13.8889"/></g>
</svg>'
---

_This post has been ported from the old blog and slightly edited on the 13<sup>th</sup> of May 2022._

Making games is one of the coolest things you can do with self-taught programming skills. You have complete creative freedom, you don't have to have a unique and marketable idea and you're not potentially putting anyone in danger by messing up.

While there are a lot of great game engines out there (my favorite being <a target="_blank" href="https://godotengine.org/">Godot</a>), I recently came across an awesome project on GitHub named <a target="_blank" href="https://github.com/kitao/pyxel">Pyxel</a>. It is a game engine aiming to enable a quick and easy way to develop games in a retro style.

I have played around with it a little and I was having such a good time playing around with it, that I thought I would write up a small little tutorial about how I coded a quick version of "Pong" in just shy of 130 lines of Python.

## What we're building

So this version of Pong is a single-player version where one player controls both bats and gets a point every time they hit the ball. Easy enough? Let's do it.

_(Screenshot lost during porting, trying to recover.)_

## Setting up the basics

```py
import pyxel

SCREEN_WIDTH = 255
SCREEN_HEIGHT = 120

class App:
  def __init__(self):
    pyxel.init(SCREEN_WIDTH, SCREEN_HEIGHT)
    pyxel.run(self.update, self.draw)

App()
```

So here we are just wrapping our app in its own class, using Pyxel's built-in methods to initialize the screen and run the game.

Pyxel's `run()`-method takes in two functions as arguments, one that will update the game before every frame and one that will redraw the screen after the changes have been calculated, which I have named accordingly.

So let's write those methods inside the `App`:

```py
def update(self):
  if pyxel.btnp(pyxel.KEY_Q):
    pyxel.quit()

def draw(self):
  pyxel.cls(0)
```

Here the `update()`-method does nothing more - for now -, but to listen for a button press of the "Q"-key and quit the program, when it receives `True`. The `draw()`-method uses the built-in `cls()`-method to clear the screen using the color passed to it (in this case, 0 represents black, Pyxel exposes an enumerated color palette of 16 colors you can view <a href="https://github.com/kitao/pyxel">in their docs</a>).

Hooray! If we run this script, we should get a black window that does absolutely nothing. Not that exciting, however, you can check if everything is put together correctly by pressing the "Q"-key. If the window closes, everything works as expected.

## Balling

Arguably the most important game object in Pong is the ball. Let's write a class for our ball.

```py
class Ball:
  def __init__(self, position, velocity):
    self.position = position
    self.velocity = velocity
```

The ball doesn't really need any other properties than a position to define where it is and a velocity to define where it is going. So far so good. Let's make sure our `App` knows about our `Ball`: For this purpose we are going to initialize an instance of the `Ball`, right when the `App` loads, like so:

```py
def __init__(self):
  pyxel.init(SCREEN_WIDTH, SCREEN_HEIGHT)
  self.ball = Ball(PLACEHOLDER_POSITION, PLACEHOLDER_VELOCITY)
  pyxel.run(self.update, self.draw)
```

and in the `draw()` method, we will make sure a circle is drawn to represent the ball:

```py
def draw(self):
  pyxel.cls(0)
  pyxel.circ(self.ball.position, 2, 7)
```

Here, 2 is the radius of the circle (aka our `Ball`) and 7 is the color in which the ball is drawn. Hold on though, Pyxel's `circ()` method needs two positional inputs, one for the x-axis (horizontal) and one for the y-axis (vertical). Let's get onto that.

## Position and Velocity

On a two-dimensional playing field, you will generally need two values to define the position of an object, one for each dimension (axis).

This is also true for the velocity, you need two values to know in which direction the object is moving, however, the fact that you probably also want to keep control over the speed of the object, makes this a little trickier, so let's focus on the position for now.

### Position

Since we will have to manage the position of multiple objects in this project, it makes sense to write a class for those 2D vectors:

```py
class Vec2:
  def __init__(self, x, y):
    self.x = x
    self.y = y
```

Easy enough. Let's apply this to our `Ball`:

```py
class Ball:
  def __init__(self, px, py, vx, vy):
    self.position = Vec2(px, py)
    self.velocity = Vec2(vx, vy)
```

Now, our Ball gets initialized with four values: an `x` and a `y` value for each the position and the velocity. Those values are then swiftly turned into `Vec2`s, so we can easily access the values, i.e. via `any_ball.position.x`. Let's make use of that in our `App`'s `draw() `method:

```py
def draw(self): 
  pyxel.cls(0) 
  pyxel.circ(
    self.ball.position.x,
    self.ball.position.y,
    2, 
    7
  )
```

Now let's properly initiate the `Ball` in our `App` by changing the line `self.ball = Ball(PLACEHOLDER_POSITION, PLACEHOLDER_VELOCITY)` from using the placeholders to something like `self.ball = Ball(20, 20, 2, 2)`. When you run the script now, you should see your ball, standing there, proudly, 20 pixels from the left and 20 pixels from the top border of the window. It won't move though, since we haven't told the `Ball` what to do with its velocity values yet.

### Velocity

Now we should give our `Ball `class its own `update`() `method to make sure it knows what to do with those velocity values:

```py
def update(self):
  self.position.x += self.velocity.x
  self.position.y += self.velocity.y
```

We now have to call this `update()` method within our `App`'s own update method, otherwise, it won't be called at every frame. So add the line `self.ball.update()` there (but outside the scope of our existing if-statement). We're not done though. This will run our ball off the screen, never to be seen again (feel free to try it out). Let's constrain our ball's movement by adding two simple rules to the `update()`-method:

```py
if self.position.y >= SCREEN_HEIGHT - 2:
  self.velocity.y = -self.velocity.y

if self.position.y <= 2:
  self.velocity.y = -self.velocity.y
```

This makes sure that when the ball hits either the top or the bottom border of the screen, it will change its direction on the y-axis. The number 2 here represents the size of the ball and since this is a value now that we are using repeatedly, we should store it in a variable with something like `BALL_SIZE = 2`.

We could also add similar rules for the left and right border here, but since touching the left or right border should later end the game, we can omit this here.

At this point, our `Ball`-class looks like this:

```py
class Ball:
  def __init__(self, px, py, vx, vy):
    self.position = Vec2(px, py)
    self.velocity = Vec2(vx, vy)

  def update(self):
    self.position.x += self.velocity.x
    self.position.y += self.velocity.y

    if self.position.y >= SCREEN_HEIGHT - BALL_SIZE:
      self.velocity.y = -self.velocity.y

    if self.position.y <= BALL_SIZE:
      self.velocity.y = -self.velocity.y
```

**(Don't forget to update the `App`'s `draw()` method to use the newly created `BALL_SIZE` constant as well.)**

As of right now, we have no control over the ball's speed other than indirectly via the values we pass at the time of the initialization. This is a problem for two reasons: 1) The speed of the ball will vary based on its angle (I'm not going to go into detail here, but if you want to try it out, you can take the script we have written so far and make some more balls with different velocity values and watch how they behave). 2) If we were to change the speed of the ball (to make it harder as the game goes along for example), we couldn't easily do so.

To solve this problem, we need to 'normalize' the vector, which means that you figure out a vector's length, and reduce it to 1. With a vector always having the same length, regardless of its angle, you can then reliably control its speed.

We could include something like a normalize() method in our existing Vec2 class, but for our purposes, I think it's a better solution to just write another class for normalized 2D vectors. A class that does everything we just discussed would look like this:

```py
class Vec2_norm:
  def __init__(self, x, y):
    self.magnitude = math.sqrt(x * x + y * y) # this is how you get the magnitude (length) of a vector
    self.x = x / self.magnitude * BALL_SPEED
    self.y = y / self.magnitude * BALL_SPEED
```

For this to work we need to do three things: `import math` at the top of the script, update our `Ball`'s `__init__()` method to use the new class like so: `self.velocity = Vec2_norm(vx, vy)` and create a constant variable `BALL_SPEED = 2`.

Whew. That was a lot. If you need a break, this would be a great point to take one. Just so we're on the same page, here is the full script we are having so far:

```py
import math
import pyxel

BALL_SIZE = 2
BALL_SPEED = 2
SCREEN_WIDTH = 255
SCREEN_HEIGHT = 120

class Vec2:
  def __init__(self, x, y):
    self.x = x
    self.y = y

class Vec2_norm:
  def __init__(self, x, y):
    self.magnitude = math.sqrt(x * x + y * y)
    self.x = x / self.magnitude * BALL_SPEED
    self.y = y / self.magnitude * BALL_SPEED

class Ball:
  def __init__(self, px, py, vx, vy):
    self.position = Vec2(px, py)
    self.velocity = Vec2_norm(vx, vy)

  def update(self):
    self.position.x += self.velocity.x
    self.position.y += self.velocity.y

    if self.position.y >= SCREEN_HEIGHT - BALL_SIZE:
      self.velocity.y = -self.velocity.y

    if self.position.y <= BALL_SIZE:
      self.velocity.y = -self.velocity.y

class App:
  def __init__(self):
    pyxel.init(SCREEN_WIDTH, SCREEN_HEIGHT)
    self.ball = Ball(20, 20, 2, 2)
    pyxel.run(self.update, self.draw)

  def update(self):
    if pyxel.btnp(pyxel.KEY_Q):
      pyxel.quit()
    self.ball.update()

  def draw(self):
    pyxel.cls(0)
    pyxel.circ(
      self.ball.position.x,
      self.ball.position.y,
      BALL_SIZE,
      7
    )

App()
```

## Batting

Did you run it, did it work? Cool. Now we're still missing a crucial part of the game, which is the bats. So let's implement the steps for the bats, what we already know how to do:

1. Write a class

```py
class Bat:
  def __init__(self, px, py):
    self.position = Vec2(px, py)
    self.velocity = 0
```

We don't need a vector for the velocity in this case, since the bats will only be moving on one axis and we can also just set it to 0 right away since the bats shouldn't be moving when the game starts.

1. Let's instantiate two bricks with positions on the left and on the right side of the screen in our App, right when it loads:

```py
def __init__(self):
  pyxel.init(SCREEN_WIDTH, SCREEN_HEIGHT)
  self.ball = Ball(20, 20, 2, 2)
  self.bats = [Bat(10, 10), Bat(SCREEN_WIDTH - 10, 10)]
  pyxel.run(self.update, self.draw)
```

1. Let's draw a rectangle shape in our `App`'s `draw()` method for our bats. Let's also apply what we have learned when making the `Ball` and set a variable for `BAT_SIZE = 8` right away.

```py
def draw(self):
  pyxel.cls(0)
  pyxel.circ(
    self.ball.position.x,
    self.ball.position.y,
    BALL_SIZE,
    7
  )
  for bat in self.bats:
    pyxel.rect(
      bat.position.x - BAT_SIZE / 4, # x-coordinate of top left corner
      bat.position.y - BAT_SIZE,     # y-coordinate of top left corner
      bat.position.x + BAT_SIZE / 4, # x-coordinate of bottom right corner
      bat.position.y + BAT_SIZE,     # y-coordinate of bottom right corner
      7                               # fill color
    )
```

1. In anticipation that this is what we are writing next, let's call our bats' `update()` method inside the `App`'s own `update()` method as we did for the ball.

```py
def update(self):
  if pyxel.btnp(pyxel.KEY_Q):
    pyxel.quit()
  self.ball.update()
  for bat in self.bats:
    bat.update()
```

Okay, so now let's get to that `update()` method itself.

First, we need to tell it (like the Ball), what to do with its velocity value,
secondly, we want to tell it to change its velocity on button-press

```py
if pyxel.btnp(pyxel.KEY_W):
  self.velocity = -2

if pyxel.btnp(pyxel.KEY_S):
  self.velocity = 2
```

and third, we want the bats to stop when they hit the top or bottom edge of the screen.

```py
if self.position.y - BAT_SIZE < 0:
  self.position.y = BAT_SIZE
  self.velocity = 0

if self.position.y + BAT_SIZE > SCREEN_HEIGHT:
  self.position.y = SCREEN_HEIGHT - BAT_SIZE
  self.velocity = 0
```

If you run the script now, all the pieces are in place, but when we try to hit the ball with the bat, it just passes right through. That's obviously not what we want. If we were using a more sophisticated game engine, we'd do something like drawing a 'hitbox' around our game objects, or we would make the objects rigid bodies, something of this sort. In Pyxel though, we have to implement this behavior ourselves. Let's hold on for a second and think about this thoroughly, remember: <strong>think twice, code once.</strong>

<h2>Hitting on it</h2>
Okay, so the hitbox is a property of the bats and it should correlate with the drawn rectangle. So it would make sense to have a hitbox attribute in the `Bat` class and then draw that hitbox rather than arbitrary values as we are doing right now.

Also, since the hitbox will be a collection of various values, it would be a good idea to write its own class, nothing fancy, something like:

```py
class HitBox:
  def __init__(self, x1, y1, x2, y2):
    self.x1 = x1 # x-coordinate of top left corner
    self.y1 = y1 # y-coordinate of top left corner
    self.x2 = x2 # x-coordinate of bottom right corner
    self.y2 = y2 # y-coordinate of bottom right corner
```

Let's take a look inside our `App`'s `draw()` method:

```py
for bat in self.bats:
  pyxel.rect(
    bat.position.x - BAT_SIZE / 4, # x-coordinate of top left corner
    bat.position.y - BAT_SIZE,     # y-coordinate of top left corner
    bat.position.x + BAT_SIZE / 4, # x-coordinate of bottom right corner
    bat.position.y + BAT_SIZE,     # y-coordinate of bottom right corner
    7                              # fill color
  )
```

Let's cut those calculations and rather use them in our `Bat` class to instantiate a hitbox:

```py
class Bat:
  def __init__(self, px, py):
    self.position = Vec2(px, py)
    self.velocity = 0
    self.hitBox = HitBox(
      self.position.x - BAT_SIZE / 4,
      self.position.y - BAT_SIZE,
      self.position.x + BAT_SIZE / 4,
      self.position.y + BAT_SIZE
    )
```

This allows us to use the hitboxes of our bats to draw the rectangles, again in our `App`'s `draw()` method, we can simply write:

```py
for bat in self.bats:
  pyxel.rect(
    bat.hitBox.x1,
    bat.hitBox.y1,
    bat.hitBox.x2,
    bat.hitBox.y2,
    7
  )
```

It might not seem like a huge deal, but this actually means that if we calculate whether or not the ball has been hit by the bat, this will always align with what the user sees on their screen, which is kind of important for obvious reasons.

Before we continue, we have to make sure the hitbox also updates every frame, so we have to update the `Bat`'s `update()` method:

```py
def update(self):
  self.position.y += self.velocity
  self.hitBox = HitBox(
    self.position.x - BAT_SIZE / 4,
    self.position.y - BAT_SIZE,
    self.position.x + BAT_SIZE / 4,
    self.position.y + BAT_SIZE
  )
```

Great, so let's move over and write a simple conditional statement that checks whether or not the position of the ball is inside the bat's hitbox, and if it is, we want the ball to reverse it's velocity on the x-axis. This is what I came up with:

```py
for bat in self.bats:
  bat.update()
  if (bat.hitBox.x1 < self.ball.position.x < bat.hitBox.x2
  and bat.hitBox.y1 < self.ball.position.y < bat.hitBox.y2):
    self.ball.velocity.x = -self.ball.velocity.x
```

**(If you spot a problem with this right away, you would be right, if not, I'm revisiting this in the last segment as an opportunity to debug the script, for now though, this does what it's supposed to do.)**

## Scoring and losing

The game works! Let's implement the score and the loss condition: For the loss condition, we just check for the ball's position on the x-axis and if it's below 0 or farther right than the screen width, the game is over. For the score, we initiate the `App` with a `score` attribute of 0. Now every time the ball hits a bat, we increment the score by 1. After those small changes, the `App`'s `update()` method should look like this:

```py
def update(self):
  if pyxel.btnp(pyxel.KEY_Q):
    pyxel.quit()
  self.ball.update()
  for bat in self.bats:
    bat.update()
    if (bat.hitBox.x1 < self.ball.position.x < bat.hitBox.x2
    and bat.hitBox.y1 < self.ball.position.y < bat.hitBox.y2):
      self.ball.velocity.x = -self.ball.velocity.x
      self.score += 1
  if self.ball.position.x >= SCREEN_WIDTH - BALL_SIZE:
    pyxel.quit()
  if self.ball.position.x <= BALL_SIZE:
    pyxel.quit()
```

Finally, let's give the user some feedback on his score, by including the score as text on the screen. Inside the `App`'s `draw()` method, let's insert:

```py
pyxel.text(
  SCREEN_WIDTH / 2,   # x-position of the text
  SCREEN_HEIGHT / 12, # y position of the text
  str(self.score),    # displayed text as string
  7                   # text color
)
```

And that's it! The game is working and is eager to be played. In case you went off the road somewhere and need help finding back, here is everything we just did, as a whole:

```py
import math
import pyxel

BALL_SIZE = 2
BALL_SPEED = 2
BAT_SIZE = 8
SCREEN_WIDTH = 255
SCREEN_HEIGHT = 120

class Vec2:
  def __init__(self, x, y):
    self.x = x
    self.y = y

class Vec2_norm:
  def __init__(self, x, y):
    self.magnitude = math.sqrt(x * x + y * y)
    self.x = x / self.magnitude * BALL_SPEED
    self.y = y / self.magnitude * BALL_SPEED

class HitBox:
  def __init__(self, x1, y1, x2, y2):
    self.x1 = x1 # x-coordinate of top left corner
    self.y1 = y1 # y-coordinate of top left corner
    self.x2 = x2 # x-coordinate of bottom right corner
    self.y2 = y2 # y-coordinate of bottom right corner

class Ball:
  def __init__(self, px, py, vx, vy):
    self.position = Vec2(px, py)
    self.velocity = Vec2_norm(vx, vy)

  def update(self):
    self.position.x += self.velocity.x
    self.position.y += self.velocity.y

    if self.position.y >= SCREEN_HEIGHT - BALL_SIZE:
      self.velocity.y = -self.velocity.y

    if self.position.y <= BALL_SIZE:
      self.velocity.y = -self.velocity.y

class Bat:
  def __init__(self, px, py):
    self.position = Vec2(px, py)
    self.velocity = 0
    self.hitBox = HitBox(
      self.position.x - BAT_SIZE / 4,
      self.position.y - BAT_SIZE,
      self.position.x + BAT_SIZE / 4,
      self.position.y + BAT_SIZE
    )

  def update(self):
    self.position.y += self.velocity
    self.hitBox = HitBox(
      self.position.x - BAT_SIZE / 4,
      self.position.y - BAT_SIZE,
      self.position.x + BAT_SIZE / 4,
      self.position.y + BAT_SIZE
    )

    if pyxel.btnp(pyxel.KEY_W):
      self.velocity = -2

    if pyxel.btnp(pyxel.KEY_S):
      self.velocity = 2

    if self.position.y - BAT_SIZE < 0:
      self.position.y = BAT_SIZE
      self.velocity = 0

    if self.position.y + BAT_SIZE > SCREEN_HEIGHT:
      self.position.y = SCREEN_HEIGHT - BAT_SIZE
      self.velocity = 0

class App:
  def __init__(self):
    pyxel.init(SCREEN_WIDTH, SCREEN_HEIGHT)
    self.ball = Ball(20, 20, 2, 2)
    self.bats = [Bat(10, 10), Bat(SCREEN_WIDTH - 10, 10)]
    self.score = 0
    pyxel.run(self.update, self.draw)

  def update(self):
    if pyxel.btnp(pyxel.KEY_Q):
      pyxel.quit()
    self.ball.update()
    for bat in self.bats:
      bat.update()
      if (bat.hitBox.x1 < self.ball.position.x < bat.hitBox.x2
      and bat.hitBox.y1 < self.ball.position.y < bat.hitBox.y2):
        self.ball.velocity.x = -self.ball.velocity.x
        self.score += 1
    if self.ball.position.x >= SCREEN_WIDTH - BALL_SIZE:
      pyxel.quit()
    if self.ball.position.x <= BALL_SIZE:
      pyxel.quit()

  def draw(self):
    pyxel.cls(0)
    pyxel.circ(
      self.ball.position.x,
      self.ball.position.y,
      BALL_SIZE,
      7
    )
    for bat in self.bats:
      pyxel.rect(
        bat.hitBox.x1,
        bat.hitBox.y1,
        bat.hitBox.x2,
        bat.hitBox.y2,
        7
      )
    pyxel.text(
      SCREEN_WIDTH / 2,
      SCREEN_HEIGHT / 12,
      str(self.score),
      7
    )

App()
```

## Where to go from here

Alright, a very basic version of the game is done, but let's be honest, it could be more exciting. Here are some suggestions about how to improve the game, that you can try on your own:

- To make the game less predictable, let's change the ball's angle with which he bounces back from the bat by a small random value. Hint: you will probably want to `from random import uniform` for this one.
  - More advanced: Make the angle change based on the position of the ball relative to the position of the bat at the time of contact.
- Make the game harder as it goes along, maybe increase the ball speed a little every 5 points (it isn't technically necessary, but it would be good practice to rename the `BALL_SPEED` variable to `ball_speed`, since all-cap variable names generally indicate constants).
- Use different color schemes. Maybe even change colors dynamically throughout the game (to indicate an increase in ball speed for example).
- There is a bug, that when the ball enters the bat from the bottom or top rather than the side, it will get kind of stuck there, maybe you can figure out what the problem is and fix it?

<hr />

Edit: Stepping every aspect of this tutorial up (and adding some new ones): Check out this project on GitHub: <a target="_blank" href="https://github.com/timbledum/asteroids">github.com/timbledum/asteroids</a>
If you want to level up, examining this very well written and commented repository would be well-invested time.
