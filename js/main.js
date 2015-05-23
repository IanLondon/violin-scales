function nextNoteNumber(noteNum) {
  noteNum += 1;
  noteNum = noteNum % 12;
  return noteNum;
}

var sharpsByNum = {
  0: 'C',
  1: 'C#',
  2: 'D',
  3: 'D#',
  4: 'E',
  5: 'F',
  6: 'F#',
  7: 'G',
  8: 'G#',
  9: 'A',
  10: 'A#',
  11: 'B'
};

var flatsByNum = {
  0: 'C',
  1: 'Db',
  2: 'D',
  3: 'Eb',
  4: 'E',
  5: 'F',
  6: 'Gb',
  7: 'G',
  8: 'Ab',
  9: 'A',
  10: 'Bb',
  11: 'B'
};

var noteNumBySymbol = {
  'C': 0,
  'C#': 1,
  'Db': 1,
  'D': 2,
  'D#': 3,
  'Eb': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'Gb': 6,
  'G': 7,
  'G#': 8,
  'Ab': 8,
  'A': 9,
  'A#': 10,
  'Bb': 10,
  'B': 11
};

function createNoteLiElements(notesObj) {
// construct the <li>'s for all the notes
  _.forEach(['E','A','D','G'], function(stringName) {
      var noteNum = noteNumBySymbol[stringName];

    _.times(14, function(n) {
      $('<li/>', {
        text: notesObj[noteNum],
        class: "note note-" + noteNum + " neck-column-" + n
      }).appendTo("#string_" + stringName);

      noteNum = nextNoteNumber(noteNum);
    });
  });
}

createNoteLiElements(sharpsByNum);

//TODO: Make function that generates scales given scale type and root.
// After generating the scale (an array of note-numbers), it will just
// 1) make all notes visible then 2) make color:transparent the
// notes which aren't included in the scale.
// see scrappaper notes for scale info.
