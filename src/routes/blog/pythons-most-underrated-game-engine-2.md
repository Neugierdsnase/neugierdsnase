---

---

<a>Python’s most underrated game engine for beginners"</a> is by far the most popular post on this blog and it seems to help a lot of people making their first steps with Python, so I decided to expand on this post by 1) refactoring the code to be both better and more pythonic and 2) solve the challenges I posted at the bottom of the first post utilizing the advantages of the new, refactored code.

For this tutorial, I will constantly refer back to the original code, so it might be helpful if you have a copy of it somewhere nearby.

The first thing we need to address is our Vec2 classes. We define two of them, one for normal vectors and one for normalized vectors. In most circumstances, this would be considered bad practice, because as you expand the functionality of your <code class="EnlighterJSRAW" data-enlighter-language="python">Vec2</code> class, you also have to copy that functionality over to the <code class="EnlighterJSRAW" data-enlighter-language="python">Vec2_norm</code> class, which isn't very <a href="https://en.wikipedia.org/wiki/Don't_repeat_yourself">DRY</a>, to say the least.

So let's merge these to classes into one:
<pre class="EnlighterJSRAW" data-enlighter-language="python">class Vec2:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.magnitude = math.sqrt(x * x + y * y)

    def normalized(self):
        return Vec2(self.x / self.magnitude, self.y / self.magnitude)</pre>
Cool, so now we can use our <code class="EnlighterJSRAW" data-enlighter-language="python">Vec2</code> class like we are used to and when we want to use a normalized vector we can use it's <code class="EnlighterJSRAW" data-enlighter-language="python">normalized()</code> method. Easy peasy.

Above I mentioned something about expanding our <code class="EnlighterJSRAW" data-enlighter-language="python">Vec2</code> classes functionality. Well, what do I mean by that? After all, we have been getting by just fine with just an <code class="EnlighterJSRAW" data-enlighter-language="python">x</code>, a <code class="EnlighterJSRAW" data-enlighter-language="python">y</code> and a <code class="EnlighterJSRAW" data-enlighter-language="python">magnitude</code> attribute. Now we can even normalize a vector by calling a single method, what else could we want from our class, right?

Consider this: How would you add two vector objects together? Probably something like this:
<pre class="EnlighterJSRAW" data-enlighter-language="python">vector_1 = Vec2(2, 2)
vector_2 = Vec2(3, 3)
vector_sum = Vec2(vector_1.x + vector_2.x, vector_1.y + vector_2.y)</pre>
That's an awful lot of code for such a simple operation though, isn't it? Shouldn't it be a simple as <code class="EnlighterJSRAW" data-enlighter-language="python">vector_sum = vector_1 + vector2</code>? This is where Python's magic methods come into play. You see, we can achieve exactly this behavior, by specifying our vector's <code class="EnlighterJSRAW" data-enlighter-language="python">__add__</code> method like this:
<pre class="EnlighterJSRAW" data-enlighter-language="null">def __add__(self, other):
    return Vec2(self.x + other.x, self.y + other.y)</pre>
Now, whenever we use the + operator with two vector objects it will perform the addition and return a new vector object with the new values.

Here is a little exercise: Try and define magic methods for all the other basic arithmetic operations and when you have done that I show you my solution. The methods you are looking for are called <code class="EnlighterJSRAW" data-enlighter-language="python">__sub__</code>, <code class="EnlighterJSRAW" data-enlighter-language="python">__mul__</code> and <code class="EnlighterJSRAW" data-enlighter-language="python">__truediv__</code>.

<hr />

Have you done it? Great. Here is what I have:
<pre class="EnlighterJSRAW" data-enlighter-language="python">class Vec2:
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
        return self / self.magnitude</pre>
Really easy right? You are probably noticing two things in my code though: Firstly, I have included checks to make sure the operators are used with the right data type, since vectors can only by added to and subtracted from other vectors, yet can only be multiplied and divided by single numbers (called scalars). Secondly, I have refactored the <code class="EnlighterJSRAW" data-enlighter-language="python">normalized()</code> method yet again to take advantage of this new functionality right away. Looking mighty fine, let's move on.

Next, let's look at our <code class="EnlighterJSRAW" data-enlighter-language="python">HitBox</code> class. The first thing we should notice is that this class actually has no functionality at all. It consist exclusively of attributes and has no methods. Whenever you encounter a class like this, it is a perfect opportunity to refactor, since class like this can (and should) be refactored into a collection type called <code class="EnlighterJSRAW" data-enlighter-language="python">namedtuple</code>. So after adding the <code class="EnlighterJSRAW" data-enlighter-language="python">from collections import namedtuple</code>statement at the top of our file, let's refactor our HitBox to look like this: <code class="EnlighterJSRAW" data-enlighter-language="python">HitBox = namedtuple("HitBox", "x1 y1 x2 y2")</code>. Single line. Easy as pie. If something about this confuses you, check out <a href="https://docs.python.org/2/library/collections.html#collections.namedtuple">the official documentation here</a>.

