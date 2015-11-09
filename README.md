Library for playing notes in the browser using webaudio.

[![Build Status](https://travis-ci.org/rsk7/h.svg?branch=master)](https://travis-ci.org/rsk7/harmony)

##Example
http://rsk7.github.io/h/

##Usage

Require:
```javascript
var h = require("h-audio");
```

To play notes: 
```javascript
// if octaves are not specified, the default is 4
h.play("C,E,G");
h.play("D2,F#3,A4");
h.play("G1,B,D4");
```

To stop notes:
```javascript
h.stop("E");
h.stop("D2,F#3,A4");
```

To stop all notes:
```javascript
h.stop();
```

To get notes that are currently playing:
```javascript
h.getActiveNotes();
h.getActiveNoteIds();
```

##Configuration

The configure method takes an object of the following type. Allowing changes to gain, attack, release and wave parameters. Configuration changes effect all notes immediately.

To set the configuration object:
```javascript
h.configure({
  gain: 0.15,
  attack: 0.1,
  release: 0.1,
  wave: {
    type: "sine",
    data: null
  }
});
```

To get the current configuration:
```javascript
var currentConfiguration = h.configuration;
```










