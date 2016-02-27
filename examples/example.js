var elena = require('./../index');


elena('chat.txt', function(err,data){
  if (err) {
    console.error(err);
  } else {
    console.log(data.chat);
	console.log('----');
	console.log(data.stats());
  }
});

