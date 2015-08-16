var assert = require("assert");

describe("note-manager", function() {
	var m; // note manager reference goes here

	beforeEach(function() {

		// some setup to fake window, soundcontext, etc.
		window = {
			AudioContext: function(){}
		};

		m = require("../lib/note-manager");
	});

	describe("getNoteIds", function() {
		it("should return an array of note names from DSL string", function() {
			var result = m.getNoteIds("C,E,G");
			assert.deepEqual(result, ["C", "E", "G"]);
		});

		it("should trim spaces between commas in note string", function() {
			var result = m.getNoteIds("C , E   ,G   ");
			assert.deepEqual(result, ["C", "E", "G"]);
		});

		it("should return empty array if string is empty", function() {
			var result = m.getNoteIds("");
			assert.deepEqual(result, []);
		});

		it("should remove empty note entries for C,,E,G", function() {
			var result = m.getNoteIds(",C,,E,G,,");
			assert.deepEqual(result, ["C", "E", "G"]);
		});

		it("should split sharps correctly", function() {
			var result = m.getNoteIds("D, F#,,  A");
			assert.deepEqual(result, ["D", "F#", "A"]);
		});
	});

});

