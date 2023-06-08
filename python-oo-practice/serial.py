"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=1):
        """Create an instance of the serial generator.  Start at 1 if no start value given"""
        self.start = start
        self.counter = 0
    
    def generate(self):
        """Return the next number in the serial"""
        num = self.start + self.counter
        self.counter += 1
        return num
        
    def reset(self):
        """Reset the serial to the initial start value"""
        self.counter = 0

