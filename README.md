# twitter-friends

Finding the accounts loads of your friends are following. ("friends" = twitter term for someone you are following)

From there you now have a list of new candidates to follow.

Got tired of people I didnt already follow showing up in my feed with good content and seeing that 20 of my friends already followed that person.

Yes, Twitter has suggestions that pop-up once in a while but it's not always clear why you should follow as opposed to this where
it's obvious.

- Has a 30s delay between /friends twitter api calls to avoid their 15 per 15 mins rate limit (twitter docs say 15/15 but it seems to be a bit more lenient in reality).

- Call /friends api given your twitter handle.
- Takes all the handles found in the result of that and calls /friends api for each.
- Flattens the results so it produces one big array of handle.
- Counts the number of occurrences for each.
- Prints the handles with X or more occurrences.
