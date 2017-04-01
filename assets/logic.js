$(document).ready(function () {  

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDI3NI60hyE1HAmzPr5ICupXyXZl9e9SqY",
    authDomain: "fitnessfinder-d30f1.firebaseapp.com",
    databaseURL: "https://fitnessfinder-d30f1.firebaseio.com",
    storageBucket: "fitnessfinder-d30f1.appspot.com",
    messagingSenderId: "956010332757"
  };
  firebase.initializeApp(config);

	// Create a variable to reference the database.
	var database = firebase.database();


	// initialize variables 
	var instructorName; 
	var classType; 
	var startDate 
	var timeToClass
	var comments;


// When ever user/instructor hits submit button
	$("#search-button").on("click", function(event){
	
	// get user input values
	instructorName = $("#instructorName").val().trim();
	classType = $("#classType").val().trim();
	comments =  $("#comments").val().trim();
	startDate = $("#startDate").val().trim();
	
	// check format of startDate
	if(moment(startDate, 'MM/DD/YY', true).isValid()){
		console.log(startDate + "TRUE")
	} else{
		alert("You entered " + startDate + s". Please enter the correct date format in MM/DD/YY");
		return false;
	};
		

	// console.log user values 
	console.log(instructorName + " " + classType + " " + startDate);

	// adding user input to database
	database.ref().push({
		instructorName: instructorName,
		classType: classType,
		startDate: startDate,
		comments:  comments,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
			
}); //end search button


database.ref().on("child_added", function(snapshot){
	console.log(snapshot.val());
	$("#instructorName").html(snapshot.val().name);
	$("#classType").html(snapshot.val().role);
	$("#startDate").html(snapshot.val().startDate);
	$("#comments").html(snapshot.val().monthRate);

	// call function to calculate the timeToClass
	calcTimeTo(snapshot.val().startDate);

	//adding user input to the table
	var tRow = $("<tr>");
		tRow.append("<td>"+ snapshot.val().instructorName + "</td>");
		tRow.append("<td>"+ snapshot.val().classType + "</td>");
		tRow.append("<td>"+ snapshot.val().startDate + "</td>");
		tRow.append("<td>"+ timeToClass +"</td>");
		tRow.append("<td>"+ snapshot.val().comments +"</td>");
		$("#fitnessTable").append(tRow);
		console.log(name);

	},
	function(errorObject){
		console.log("errors handled:" + errorObject.code);
});

// finding time to class
function calcTimeTo(st){
	console.log(st + "event");
	
	var convertStart = moment(new Date(st));

	// convert the startDate to unix
	// var unixTime = parseInt(moment(st).format("X"));
	console.log(convertStart + "convertStart")
	timeToClass = moment(convertStart).diff(moment(), "days");
	console.log(timeToClass);
}

}); //end of document ready





// moment().format("DD/MM/YY hh:mm A")
//database.ref().orderByChild("dateAdded")



