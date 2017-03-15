// declare firebase database var
var database = firebase.database();


// TODO delete after de-bug
console.log(database);


// when clicking on the train button
$("#trainButton").on("click", function(event){

	// prevent default
	event.preventDefault();

	// take strigns from input box and store in var
	var trainName = $("#trainName").val().trim();
	var trainDestination = $("#trainDestination").val().trim();
	var trainTime = $("#trainTime").val().trim();
	var trainFrequency = $("#trainFrequency").val().trim();

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

	console.log("trainFrequency: "+ trainFrequency);

	var startTime = snapshot.val().trainTime;
	console.log(startTime)

	// converts user input of trainTime to a format readable by moment.js
	var stringTime = moment(startTime, "hh:mm");

	//turns string time into minutes
	var minuteTime = moment().diff(stringTime, "minutes");

	// modulus minute frequency and how many minutes inbetween start and now
	var minutesModulus = minuteTime % trainFrequency;

	console.log("minutesModulus: " + minutesModulus);

	// subtracks the remainder minutes from frequency 
	var timeTillNext = trainFrequency - minutesModulus;

	console.log("next time:" + timeTillNext);

	// displays how long in minutes to an actual time

	var displayNextTrainTime = moment().add(timeTillNext, "minutes").format("LT");

	
	var trainArray = [trainName, trainDestination, trainFrequency, displayNextTrainTime, timeTillNext];

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
