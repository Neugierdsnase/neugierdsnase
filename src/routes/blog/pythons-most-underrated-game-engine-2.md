---
title: After Pong Ends
author: Konstantin <mail@vomkonstant.in>
published: '2019-01-19'
illustration: '<svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
<g stroke="currentColor">
<path d="M25 195.048c0-.903 1.306-1.3 1.695-2.115.089-.189 1.369-2.83 1.61-2.75 1.094.365 2.962 4.112 3.611 5.111.075.114 1.354 2.037 1.445 1.916 2.428-3.238 1.174-9.757 4.138-12.72.443-.443.635 1.08.971 1.61.174.273 3.394 2.287 3.5 2.14.71-.993 1.891-7.563 4.166-6.806 1.83.61 3.845 5.96 4.25 7.5.068.257 1.16 3.788 1.556 3.472 3.122-2.498 2.886-6.793 3.61-10.416 1.227-6.133 2.111-15.104 5.083-20.553.402-.737 4.14-3.45 4.75-3.084 1.675 1.006 3.609 5.502 5.693 1.334 1.45-2.899 4.684-9.488 4.833-12.471.05-1.007.533-4.693 2.028-4.444 3.622.604 4.92 6.355 6.165 9.11 4.055 8.979 6.373 18.608 10.61 27.386 1.331 2.757 2.05 5.952 3.111 8.833.167.45 1.11 3.009 1.89 2.749 2.237-.746 3.327-9.56 4.47-11.72 6.7-12.654 11.67-26.623 16.22-40.274.284-.852.573-3.457.7-4.337.585-4.027.8-8.594 2.052-12.483.19-.594 1.195-4.368 1.94-4.301 2.59.236 1.963 5.492 3.551 6.55.152.102.77-3.646.86-4.124.462-2.42 1.331-1.368 2.316-1.368.931 0 1 3.625 1.5 4.125.7.7 2.321-.645 2.624-.088.227.415 1.594 5.43 1.875 5.36.574-.144.878-1.826 1.743-1.566.358.108 1.363 2.687 1.742 2.404.545-.41.491-2.801.728-3.485 1.22-3.54 2.552-6.904 4.036-10.366.25-.585 1.7 4.065 2.073 1.456.055-.386.126-.765.198-1.147.63-3.3.657-7.047 2.052-10.145.22-.489.567-2.543 1.08-2.713 1.18-.393 2.666 6.184 3.066 7.234.057.151.954 2.224 1.059 2.16 1.126-.675.726-2.44.683-3.484-.116-2.857-.285-5.675.177-8.513.036-.22.484-3.59.882-3.44.751.28 1.071 2.205 1.257 2.823.82 2.73 1.502 5.5 2.404 8.204 2.736 8.208 3.553 17.308 6.682 25.276.737 1.872 1.373 3.79 2.207 5.623.06.133.734 1.552.881 1.478.505-.252-.128-1.976.331-2.206.042-.02.504 1.035.573 1.125.528.679 1.061 1.343 1.522 2.073.21.332.595 1.407.595 1.015.542.902 1.038.45 1.358-.09.788-1.33.992-3.038 1.271-4.526.888-4.733 1.954-9.12 2.489-13.922.745-6.71 2.869-12.716 4.207-19.216.823-3.993.428-7.79 1.854-11.75 1.084-3.013 1.618-7.68 3.943-10.005.063-.063 1.966 5.483 2.462 5.929.719.647 1.88-2.486 2.487-1.88 1.32 1.322 1.78 4.426 2.382 6.115 1.543 4.333 2.84 8.812 4.711 13.022.025.054.427-.812.477-.921.39-.864.742-1.747 1.132-2.611.932-2.061 3.322-3.87 3.794-6.01 1.635-7.426 3.087-15.224 5.879-22.44.192-.498.968.01 1.444-.24 2.713-1.43 2.405 2.244 3.745 4.7.2.366 1.234 4.043 1.65 3.705 1.504-1.221 1.79-5.813 2.259-7.588 1.925-7.283 3.977-14.1 3.75-21.768" stroke-width="8.3333" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round">
</path>
</g>
</svg>'
---

