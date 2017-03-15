// declare firebase database var
var database = firebase.database();

// TODO delete after de-bug
console.log(database);

// var trainNumber = 0;

var numberOfTrains = [];



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
	var startTime = snapshot.val().trainTime;
	var trainFrequency = snapshot.val().trainFrequency;

	// currently just inserting into array
	// TODO maninupulate dats wiht moment.js
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
