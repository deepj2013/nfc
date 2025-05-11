import  { useEffect, useState, useRef } from "react";
import { Gallery } from "../../components/publicpage/gallery";
import img1 from "../../assets/images/s1.jpg";
import img2 from "../../assets/images/s2.jpg";
import img3 from "../../assets/images/s3.jpg";
import img4 from "../../assets/images/s4.jpg";

const Function = () => {
  const [functionList, setFunctionList] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const hasFetchedRef = useRef(false);

  const getApiBaseUrl = () => {
    const isLocalhost = window.location.hostname.includes("localhost");
    return isLocalhost
      ? "http://localhost:5100/api/public/occasionlist"
      : "https://api.newfriendsclubdelhi.in/public/functions";
  };

  const fetchPublicFunctions = async (pageNum = 1) => {
    try {
      const res = await fetch(`${getApiBaseUrl()}?page=${pageNum}&limit=5`);
      const data = await res.json();
      const newItems = data.functions || [];

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setFunctionList((prev) => [...prev, ...newItems]);
      }
    } catch (error) {
      console.error("Failed to fetch function data:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchPublicFunctions(page);
      hasFetchedRef.current = true;
    }
  }, [page]);

  const loadMore = () => setPage((prev) => prev + 1);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const imageList = [img1, img2, img3, img4];

  const generateSectionId = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    
    <div className="bg-gray-100">
        <Gallery images={imageList} />
      {/* Heading */}
      <div className="heading-container flex items-center justify-center py-8">
        <div className="line w-1/4 h-px bg-gray-300"></div>
        <h2 className="heading-text mx-4 text-2xl font-semibold text-purple-800">
        Exclusive Events for Exclusive People
        </h2>
        <div className="line w-1/4 h-px bg-gray-300"></div>
      </div>

      {/* Top Preview Section */}
      <div className="event-sections-container border-t border-b border-gray-200 py-8">
        <div className="event-row max-w-screen-xl mx-auto flex flex-wrap justify-between px-4">
          {functionList.map((item, index) => {
            const sectionId = generateSectionId(item.title);
            const firstImage = item.galleryImages?.[0];

            return (
              <div
                key={index}
                className="event-column flex flex-col items-center justify-center w-full sm:w-1/3 p-4 relative overflow-hidden cursor-pointer"
                onClick={() => scrollToSection(sectionId)}
              >
                <div
                  className="event-content w-full h-64 rounded-md flex items-center justify-center text-white text-xl font-bold transition duration-500 ease-in-out transform hover:scale-110 hover:opacity-90"
                  style={{
                    backgroundImage: `url(${firstImage})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="bg-black bg-opacity-60 p-2 rounded-lg text-center">
                    <h1>{item.title}</h1>
                    <p className="text-sm text-gray-200 mt-1">
                      {new Date(item.date).toDateString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrollable Image Galleries */}
      {functionList.map((item, index) => {
        const sectionId = generateSectionId(item.title);

        return (
          <div
            key={index}
            id={sectionId}
            className="gallery-section my-12 px-4 max-w-screen-xl mx-auto"
          >
            <h2 className="text-center text-3xl font-semibold mb-4">
              {item.title} Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {item.galleryImages?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${item.title}-${i}`}
                  className="w-full h-48 object-cover rounded shadow cursor-pointer hover:scale-105 transition"
                  onClick={() => setFullscreenImage(img)}
                />
              ))}
            </div>
          </div>
        );
      })}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center py-6">
          <button
            onClick={loadMore}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
          >
            Load More
          </button>
        </div>
      )}

      {/* Fullscreen Image Viewer */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setFullscreenImage(null)}
        >
          <img
            src={fullscreenImage}
            alt="Preview"
            className="max-w-full max-h-full rounded-lg shadow-xl"
          />
          <button
            className="absolute top-5 right-5 text-white text-4xl font-bold"
            onClick={() => setFullscreenImage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Function;
