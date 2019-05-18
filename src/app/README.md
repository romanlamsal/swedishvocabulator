# Roman Lamsal's Swedish Vocabulator UI
As this project is solely based on learning swedish, the model of the index cards
used in the lectures and quiz(-zes) are specific for the swedish grammar.

## What's inside?
WebUI which serves two purposes:
* Creating and Editing Lectures
* Taking quizzes based on a lecture (or a "Snack" - i.e. 20 random vocabs)

## Creating and Editing Lectures
The intention was to create a simple UI where you could create/edit index cards used for quizzing
in a convenient way. It features highlighting based on the word's type (noun, verb, adjective, free text).

By using a simple crawling mechanism, it's possible to have autocompletion based on the word type and the first entry of
the word (see src/service/SvenskaSeService).

### Keyboard shortcuts
* ctrl+s: save currently edited card as is, and create a new, empty card
* ctrl+enter: autocomplete card (won't work for free text cards)
* alt+n: make current card a "noun" word type
* alt+v: make current card a "verb" word type
* alt+a: make current card a "adjective" word type

## Quiz
As of now, only one type of quiz is implemented: A card is shown (german side first), after pressing enter/clicking/touching
somewhere on the scree, the card's other side is shown (swedish). After that, it's up to the learner to decide whether or not
s/he knew the right answer (no cheating!).

It's primarily designed to be useable on a mobile device, thus the user can just touch to turn a card and then swipe right
for "i knew it" or swipe left for "did not know it".

## Note: SvenskaSeService is just an idea!
There has never been any written agreement from svenska.se to use their website like that. You have been warned, I am not
to be held liable of any damage that is potentially done.
