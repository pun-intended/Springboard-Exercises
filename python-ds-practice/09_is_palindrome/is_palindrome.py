def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """
    lst = list(phrase.replace(" ", "").lower())
    new_str = "".join(lst)
    flipped = lst.copy()
    flipped.reverse()
    back_str = "".join(flipped)
    return new_str == back_str
