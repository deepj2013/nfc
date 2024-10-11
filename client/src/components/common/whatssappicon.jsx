import React from 'react';
import whatsappIcon from '../../assets/images/whatsappicon.gif'; // Use the path where you save this image

function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello, I have an enquiry for New Friends Club regarding Booking');
    window.open(`https://wa.me/919654034976?text=${message}`, '_blank'); // Replace 911234567890 with your WhatsApp number
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button onClick={handleWhatsAppClick}>
        <img src={whatsappIcon} alt="WhatsApp Icon" className="w-12 h-12 hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}

export default WhatsAppButton;