_This post has been ported from the old blog and slightly edited on the 15<sup>th</sup> of May 2022._

["Python’s most underrated game engine for beginners"](/blog/pythons-most-underrated-game-engine) is by far the most popular post on this blog and it seems to help a lot of people making their first steps with Python, so I decided to expand on this post by 1) refactoring the code to be both better and more pythonic and 2) solve the challenges I posted at the bottom of the first post utilizing the advantages of the new, refactored code.

For this tutorial, I will constantly refer back to the original code, so it might be helpful if you have a copy of it somewhere nearby.

The first thing we need to address is our Vec2 classes. We define two of them, one for normal vectors and one for normalized vectors. In most circumstances, this would be considered bad practice, because as you expand the functionality of your `Vec2` class, you also have to copy that functionality over to the `Vec2_norm` class, which isn't very <a target="_blank" href="https://en.wikipedia.org/wiki/Don't_repeat_yourself">DRY</a>, to say the least.

So let's merge these two classes into one:

```py
class Vec2:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.magnitude = math.sqrt(x * x + y * y)

    def normalized(self):
        return Vec2(self.x / self.magnitude, self.y / self.magnitude)
```

Cool, so now we can use our `Vec2` class like we are used to and when we want to use a normalized vector we can use its `normalized(`)` method. Easy peasy.

Above I mentioned something about expanding our `Vec2` classes functionality. Well, what do I mean by that? After all, we have been getting by just fine with just an `x`, a `y` and a `magnitude` attribute. Now we can even normalize a vector by calling a single method, what else could we want from our class, right?

Consider this: How would you add two vector objects together? Probably something like this:

```py
vector_1 = Vec2(2, 2)
vector_2 = Vec2(3, 3)
vector_sum = Vec2(vector_1.x + vector_2.x, vector_1.y + vector_2.y)
```

That's an awful lot of code for such a simple operation though, isn't it? Shouldn't it be a simple as `vector_sum = vector_1 + vector2`? This is where Python's magic methods come into play. You see, we can achieve exactly this behavior, by specifying our vector's `**add**` method like this:

```py
def __add__(self, other):
    return Vec2(self.x + other.x, self.y + other.y)
