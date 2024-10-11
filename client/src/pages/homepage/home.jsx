import React, { useState, useEffect } from "react";
import { Gallery, GallerySection } from "../../components/publicpage/gallery";
import EventSections from "../../components/publicpage/eventSection";
import image1 from "../../assets/images/s1.jpg";
import image2 from "../../assets/images/s2.jpg";
import image3 from "../../assets/images/s3.jpg";
import image4 from "../../assets/images/s4.jpg";
import appointmentImage from "../../assets/images/home-sche.jpg";
import moreAboutUsimage from "../../assets/images/01.jpg";
import adventureImage from "../../assets/images/adventure.jpeg";
import galleryimage1 from "../../assets/images/01.jpg";
import galleryimage2 from "../../assets/images/02.JPG";
import galleryimage3 from "../../assets/images/03.JPG";
import galleryimage4 from "../../assets/images/04.JPG";
import galleryimage5 from "../../assets/images/05.JPG";
import galleryimage6 from "../../assets/images/06.JPG";
import galleryimage7 from "../../assets/images/07.JPG";
import galleryimage8 from "../../assets/images/08.JPG";
import galleryimage9 from "../../assets/images/09.JPG";
import galleryimage10 from "../../assets/images/10.JPG";
import galleryimage11 from "../../assets/images/11.JPG";
import galleryimage12 from "../../assets/images/12.JPG";
import bachelorPartyIcon from "../../assets/images/bachelorette-party.png";
import birthdayPartyIcon from "../../assets/images/gift-box.png";
import engagementIcon from "../../assets/images/wedding-rings.png";
import weddingIcon from "../../assets/images/wedding-couple.png";
import christmasPartyIcon from "../../assets/images/gift.png";
import newYearPartyIcon from "../../assets/images/confetti.png";
import corporateEventIcon from "../../assets/images/handshake.png";
import musicalConcertIcon from "../../assets/images/microphone.png";
import kidsBirthdayPartyIcon from "../../assets/images/birthday-party.png";
import weddingReceptionIcon from "../../assets/images/wedding-arch.png";
import Footer from "./footer";
import MapSection from "../../components/publicpage/mapSection";

const imageList = [image1, image2, image3, image4];
const galleryImages = [
  galleryimage1,
  galleryimage2,
  galleryimage3,
  galleryimage4,
  galleryimage5,
  galleryimage6,
  galleryimage7,
  galleryimage8,
  galleryimage9,
  galleryimage10,
  galleryimage11,
  galleryimage12,
];
const occasionsData = [
  { title: "Bachelor Party", icon: bachelorPartyIcon },
  { title: "Birthday Party", icon: birthdayPartyIcon },
  { title: "Engagement", icon: engagementIcon },
  { title: "Wedding", icon: weddingIcon },
  { title: "Christmas Party", icon: christmasPartyIcon },
  { title: "New Year Party", icon: newYearPartyIcon },
  { title: "Corporate Event", icon: corporateEventIcon },
  { title: "Musical Concert", icon: musicalConcertIcon },
  { title: "Kids Birthday Party", icon: kidsBirthdayPartyIcon },
  { title: "Wedding Reception", icon: weddingReceptionIcon },
];

