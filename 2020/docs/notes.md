# Notes

an AoC dev journal

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