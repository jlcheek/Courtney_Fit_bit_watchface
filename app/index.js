  // Import the messaging module
import * as messaging from "messaging";
import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import * as util from "../common/utils";
import { today } from "user-activity";
import { goals } from "user-activity";
import { display } from "display";

// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const mySeconds = document.getElementById("mySeconds");
const myDate = document.getElementById("myDate");
const myHeartRate = document.getElementById("myHeartRate");
const myBattery = document.getElementById("myBattery");
const myTemp = document.getElementById("myTemp");
const stepCounter = document.getElementById("steps");
const stairCounter = document.getElementById("stairs");
const calorieCounter = document.getElementById("calories");
const activeCounter = document.getElementById("active_mins");
const locationCounter = document.getElementById("location");
const myBaseHR = document.getElementById("myBaseHR");
const myHRStatus = document.getElementById("myHRStatus");
const heartIMG = document.getElementById("heart");
const stepIcon = document.getElementById("step_icon");
const stairIcon = document.getElementById("stair_icon");
const locIcon = document.getElementById("loc_icon");
const elecIcon = document.getElementById("elec_icon");
const calorieIcon = document.getElementById("calorie_icon");
const test = document.getElementById("test");
const activeLabel = document.getElementById("elec_label");
const stepLabel = document.getElementById("step_label");
const stairLabel = document.getElementById("stair_label");
const calorieLabel = document.getElementById("calorie_label");
const locationLabel = document.getElementById("loc_label");
const weatherLabel = document.getElementById("weather");
let base = 220;
let isTrue = true;
let stopwatch = -1;
let previousTime = 0;

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  weatherLabel.text = "--";
  let clock_today = evt.date;
  let hours = clock_today.getHours();
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }//else
  
  let mins = util.zeroPad(clock_today.getMinutes());
  let secs = util.zeroPad(clock_today.getSeconds());
  let dayOfWeek = util.getDayOfWeek(clock_today.getDay());
  let month = util.getMonth(clock_today.getMonth());
  let year = clock_today.getYear();
  let day = clock_today.getDate();
  let hrm = new HeartRateSensor();
  let heartRate;
  
  //getting info for steps
  stepLabel.text = today.local.steps;
  stepCounter.sweepAngle = (today.local.steps / goals.steps) * 360;
  if(today.local.steps >= goals.steps){
    stepLabel.style.fill = "#00d505";
    stepIcon.href = "step_icon_green.png";
    stepCounter.style.fill = "#00d505";
  }//if
  
  //getting info for stairs
  stairLabel.text = today.local.elevationGain;
  stairCounter.sweepAngle = (today.local.elevationGain / goals.elevationGain) * 360;
  if(today.local.elevationGain >= goals.elevationGain){
    stairLabel.style.fill = "#00d505";
    stairIcon.href = "stair_icon_green.png";
    stairCounter.style.fill = "#00d505";
  }//if
  
  //getting info for active minutes
  activeLabel.text = today.local.activeMinutes;
  activeCounter.sweepAngle = (today.local.activeMinutes / goals.activeMinutes) * 360;
  if(today.local.activeMinutes >= goals.activeMinutes){
    activeLabel.style.fill = "#00d505";
    elecIcon.href = "elec_icon_green.png";
    activeCounter.style.fill = "#00d505";
  }//if
  
  //getting info for calories
  calorieLabel.text = today.local.calories;
  calorieCounter.sweepAngle = (today.local.calories / goals.calories) * 360;
  if(today.local.calories >= goals.calories){
    calorieLabel.style.fill = "#00d505";
    calorieIcon.href = "calorie_icon_green.png";
    calorieCounter.style.fill = "#00d505";
  }//if
  
  //getting info for location
  locationLabel.text = today.local.distance / 1609.34;
  locationLabel.text = locationLabel.text.substring(0, 3);
  locationCounter.sweepAngle = (today.local.distance / goals.distance) * 360;
  if(today.local.distance >= goals.distance){
    locationLabel.style.fill = "#00d505";
    locIcon.href = "loc_icon_green.png";
    locationCounter.style.fill = "#00d505";
  }//if
  
  //reading the heart rate
  hrm.onreading = function(){
    heartRate = hrm.heartRate;
    if(heartRate < base) base = heartRate;
    myBaseHR.text = `${base}`;
    myHeartRate.text = `${heartRate}`;
    myHRStatus.text = `--`;
    if(heartRate < "221"){
      myHRStatus.text = `Holy Shit`;
      myHeartRate.style.fill = "blue";
      heartIMG.href = "heart_blue_icon.png";
      myHRStatus.style.fill = "blue";
    }//if
    if(heartRate < "200"){
      myHRStatus.text = `Peak`;
      myHeartRate.style.fill = "red";
      heartIMG.href = "heart_red_icon.png";
      myHRStatus.style.fill = "red";
    }//if
    if(heartRate < "160"){
      myHRStatus.text = `Cardio`;
      myHeartRate.style.fill = "orange";
      heartIMG.href = "heart_orange_icon.png";
      myHRStatus.style.fill = "orange";
    }//if
    if(heartRate < "120"){
      myHRStatus.text = `Fat Burn`;
      myHeartRate.style.fill = "yellow";
      heartIMG.href = "heart_yellow_icon.png"
      myHRStatus.style.fill = "yellow";
    }//if
    if(heartRate < "100"){
      myHRStatus.text = `Chilling`;
      myHeartRate.style.fill = "white";
      heartIMG.href = "heart_icon.png";
      myHRStatus.style.fill = "white";
    }//if
    
  }//function
  hrm.start();
  
  myBattery.text = Math.floor(battery.chargeLevel) + "%";
  let va = stepCounter.sweepAngle;
  myDate.text = `${dayOfWeek} ${month}  ${day}`;
  myLabel.text = `${hours}:${mins}`;
  
  if(!isTrue){
    if(mySeconds.style.display === "inline"){
          let timer_clock = evt.date;
          let timer = util.zeroPad(timer_clock.getSeconds());
          if(previousTime == 0 || timer > previousTime) stopwatch = stopwatch + 1;
          mySeconds.text = stopwatch + "s"; 
    }//if
    
  }//if
  
  let button = document.getElementById("button");
  button.onactivate = function(evt) {
    if(isTrue){
      stopwatch = -1;
      previousTime = 0;
      display.autoOff = false;
      display.on = true;
      isTrue = false;
      let background = document.getElementById("watson");
      mySeconds.style.display = "inline";
      background.style.display = "inline";
    }//if
    else{
      clock.granularity = "seconds";
      mySeconds.text = "";
      stopwatch = -1;
      previousTime = 0;
      display.autoOff = true;
      display.on = true;
      let background = document.getElementById("watson");
      background.style.display = "none";
      mySeconds.style.display = "none";
      isTrue = true;
    }//else
    
  }//function
  
  
// Request weather data from the companion
function fetchWeather() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the companion
    messaging.peerSocket.send({
      command: 'weather'
    });
  }
}
/*
// Display the weather data received from the companion
function processWeatherData(data) {
  let temp = data.temperature;
  weatherLabel.text = `{temp}`;
  console.log("The temperature is: " + data.temperature);
}

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Fetch weather when the connection opens
  fetchWeather();
}

// Listen for messages from the companion
messaging.peerSocket.onmessage = function(evt) {
  if (evt.data) {
    processWeatherData(evt.data);
  }
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}

// Fetch the weather every 30 minutes
setInterval(fetchWeather, 30 * 1000 * 60);
  */
}//on tick

