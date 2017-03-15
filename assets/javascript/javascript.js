// declare firebase database var
var database = firebase.database();

// TODO delete after de-bug
console.log(database);


// when clicking on the train button
$("#trainButton").on("click", function(event){

	// prevent default
	event.preventDefault();

	// take strigns from input box and store in var
	var trainName = $("#trainName").val();
	var trainDestination = $("#trainDestination").val();
	var trainTime = $("#trainTime").val();
	var trainFrequency = $("#trainFrequency").val();

	// take those vars and store in firebase
	database.ref().push({
		trainName: trainName,
		trainDestination: trainDestination,
		trainTime: trainTime,
		trainFrequency: trainFrequency,
	});

	$("#trainName").val("");
	$("#trainDestination").val("");
	$("#trainTime").val("");
	$("#trainFrequency").val("");
});

database.ref().on("child_added", function(snapshot) {

  // Log everything that's coming out of snapshot
  console.log(snapshot.val());
  console.log(snapshot.val().trainTime);
  // creates a new table row to append to the table
  var tableRow = $("<tr>");
  $("#trainTable").append(tableRow);
	
	// pulls train data from firebase
	var trainName = snapshot.val().trainName;
	var trainDestination = snapshot.val().trainDestination;
	// TODO maninupulate times wiht moment.js
	
	var trainFrequency = snapshot.val().trainFrequency;

	var startTime = snapshot.val().trainTime;

	// converts user input of trainTime to a format readable by moment.js
	var stringTime = moment(startTime, "hh:mm");

	// converts that format again
	// var convertedTime = moment(new Date(stringTime));

	var minuteTime = moment().diff(stringTime, "minutes");

	var startToday = moment().startOf("day");

	var minuteTimeNow = moment().diff(startToday, "minutes");

	console.log("minuteTime: " + minuteTime);
	console.log("minuteTimeNow: " + minuteTimeNow);

	var minutesMinus = minuteTimeNow - minuteTime;

	console.log("minutesMinus: " + minutesMinus)

	var minutesModulus = minutesMinus % trainFrequency;

	console.log("minutesModulus: " + minutesModulus);

	var timeTillNext = minutesModulus - trainFrequency;

	console.log("next time:" + timeTillNext);
	
	// currently just inserting into array
	
	var trainArray = [trainName, trainDestination, trainFrequency, startTime, startTime];

	// loop to append table data to the table row
	for(var i = 0; i <trainArray.length; i++){
		
		var tableData = $("<td>");
		tableData.text(trainArray[i]);
		tableRow.append(tableData);
		
	};



  // Handle the errors
	}, function(errorObject) {
	  console.log("Errors handled: " + errorObject.code);
});	
