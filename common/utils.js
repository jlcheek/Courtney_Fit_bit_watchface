// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
//returns the month
export function getMonth(i){
  if(i == 0) return "Jan";
  else if(i == 1) return "Feb";
  else if(i == 2) return "Mar";
  else if(i == 3) return "Apr";
  else if(i == 4) return "May";
  else if(i == 5) return "Jun";
  else if(i == 6) return "Jul";
  else if(i == 7) return "Aug";
  else if(i == 8) return "Sep";
  else if(i == 9) return "Oct";
  else if(i == 10) return "Nov";
  
  return "Dec";
  
}
//get day of the week
export function getDayOfWeek(i){
  if(i == 0) return "Sun";
  else if(i == 1) return "Mon";
  else if(i == 2) return "Tue";
  else if(i == 3) return "Wed";
  else if(i == 4) return "Thu";
  else if(i == 5) return "Fri";
  
  return "Sat";
}