The best part is that we can actually use this like our original <code class="EnlighterJSRAW" data-enlighter-language="python">HitBox</code> class, so we can leave the parts of our code that used the class as they are, but not only that, since this is now a sequence type, we have now implicitly made any <code class="EnlighterJSRAW" data-enlighter-language="python">HitBox</code> iterable. *"Yeah that's nice"*, you might say, *"but when do I realistically need to iterate though the coordinates of a hit box? That's not very useful."*

Well, let's take a look at the <code class="EnlighterJSRAW" data-enlighter-language="python">draw</code> method of our original <code class="EnlighterJSRAW" data-enlighter-language="python">App</code> class. Until now it looks like this:
<pre class="EnlighterJSRAW" data-enlighter-language="python" data-enlighter-highlight="5">def draw(self):
    pyxel.cls(0)
    pyxel.circ(self.ball.position.x, self.ball.position.y, BALL_SIZE, 7)
    for bat in self.bats:
        pyxel.rect(bat.hitBox.x1, bat.hitBox.y1, bat.hitBox.x2, bat.hitBox.y2, 7)
    pyxel.text(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 12, str(self.score), 7)</pre>
Notice how we need to reference every single coordinate when drawing a rectangle for our bats? You see, being iterable does not only mean that we can iterate through it, it also means that we can make use of Python's very powerful packing/unpacking features. Here we can refactor the relevant line to <code class="EnlighterJSRAW" data-enlighter-language="python">pyxel.rect(*bat.hitBox, 7)</code>, which is way prettier and to the point.

For the rest of the script, the refactoring is rather unexciting, but what we definitely should do, is to move the BALL_SPEED, BALL_SIZE and BRICK_SIZE constants to where they belong: Their respective classes. You can do that yourself or copy it from below, where you find the complete script as we have it right now, just so we are on the same page:
<pre class="EnlighterJSRAW" data-enlighter-language="python">from collections import namedtuple
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
</pre>
Now that we have a much better version of the original code, let's try and implement the improvements I was suggesting at the end of the first post, these were:
<ol>
 	<li>In order to make the game less predictable, let’s change the balls angle by with which he bounces back from the bat by a small random value. Hint: you will probably want to <span class="enlighterEnlighterJS EnlighterJS"><span class="kw1">from</span><span class=""> random </span><span class="kw1">import</span><span class=""> uniform</span></span> for this one.
<ul>
 	<li>More advanced: Make the angle change based on the position of the ball relative to the position of the bat at time of contact.</li>
</ul>
</li>
 	<li>Make the game harder as it goes along, maybe increase the ball speed a little every 5 points (it isn’t technically necessary, but it would be good practice to rename the <span class="enlighterEnlighterJS EnlighterJS"><span class="kw3">BALL_SPEED</span></span> variable to <span class="enlighterEnlighterJS EnlighterJS"><span class="">ball_speed</span></span>, since all-cap variable names generally indicate constants).</li>
 	<li>Use different color schemes. Maybe even change colors dynamically throughout the game (to indicate an increase in ball speed for example).</li>
 	<li>There is a bug, that when the ball enters the bat from the bottom or top rather than the side, it will get kind of stuck there, maybe you can figure out what the problem is and fix it?</li>
