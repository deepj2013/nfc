import React from 'react';
import '../../components/publicpage/eventSection'; // Custom CSS for additional effects
import img1 from "../../assets/images/s1.jpg";
import img2 from "../../assets/images/s2.jpg";
import img3 from "../../assets/images/s3.jpg";
import img4 from "../../assets/images/s4.jpg";
import image1 from '../../assets/images/home-banquet.jpg';
import image2 from '../../assets/images/home-kitty.jpg';
import image3 from '../../assets/images/home-lohri.jpg';
import image4 from '../../assets/images/home-bolly.jpg';
import image5 from '../../assets/images/home-member.jpg';
import image6 from '../../assets/images/tambola.JPG';
// Baisakhi Images
import BaisakhiImage1 from '../../assets/images/baisakhi-01.jpg';
import BaisakhiImage2 from '../../assets/images/baisakhi-02.jpg';
import BaisakhiImage3 from '../../assets/images/baisakhi-03.jpg';
import BaisakhiImage4 from '../../assets/images/baisakhi-04.jpg';
import BaisakhiImage5 from '../../assets/images/baisakhi-05.jpg';
import BaisakhiImage6 from '../../assets/images/baisakhi-06.jpg';
import BaisakhiImage7 from '../../assets/images/baisakhi-07.jpg';
import BaisakhiImage8 from '../../assets/images/baisakhi-08.jpg';
import BaisakhiImage9 from '../../assets/images/baisakhi-09.jpg';
import BaisakhiImage10 from '../../assets/images/baisakhi-10.jpg';
import BaisakhiImage11 from '../../assets/images/baisakhi-11.jpg';
import BaisakhiImage12 from '../../assets/images/baisakhi-12.jpg';

// Bollywood Night Images
import BollywoodNightImage1 from '../../assets/images/bolly-01.JPG';
import BollywoodNightImage2 from '../../assets/images/bolly-02.JPG';
import BollywoodNightImage3 from '../../assets/images/bolly-03.JPG';
import BollywoodNightImage4 from '../../assets/images/bolly-04.JPG';
import BollywoodNightImage5 from '../../assets/images/bolly-05.JPG';
import BollywoodNightImage6 from '../../assets/images/bolly-06.JPG';

// Lohri Function Images
import LohriImage1 from '../../assets/images/lohri-01.JPG';
import LohriImage2 from '../../assets/images/lohri-02.JPG';
import LohriImage3 from '../../assets/images/lohri-03.JPG';

// New Year Images
import NewYearImage1 from '../../assets/images/year-01.JPG';
import NewYearImage2 from '../../assets/images/year-02.JPG';
import NewYearImage3 from '../../assets/images/year-03.JPG';
import NewYearImage4 from '../../assets/images/year-04.JPG';
import NewYearImage5 from '../../assets/images/year-05.JPG';
import NewYearImage6 from '../../assets/images/year-06.JPG';

// Member Day Images
import MemberDayImage1 from '../../assets/images/memberday-01.jpg';

