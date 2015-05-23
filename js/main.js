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

var scaleFormulas = {
  "major": [0,2,4,5,7,9,11],
  "natural minor": [0,2,3,5,7,8,10],
  "harmonic minor": [0,2,3,5,7,8,11],
  "melodic minor": [0,2,3,5,7,9,11]
};

function nextNoteNumber(noteNum) {
  noteNum += 1;
  noteNum %= 12;
  return noteNum;
}

function buildScale(startingNote, scaleName) {
  var scaleArray = [];

  if (scaleName in scaleFormulas) {
    _.forEach(scaleFormulas[scaleName], function(n) {
      scaleArray.push((startingNote + n) % 12);
    });
    return scaleArray;
  } else {
    console.log("Error: scale name '" + scaleName + "'not recognized.");
  }
}

function showScale(scaleArray) {
  var inactiveColor = "rgba(255,255,255,0.1)";
  var activeColor = "rgba(255,255,255,1)";
  // make all notes invisible, then make only the notes in the scale visible.
  $(".note").css("color", inactiveColor);

  _.forEach(scaleArray, function(noteNum) {
    $(".note-" + noteNum).css("color", activeColor);
  });
}

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

function showSelectedScale() {
  var selectedNote = $('#note-selector').val();
  var selectedScale = $('#scale-selector').val();
  showScale(buildScale(noteNumBySymbol[selectedNote],selectedScale));
}

//===================================================
// Initial setup

createNoteLiElements(sharpsByNum);

// populate note selector with note names
_.forEach(_.keys(noteNumBySymbol), function(noteSymbol){
  $('#note-selector').append(
    $('<option/>').val(noteSymbol).text(noteSymbol));
});

// populate scale selector with scale names
_.forEach(_.keys(scaleFormulas), function(scaleName){
  $('#scale-selector').append(
    $('<option/>').val(scaleName).text(scaleName));
});


//example: C maj
// showScale(buildScale(0,"major"));

//examp: G# natural minor
showScale(buildScale(noteNumBySymbol["G#"],"natural minor"));
