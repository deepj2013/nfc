import React from 'react'
import appointmentImage from "../../assets/images/home-sche.jpg";

function ScheduleSection() {
  return (
    <div
        className="schedule-appointment-section relative my-12 bg-fixed bg-cover bg-center text-white flex items-center justify-center"
        style={{
          backgroundImage: `url(${appointmentImage})`,
          minHeight: "60vh",
        }}
      >
        <div className="bg-black bg-opacity-60 p-8 rounded-lg max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Schedule Appointment</h2>
          <p className="mb-2">Contact Person: Anil Dutta (President)</p>
          <p className="mb-2">Mathura Rd, New Friends Colony,</p>
          <p className="mb-2">New Delhi,</p>
          <p className="mb-2">Delhi 110025</p>
          <p>Phone: 011 2632 8235</p>
        </div>
      </div>
  )
}

export default ScheduleSection