const testimonials = [
  {
    quote:
      "Highly appreciated and recommended place for any functions. Ambience and food is good and also staff well served the food. Very clean bathrooms and nice interiors.",
    author: "Uma Maheshwari",
  },
  {
    quote:
      "Nice Banquet Hall…very high ceiling central hall, neat modern interiors, two separate halls for dining..good and luxurious. A nice venue for family functions…food is great, service is good, staff is trained, new cutlery and furniture very contemporary..highly recommended.",
    author: "Sonam Srivastava",
  },
  {
    quote:
      "Grand, beautiful banquet hall. The decorations are so beautiful and the space of the venue is huge. Ideal for hosting wedding celebrations or big parties, for more than 300 people. The staff here is friendly and service provided is good.",
    author: "Vipin Rudola",
  },
  {
    quote:
      "Good interior. Food was also good and variety was ample. Felt delighted with hospitality.",
    author: "A A Verma",
  },
];

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prevTestimonial) =>
        prevTestimonial === testimonials.length - 1 ? 0 : prevTestimonial + 1
      );
    }, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Gallery images={imageList} />
      <EventSections />
      <div className="home-page max-w-screen-lg mx-auto p-8">
        <div className="hero-section text-center mb-8">
          <h2 className="text-3xl font-semibold text-purple-800 mb-2">
            Exclusive club for exclusive people
          </h2>
          <hr className="border-t-2 border-purple-800 w-24 mx-auto mt-2" />
        </div>

        <div className="club-info">
          <h3 className="text-2xl font-bold text-teal-800 mb-4">
            Welcome to New Friends Club
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            New Friends Club, located in the vibrant city of New Delhi, is a
            social haven for individuals seeking camaraderie, entertainment, and
            relaxation. Established on January 23rd, 1994, the club has since
            grown into a thriving community with over 1800 members, making it a
            hub for social interaction and recreation in the city.
          </p>

          <h4 className="text-xl font-bold text-teal-800 mb-2">
            Profile of Members:
          </h4>
          <p className="text-lg text-gray-700 mb-4">
            The club boasts a diverse membership including Industrialists,
            Businessmen, Doctors, Lawyers, Professionals, and Bureaucrats.
          </p>

          <h4 className="text-xl font-bold text-teal-800 mb-2">
            Affiliations:
          </h4>
          <p className="text-lg text-gray-700 mb-4">
            New Friends Club is proud to be affiliated with 102 clubs across
            India, fostering connections and friendships beyond the borders of
            the capital.
          </p>

          <h4 className="text-xl font-bold text-teal-800 mb-2">Facilities:</h4>
          <p className="text-lg text-gray-700 mb-4">
            The club prides itself on providing top-notch facilities to cater to
            the diverse needs and desires of its members. With a fully
            air-conditioned environment, New Friends Club ensures comfort
            throughout its premises. The club boasts an impressive repertoire of
            amenities, including a reception area, a lounge, and a well-stocked
            bar.
          </p>

          <p className="text-lg text-gray-700 mb-4">
            When it comes to dining experiences, New Friends Club has truly left
            no stone unturned. Members can indulge in the delectable culinary
            offerings at two distinct restaurants - an Indian restaurant and a
            Chinese restaurant. For those seeking a more relaxed ambiance, the
            Gardenia garden restaurant and the partially open Cafe Konnect
            provide a perfect setting. Snacks and hot beverages can be enjoyed
            at the Tasty Bites coffee shop.
          </p>

          <h4 className="text-xl font-bold text-teal-800 mb-2">
            Sports Facilities:
          </h4>
          <p className="text-lg text-gray-700 mb-4">
            New Friends Club understands the importance of staying active and
            offers an array of sports facilities for its members. Golf
            enthusiasts can perfect their swing at the on-site Golf Academy,
            while those looking for an adrenaline rush can try their hand at the
            shooting range. Billiards/Pool, table tennis, badminton, swimming,
            and squash complete the diverse offering of sports facilities
            available within the club's premises.
          </p>

          <h4 className="text-xl font-bold text-teal-800 mb-2">Conclusion:</h4>
          <p className="text-lg text-gray-700">
            With its numerous amenities, enticing dining options, and a wide
            range of recreational activities, New Friends Club is the place to
            be for individuals seeking a vibrant and welcoming social
            environment. The club's commitment to providing exceptional
            facilities and fostering a sense of community cements its position
            as a premier club in New Delhi.
          </p>
        </div>
      </div>
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
      <GallerySection images={galleryImages} />
      <div
        className="more-about-us-section relative my-12 bg-fixed bg-cover bg-center text-white flex items-center justify-center"
        style={{
          backgroundImage: `url(${moreAboutUsimage})`,
          minHeight: "80vh",
        }}
      >
        <div className="more-about-us-content bg-black bg-opacity-60 p-8 rounded-lg mx-auto text-center">
          <h2 className="more-about-us-heading text-3xl font-bold mb-4 italic">
            “New Friends Club has a well-prepared and experienced staff who
            makes their earnest attempts to offer you best friendliness
            administrations”
          </h2>
          <p className="more-about-us-description mb-4">
            New Friends Club has a group of culinary experts who offer a wide
            exhibit of delightful & tempting cooking styles which will fill the
            mood with fragrances that are difficult to stand up to.
          </p>
          <button className="more-about-us-button bg-orange-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-300">
            Learn more about us
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center py-16 px-8 bg-white">
        <div className="text-container w-full md:w-1/2 text-center md:text-left px-4">
          <p className="text-teal-800 text-xs uppercase tracking-wider mb-2">
            New Friends Club, New Friends Colony, Delhi
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-purple-800 leading-tight mb-4">
            Begin another adventure <br /> of your life at New Friends Club
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-lg mx-auto md:mx-0">
            We deal with every one of the courses of action to give you a chance
            to make the most of your matrimonial functions with your visitors,
            with no issue
          </p>
        </div>
        <div className="image-container w-full md:w-1/2 mt-6 md:mt-0 px-4">
          <img
            src={adventureImage}
            alt="Adventure"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      <div className="occasions-section py-16 bg-white">
        <h2 className="text-2xl font-semibold text-teal-800 text-center mb-6">
          Good for Occasions
        </h2>
        <hr className="border-t-2 border-teal-800 w-16 mx-auto mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 max-w-screen-xl mx-auto">
          {occasionsData.map((occasion, index) => (
            <div
              key={index}
              className="occasion-card flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src={occasion.icon}
                alt={occasion.title}
                className="h-16 mb-4"
              />
              <p className="text-teal-800 text-center font-medium">
                {occasion.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonial-section py-16 bg-gray-100">
        <h2 className="text-2xl font-semibold text-teal-800 text-center mb-6">
          Testimonials
        </h2>
        <hr className="border-t-2 border-teal-800 w-16 mx-auto mb-8" />
        <div className="testimonial-card max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <p className="text-lg italic text-gray-700 mb-4">
            "{testimonials[currentTestimonial].quote}"
          </p>
          <h4 className="text-md font-bold text-teal-800 text-right">
            - {testimonials[currentTestimonial].author}
          </h4>
        </div>
      </div>

     
          <MapSection />
   
    </>
  );
};

export default Home;
