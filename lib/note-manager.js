var _ = require("underscore");
var Sound = require("./sound");
var config = require("./config");
var NoteDictionary = require("../data/notedata");

var activeNotes = {};

var getNoteIds = function(noteDsl) {
	if(/([A-G]|[a-g])#?[0-9]\s*(,([A-G]|[a-g])#?[0-9]\s*)*/.test(noteDsl)) {
		return noteDsl.split(",").filter(function(id) {
			return id.length > 0;
		}).map(function(id) {
			return id.trim();
		});
	} else {
		var msg = "DSL(" + noteDsl + ") looks invalid. Check it here: https://regex101.com/r/jN2pC0/2";
		throw new Error(msg);
	}
};

var getNote = function(noteId) {
	var name = noteId.slice(0, -1);
	var octave = noteId.slice(-1);
	return NoteDictionary.getNote({
		name: name,
		octave: parseInt(octave)
	});
};

var getActiveNote = function(noteId) {
	return {noteId: noteId, note: activeNotes[noteId]};
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
	if (activeNote) activeNote.note.stop();
	delete activeNotes[activeNote.noteId];
};

var getActiveNotes = function() {
	return _.keys(activeNotes).map(function(key) {
		return {noteId: key, note: activeNotes[key]};
	});
};

module.exports = {
	getNoteIds: getNoteIds,
	getNote: getNote,
	playNote: playNote,
	getActiveNotes: getActiveNotes
};





