# Notes

an AoC dev journal

## Day 6

Much easier than yesterday. Part II slowed me down a little bit. I really don't like my stringToAnswer function that much because it's kind of ugly. started naming some functions[^1] and exporting them out to `/lib` for reuse

Ben pointed out to me some of the red herrings from Day 5: you can map FBLR to 0101 and just `parseInt(row, 2) * 8 + parseInt(col, 2)`. I guess I don't know enough about binary math to have seen that initially. Maybe I'll go back and rewrite it at some point haha

[^1]: I started skimming through https://github.com/getify/Functional-Light-JS at Cody's suggestion, and one thing that stood out to me is that this guy really does not like anonymous functions or fat arrow functions. The reason is that named functions are more readable because they create a context, and they improve the stack trace if your program crashes. I agree with these points. So I've been trying to do better about not just using anonymous functions all the time. 

## Day 5

Saturday morning doing day 5. Part 1 was fine and fun. I like doing data transformations.

Part 2 had a lot of extra cruft and red herrings in the description I think, so I didn't understand what it was asking for at first. But when I figured it out, a quick for loop finished it off.

## Day 4

part 1 was quick. adding the validations for part 2 was time consuming, and now my answer is off by one and I don't know why. I could probably figure it out if I tested each validation, but I don't want to spend the time or effort to do that.

used Deno.readTextFile to read the file in raw instead of formatting it to be json. that made things convenient. Think i'll keep doing that

## Day 3

I misunderstood how the grid pattern repeats itself at first, but then realized I should use the more narrow grid and modulo the x value by the row width so that it wraps.

I was going to do nested for loops but decided it wasn't the right tool when I realized I need to update both x and y values on every iteration. So, good old while loop it is. I feel like AoC is often about using the most simple/correct tool for the job.

Still don't know how to handle potentially undefined array values in ts without just force referencing them.

## Day 2

Ugh, typescript. Why can I not just descructure an array? I'm writing imperative code that I do not like the looks of.

Part one tripped me up for a moment because I falsely believed that a regex quantifier (the `{m,n}` in `/.{m,n}/`) was a strict match. That is, that if `m = 1` and `n = 3` then it would *only* match a strings with up to three matches. Not 4+.

So I ditched that check and just manually evaluated the number of occurances.

Part 2 was just checking whether you can do complex boolean statements: If apples or bananas and not apples and bananas ... then you have an apple or a banana, but not an apple and a banana.

Come to think of it, while both parts yesterday were creating nested for loops, both parts today were creating boolean phrases.

I need to go learn how to do strict typescript if I'm going to continue this though. Specifically nullable objects.

## Day 1

Pretty easy. Spent most of my time setting up my directories and structures. The theme of today's exercises was "nested for loops".