import TambolaImage1 from '../../assets/images/tambola_1.jpg';
import TambolaImage2 from '../../assets/images/tambola_2.jpg';
import TambolaImage3 from '../../assets/images/tambola_3.jpg';
import TambolaImage4 from '../../assets/images/tambola_4.jpg';
import TambolaImage5 from '../../assets/images/tambola_5.jpg';
import TambolaImage6 from '../../assets/images/tambola_6.jpg';
import TambolaImage7 from '../../assets/images/tambola_7.jpg';
import TambolaImage8 from '../../assets/images/tambola_8.jpg';
import TambolaImage9 from '../../assets/images/tambola_9.jpg';
import TambolaImage10 from '../../assets/images/tambola_10.jpg';
import TambolaImage11 from '../../assets/images/tambola_11.jpg';
import TambolaImage12 from '../../assets/images/tambola_12.jpg';
import TambolaImage13 from '../../assets/images/tambola_13.jpg';
import TambolaImage14 from '../../assets/images/tambola_14.jpg';
import TambolaImage15 from '../../assets/images/tambola_15.jpg';
import TambolaImage16 from '../../assets/images/tambola_16.jpg';
import TambolaImage17 from '../../assets/images/tambola_17.jpg';
import TambolaImage18 from '../../assets/images/tambola_18.jpg';
import TambolaImage19 from '../../assets/images/tambola_19.jpg';
import TambolaImage20 from '../../assets/images/tambola_20.jpg';
import TambolaImage21 from '../../assets/images/tambola_21.jpg';
import TambolaImage22 from '../../assets/images/tambola_22.jpg';
import TambolaImage23 from '../../assets/images/tambola_23.jpg';
import TambolaImage24 from '../../assets/images/tambola_24.jpg';
import TambolaImage25 from '../../assets/images/tambola_25.jpg';
import TambolaImage26 from '../../assets/images/tambola_26.jpg';
import TambolaImage27 from '../../assets/images/tambola_27.jpg';
import TambolaImage28 from '../../assets/images/tambola_28.jpg';
import TambolaImage29 from '../../assets/images/tambola_29.jpg';
import TambolaImage30 from '../../assets/images/tambola_30.jpg';
import TambolaImage31 from '../../assets/images/tambola_31.jpg';
import TambolaImage32 from '../../assets/images/tambola_32.jpg';
import TambolaImage33 from '../../assets/images/tambola_33.jpg';
import TambolaImage34 from '../../assets/images/tambola_34.jpg';
import TambolaImage35 from '../../assets/images/tambola_35.jpg';
import TambolaImage36 from '../../assets/images/tambola_36.jpg';
import TambolaImage37 from '../../assets/images/tambola_37.jpg';
import TambolaImage38 from '../../assets/images/tambola_38.jpg';
import TambolaImage39 from '../../assets/images/tambola_39.jpg';
import TambolaImage40 from '../../assets/images/tambola_40.jpg';
import TambolaImage41 from '../../assets/images/tambola_41.jpg';
import TambolaImage42 from '../../assets/images/tambola_42.jpg';
import TambolaImage43 from '../../assets/images/tambola_43.jpg';
import TambolaImage44 from '../../assets/images/tambola_44.jpg';
import TambolaImage45 from '../../assets/images/tambola_45.jpg';
import TambolaImage46 from '../../assets/images/tambola_46.jpg';
import TambolaImage47 from '../../assets/images/tambola_47.jpg';
import TambolaImage48 from '../../assets/images/tambola_48.jpg';
import TambolaImage49 from '../../assets/images/tambola_49.jpg';
import TambolaImage50 from '../../assets/images/tambola_50.jpg';
import TambolaImage51 from '../../assets/images/tambola_51.jpg';
import TambolaImage52 from '../../assets/images/tambola_52.jpg';
import TambolaImage53 from '../../assets/images/tambola_53.jpg';
import TambolaImage54 from '../../assets/images/tambola_54.jpg';
import TambolaImage55 from '../../assets/images/tambola_55.jpg';
import TambolaImage56 from '../../assets/images/tambola_56.jpg';
import TambolaImage57 from '../../assets/images/tambola_57.jpg';
import TambolaImage58 from '../../assets/images/tambola_58.jpg';
import TambolaImage59 from '../../assets/images/tambola_59.jpg';
import TambolaImage60 from '../../assets/images/tambola_60.jpg';
import TambolaImage61 from '../../assets/images/tambola_61.jpg';
import TambolaImage62 from '../../assets/images/tambola_62.jpg';
import TambolaImage63 from '../../assets/images/tambola_63.jpg';
import TambolaImage64 from '../../assets/images/tambola_64.jpg';
import TambolaImage65 from '../../assets/images/tambola_65.jpg';
import TambolaImage66 from '../../assets/images/tambola_66.jpg';
import TambolaImage67 from '../../assets/images/tambola_67.jpg';
import TambolaImage68 from '../../assets/images/tambola_68.jpg';
import TambolaImage69 from '../../assets/images/tambola_69.jpg';
import TambolaImage70 from '../../assets/images/tambola_70.jpg';
import TambolaImage71 from '../../assets/images/tambola_71.jpg';
import TambolaImage72 from '../../assets/images/tambola_72.jpg';
import TambolaImage73 from '../../assets/images/tambola_73.jpg';
import TambolaImage74 from '../../assets/images/tambola_74.jpg';
import TambolaImage75 from '../../assets/images/tambola_75.jpg';
import TambolaImage76 from '../../assets/images/tambola_76.jpg';
import TambolaImage77 from '../../assets/images/tambola_77.jpg';
import TambolaImage78 from '../../assets/images/tambola_78.jpg';
import TambolaImage79 from '../../assets/images/tambola_79.jpg';
import TambolaImage80 from '../../assets/images/tambola_80.jpg';
import TambolaImage81 from '../../assets/images/tambola_81.jpg';
import TambolaImage82 from '../../assets/images/tambola_82.jpg';
import TambolaImage83 from '../../assets/images/tambola_83.jpg';
import TambolaImage84 from '../../assets/images/tambola_84.jpg';
import TambolaImage85 from '../../assets/images/tambola_85.jpg';
import TambolaImage86 from '../../assets/images/tambola_86.jpg';
import TambolaImage87 from '../../assets/images/tambola_87.jpg';
import TambolaImage88 from '../../assets/images/tambola_88.jpg';
import TambolaImage89 from '../../assets/images/tambola_89.jpg';
import TambolaImage90 from '../../assets/images/tambola_90.jpg';
import TambolaImage91 from '../../assets/images/tambola_91.jpg';
import TambolaImage92 from '../../assets/images/tambola_92.jpg';
import TambolaImage93 from '../../assets/images/tambola_93.jpg';
import TambolaImage94 from '../../assets/images/tambola_94.jpg';
import TambolaImage95 from '../../assets/images/tambola_95.jpg';
import TambolaImage96 from '../../assets/images/tambola_96.jpg';
import TambolaImage97 from '../../assets/images/tambola_97.jpg';
import TambolaImage98 from '../../assets/images/tambola_98.jpg';
import TambolaImage99 from '../../assets/images/tambola_99.jpg';
import TambolaImage100 from '../../assets/images/tambola_100.jpg';
import TambolaImage101 from '../../assets/images/tambola_101.jpg';
import TambolaImage102 from '../../assets/images/tambola_102.jpg';
import TambolaImage103 from '../../assets/images/tambola_103.jpg';
import TambolaImage104 from '../../assets/images/tambola_104.jpg';
import TambolaImage105 from '../../assets/images/tambola_105.jpg';
import TambolaImage106 from '../../assets/images/tambola_106.jpg';
import TambolaImage107 from '../../assets/images/tambola_107.jpg';
import TambolaImage108 from '../../assets/images/tambola_108.jpg';
import TambolaImage109 from '../../assets/images/tambola_109.jpg';
import TambolaImage110 from '../../assets/images/tambola_110.jpg';
import TambolaImage111 from '../../assets/images/tambola_111.jpg';
import TambolaImage112 from '../../assets/images/tambola_112.jpg';
import TambolaImage113 from '../../assets/images/tambola_113.jpg';
import TambolaImage114 from '../../assets/images/tambola_114.jpg';
import TambolaImage115 from '../../assets/images/tambola_115.jpg';
import TambolaImage116 from '../../assets/images/tambola_116.jpg';
import TambolaImage117 from '../../assets/images/tambola_117.jpg';
import TambolaImage118 from '../../assets/images/tambola_118.jpg';
import TambolaImage119 from '../../assets/images/tambola_119.jpg';
import TambolaImage121 from '../../assets/images/tambola_121.jpg';
import TambolaImage122 from '../../assets/images/tambola_122.jpg';
import TambolaImage123 from '../../assets/images/tambola_123.jpg';
import TambolaImage124 from '../../assets/images/tambola_124.jpg';
import TambolaImage125 from '../../assets/images/tambola_125.jpg';
import TambolaImage126 from '../../assets/images/tambola_126.jpg';
import TambolaImage127 from '../../assets/images/tambola_127.jpg';
import TambolaImage128 from '../../assets/images/tambola_128.jpg';
import TambolaImage129 from '../../assets/images/tambola_129.jpg';
import TambolaImage130 from '../../assets/images/tambola_130.jpg';
import TambolaImage131 from '../../assets/images/tambola_131.jpg';
import TambolaImage132 from '../../assets/images/tambola_132.jpg';
import TambolaImage133 from '../../assets/images/tambola_133.jpg';
import TambolaImage134 from '../../assets/images/tambola_134.jpg';
import TambolaImage135 from '../../assets/images/tambola_135.jpg';
import TambolaImage136 from '../../assets/images/tambola_136.jpg';



