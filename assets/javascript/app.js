$(document).ready(function () {
    console.log('ready')
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCD94WyfO6AWS5XR8TYymAq587HnkdkYdM",
    authDomain: "train-time-9c602.firebaseapp.com",
    databaseURL: "https://train-time-9c602.firebaseio.com",
    projectId: "train-time-9c602",
    storageBucket: "train-time-9c602.appspot.com",
    messagingSenderId: "828583501224"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  function addTrain() {
    var name = $('#trainName').val().trim()
    var destination = $('#trainDestination').val().trim()
    var firstTrain = $('#initialTrain').val().trim()
    var frequency = $('#trainFrequency').val().trim()

    database.ref('/trainData').push({
        TrainName: name,
        TrainDestination: destination,
        InitalTrain: firstTrain,
        TrainFrequency: frequency
    });
    
  }

  database.ref('/trainData').on("child_added", function (data){
      var trainData = data.val()
      var train = $('<tr>')
      var name = $('<td>').text(trainData.TrainName)
      var dest = $('<td>').text(trainData.TrainDestination)
      var freq = $('<td>').text(trainData.TrainFrequency)

      var initial = moment(trainData.InitalTrain, "HH:mm").subtract(1, "years")
      var difference = moment().diff(moment(initial), "minutes")
      var howLongUntil = difference % trainData.TrainFrequency
      var timeUntil = trainData.TrainFrequency - howLongUntil
      var nextArrival = moment().add(timeUntil, "minutes").format("HH:mm")
      console.log(nextArrival)

      


      console.log(initial)
      var now = moment()
      console.log(now)
      
      var displayNext = $('<td>').text(nextArrival);
      var timeTillNext = $('<td>').text(timeUntil)
      

      train.append(name)
      train.append(dest)
      train.append(freq)
      train.append(displayNext)
      train.append(timeTillNext)

      $('#trains').append(train)
  })

 $('#submitButton').click(addTrain) 
})