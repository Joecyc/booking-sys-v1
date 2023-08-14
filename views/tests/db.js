// array timeslot
const times = [
  { time: "10:00", int: 10 },
  { time: "10:30", int: 10.5 },
  { time: "11:00", int: 11 },
  { time: "11:30", int: 11.5 },
  { time: "12:00", int: 12 },
  { time: "12:30", int: 12.5 },
  { time: "13:00", int: 13 },
  { time: "13:30", int: 13.5 },
  { time: "14:00", int: 14 },
  { time: "14:30", int: 14.5 },
  { time: "15:00", int: 15 },
  { time: "15:30", int: 15.5 },
  { time: "16:00", int: 16 },
  { time: "16:30", int: 16.5 },
  { time: "17:00", int: 17 },
  { time: "17:30", int: 17.5 },
  { time: "18:00", int: 18 },
  { time: "18:30", int: 18.5 },
  { time: "19:00", int: 19 },
  { time: "19:30", int: 19.5 },
  { time: "20:00", int: 20 },
  { time: "20:30", int: 20.5 },
  { time: "21:00", int: 21 },
  { time: "21:30", int: 21.5 },
];
times[0].int;
times[0].time;
times.length;
//export date string to integer
// let session = ["10:00","10:30","19:30"];

function checkString(session) {
  let num = [];
  for (i = 0; i < session.length; i++) {
    if (times[i].time === session[i]) {
      num.push(times[i].int);
    }
  }
  return num;
}
console.log(checkString(["10:00", "10:30", "19:30"]));
// const result = tS.map((time) => time.int);
// console.log(result);

// start time = minimum time

// end time = maximum time

// readable duration

// start & end date
let start = "2023/8/1",
  end = "2023/8/15";
let startTime = "21:30",
  endTime = "22:00";
start > end;
end > start;
startTime > endTime;
end > start;

//courseID + int
let course = "NODE";
let data = "NODE01"; //stored in db, findOne()

function f(course, data) {
  let suffix = "",
    courseID = "";
  if (!course) return course;
  // check if any data match
  if (course !== data) {
    // increment by 1
    suffix += 1;
    courseID = course + suffix;
  } else {
    suffix -= 1;
    courseID = course + suffix;
  }
  return courseID;
}
f(course, data);
