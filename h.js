// HARMONY
var _ = require("underscore");
var m = require("./lib/note-manager");

/*
// split DSL for note names
// get note data for each note
// and play them
*/
var play = function(dsl) {
  m.getNoteIds(dsl).map(m.getNote).forEach(m.playNote);
};

/*
// split DSL for note names
// if DSL is not present, stop all notes
// otherwise stop playing notes specified
*/
var stop = function(dsl) {
  if(dsl) m.getNoteIds(dsl).map(m.getActiveNote).forEach(m.stopNote);
  else getActiveNotes().forEach(m.stopNote);
};

/*
// update configuration object
// also updates all active notes
*/
var configure = function(options) {
  config = _.extend(m.config, options);
  getActiveNotes().forEach(m.configure);
};

/*
// get note IDs for active notes
*/
var activeNoteIds = function() {
  return _.keys(m.activeNotes);
};

/*
// get all active notes
*/
var getActiveNotes = function() {
  return _.keys(m.activeNotes).map(function(key) {
    return {noteId: key, note: m.activeNotes[key]};
  });
}

module.exports = {
  play: play,
  stop: stop,
  configure: configure,
  configuration: m.config,
  activeNotes: m.activeNotes,
  activeNoteIds: activeNoteIds
};




