### ****Part I****

1. make a directory called ***first***
    mkdir first
2. change directory to the ***first*** folder
    cd first
3. create a file called ***person.txt***
   touch person.txt
4. change the name of ***person.txt*** to ***another.txt***
   mv person.txt another.txt
5. make a copy of the ***another.txt*** file and call it ***copy.txt***
   cp another.txt copy.txt
6. remove the ***copy.txt*** file
   rm copy.txt
7. make a copy of the ***first*** folder and call it ***second***
   cp -r first second
8. delete the ***second*** folder
   rm -r second

### ****Part II****

1. What does the ***man*** command do? Type in ***man rm***. How do you scroll and get out?
    gives manual for a given command.
    arrow keys scroll
    q exits
2. Look at the ***man*** page for ***ls***. What does the ***-l*** flag do? What does the ***-a*** flag do?
  -a include directories with .
  -l list in long format
3. How do you jump between words in the terminal?
   alt+arrow keys
4. How do you get to the end of a line in terminal?
   ctrl+e
5. How do you move your cursor to the beginning in terminal?
   ctrl+a
6. How do you delete a word (without pressing backspace multiple times) in terminal?
   ctrl+w
7. What is the difference between a terminal and shell?
   the terminal is the program and interface, the shell is the interpreter of the instructions given.
8. What is an absolute path?
   the path to a file from the root directory
9.  What is an relative path?
    the path to a file from the current directory
10. What is a flag? Give three examples of flags you have used.
    an additional note sent with a command giving further instructions on how that command should be peformed
    ls -a - list all folders inclusing ones with .
    rm -r - delete a folder
    ls -l - long form details
11. What do the ***r*** and ***f*** flags do with the ***rm*** command?
    -r removes a directory
    -f forces the deletion of a file or directory.  Never prompts for comfirmation