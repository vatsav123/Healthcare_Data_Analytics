import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default CSS for the calendar

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="">
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="react-calendar border-none w-full p-4 rounded-lg "
      />
      <hr />
      <div className="mt-4 text-center">
        <span className="text-lg font-semibold">Todays Date:</span>
        <div>{date.toDateString()}</div>
      </div>
    </div>
  );
};

export default CalendarComponent;