```

Now, whenever we use the + operator with two vector objects it will perform the addition and return a new vector object with the new values.

Here is a little exercise: Try and define magic methods for all the other basic arithmetic operations and when you have done that I show you my solution. The methods you are looking for are called `**sub**`, `**mul**` and `**truediv**`.

<hr />

Have you done it? Great. Here is what I have:

```py
class Vec2:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.magnitude = math.sqrt(x * x + y * y)

    def __add__(self, other):
        if not isinstance(other, Vec2):
            raise TypeError("Only 2 Vec2 can be added to each other!")
        return Vec2(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        if not isinstance(other, Vec2):
            raise TypeError("Only a Vec2 can be subtracted from another!")
        return Vec2(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        if not isinstance(scalar, (int, float)):
            raise TypeError("A Vec2 can only be mulitplied by a scalar!")
        return Vec2(self.x * scalar, self.y * scalar)

    def __truediv__(self, scalar):
        if not isinstance(scalar, (int, float)):
            raise TypeError("A Vec2 can only be divided by a scalar!")
        return Vec2(self.x / scalar, self.y / scalar)

    def normalized(self):
        return self / self.magnitude
```

Easy right? You are probably noticing two things in my code though: Firstly, I have included checks to make sure the operators are used with the right data type since vectors can only be added to and subtracted from other vectors, yet can only be multiplied and divided by single numbers (called scalars). Secondly, I have refactored the `normalized()` method yet again to take advantage of this new functionality right away. Looking mighty fine, let's move on.

Next, let's look at our `HitBox` class. The first thing we should notice is that this class actually has no functionality at all. It consists exclusively of attributes and has no methods. Whenever you encounter a class like this, it is a perfect opportunity to refactor, since a class like this can (and should) be refactored into a collection type called `namedtuple`. So after adding the `from collections import namedtuple` statement at the top of our file, let's refactor our HitBox to look like this: `HitBox = namedtuple("HitBox", "x1 y1 x2 y2")`. Single line. Easy as pie. If something about this confuses you, check out <a href="https://docs.python.org/2/library/collections.html#collections.namedtuple">the official documentation here</a>.

The best part is that we can actually use this like our original `HitBox` class, so we can leave the parts of our code that used the class as they are, but not only that, since this is now a sequence type, we have now implicitly made any `HitBox` iterable. _"Yeah that's nice"_, you might say, _"but when do I realistically need to iterate through the coordinates of a hitbox? That's not very useful."_

Well, let's take a look at the `draw` method of our original `App` class. Until now it looks like this:

```py
def draw(self):
    pyxel.cls(0)
    pyxel.circ(self.ball.position.x, self.ball.position.y, BALL_SIZE, 7)
    for bat in self.bats:
        pyxel.rect(bat.hitBox.x1, bat.hitBox.y1, bat.hitBox.x2, bat.hitBox.y2, 7)
    pyxel.text(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 12, str(self.score), 7)
```

Notice how we need to reference every single coordinate when drawing a rectangle for our bats? You see, being iterable does not only mean that we can iterate through it, it also means that we can make use of Python's very powerful packing/unpacking features. Here we can refactor the relevant line to `pyxel.rect(\*bat.hitBox, 7)`, which is way prettier and to the point.

For the rest of the script, the refactoring is rather unexciting, but what we definitely should do, is to move the BALL_SPEED, BALL_SIZE and BRICK_SIZE constants to where they belong: Their respective classes. You can do that yourself or copy it from below, where you find the complete script as we have it right now, just so we are on the same page:

```py
from collections import namedtuple
import math
import pyxel

SCREEN_WIDTH = 255
SCREEN_HEIGHT = 120

HitBox = namedtuple("HitBox", "x1 y1 x2 y2")


class Vec2:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.magnitude = math.sqrt(x * x + y * y)

    def __add__(self, other):
        if not isinstance(other, Vec2):
            raise TypeError("Only 2 Vec2 can be added to each other!")
        return Vec2(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        if not isinstance(other, Vec2):
            raise TypeError("Only a Vec2 can be subtracted from another!")
        return Vec2(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        if not isinstance(scalar, (int, float)):
            raise TypeError("A Vec2 can only be mulitplied by a scalar!")
        return Vec2(self.x * scalar, self.y * scalar)

    def __truediv__(self, scalar):
        if not isinstance(scalar, (int, float)):
            raise TypeError("A Vec2 can only be divided by a scalar!")
        return Vec2(self.x / scalar, self.y / scalar)

    def normalized(self):
        return self / self.magnitude


class Ball:
    def __init__(self, px, py, vx, vy, speed=2, size=2):
        self.position = Vec2(px, py)
        self.speed = speed
        self.size = size
        self.velocity = Vec2(vx, vy).normalized() * self.speed

    def changeSpeedBy(self, number):
        self.speed *= number
        self.velocity = self.velocity.normalized() * self.speed

    def update(self):
        self.position.x += self.velocity.x
        self.position.y += self.velocity.y

        if self.position.y &gt;= SCREEN_HEIGHT - self.size:
            self.velocity.y = -self.velocity.y

        if self.position.y &lt;= self.size:
            self.velocity.y = -self.velocity.y


class Bat:
    def __init__(self, px, py, size=8):
        self.position = Vec2(px, py)
        self.velocity = 0
        self.size = size
        self.hitBox = HitBox(
            self.position.x - self.size / 4,
            self.position.y - self.size,
            self.position.x + self.size / 4,
            self.position.y + self.size,
        )

    def update(self):
        self.position.y += self.velocity
        self.hitBox = HitBox(
            self.position.x - self.size / 4,
            self.position.y - self.size,
            self.position.x + self.size / 4,
            self.position.y + self.size,
        )

        if pyxel.btnp(pyxel.KEY_W):
            self.velocity = -2

        if pyxel.btnp(pyxel.KEY_S):
            self.velocity = 2

        if self.position.y - self.size &lt; 0:
            self.position.y = self.size
            self.velocity = 0

        if self.position.y + self.size &gt; SCREEN_HEIGHT:
            self.position.y = SCREEN_HEIGHT - self.size
            self.velocity = 0


class App:
    def __init__(self):
        pyxel.init(SCREEN_WIDTH, SCREEN_HEIGHT)
        self.ball = Ball(20, 20, 2, 2)
        self.score = 0
        pyxel.run(self.update, self.draw)

    def update(self):
        if pyxel.btnp(pyxel.KEY_Q):
            pyxel.quit()
        self.ball.update()
        if self.ball.position.x &gt;= SCREEN_WIDTH - self.size:
            pyxel.quit()
        if self.ball.position.x &lt;= self.size:
            pyxel.quit()

    def draw(self):
        pyxel.cls(0)
        pyxel.circ(self.ball.position.x, self.ball.position.y, self.size, 7)
        pyxel.text(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 12, str(self.score), 7)


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
            if (
                bat.hitBox.x1 &lt; self.ball.position.x &lt; bat.hitBox.x2
                and bat.hitBox.y1 &lt; self.ball.position.y &lt; bat.hitBox.y2
            ):
                self.ball.velocity.x = -self.ball.velocity.x
                self.score += 1
        if self.ball.position.x &gt;= SCREEN_WIDTH - self.ball.size:
            pyxel.quit()
        if self.ball.position.x &lt;= self.ball.size:
            pyxel.quit()

    def draw(self):
        pyxel.cls(0)
        pyxel.circ(self.ball.position.x, self.ball.position.y, self.ball.size, 7)
        for bat in self.bats:
            pyxel.rect(*bat.hitBox, 7)
        pyxel.text(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 12, str(self.score), 7)


App()
```

Now that we have a much better version of the original code, let's try and implement the improvements I was suggesting at the end of the first post, these were:

- To make the game less predictable, let’s change the ball's angle by which he bounces back from the bat by a small random value. Hint: you will probably want to `from random import uniform for this one.
  - More advanced: Make the angle change based on the position of the ball relative to the position of the bat at the time of contact.
- Make the game harder as it goes along, maybe increase the ball speed a little every 5 points (it isn’t technically necessary, but it would be good practice to rename the `BALL_SPEED` variable to `ball_speed`, since all-cap variable names generally indicate constants).
- Use different color schemes. Maybe even change colors dynamically throughout the game (to indicate an increase in ball speed for example).
- There is a bug, that when the ball enters the bat from the bottom or top rather than the side, it will get kind of stuck there, maybe you can figure out what the problem is and fix it?

## Change the balls angle based on the position of the ball relative to the position of the bat at the time of contact

Let's just go for the more advanced version right away. First, let's clarify what we mean by "angle" and what we mean by "relative to" in terms of our code. When we say "angle, we mean that not only the x-attribute of our balls velocity vector changes but also the y-attribute. When we say "relative to" we mean to compare the ball's y-position with the bat's y-position.

Let's start looking at our code. We check for the collision between ball and bat starting on line 113 inside our `App`'s `update` method. Instead of just reversing the direction of the ball on the x-axis like we are doing right now, let's also play with the y-value of the velocity vector.

The problem here is that this can become messy since we have lots of cases we want to avoid. We don't want to make it so big for example, that the ball is just moving in a straight vertical line, we also don't want it to lock in to just go perfectly horizontal near the edge of the screen forever (which could potentially happen). Put aptly, we want to keep control over the range of acceptable y-values. In other words: We want to keep the ball from getting crazy.

Here is how I would go about this. Knowing that this can get messy, I will not attempt to edit the code right then and there, but rather define its own function for this behavior.

The idea is this: We take in a value I'm calling offset, which is what determines how much the value should be changed. Then I'm also defining a range of inputs (minimum and maximum value of the offset) and a range of outputs (this is how I keep control over what I want to allow). Then I am mapping my range of inputs to the range of outputs and translate my offset to fit the mapping. Phu, that was a lot, let's see it in action:

```py
def mutate_y_value(offset, min_input, max_input, min_output, max_output):
    # determining the size of each range
    offset_range = max_offset - min_offset
    output_range = max_output - min_output

    # converting the offset_range to a range 0-1

offset_scaled = float(offset - min_offset) / float(offset_range)

    # returning the mapped value
    return min_output + (offset_scaled * output_range)
```

This would work, but writing a function like this could be considered bad practice. Functionality like this should be encapsulated by the entity it belongs to. I would argue this functionality belongs to our `Vec2` class. Rewritten as a method of the `Vec2` class, it now looks like this:

```py
def mutate_y_value_in_range(
    self, offset, min_offset, max_offset, min_output, max_output
):
    offset_range = max_offset - min_offset
    output_range = max_output - min_output

    offset_scaled = float(offset - min_offset) / float(offset_range)

    return Vec2(self.x, self.y + min_output + (offset_scaled * output_range))
```

Notice how I have added the `self` argument and how I am utilizing it to return a new vector object, to make its application easier.

So how do we apply this function? In our App's update method, between reversing the ball's velocity's x-value, and incrementing the score, we call our new method:

```py
self.ball.velocity = (
    self.ball.velocity.mutate_y_value_in_range(
        (self.ball.position.y - bat.position.y),
        -bat.size,
        bat.size,
        -1.5,
        1.5,
     ).normalized()
     * self.ball.speed
)
```

Here we assign a new vector to `self.ball.velocity`. Keep in mind the x-value has already been reversed. The first argument here is the difference between the ball's y-position and the bat's y-position. The `min_offset` and `max_offset` arguments cannot possibly be bigger than the size of the bats (because in that case, they would not touch the bat). The output I determined by just playing around a little. The bigger the range the sharper the angle. Whatever feels right. I went for 1.5. Time to give it a test run, maybe take a break, and move on.

## Increase the ball speed a little every 5 points

If you powered through until this point you are beyond the level where I need to explain this one, so I'm just pasting the code here.

```py
self.score += 1                 # this line already exists
if self.score % 5 == 0:
    self.ball.speed += 1
    self.ball.velocity = (
        self.ball.velocity.normalized() * self.ball.speed
    )
```

## Use different color schemes. Maybe even change colors dynamically throughout the game

Let's use the same `if` statement for this one, but before we do that we have to substitute all the colors we are using right now with variables we can change dynamically. Right now, we are using two different colors, a foreground color for the ball the bats and the text and a background color to fill out the window. So let's define it this way: At the top of the file, create a dictionary to hold that information with something like `colors = dict(foreground=7, background=0)`. Luckily, we only use colors in our `App`'s `draw` method, so we don't have to search the whole file to replace colors. After replacing these values the `draw` method should look like this:

```py
def draw(self):
    pyxel.cls(colors["background"])
    pyxel.circ(
        self.ball.position.x,
        self.ball.position.y,
        self.ball.size,
        colors["foreground"],
    )
    for bat in self.bats:
        pyxel.rect(*bat.hitBox, colors["foreground"])
    pyxel.text(
        SCREEN_WIDTH / 2, SCREEN_HEIGHT / 12, str(self.score), colors["foreground"]
    )
```
