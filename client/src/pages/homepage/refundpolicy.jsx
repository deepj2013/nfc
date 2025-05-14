import React from "react";
import { Gallery } from "../../components/publicpage/gallery";
import image1 from "../../assets/images/s1.jpg";
import image2 from "../../assets/images/s2.jpg";
import image3 from "../../assets/images/s3.jpg";
import image4 from "../../assets/images/s4.jpg";
import MapSection from "../../components/publicpage/mapSection";
import ScheduleSection from "../../components/publicpage/scheduleSection";

const imageList = [image1, image2, image3, image4];

const RefundPolicy = () => {
  return (
    <>
      <Gallery images={imageList} />

      <div className="font-sans leading-relaxed p-5">
        <div className="max-w-[90%] mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">
            💸 Refund Policy — New Friends Club
          </h2>

          <p>
            At New Friends Club, we strive to provide a welcoming and enriching experience to all our members. If for any reason you are not satisfied with our services, please review our refund policy below.
          </p>

          <p className="mt-4 font-bold">1. Membership Refunds</p>
          <ul className="list-disc ml-5">
            <li><strong>Monthly Memberships:</strong> Refunds are not available for monthly subscriptions once payment has been processed.</li>
            <li><strong>Annual Memberships:</strong> You may request a refund within 2 days of purchase. After 2 days, annual membership payments are non-refundable.</li>
            <li>Prorated refunds are not available for unused portions of your membership.</li>
          </ul>

          <p className="mt-4 font-bold">2. Event Tickets</p>
          <p>
            Cancellations made within 48 hours of the event are non-refundable, unless the event is canceled or rescheduled by New Friends Club.
          </p>

          <p className="mt-4 font-bold">3. Refund Process</p>
          <p>
            To request a refund, contact us with your full name, order details, and the reason for your request. We aim to respond within 2–3 business days.
          </p>
          <p>
            Refund if approved will be processed and credited to your source account wiht in 7 to 8 working days
          </p>
          <p className="mt-4 font-bold">4. Exceptions</p>
          <p>
            We reserve the right to grant refunds or credits at our sole discretion, in circumstances that warrant exceptions to this policy.
          </p>

          <p className="mt-6">
            For refund-related queries, please contact us at:{" "}
            <a href="mailto:info@newfriendsclub.in" className="text-blue-600 underline">
              info@newfriendsclub.in
            </a>
          </p>
        </div>
      </div>

      <ScheduleSection />
      <MapSection />
    </>
  );
};

export default RefundPolicy;