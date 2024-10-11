import React, { useState } from 'react';
import Slider from 'react-slick';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './gallery.css'; // Your custom CSS for additional styling

// Gallery Slider Component
const Gallery = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true, // Adds a fade animation effect to the slides
    cssEase: 'linear',
    adaptiveHeight: true, // Ensures that the slider adapts to the image height
  };

  return (
    <div className="gallery-container mx-auto">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover shadow-md rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Gallery Section with Lightbox Component
const GallerySection = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <div className="gallery-section max-w-screen-lg mx-auto py-8">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div key={index} className="gallery-item">
            <img
              src={img}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-auto object-cover cursor-pointer rounded-lg shadow-lg hover:opacity-75 transition-opacity duration-300"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};


export { Gallery, GallerySection };
