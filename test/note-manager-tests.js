var assert = require("assert");
var sinon = require("sinon");

describe("note-manager", function() {
	var m; // note manager reference goes here

	beforeEach(function() {
		// some setup to fake window, soundcontext, etc.
		require("./setup");
		m = require("../lib/note-manager");
	});

	describe("getNoteIds", function() {
		it("should return an array of note names from DSL string", function() {
			var result = m.getNoteIds("C4,E4,G4");
			assert.deepEqual(result, ["C4", "E4", "G4"]);
		});

		it("should trim spaces between commas in note string", function() {
			var result = m.getNoteIds("C1 , E5   ,G4   ");
			assert.deepEqual(result, ["C1", "E5", "G4"]);
		});

		it("should split sharps and octaves correctly", function() {
			var result = m.getNoteIds("D3, F#2, A1");
			assert.deepEqual(result, ["D3", "F#2", "A1"]);
		});

		it("should throw error if string is empty", function() {
			assert.throws(function() {
				m.getNoteIds("");
			});
		});

		it("should throw error for invalid string", function() {
			assert.throws(function() {
				m.getNoteIds(",C,,E,G,4,");
			});
		});

		it("should throw when octaves are not specified", function() {
			assert.throws(function() {
				m.getNoteIds("D, F#, A");
			});
		});
	});

	describe("getNote", function(){
		it("should return name, octave and frequency", function() {
			var result = m.getNote("C4");
			assert.deepEqual(result, {
				name: "C",
				octave: "4",
				frequency: 261.626
			});
		});
	});

	describe("playNote", function() {
		it("should call play on sound object", function() {
			var sound = require("../lib/sound");
			var playSpy = sinon.spy(sound.prototype, "play");
			m.playNote({name: "C", octave: "4", frequency: 261.626});
			assert(playSpy.calledOnce);
		});
	});

  describe("stopNote", function() {
    it("should stop playing the given note", function() {

    });

    it("should ignore the note if it's not playing currently", function() {

    });
  });

  describe("getActiveNotes", function() {
    it("should return a list of all notes that are currently playing", function() {
      
    });
  });

  describe("configure", function() {
    it("should set properties to the note passed", function() {

    });
  });
});

