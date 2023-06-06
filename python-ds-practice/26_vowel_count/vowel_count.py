def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    vowels = "aeiou"
    vowel_set = {vow for vow in phrase.lower() if vow in vowels}
    vowel_dict = {vow: phrase.count(vow) for vow in vowel_set}
    return vowel_dict
#TODO - Test
