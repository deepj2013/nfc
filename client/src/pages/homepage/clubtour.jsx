import React from 'react';
import ScheduleSection from "../../components/publicpage/scheduleSection";
import MapSection from "../../components/publicpage/mapSection"


function Clubtour() {
  return (
    <>
      <div className="bg-[#f5f8f8] border-solid border-0 flex flex-col items-center justify-start py-10">
        <div className="w-full max-w-screen-2xl mx-auto flex flex-col items-center justify-start">
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-3xl  font-bold text-center" style={{ color: '#004c4c', fontFamily: 'Lato' }}>
              Club Tour
            </h1>
            <div className="w-full max-w-[110px] mx-auto border-t-2" style={{ borderColor: '#17f9f7' }}></div>
          </div>

          <div className="w-full flex flex-col items-center justify-start">
            <iframe
              className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] max-w-full"
              frameBorder="0"
              allowFullScreen
              src="https://tourmkr.com/F1fSOa0NVo"
              title="Club Tour"
            ></iframe>
          </div>
        </div>
      </div>
      <ScheduleSection />
      <MapSection />
    </>
  );
}

export default Clubtour;
