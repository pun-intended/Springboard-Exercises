def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    num1_set = set(str(num1))
    num2_set = set(str(num2))
    if num1_set != num2_set:
        return False
    for num in num1_set:
        if str(num1).count(num) != str(num2).count(num):
            return False
    return True