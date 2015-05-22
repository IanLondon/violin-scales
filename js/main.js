function NoteGenerator() {
  this.noteNum = 0;
  this.noteNames = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  this.nextNote = function() {
    //var currentNote = this.noteNum;
    this.noteNum += 1;
    if (this.noteNum > 11){
        this.noteNum = 0;
    }
    //return this.getCurrentNote();
  };
  this.getCurrentNote = function() {
    return {
      letter:this.noteNames[this.noteNum],
      number: this.noteNum
    };
  };
  this.setNote = function(newNote) {
    var origNoteGiven = newNote;
    if (typeof(newNote) === "string" && newNote) {
      newNote = _.indexOf(this.noteNames, newNote);
    }

    if (this.noteNames.length > newNote > -1) {
      this.noteNum = newNote;
    } else {
      console.log("Warning: bad note passed to NoteGenerator.setNote(): " + origNoteGiven);
    }
  };
}

// construct the <li>'s for all the notes
var noteGen = new NoteGenerator();

_.forEach(['E','A','D','G'], function(stringName) {
    noteGen.setNote(stringName);
    var note = noteGen.getCurrentNote();

  _.times(14, function(n) {
    $('<li/>', {
      text: note.letter,
      class: "note note-" + note.number + " neck-column-" + n
    }).appendTo("#string_" + stringName);

    noteGen.nextNote();
    note = noteGen.getCurrentNote();
  });
});
