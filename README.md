# Hw2: Scrabble Starter

See the [documentation](https://umass-cs-326.github.io/docs/homework/scrabble-starter/) for more details.

### canConstructWord(availableTiles, word)

First step, I parse the word and find which and how many letters we need. Second step,I loop over the availableTiles to see if i have enough of tiles for the word. If I have a wildcard and some letters are not enough, i will try to see if the wildcards can cover it. If not, return false. Overall, my method is trying to identify the cases when we cannot construct the word and return false, else always return true.

### baseScore(word)

I made a scoreBook object to store the points for the corresponding tiles. Then, i will try to find how many letters we need for the input word by storing the letter and number required in an Object. Lastly, I loop over the object and calculate the score by letter \* count.

### possibleWords(availableTiles)

I made a copy of the dictionary to avoid any modifications. Then, I use filter and canConstructWord as the condition to filter out the words that we cannot construct with availableTiles. Finally, resturn the possible_words list.

### bestPossibleWords(availableTiles)

First, I used possibleWords to get a list of possible words. Then, I loop over this list to find tha max score. While looping the possible words list, for every word that requires one ore more wildcards, i will replace the letter with "\*", and then put it in baseScore to return its score. After I found the max score, I loop over the possible words lista again to get the words that has the same score as max score. Finally, return the list of words that all have max score.
