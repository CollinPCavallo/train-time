//firebase config file
var config = {
    apiKey: "AIzaSyDc1mlbavR2h_d2FQfWNEfumsAhwlfkEUE",
    authDomain: "train-time-eb94e.firebaseapp.com",
    databaseURL: "https://train-time-eb94e.firebaseio.com",
    projectId: "train-time-eb94e",
    storageBucket: "train-time-eb94e.appspot.com",
    messagingSenderId: "236590173785"
};
//initialize firebasae
firebase.initializeApp(config);

//creating variables for firebase database and user inputs on form
var database = firebase.database();
var trainTime =""
var frequency = ""
//on click for submit button to pull all of the input values of the form and store them into indiviual variables
$("#submit-button").on("click", function (e) {
    e.preventDefault();
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();

    //creating a new child of the freshly made variables of the input values into my firebase databasae everytime submit button is pushed
    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    });

});
    //listener for when a new child is created.
database.ref().on("child_added", function(data){
//creating variables for the value of the most recent child added for frequency and the first train time
    var trainFreq = data.val().frequency;
    var Tfirst = data.val().trainTime

    // edit* simplified all of the math for the time left(shout out to my mom for the help in the math here)
    var timeConverted = moment(Tfirst, "HH:mm");
    var diff = moment().diff(moment(Tfirst), "minutes");
    var timeremain = diff % trainFreq;
    var timeLeft = trainFreq - timeremain;
    var trainNext = moment().add(timeLeft, "minutes");
    var tNext = moment(trainNext).format("HH:mm");
    
   // creating a new row for everytime a child is added and writing the values needed into the dom on the table.
    var createRow = $("<tr>")

    createRow.html(
        "<td>" + data.val().trainName + "</td>" +
        "<td>" + data.val().destination + "</td>" + 
        "<td>" + data.val().frequency + "</td>" + "<td>" + tNext + "</td>" + "<td>" + timeLeft + "</td>" );
    $("#tableBody").append(createRow)

});
