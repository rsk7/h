var _ = require("underscore");
var Sound = require("./sound");
var config = require("./config");
var NoteDictionary = require("../data/notedata");

var activeNotes = {};
var defaultOctave = 4;

var createNoteIds = function(noteDsl) {
	return noteDsl.split(",").filter(function(id) {
		return id.length > 0;
	}).map(function(id) {
		id = id.trim();
		// check if last character is a number
		var lc = id.slice(-1);
		if (!/\d/.test(lc)) {
			id += defaultOctave;
		}
		return id.toUpperCase();
	});
}

var getNoteIds = function(noteDsl) {
	if (/^([A-G]|[a-g])#?[0-9]?\s*(,\s*([A-G]|[a-g])#?[0-9]?\s*)*$/.test(noteDsl)) {
		return createNoteIds(noteDsl);
	} else {
		var msg = "DSL(" + noteDsl + ") looks invalid. Check it here: https://regex101.com/r/jN2pC0/2";
		throw new Error(msg);
	}
};

var getNote = function(noteId) {
	var lc = noteId.slice(-1);
	return NoteDictionary.getNote({
		name: noteId.slice(0, -1),
		octave: parseInt(lc)
	});
};

var getActiveNote = function(noteId) {
	var activeNote = activeNotes[noteId];
	if (activeNote) {
		return {
			noteId: noteId,
			note: activeNote
		};
	}
};

var getId = function(noteData) {
	return noteData.name + noteData.octave;
};

var configure = function(activeNote) {
	var sound = activeNote.note;
	sound.amplitude = config.gain;
	sound.attackTime = config.attack;
	sound.releaseTime = config.release;
	sound.detune(config.detune);
	sound.waveType(config.wave.type);
	if (config.wave.data) sound.setWaveTable(config.wave.data);
};

/*
// remember the note we're about to play
// configure the sound object to play
// play sound
*/
var playNote = function(noteData) {
	var sound = new Sound();
	var noteId = getId(noteData);
	activeNotes[noteId] = sound;
	configure(getActiveNote(noteId));
	sound.play(noteData.frequency);
};

var stopNote = function(activeNote) {
  if (activeNote) {
    activeNote.note.stop();
    delete activeNotes[activeNote.noteId];
  }
};

module.exports = {
	getNoteIds: getNoteIds,
	getNote: getNote,
	playNote: playNote,
  stopNote: stopNote,
  getActiveNote: getActiveNote,
  config: config,
  configure: configure,
  activeNotes: activeNotes,
};