</ol>
<h2>Change the balls angle based on the position of the ball relative to the position of the bat at time of contact</h2>
<div>
<div>Let's just go for the more advanced version right away. First let's clarify what we mean by "angle" and what we mean by "relative to" in terms of our code. When we say "angle, we mean that the not only the x-attribute of our balls velocity vector changes, but also the y-attribute. When we say "relative to" we mean to compare the ball's y-position with the bat's y-position.</div>
<div>Let's start looking at our code. We check for the collision between ball and bat starting on line 113 inside our <code class="EnlighterJSRAW" data-enlighter-language="python">App</code>'s <code class="EnlighterJSRAW" data-enlighter-language="python">update</code> method. Instead of just reversing the direction of the ball on the x-axis like we are doing right now, let's also play with the y-value of the velocity vector.</div>
<div>The problem here is that this can become really messy, since we have lot of cases we want to avoid. We don't want to make it so big for example, that the ball is just moving in a straight vertical line, we also don't want it to lock in to just go perfectly horizontal near the edge of the screen forever (which could potentially happen). Put aptly, we want to keep control over the range of acceptable y-values. In other words: We want to keep the ball from getting crazy.</div>
<div>Here is how I would go about this. Knowing that this can get messy, I will not attempt to edit the code right then and there, but rather define it's own function for this behavior.</div>
<div>The idea is this: We take in a value I'm calling offset, which is what determines by how much the value should be changed. Then I'm also defining a range of inputs (minimum and maximum value of the offset) and a range of outputs (this is how I keep control over what I want to allow). Then I am mapping my range of inputs to the range of outputs and translate my offset to fit the mapping. Okay that was a lot, let's see it in action:</div>
</div>
<div>
<pre class="EnlighterJSRAW" data-enlighter-language="python">def mutate_y_value(offset, min_input, max_input, min_output, max_output):
    # determining the size of each range
    offset_range = max_offset - min_offset
    output_range = max_output - min_output

    # converting the offset_range to a range 0-1
    offset_scaled = float(offset - min_offset) / float(offset_range)

    # returning the mapped value
    return min_output + (offset_scaled * output_range)</pre>
Now this would work, but writing a function like this could be considered bad practice. Functionality like this should be encapsulated by the entity that it belongs to. I would argue this functionality belongs to our <code class="EnlighterJSRAW" data-enlighter-language="python">Vec2</code> class. Rewritten as a method of the <code class="EnlighterJSRAW" data-enlighter-language="python">Vec2</code> class, it now looks like this:

</div>
<div>
<pre class="EnlighterJSRAW" data-enlighter-language="python">def mutate_y_value_in_range(
    self, offset, min_offset, max_offset, min_output, max_output
):
    offset_range = max_offset - min_offset
    output_range = max_output - min_output

    offset_scaled = float(offset - min_offset) / float(offset_range)

    return Vec2(self.x, self.y + min_output + (offset_scaled * output_range))</pre>
Notice how I have added the <code class="EnlighterJSRAW" data-enlighter-language="python">self</code> argument and how I am utilizing it to return a new vector object, to make it's application easier.

So how do we apply this function? In our App's update method, between reversing the ball's velocity's x-value, and incrementing the score, we call our new method:
<pre class="EnlighterJSRAW" data-enlighter-language="python">self.ball.velocity = (
    self.ball.velocity.mutate_y_value_in_range(
        (self.ball.position.y - bat.position.y),
        -bat.size,
        bat.size,
        -1.5,
        1.5,
     ).normalized()
     * self.ball.speed
)</pre>
Here we assign a new vector to <code class="EnlighterJSRAW" data-enlighter-language="python">self.ball.velocity</code>. Keep in mind the x-value has already been reversed. The first argument here is the difference of the ball's y-position to the bat's y-position. The <code class="EnlighterJSRAW" data-enlighter-language="python">min_offset</code> and <code class="EnlighterJSRAW" data-enlighter-language="python">max_offset</code> arguments cannot possibly be bigger than the size of the bats (because in that case they would not touch the bat). The output I determined by just playing around a little. The bigger the range the sharper the angle. Whatever feels right. I went for 1.5. Time to give it a test run, maybe take a break, and move on.
<h2>Increase the ball speed a little every 5 points</h2>
If you powered through until this point you are beyond the level where I need to explain this one, so I'm just pasting the code here.
<pre class="EnlighterJSRAW" data-enlighter-language="python">self.score += 1                 # this line already exists
if self.score % 5 == 0:
    self.ball.speed += 1
    self.ball.velocity = (
        self.ball.velocity.normalized() * self.ball.speed
    )</pre>
<h2>Use different color schemes. Maybe even change colors dynamically throughout the game</h2>
Let's use the same <code class="EnlighterJSRAW" data-enlighter-language="python">if</code> statement for this one, but before we do that we have to substitute all the colors we are using right now with variables we can change dynamically. Right now, we are using two different colors, a foreground color for the ball the bats and the text and a background color to fill out the window. So let's define it this way: At the top of the file, create a dictionairy to hold that information with something like <code class="EnlighterJSRAW" data-enlighter-language="python">colors = dict(foreground=7, background=0)</code>. Luckily, we only use colors in our <code class="EnlighterJSRAW" data-enlighter-language="python">App</code>'s <code class="EnlighterJSRAW" data-enlighter-language="python">draw</code> method, so we don't have to search the whole file to replace colors. After replacing these values the <code class="EnlighterJSRAW" data-enlighter-language="python">draw</code> method should look like this:
<pre class="EnlighterJSRAW" data-enlighter-language="python">def draw(self):
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
    )</pre>