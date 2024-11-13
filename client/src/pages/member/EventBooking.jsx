import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { errorToast, successToast } from "../../utils/Helper";
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
// import mockData from "../../mockData"; // Placeholder for sports, events, rooms, halls.

const mockData = {
    sports: [
      { name: "Swimming", image: "/sports/swimming.jpg", description: "Indoor Pool Access" },
      { name: "Badminton", image: "/sports/badminton.jpg", description: "Indoor Court" },
      { name: "Bowling", image: "/sports/bowling.jpg", description: "Bowling Alley" },
      { name: "Shooting", image: "/sports/shooting.jpg", description: "Shooting Range" },
    ],
    events: [
      { name: "Tambola Night", image: "/events/tambola.jpg", description: "Enjoy Tambola!" },
      { name: "Dance Party", image: "/events/dance.jpg", description: "Dance your heart out." },
      { name: "New Year Bash", image: "/events/newyear.jpg", description: "Celebrate with us!" },
    ],
    rooms: [
      { name: "Deluxe Room", image: "/rooms/deluxe.jpg", description: "Luxurious stay." },
      { name: "Suite", image: "/rooms/suite.jpg", description: "Premium suite." },
    ],
    halls: [
      { name: "Hall 1", image: "/halls/hall1.jpg", description: "Spacious hall." },
      { name: "Banquet Hall", image: "/halls/banquet.jpg", description: "Perfect for large events." },
    ],
  };
  
 
  


  const EventBooking = () => {
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState("Sports");
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [memberId, setMemberId] = useState("");
  
    const categories = ["Sports", "Events", "Rooms", "Halls"];
  
    const openModal = (item) => {
      setSelectedItem(item);
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setSelectedItem(null);
      setModalOpen(false);
      setMemberId(""); // Clear input on close
    };
  
    const verifyMemberHandler = async () => {
      if (!memberId) {
        errorToast("Please enter a member ID.");
        return;
      }
      try {
        // Add your verification logic here.
        successToast("Member verified successfully!");
      } catch (error) {
        errorToast("Verification failed.");
      }
    };
  
    const renderCards = () => {
      const items = mockData[activeCategory.toLowerCase()];
      return items.map((item, index) => (
        <div key={index} className="card bg-white shadow-md rounded-md p-4">
          <img src={item.image} alt={item.name} className="rounded-lg mb-4" />
          <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
          <Button
            name="Book Now"
            style="mt-2 bg-blue-500 text-white w-full"
            onClick={() => openModal(item)}
          />
        </div>
      ));
    };
  
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Event Booking
        </h2>
        <div className="flex justify-center mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              name={category}
              style={`px-4 py-2 mx-2 ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {renderCards()}
        </div>
  
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 w-full max-w-lg rounded-md shadow-lg">
              <h3 className="text-xl font-bold mb-4">Booking: {selectedItem?.name}</h3>
              <FormInput
                label="Enter Member ID"
                placeholder="Member ID"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />
              <Button
                name="Verify"
                style="mt-2 bg-blue-500 text-white w-full"
                onClick={verifyMemberHandler}
              />
              <Button
                name="Book for Guest"
                style="mt-4 bg-green-500 text-white w-full"
              />
              <Button
                name="Close"
                style="mt-4 bg-red-500 text-white w-full"
                onClick={closeModal}
              />
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default EventBooking;
  