import { Gallery, GallerySection } from '../../components/publicpage/gallery'; // Assuming you have this component created for the gallery
import MapSection from '../../components/publicpage/mapSection';

const imageList = [img1, img2, img3, img4];

function Occasions() {
    const eventData = [
        {
          title: 'Baisakhi',
          backgroundImage: image1,
          sectionId: 'baisakhi-section',
          galleryImages: [
            BaisakhiImage1, BaisakhiImage2, BaisakhiImage3, BaisakhiImage4,
            BaisakhiImage5, BaisakhiImage6, BaisakhiImage7, BaisakhiImage8,
            BaisakhiImage9, BaisakhiImage10, BaisakhiImage11, BaisakhiImage12
          ],
        },
        {
          title: 'New Year',
          backgroundImage: image2,
          sectionId: 'new-year-section',
          galleryImages: [
            NewYearImage1, NewYearImage2, NewYearImage3, NewYearImage4,
            NewYearImage5, NewYearImage6
          ],
        },
        {
          title: 'Lohri Function',
          backgroundImage: image3,
          sectionId: 'lohri-function-section',
          galleryImages: [LohriImage1, LohriImage2, LohriImage3],
        },
        {
          title: 'Bollywood Night',
          backgroundImage: image4,
          sectionId: 'bollywood-night-section',
          galleryImages: [
            BollywoodNightImage1, BollywoodNightImage2, BollywoodNightImage3,
            BollywoodNightImage4, BollywoodNightImage5, BollywoodNightImage6
          ],
        },
        {
          title: 'Member Day',
          backgroundImage: image5,
          sectionId: 'member-day-section',
          galleryImages: [MemberDayImage1],
        },
        {
            title: 'Tambola',
            backgroundImage: image6,
            sectionId: 'tambola-section',
            galleryImages: [
              TambolaImage1,
              TambolaImage2,
              TambolaImage3,
              TambolaImage4,
              TambolaImage5,
              TambolaImage6,
              TambolaImage7,
              TambolaImage8,
              TambolaImage9,
              TambolaImage10,
              TambolaImage11,
              TambolaImage12,
              TambolaImage13,
              TambolaImage14,
              TambolaImage15,
              TambolaImage16,
              TambolaImage17,
              TambolaImage18,
              TambolaImage19,
              TambolaImage20,
              TambolaImage21,
              TambolaImage22,
              TambolaImage23,
              TambolaImage24,
              TambolaImage25,
              TambolaImage26,
              TambolaImage27,
              TambolaImage28,
              TambolaImage29,
              TambolaImage30,
              TambolaImage31,
              TambolaImage32,
              TambolaImage33,
              TambolaImage34,
              TambolaImage35,
              TambolaImage36,
              TambolaImage37,
              TambolaImage38,
              TambolaImage39,
              TambolaImage40,
              TambolaImage41,
              TambolaImage42,
              TambolaImage43,
              TambolaImage44,
              TambolaImage45,
              TambolaImage46,
              TambolaImage47,
              TambolaImage48,
              TambolaImage49,
              TambolaImage50,
              TambolaImage51,
              TambolaImage52,
              TambolaImage53,
              TambolaImage54,
              TambolaImage55,
              TambolaImage56,
              TambolaImage57,
              TambolaImage58,
              TambolaImage59,
              TambolaImage60,
              TambolaImage61,
              TambolaImage62,
              TambolaImage63,
              TambolaImage64,
              TambolaImage65,
              TambolaImage66,
              TambolaImage67,
              TambolaImage68,
              TambolaImage69,
              TambolaImage70,
              TambolaImage71,
              TambolaImage72,
              TambolaImage73,
              TambolaImage74,
              TambolaImage75,
              TambolaImage76,
              TambolaImage77,
              TambolaImage78,
              TambolaImage79,
              TambolaImage80,
              TambolaImage81,
              TambolaImage82,
              TambolaImage83,
              TambolaImage84,
              TambolaImage85,
              TambolaImage86,
              TambolaImage87,
              TambolaImage88,
              TambolaImage89,
              TambolaImage90,
              TambolaImage91,
              TambolaImage92,
              TambolaImage93,
              TambolaImage94,
              TambolaImage95,
              TambolaImage96,
              TambolaImage97,
              TambolaImage98,
              TambolaImage99,
              TambolaImage100,
              TambolaImage101,
              TambolaImage102,
              TambolaImage103,
              TambolaImage104,
              TambolaImage105,
              TambolaImage106,
              TambolaImage107,
              TambolaImage108,
              TambolaImage109,
              TambolaImage110,
              TambolaImage111,
              TambolaImage112,
              TambolaImage113,
              TambolaImage114,
              TambolaImage115,
              TambolaImage116,
              TambolaImage117,
              TambolaImage118,
              TambolaImage119,
              TambolaImage121,
              TambolaImage122,
              TambolaImage123,
              TambolaImage124,
              TambolaImage125,
              TambolaImage126,
              TambolaImage127,
              TambolaImage128,
              TambolaImage129,
              TambolaImage130,
              TambolaImage131,
              TambolaImage132,
              TambolaImage133,
              TambolaImage134,
              TambolaImage135,
              TambolaImage136,
            ],
          },
          
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

export default Occasions;
