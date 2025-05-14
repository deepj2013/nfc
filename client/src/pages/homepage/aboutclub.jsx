  import React from "react";
  import { Gallery } from "../../components/publicpage/gallery";
  import image1 from "../../assets/images/s1.jpg";
  import image2 from "../../assets/images/s2.jpg";
  import image3 from "../../assets/images/s3.jpg";
  import image4 from "../../assets/images/s4.jpg";
  import MapSection from "../../components/publicpage/mapSection";
  import ScheduleSection from "../../components/publicpage/scheduleSection";

  const imageList = [image1, image2, image3, image4];

  const About = () => {
    return (
      <>
        <Gallery images={imageList} />

        <div className="font-sans leading-relaxed p-5">
          <div className="max-w-[90%] mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">
              About Us
            </h2>
            <p>
              New Friends Club, located in the vibrant city of New Delhi, is a
              social haven for individuals seeking camaraderie, entertainment, and
              relaxation. Established on January 23rd, 1994, the club has since
              grown into a thriving community with over 1800 members, making it a
              hub for social interaction and recreation in the city.
            </p>

            <p className="font-bold mt-4">Profile of Members:</p>
            <p>
              The club boasts a diverse membership including Industrialists,
              Businessmen, Doctors, Lawyers, Professionals, and Bureaucrats.
            </p>

            <p className="font-bold mt-4">Affiliations:</p>
            <p>
              New Friends Club is proud to be affiliated with 102 clubs across
              India, fostering connections and friendships beyond the borders of
              the capital.
            </p>

            <p className="font-bold mt-4">Facilities:</p>
            <p>
              The club prides itself on providing top-notch facilities to cater to
              the diverse needs and desires of its members. With a fully
              air-conditioned environment, New Friends Club ensures comfort
              throughout its premises. The club boasts an impressive repertoire of
              amenities, including a reception area, a lounge, and a well-stocked
              bar.
            </p>

            <p>
              When it comes to dining experiences, New Friends Club has truly left
              no stone unturned. Members can indulge in the delectable culinary
              offerings at two distinct restaurants - an Indian restaurant and a
              Chinese restaurant. For those seeking a more relaxed ambiance, the
              Gardenia garden restaurant and the partially open Cafe Konnect
              provide a perfect setting. Snacks and hot beverages can be enjoyed
              at the Tasty Bites coffee shop.
            </p>

            <p>
              To accommodate private events, the club offers a patio for small
              parties and fully equipped banquet facilities capable of
              accommodating gatherings ranging from 40 to 250 people.
              Additionally, guests can take advantage of the open-air lawn for a
              more refreshing outdoor experience.
            </p>

            <p>
              For those looking for entertainment options, New Friends Club has a
              card room for enthusiasts as well as an ice cream parlor and bakery
              shop for those with a sweet tooth. A lounge area provides members
              with a comfortable space to relax and unwind. Families with children
              can enjoy a dedicated play area for young ones to frolic and have
              fun.
            </p>

            <p>
              Guests visiting New Friends Club have the added convenience of
              availing themselves of six guest rooms for a comfortable stay.
            </p>

            <p className="font-bold mt-4">Sports Facilities:</p>
            <p>
              New Friends Club understands the importance of staying active and
              offers an array of sports facilities for its members. Golf
              enthusiasts can perfect their swing at the on-site Golf Academy,
              while those looking for an adrenaline rush can try their hand at the
              shooting range. Billiards, table tennis, badminton, swimming, and
              squash complete the diverse offering of sports facilities available
              within the club’s premises.
            </p>

            <p className="font-bold mt-4">Conclusion:</p>
            <p>
              With its numerous amenities, enticing dining options, and a wide
              range of recreational activities, New Friends Club is the place to
              be for individuals seeking a vibrant and welcoming social
              environment. The club's commitment to providing exceptional
              facilities and fostering a sense of community cements its position
              as a premier club in New Delhi.
            </p>
          </div>
        </div>

        <ScheduleSection />
        <MapSection />
      </>
    );
  };

  export default About;
