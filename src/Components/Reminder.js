import { Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAlarm,
  decAlarm,
  selectAlarms,
} from "../features/ItemReducer/Reminder";

import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";

const Reminder = () => {
  const [currTime, setCurrTime] = useState(0);
  const [alarmTime, setAlarmTime] = useState(0);
  const [alarmText, setAlarmText] = useState();
  const alarms = useSelector(selectAlarms);
  const [data, setdata] = useState(0);
  const [time2, setTime2] = useState(0);
  const dispatch = useDispatch();
  const d = new Date();
  const [open, setOpen] = useState({ flag: false, index: "" });
  const handleClose = () => setOpen(false);

  const StyledModal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
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
          // NewAlarm[0] > 12 ? NewAlarm[0] - 12 + ":" + NewAlarm[1] : alarmTime,
          alarmTime,
      })
    );
  };

  const ringAlarm = () => {
    for (var i = 0; i < alarms.length; i++) {
      // console.log(time2, alarms[i].time);

      if (time2 === alarms[i]?.time) {
        // console.log("Ring!", count, flag);
        // window.alert(`Alarm: ${alarms[i].text}`);
        setOpen({ flag: true, index: i });
      }
    }
  };

  useEffect(() => {
    ringAlarm();
  }, [currTime]);

  return (
    <div className="reminder">
      {open.flag && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2 id="parent-modal-title">{alarms[open.index].text}</h2>
          </Box>
        </Modal>
      )}
      <h1 className="bor">
        Current Time: {currTime}
        {d.getHours() >= 12 ? <strong>PM</strong> : <strong>AM</strong>}
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
          type="text"
          placeholder="Format: 00:00"
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
