def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """
    if len(parens) % 2 != 0:
        return False
    counter = 0
    for paren in parens:
        if counter < 0:
            return False
        if paren == "(":
            counter += 1
        elif paren == ")":
            counter -= 1
    return counter == 0