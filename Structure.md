TableTop : 
    - 5 x 5 units
    
Input Reader
    - Reads the user input from command line
    - Cheks if the input is valid
    - Parse into correct object

Move Validator
    - Cheks if Robot made a valid movement
        If Robot made a wrong move 
            - Returns an error and calls InputReader
    - Should be called asynchronousely hence returns a Promise
    - Checks if first valid command is 'PLACE', 
        If not send response to user to enforce 'PLACE' cmd 
        n calls Input Reader until valid 'PLACE' cmd is calld

Robot Simulator
    - PLACE X, Y, F
        - Initialise in 0, 0, SW
    
    - MOVE  
        - Move the robot 1 unit forward in the current facing direction
            ie. prevState: 0, 0, S --> currentState 0, 1, S ??

    - LEFT/RIGHT
        - Rotate the robot 90 degrees
            LEFT
            ie. 0, 0, N --> 0, 0, W
    
    - REPORT
        - Reports X, Y, F
            ie: 0, 0, N



-----------------------------------------------------------------------------------------


MODEL (State management DB)
    - TableTop
    - Move ???
        - StoreCurrentMove
        - StorePrevMove


VIEW
    - InputReader


CONTROLLER
    - RobotSimulator
        - Place
        - Move
        - Left | Right
        - Report


Util
    - Move Validator
        - isValidMove
        - validateFirstCall
    - input
        - isValidInput
    - File
        - upload
        - read

