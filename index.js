var fs = require('fs');
var stream = require('stream');
var readline = require('readline');
var moment = require('moment');

function readFileContent(filename, callback){
  var lines = [];

  var instream = fs.createReadStream(filename);
  var outstream = new stream();
  outstream.readable = true;
  outstream.writable = true;

  instream.on('error', function (error){
    if(error.code === 'ENOENT'){
      error.message = 'File doesn\'t exist, please try again with a different file/path.';
    }
    return callback(error);
  });

  var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
  });

  rl.on('line', function(line){
    lines.push(formatLine(line));
  });

  rl.on('close', function(){
    callback(null, lines);
  });
}

function formatLine(line) {
  // Remove empty lines
  if(!line || !line.length) {
    return;
  }

  var lineParts = line.split(': ');
  return messageDetails(lineParts);
}
function messageDetails(parts){

  var temp = parts[0].split('m. -');
  var author = temp[1];
  var when = temp[0];

  var tDate = temp[0].split(',');
  var date = new Date(tDate[0]);


  var details = {
    date: date,
    date2:moment(temp[0],'DD/MM/YYYY, HH:mm A').format()
  };

  if (author) {
    details.author = author;
  } else {
    details.announcement = true;
  }


  details.message = parts[1];


  return details;
}

exports.parse = function(filename){
  return readFileContent.apply(this, arguments);
};

exports.stats = function () {

};

