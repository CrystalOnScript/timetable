// While it may not seem imperative for smaller programs, 
// you should get in the habit of wrapping your js code in either a 

// $(document).ready(function(){
//  // code goes here
// })

// or an IIFE (immediately invoked function expression)

// ;(function(){
//  // code goes here
// })()

// One of the most important reasons for that is security - because right now your global variables (ie `database`)
// can be tampered with through the console by a malicious visitor to your train schedule app 😮

// declare firebase database var
var database = firebase.database();


// TODO delete after de-bug
// console.log(database);
// TODO do your TODO's 🙃

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

	// by placing this listener inside of the updateTableInterval function you will end up adding another 
	// listener per minute. The only noticeable issue with doing that is that when a user adds a new train, it will be appended
	// to the table as many times as there are listeners. Luckily, the table will be corrected at the next interval tick.
	// Unluckily, the user could have to wait up to a minute for that to happen 😕
	// So it's better to only set your listener one time outside of this interval function. And then just read from firebase
	// on the interval, empty the train table, and reappend all the train data.
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

		// when iterating over the values in an array, feel free to use the native `.forEach` method
		// one particularly useful side effect of that approach is that it creates a functional context
		// for each iteration of the loop which helps prevent variables from being attached to the global scope object
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

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

