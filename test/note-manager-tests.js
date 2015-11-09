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

		it("should not throw when octaves are not specified", function() {
      var result = m.getNoteIds("D, F#, A");
      assert.deepEqual(result, ["D4", "F#4", "A4"]);
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
      sound.prototype.play.restore();
		});
	});

  describe("stopNote", function() {
    var sound, playStub, stopSpy;

    beforeEach(function() {
      sound = require("../lib/sound");
      playStub = sinon.stub(sound.prototype, "play");
      stopSpy = sinon.spy(sound.prototype, "stop");
    });

    afterEach(function() {
      sound.prototype.play.restore();
      sound.prototype.stop.restore();
    });

    it("should stop playing an active note", function() {
      m.playNote({name: "C", octave: "4", frequency: 261.626});
      m.stopNote(m.getActiveNote("C4"));
      assert(stopSpy.calledOnce);
    });

    it("should ignore the note if it's not playing currently", function() {
      m.stopNote(null);
      assert(!stopSpy.calledOnce);
    });
  });

  describe("getActiveNotes", function() {
    var sound, playStub, stopSpy;

    beforeEach(function() {
      sound = require("../lib/sound");
      playStub = sinon.stub(sound.prototype, "play");
      stopSpy = sinon.spy(sound.prototype, "stop");
    });

    afterEach(function() {
      sound.prototype.play.restore();
      sound.prototype.stop.restore();
    });

    it("should return a list of all notes that are currently playing", function() {
      m.playNote({name: "C", octave: "4", frequency: 261.626});
      assert(m.activeNotes["C4"]);
    });

    it("should be empty if no notes are playing", function() {
      m.playNote({name: "C", octave: "4", frequency: 261.626});
      m.stopNote(m.getActiveNote("C4"));
      assert(!m.activeNotes["C4"]);
    });
  });

  describe("configure", function() {
    it("should set properties to the note passed", function() {
      var config = require("../lib/config");
      config.gain = 2;
      config.attack = 2;
      config.release = 2;
      config.detune = 4;
      config.wave.type = "sine";
      config.wave.data = "waveTableData";
      var activeNote = { 
        note: {
          detune: function() {},
          waveType: function() {},
          setWaveTable: function() {}
        } 
      };
      var detuneSpy = sinon.spy(activeNote.note, "detune");
      var waveTypeSpy = sinon.spy(activeNote.note, "waveType");
      var setWaveTableSpy = sinon.spy(activeNote.note, "setWaveTable");

      m.configure(activeNote);

      assert.equal(activeNote.note.amplitude, config.gain);
      assert.equal(activeNote.note.attackTime, config.attack);
      assert.equal(activeNote.note.releaseTime, config.release);
      assert(detuneSpy.calledWith(config.detune));
      assert(waveTypeSpy.calledWith(config.wave.type));
      assert(setWaveTableSpy.calledWith(config.wave.data));
    });
  });
});

