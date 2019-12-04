# notes

here's some thoughts on the exercises as I work through them, and notes on stuff I learned.

## 0101 - 0202

started a day late. so here's day 1 and day 2 all at one go.

- [0101](https://github.com/chrisman/advent-of-code/blob/master/2019/src/0101.js): nothing much to report here. tried to make it super functional. quick and fun.

- [0102](https://github.com/chrisman/advent-of-code/blob/master/2019/src/0102.js): got to do a little recursive function here. still not much to write home about.

- [0201](https://github.com/chrisman/advent-of-code/blob/master/2019/src/0201.js): way over thought this one at first trying to make it classically OOP.
  scraped the lot and just wrote it imperative style. not my favorite way to write stuff, but sometimes it's just necessary.

- [0202](https://github.com/chrisman/advent-of-code/blob/master/2019/src/0202.js): more imperativeness. classic old nested for loop

Other notes:

- started using the [stupid test "framework" I wrote last year](https://github.com/chrisman/advent-of-code/blob/master/2019/test/tap.js). gonna try to
  make this more TDD this go around. we'll see how long I stick to that :/ Maybe I'll be able to hack on it some more and get it to produce some better [TAP](http://testanything.org/)

## Day 3

Wow, did aoc get "hard" a lot earlier this year?

Answer: nope! According to my notes from last year [Day 1 Part 2](https://github.com/chrisman/advent-of-code/tree/master/2018/docs#day-1-part-2) is when things got tuff.

Also, I'm disappointed that this puzzle is a little off topic, in the sense that I feel like we were on track to continue developing the Intcode computer from the last 2 days. Which I was excited to do.

Maybe we'll return to it.

Anyway, this wasn't too too bad after all. My solution was hella slow at first. (See **Optimization** below.)

### gotchas

- in part 1, didn't realize that some directions ('U3', 'D399') could have one more than digit. a naieve `direction.split('')` gave me some bugs.

- didn't realize in part 1 that a wire crossing itself might produce a false positive (of wire 1 crossing wire 2, e.g.) Solved by maping each wire to a list of unique coordinates.

### stuff I liked

- I didn't see anybody else map the directions the same way I did, which probably means that my way is kind of inefficient. But I liked the `[ dx, dy, magnitude ]` convention I settled on for representing the data. Where (dx, dy) is a unit vector of the (1, 0) or (-1, 0) or (0, 1) or (0, -1) variety to represent direction. And the magnitude is the number of steps in that direction.

- used a lot of TDD to explore data shape and transformations with this one. Helped out quite a bit I think.

### optimization

HOLY COW 😱 on the subject of being slow, I tracked the bottle neck down to this one map:

```
map(a => a.filter((x,i,a) => a.indexOf(x) === i)),
```

The point of it was to take an array of arrays, and to map each of those arrays to a unique list of coordinates. (To prevent a wire crossing itself from producing a false positive.)

At this point, the program took about 90 seconds (!!!) to run for the final input.

Replaced it with this:

```
map(a => Array.from(new Set(a))),
```

and now it takes <90ms to run! Seriously, a 1000x improvement? Wowie zowie. I must have written that particular filter a hundred hundred times at this point to make an array of unique items. And while I know that what's really going on here is the complexity of calling an `indexOf` inside a `filter` inside a `map` (that's a lot of iteration!) I'll probably never write that `unique` function without using `Array.from(new Set(x))` ever again.
