import React from 'react';
import '../../components/publicpage/eventSection'; // Custom CSS for additional effects
import img1 from "../../assets/images/s1.jpg";
import img2 from "../../assets/images/s2.jpg";
import img3 from "../../assets/images/s3.jpg";
import img4 from "../../assets/images/s4.jpg";
// Import background images for each event
import BilliardImage from '../../assets/images/home-billiard.jpg';
import GolfImage from '../../assets/images/home-golf.jpg';
import GymImage from '../../assets/images/home-gym.jpg';
import ShootingImage from '../../assets/images/home-shooting.jpg';

// Import gallery images for Billiards
import BilliardImage1 from '../../assets/images/billiard-01.jpg';
import BilliardImage2 from '../../assets/images/billiard-02.jpg';
import BilliardImage3 from '../../assets/images/billiard-03.jpg';
import BilliardImage4 from '../../assets/images/billiard-04.jpg';
import BilliardImage5 from '../../assets/images/billiard-05.jpg';
import BilliardImage6 from '../../assets/images/billiard-06.jpg';
import BilliardImage7 from '../../assets/images/billiard-07.jpg';
import BilliardImage8 from '../../assets/images/billiard-08.jpg';
import BilliardImage9 from '../../assets/images/billiard-09.jpg';

// Import gallery images for Golf
import GolfImage1 from '../../assets/images/golf-01.jpg';
import GolfImage2 from '../../assets/images/golf-02.jpg';
import GolfImage3 from '../../assets/images/golf-03.jpg';
import GolfImage4 from '../../assets/images/golf-04.jpg';
import GolfImage5 from '../../assets/images/golf-05.jpg';
import GolfImage6 from '../../assets/images/golf-06.jpg';
import GolfImage7 from '../../assets/images/golf-07.jpg';
import GolfImage8 from '../../assets/images/golf-08.jpg';
import GolfImage9 from '../../assets/images/golf-09.jpg';

// Import gallery images for Gym
import GymImage1 from '../../assets/images/gym-01.jpg';
import GymImage2 from '../../assets/images/gym-02.jpg';
import GymImage3 from '../../assets/images/gym-03.jpg';
import GymImage4 from '../../assets/images/gym-04.jpg';
import GymImage5 from '../../assets/images/gym-05.jpg';
import GymImage6 from '../../assets/images/gym-06.jpg';

// Import gallery images for Shooting Range
import ShootingImage1 from '../../assets/images/shooting-01.jpg';
import ShootingImage2 from '../../assets/images/shooting-02.jpg';
import ShootingImage3 from '../../assets/images/shooting-03.jpg';
import ShootingImage4 from '../../assets/images/shooting-04.jpg';
import ShootingImage5 from '../../assets/images/shooting-05.jpg';
import ShootingImage6 from '../../assets/images/shooting-06.jpg';




import { Gallery, GallerySection } from '../../components/publicpage/gallery'; // Assuming you have this component created for the gallery
import MapSection from '../../components/publicpage/mapSection';

const imageList = [img1, img2, img3, img4];

function OurServices() {
  const eventData = [
    {
        title: 'Billiards',
        backgroundImage: BilliardImage,
        sectionId: 'billiards-section',
        galleryImages: [
            BilliardImage1,
            BilliardImage2,
            BilliardImage3,
            BilliardImage4,
            BilliardImage5,
            BilliardImage6,
            BilliardImage7,
            BilliardImage8,
            BilliardImage9
        ],
    },
    {
        title: 'Golf',
        backgroundImage: GolfImage,
        sectionId: 'golf-section',
        galleryImages: [
            GolfImage1,
            GolfImage2,
            GolfImage3,
            GolfImage4,
            GolfImage5,
            GolfImage6,
            GolfImage7,
            GolfImage8,
            GolfImage9
        ],
    },
    {
        title: 'Gym',
        backgroundImage: GymImage,
        sectionId: 'gym-section',
        galleryImages: [
            GymImage1,
            GymImage2,
            GymImage3,
            GymImage4,
            GymImage5,
            GymImage6
        ],
    },
    {
        title: 'Shooting Range',
        backgroundImage: ShootingImage,
        sectionId: 'shooting-section',
        galleryImages: [
            ShootingImage1,
            ShootingImage2,
            ShootingImage3,
            ShootingImage4,
            ShootingImage5,
            ShootingImage6
        ],
    }
];


  
      

  return (
    <>
      <Gallery images={imageList} />
      <div className="heading-container flex items-center justify-center my-8">
        <div className="line w-1/4 h-px bg-gray-300"></div>
        <h2 className="heading-text mx-4 text-2xl font-semibold text-purple-800">Exclusive Events for Exclusive People</h2>
        <div className="line w-1/4 h-px bg-gray-300"></div>
      </div>
      <div className="event-sections-container bg-gray-100 border-t border-b border-gray-200 py-8">
        <div className="event-row max-w-screen-xl mx-auto flex flex-wrap justify-between px-4">
          {eventData.map((event, index) => (
            <a
              key={index}
              href={`#${event.sectionId}`} // Link to the specific section ID
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
            </a>
          ))}
        </div>
      </div>

      {/* Event sections with gallery */}
      {eventData.map((event, index) => (
        <div key={index} id={event.sectionId} className="gallery-section my-12">
          <h2 className="text-center text-3xl font-semibold mb-4">{event.title} Gallery</h2>
          <GallerySection images={event.galleryImages} />
        </div>
      ))}
      <MapSection />
    </>
  );
}

export default OurServices;
