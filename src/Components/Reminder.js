import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAlarm,
  decAlarm,
  selectAlarms,
} from "../features/ItemReducer/Reminder";
const Reminder = () => {
  const [currTime, setCurrTime] = useState(0);
  const [count, setcount] = useState(0);
  const [flag, setflag] = useState(false);
  const [alarmTime, setAlarmTime] = useState(0);
  const [alarmText, setAlarmText] = useState();
  const alarms = useSelector(selectAlarms);
  const [data, setdata] = useState(0);
  const [time2, setTime2] = useState(0);
  const dispatch = useDispatch();
  const d = new Date();

  // setInterval(() => {
  //   setCurrSecs(() => d.getSeconds());
  //   setCurrTime(d.getHours() - 12 + ":" + d.getMinutes());
  // });
  setInterval(() => {
    setdata(data + 1);
  }, 1000);

  useEffect(() => {
    const thetime =
      (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) +
      ":" +
      d.getMinutes() +
      ":" +
      d.getSeconds();
    setCurrTime(thetime);

    const thetime2 =
      (d.getHours() > 12 ? d.getHours() - 12 : d.getHours()) +
      ":" +
      d.getMinutes();

    setTime2(thetime2);
  }, [data]);

  const handleClick = (e) => {
    e.preventDefault();
    const NewAlarm = alarmTime.split(":");
    dispatch(
      addAlarm({
        text: alarmText,
        time:
          NewAlarm[0] > 12 ? NewAlarm[0] - 12 + ":" + NewAlarm[1] : alarmTime,
      })
    );
  };

  const ringAlarm = () => {
    console.log(time2, alarms[2].time);
    for (var i = 0; i < alarms.length; i++) {
      if (time2 === alarms[i]?.time) {
        console.log("Ring!", count, flag);
        window.alert(`Alarm: ${alarms[i].text}`);
      }
    }
  };
  useEffect(() => {
    ringAlarm();
  }, [currTime]);

  return (
    <div className="reminder">
      <h1 className="bor">
        Current Time: {currTime}
        {d.getHours() > 12 ? <strong>PM</strong> : <strong>AM</strong>}
      </h1>
      <h1>Lets Set an Alarm Reminder</h1>
      <form onSubmit={handleClick} className="reminder-inputs">
        <input
          required
          onChange={(event) => setAlarmText(event.target.value)}
          type="text"
          placeholder="Whats the alarm about ?"
        />
        <input
          required
          onChange={(event) => setAlarmTime(event.target.value)}
          type="time"
        />
        <Button type="submit" sx={{ backgroundColor: "whitesmoke" }}>
          Set The Alarm
        </Button>
      </form>
      <div className="reminder-alarms">
        <h3>Upcoming Alarms</h3>
        {alarms.map((alarm, index) => (
          <div key={index} className="alarms bor">
            <div>{alarm.text}</div>
            <div>{alarm.time}</div>
            <Button
              onClick={() => dispatch(decAlarm(index))}
              sx={{ backgroundColor: "whitesmoke" }}
            >
              Delete Alarm
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reminder;
