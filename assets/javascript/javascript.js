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

// put child_added in function - placed in set interval 
function updateTableInterval(){
		
	$("#trainTable").empty();		

	database.ref().on("child_added", function(snapshot) {

	var key = database.key;
	  // creates a new table row to append to the table
	  var tableRow = $("<tr>").attr("id", key);
	  $("#trainTable").append(tableRow);
		
		// pulls train data from firebase
		var trainName = snapshot.val().trainName;
		var trainDestination = snapshot.val().trainDestination;
		var trainFrequency = snapshot.val().trainFrequency;
		var startTime = snapshot.val().trainTime;

		// converts user input of trainTime to a format readable by moment.js
		var stringTime = moment(startTime, "hh:mm a");

		//turns string time into minutes
		var minuteTime = moment().diff(stringTime, "minutes");

		// modulus minute frequency and how many minutes inbetween start and now
		var minutesModulus = minuteTime % trainFrequency;

		// subtracks the remainder minutes from frequency 
		var timeTillNext = trainFrequency - minutesModulus;

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
};	

// calls function to generate table
updateTableInterval();

// 
setInterval(updateTableInterval, 60000);

// Object.keys(globalObj).forEach(function(key){ console.log(key) })
// pulls the key name
// Object.keys(globalObj).forEach(function(key){ console.log(globalObj[key]) })
// pulls the objects 

