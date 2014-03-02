## nim

The game of nim, written in node

### Server

To run the server:

```
$ node index.js
Starting game server...
```

By default the game runs on port 8080.

### Client

You play this game through `telnet`.

```
$ telnet localhost 8080
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
Waiting for one more...
```

Once another client connects...

```
Welcome!
The current state is:
1 4 2
It's your turn!
>
```

### Making Moves

A move in nim consists of taking one or more coins from a given pile. If
there are no available moves, the current player loses.

To player, enter two numbers:

* The pile which you want to pick from (starting at 1)
* The amount of coins you want to take

For example:

```
The current state is:
1 4 2
It's your turn!
> 2 4
The current state is:
1 0 2
```

### TODO

* Handle disconnects gracefully
