def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    rvs = list(phrase)
    rvs.reverse()
    return "".join(rvs)