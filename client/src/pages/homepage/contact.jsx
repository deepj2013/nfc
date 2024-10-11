
import React from 'react';
import '../../components/publicpage/eventSection'; // Custom CSS for additional effects
import img1 from "../../assets/images/s1.jpg";
import img2 from "../../assets/images/s2.jpg";
import img3 from "../../assets/images/s3.jpg";
import img4 from "../../assets/images/s4.jpg";
import { Gallery } from '../../components/publicpage/gallery'; // Assuming you have this component created for the gallery


const imageList = [img1, img2, img3, img4];

function ContactUs() {

      

  return (
    <>
      <Gallery images={imageList} />
      <div class="container mx-auto px-4 py-8">

<div class="flex flex-col md:flex-row justify-between items-start gap-8">
 
  <div class="md:w-1/2 space-y-4">
    <h2 class="text-2xl font-bold">Contact Us</h2>
    <h3 class="text-lg font-semibold">New Friends Club</h3>
    <p><strong>Contact Person:</strong> Anil Dutta (President)</p>
    <p>
      Mathura Rd, New Friends Colony, <br />
      New Delhi, <br />
      Delhi 110025
    </p>
    <p><strong>Phone:</strong> 011 2632 8235</p>
    <p>
      <strong>Email:</strong> 
      <a href="mailto:nfclub94@yahoo.co.in" class="text-blue-500 hover:underline">nfclub94@yahoo.co.in</a>
    </p>
    <p>
      <strong>Website:</strong> 
      <a href="http://www.newfriendsclubdelhi.com" class="text-blue-500 hover:underline" target="_blank">www.newfriendsclubdelhi.com</a>
    </p>
  </div>

 
  <div class="md:w-1/2">
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14016.955543296475!2d77.2661849!3d28.5625885!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2fe32f6a0a157b42!2sNew%20Friends%20Club!5e0!3m2!1sen!2sin!4v1662797474804!5m2!1sen!2sin" 
      width="100%" 
      height="450" 
      class="border-0" 
      allowfullscreen="" 
      loading="lazy" 
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </div>
</div>
</div>  
   
    </>
  );
}

export default ContactUs;



