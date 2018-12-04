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

## Day 3 Part 2

https://github.com/chrisman/advent-of-code/blob/5e79b31037ab2234426edb0ef4b737ba7ac095b7/2018/day/0301.js#L1

i started to do this one right after Day 3 Part 1, the same night it came out, but I fell asleep before figuring it out. But I woke up the next morning with an idea about how to do it, and it worked pretty okay! Eureeka!

kind of yucky. tried to keep it pretty functional again.

[findLoneClaim](https://github.com/chrisman/advent-of-code/blob/5e79b31037ab2234426edb0ef4b737ba7ac095b7/2018/day/0302.js#L19) is pretty gnarly. I hate writing stuff that relies on `continue` and `break`, but I find it much more pleasant using function labels. it's a little more clear about where you want control to resume. on the other hand, it's almost like using a GOTO statement in that it kind execution kind of jumps around somewhat unpredictably, and that's not cool.
