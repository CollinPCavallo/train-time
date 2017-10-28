var config = {
    apiKey: "AIzaSyDc1mlbavR2h_d2FQfWNEfumsAhwlfkEUE",
    authDomain: "train-time-eb94e.firebaseapp.com",
    databaseURL: "https://train-time-eb94e.firebaseio.com",
    projectId: "train-time-eb94e",
    storageBucket: "train-time-eb94e.appspot.com",
    messagingSenderId: "236590173785"
};
firebase.initializeApp(config);


var database = firebase.database();
var trainTime =""
var frequency = ""
var timeFormat = 
$("#submit-button").on("click", function (e) {
    e.preventDefault();
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    });

});
    
database.ref().on("child_added", function(data){
    var freq = data.val().frequency;
    
   
    var createRow = $("<tr>")

    createRow.html(
        "<td>" + data.val().trainName + "</td>" +
        "<td>" + data.val().destination + "</td>" + 
        "<td>" + data.val().frequency + "</td>" +
        "<td>" + moment(freq).format("m")) + "</td>" +
        "<td>" + moment(freq).diff(moment(), "years") + "</td>";
    $("#tableBody").append(createRow)
    
});
