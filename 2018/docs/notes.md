# 📝 notes

notes and stuff as I work through the exercises. my goal here is to capture questions, challenges, follow up questions, stuff I liked and stuff I didn't like. mostly for my own benefit and entertainment, but maybe this will spark a discussion or inspire a blog post or something later.

get ready for some opinions!

## Day 1 Part 1

A one-line array.reduce! This is going to be easy!

## Day 1 Part 2

This is not going to be easy!

My first solution can be found [here](https://github.com/chrisman/advent-of-code/blob/4e5bdbacd26bdcad9342967ac67d0d7b4075d5d8/2018/day/0102.js). It's an iterative brute force kind of solution that takes *ages* to run. About 11 seconds. It's not effecient, or pretty: it basically creates an infinite loop until the winning condition is satisfied, at which point it `break`s out. Gross. But it gets the job done.

Second iteration is [here](https://github.com/chrisman/advent-of-code/blob/5e79b31037ab2234426edb0ef4b737ba7ac095b7/2018/day/0102.js#L1). It drops the time from 11000ms to 11ms, which is better! None of the thought process here is mine originally. And little of the actual code is either. I understood just enough to fake it from reading a couple of threads:

- https://www.reddit.com/r/adventofcode/comments/a20646/2018_day_1_solutions/eaukxu5/

- https://www.reddit.com/r/adventofcode/comments/a20646/2018_day_1_solutions/eauaetp/

Follow up questions/opportunities for further research:

- what is the difference between *remainder* and *modulus*? also I don't really understand the importance of [this](https://github.com/chrisman/advent-of-code/blob/5e79b31037ab2234426edb0ef4b737ba7ac095b7/2018/day/0102.js#L51) line but shit breaks if I change it, so. what's up with that?

- how can i best in the future observe and notice patterns like this so I might come up with something like this on my own?

final note: i really like [naming your bool conditions](https://github.com/chrisman/advent-of-code/blob/5e79b31037ab2234426edb0ef4b737ba7ac095b7/2018/day/0102.js#L65) because it creates a little more context and intent that is otherwise lacking in a simple *true* or *false*. code becomes much more legible if you take a moment to explain the significance of that bool statement.

## Day 2 Part 2

https://github.com/chrisman/advent-of-code/blob/5e79b31037ab2234426edb0ef4b737ba7ac095b7/2018/day/0201.js#L1

kind of a goofy little data manipulation exercise. I decided to get extra functional and make a clean composition of functions. I like the way the composition looks with all named functions. very legible.

there are probably a few extra steps in here than there needs to be, but i'm happy with it.

I feel as though I've written a "word count" kind of array reducer about one billion times by now.

## Day 3 Part 1

https://github.com/chrisman/advent-of-code/blob/5e79b31037ab2234426edb0ef4b737ba7ac095b7/2018/day/0301.js#L1

I got all excited and did this one at midnight UTC-5, the minute it came out. I had no idea what I was doing at first so just started parsing the input. and the here's another brute-force "visit every coordinate and make a check mark" solution. it works fine. I don't love writing nested `for` loops.

people who have written video games, and especially entity collision libraries, probably laughed at this exercise.

**edit:** here's a visualization of the data

![](https://github.com/chrisman/advent-of-code/raw/master/2018/extra/0301-visualization/canvas.png)

## Day 3 Part 2

https://github.com/chrisman/advent-of-code/blob/5e79b31037ab2234426edb0ef4b737ba7ac095b7/2018/day/0301.js#L1

i started to do this one right after Day 3 Part 1, the same night it came out, but I fell asleep before figuring it out. But I woke up the next morning with an idea about how to do it, and it worked pretty okay! Eureeka!

kind of yucky. tried to keep it pretty functional again.

[findLoneClaim](https://github.com/chrisman/advent-of-code/blob/5e79b31037ab2234426edb0ef4b737ba7ac095b7/2018/day/0302.js#L19) is pretty gnarly. I hate writing stuff that relies on `continue` and `break`, but I find it much more pleasant using function labels. it's a little more clear about where you want control to resume. on the other hand, it's almost like using a GOTO statement in that it kind execution kind of jumps around somewhat unpredictably, and that's not cool.

## Day 4 Part 1

https://github.com/chrisman/advent-of-code/blob/9a13122c14bdbbfc1962225c75cc6509142f5b20/2018/day/0401.js#L1

Whew, boy. This one took me an embarrasingly long time.

because of a silly mistake, my solution was working on the test data by a fluke and it (correctly) wasn't working on the real data. took me a while to track down the bug and realize that I was comparing arrays and not their length in the reduce function in `sleepiestGuard` 😞

got some pretty fun recursion and list eating going on in `minutesPerGuard`. got a little goofy toward the end with function in/out in order to keep my compose chain rolling. it works pretty well but i feel like in real life the functions wouldn't be as isolated/independent as I would want them to be. that is, if i came back in a couple weeks to look at this code, I'd have no idea what `data` is in the input. solutions to that problem include a) JSDocs, b) lots of data validation in the function, c) unit tests?

i feel motivated by watching my stats page. day 1 has ~40k finishers, and it keeps going down by 10k from there: day 2 has ~30, day 3 has ~20, and day 4 has ~10.

## Day 4 Part 2

https://github.com/chrisman/advent-of-code/blob/9a13122c14bdbbfc1962225c75cc6509142f5b20/2018/day/0402.js#L1

step 1: copy/paste day-4-part-1

step 2: add a couple extra parsing functions

step 3: \o/

this was pretty easy since most of the heavy lifting was done in day-4-part-1. tightened up the initial parseInput portion of the code. not much else to report on here.

edit: forgot to mention that there are some potential edge cases here that I didn't code for including what to do if there are multiple Top Sleepiest Minutes per guard. Or between guards. luckily I didn't need to worry about that 😌

## Day 5 Part 1

https://github.com/chrisman/advent-of-code/blob/00e643742a5db81e3509fb6034af1f3c80d495b9/2018/day/0501.js

ugh this was stupid

so i really wanted to write a recursive function to handle this but the string was way too long and i kept blowing my stack

here's the first attempt at recursion: https://github.com/chrisman/advent-of-code/blob/b663daa0410e38921cb9a799640defb78d3f1479/2018/day/0501.js#L14

worked great for the smaller test string but again when i tried it with the longer string, stack overflow.

i rewrote it again to be sure it was in tail-call form, but it didn't work either: https://github.com/chrisman/advent-of-code/blob/2a2b4d29adc9993ac834d295d127ea49fc3a9aa6/2018/day/0501.js#L14

maybe i'm misunderstanding what it means to write tail-call optimization. or maybe node just doesn't support it. i could have sworn it was supposed to be in the ES6 definition. and i thought i rembemered having played with it before with a --harmony flag perhaps. i can't really find much about it online either, just blog posts from 2014 - 2016. the impression i get is that ES6 defines it, and it's sparsely implemented, but not by V8.

i even tried to write a recursion-eating [trampoline](https://stackoverflow.com/questions/25228871/how-to-understand-trampoline-in-javascript#27704484) but didn't get very far.

oh well. it ultimately felt like a whole lot of work for no sake but ego's sake so i wrote a stupid `do...while` loop. which is probably for the best anyway. recursion is cool but it's inefficient and likely to crash when you get into large loops like this puzzle does.

### 🚥 tests

i wrote a very dumb [test thingie](https://github.com/chrisman/advent-of-code/blob/476581f069e0c929771f357e8078853350a0534a/2018/test/test.js) which implements pretty much the one thing I ever want from a unit test, and that one thing is the following things:

1. tell me the name of the unit of code being tested
2. tell me, given a context, what it should do
3. tell me what was passed to it (how to recreate the context) and what was returned
4. does reality match expectations?

anyway that means that my puzzle solutions don't return anything if run on their own. they will from now on act like proper modules that need to be required and passed data to.

## Day 5 Part 2

same as yesterday: part 2 is copy/paste part 1 with a few changes

## Day 6 Part 1

I kept not ever having enough consecutive minutes to work on this long enough to build any kind of cadence or velocity and so it took me a long time and now I'm a day behind and my code is pretty dumb.

Instead of settling into a rhythm and getting stuff done, I would come back to what I had written earlier and try to remember the direction I had been going and what I had been thinking about because that's the kind of thing I had set myself up for instead of leaving notes or tests behind as some kind of an indicator. and my fingers got stupid and started messing up syntax things so at one point I was doing programming mutters at my computer and said something like, _Why in the world is that happening? Did **math** stop working? is math **broken?**_

Apparently I don't do programming mutters around Mel very often because she thought that was really funny and was like, _oh yeah didn't you hear? they canceled math. it's trump's fault. he doesn't understand math so he hates it and wants to take it away from everybody._ and I thought that was pretty funny but I didn't laugh because math was still broken. except later I discovered that math (thank god) was _not_ broken. the actual problem was that my fingers had gotten stupid and forgotten how to write fat arrow functions and so I was returning a whole function instead of resolving that function to a value.

and that's what writing code is like sometimes

---

I remember reading at some point that there is a belief held by some data nerds that data should pretty much never be destroyed. there's no need to ever delete data from a database. just add new content with a new timestamp instead of overwriting old data on a POST. just kind of hide data somehow with a DELETE.

the last time i tried to use an <abbr title="oriental relationship manager">ORM</abbr> with a JavaScript project, I used [bookshelf](https://bookshelfjs.org/) and it was an awful experience and also I used a plugin called *paranoia* that adhered to this principle by soft deleting data instead of actually deleting it.

I'm reading a book on Lisp right now too which claims that when processing lists it is very common to not actually update a record in the list but to just add a new record to the list with the new data. because retrieving from the list will always just return the first matching record and the old record will just flounder at the back of the list, irretrievable and not hurting anybody. unless or until you very intentionally try to retrieve it. or hurt people with it.

anyway, I don't know if there's a name for this practice/convention, or whether it's recognized as any kind of a good idea, but as I was passing data around from function to function here, I eventually kind of organically decided to continue to pass everything piece of data I created on through. eventually the signature of the return value got kind of long and a little unwieldly. I think it ended up being `[width, height, allPoints, allCenters, centersOfInfiniteAreas]`. or something like that. and it was just a list, an array. so there weren't any keys to describe the value or provide any context, so there was some mental overhead in remembering the data structure, and if I lost the shape of the data in my head I had to go back and look at the previous function in the chain to see what it returned. but lists are super easy to process. and at the very end, I needed width and height for something--the very first values I computed--and I was glad I had kept them and passed them down the entire composition. instead of, i guess, making them global variables. but whatever. the end result was a long long array full of data that is utterly meaningless out of context. but it worked.

---

this puzzle describes a [veronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) which, believe it or not, is one of my favorite things. I first saw one (I think) in a [p5.js](https://p5js.org/examples/) gallery back around 2015. p5 is a JavaScript port of Processing, which is a programming language for artists that became the model for the Arduino IDE.

The veronoi diagram was visually very appealing to me, and the interactivity was very satisfying: when you moused over the diagram your cursor location became a new point in the diagram, and all the areas warped and shifted around you as you moved. reading about the diagram on wikipedia taught me about about euclidean vs taxicab distances.

I would really like to go back and do a visualization of this data similar to how I did for day 3 part 1

## Day 6 Part 2

YET AGAIN let's copy/paste part 1 code and kind of massage it around a little bit, and that's how we do part 2.
## Day 7 Part 1

How to code

step 1: take a guess at what the data structure looks like

step 2: try doing stuff with that data

step 3: repeat until done

This looked really complicated at first pass but ended up not being so much.

there's a library called [xregexp](https://github.com/slevithan/xregexp) (eXtended regular expressions) that implements a thing called free-spacing, which allows you to comment your regex and do other cool things. I would consider using it if I knew I was going to be writing perhaps more than one long regex. they are obtuse little things, difficult to document.
