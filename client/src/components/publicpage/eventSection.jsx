import React from 'react';
import './eventSection.css'; // Custom CSS for additional effects
import image1 from "../../assets/images/home-banquet.jpg";
import image2 from "../../assets/images/home-kitty.jpg";
import image3 from "../../assets/images/home-corporate.jpg"

const EventSections = () => {
  const eventData = [
    {
      title: "Clubs",
      backgroundImage: image1,
    },
    {
      title: "Get Together's",
      backgroundImage: image2,
    },
    {
      title: "Corporate Events",
      backgroundImage: image3,
    },
  ];

  return (
    <>
    <div className="heading-container flex items-center justify-center my-8">
    <div className="line w-1/4 h-px bg-gray-300"></div>
    <h2 className="heading-text mx-4 text-2xl font-semibold text-purple-800">Exclusive club for exclusive people</h2>
    <div className="line w-1/4 h-px bg-gray-300"></div>
  </div>
    <div className="event-sections-container bg-gray-100 border-t border-b border-gray-200 py-8">
      <div className="event-row max-w-screen-xl mx-auto flex flex-wrap justify-between px-4">
        {eventData.map((event, index) => (
          <div
            key={index}
            className="event-column flex flex-col items-center justify-center w-full sm:w-1/3 p-4 relative overflow-hidden"
          >
            <div
              className="event-content w-full h-64 rounded-md flex items-center justify-center text-white text-xl font-bold transition duration-500 ease-in-out transform hover:scale-110 hover:opacity-90"
              style={{
                backgroundImage: `url(${event.backgroundImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              <h1 className="bg-black bg-opacity-60 p-2 rounded-lg">{event.title}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default EventSections;
