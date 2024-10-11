import React from 'react';
import './mapsection.css'; // Import custom CSS for additional styling

const MapSection = () => {
  return (
    <div className="map-section bg-gray-100 py-5">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-teal-800 mb-2">Club in New Friends Colony, Delhi</h2>
          <div className="flex justify-center items-center">
            <div className="border-t-2 border-teal-800 w-16 mx-2"></div>
          </div>
        </div>

        <div className="map-container overflow-hidden rounded-lg shadow-lg">
          <iframe
            title="New Friends Club Location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14016.955543296475!2d77.2661849!3d28.5625885!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2fe32f6a0a157b42!2sNew%20Friends%20Club!5e0!3m2!1sen!2sin!4v1662797474804!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
