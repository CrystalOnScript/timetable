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
	database.ref().set({
		trainName: trainName,
		trainDestination: trainDestination,
		trainTime: trainTime,
		trainFrequency: trainFrequency,
	});
});

database.ref().on("value", function(snapshot) {

  // Log everything that's coming out of snapshot
  console.log(snapshot.val());
  console.log(snapshot.val().trainTime);
  // TODO delete below - creating <td> and append
  var tableRow = $("<tr>");


	$("#trainTable").append(tableRow);
	
	var trainName = snapshot.val().trainName;
	var trainDestination = snapshot.val().trainDestination;
	var startTime = snapshot.val().trainTime;
	var trainFrequency = snapshot.val().trainFrequency;

	var trainArray = [trainName, trainDestination, trainFrequency, startTime, startTime];

	for(var i = 0; i <trainArray.length; i++){
		
		var tableData = $("<td>");
		tableData.text(trainArray[i]);
		tableRow.append(tableData);
		
	};



  // Handle the errors
	}, function(errorObject) {
	  console.log("Errors handled: " + errorObject.code);
});	
