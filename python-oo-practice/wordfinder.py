from random import choice
"""Word Finder: finds random words from a dictionary."""


class WordFinder:
    def __init__(self, filename=None):
        """Create a WordFinder instance, populate the wordlist if a filename is provided."""
        if filename:
            self.add_words(filename)

    def random(self):
        """Return a random word from the word list"""
        return choice(self.word_list)
        
    def add_words(self, filename):
        """Add words to the word list from a given file"""
        with open(filename) as f:
            self.word_list = [line.strip() for line in f.readlines()]
