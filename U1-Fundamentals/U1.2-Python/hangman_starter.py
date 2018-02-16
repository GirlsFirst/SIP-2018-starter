word = input("Type a word for someone to guess: ")

word = word.lower()
if(word.isalpha() == False):
	print("That's not a word!")

for idx in range(0, 50):
	print(" ")

guesses = []
numfails = 0
maxfails = 7

guess = input("Guess a letter: ")