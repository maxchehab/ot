window.onload = initialize;

var doc = document.getElementById("document");
doc.onkeyup = change;

var timestamp = 0;
var user = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
var requests = [];

function change(e) {
     requests.push({
          position: getCaretPosition(doc) - 1,
          value: e.key
     });
     console.log(requests[requests.length - 1]);
}

function initialize() {
     open();
}

function open() {
     fetch('./api/open.php', {method: 'POST'}).then(function(response) {
          return response.json();
     }).then(function(json) {
          //console.log(json);
          if (json.success) {
               doc.value = json.message;
               timestamp = new Date().getTime();
               console.log(timestamp)
          } else {
               alert(json.message);
          }
     });

     setInterval(function() {
          save();
          load();
     }, 100);
}

function save() {
     if (requests.length == 0) {
          return;
     }

     $.ajax({
          url: './api/save.php',
          type: 'POST',
          data: {
               requests: requests,
               user: user
          }
     });
     requests = [];
}

function load() {
     console.log(user);
     $.ajax({
          url: './api/load.php',
          type: 'POST',
          data: {
               timestamp: timestamp,
               user: user
          },
          success: function(data) {
               var json = JSON.parse(data);
               if (json.success) {
                    json.history.forEach(function(entry) {
                         if (entry.type == "insert") {
                              insert(entry.position, entry.value);
                         } else if (entry.type == "remove") {
                              remove(entry.position);
                         }
                    });
                    if (json.history.length > 0) {
                         timestamp = json.history[json.history.length - 1].time;
                    }
               } else {
                    alert(json.message);
               }
          }
     });

}

function insert(position, value) {
     String.prototype.splice = function(start, delCount, newSubStr) {
          return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
     };
     doc.value = doc.value.splice(position, 0, value);
}

function remove(position) {
     doc.value = doc.value.substring(0, position) + doc.value.substring(position + 1);
}

function getCaretPosition(oField) {
     // Initialize
     var iCaretPos = 0;

     // IE Support
     if (document.selection) {

          // Set focus on the element
          oField.focus();

          // To get cursor position, get empty selection range
          var oSel = document.selection.createRange();

          // Move selection start to 0 position
          oSel.moveStart('character', -oField.value.length);

          // The caret position is selection length
          iCaretPos = oSel.text. // Firefox support
          length;
     } else if (oField.selectionStart || oField.selectionStart == '0')
          iCaretPos = oField.selectionStart;

     // Return results
     return iCaretPos;
}
