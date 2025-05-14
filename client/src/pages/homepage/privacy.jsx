import React from "react";
import { Gallery } from "../../components/publicpage/gallery";
import image1 from "../../assets/images/s1.jpg";
import image2 from "../../assets/images/s2.jpg";
import image3 from "../../assets/images/s3.jpg";
import image4 from "../../assets/images/s4.jpg";
import MapSection from "../../components/publicpage/mapSection";
import ScheduleSection from "../../components/publicpage/scheduleSection";

const imageList = [image1, image2, image3, image4];

const TermsAndPrivacy = () => {
  return (
    <>
      <Gallery images={imageList} />

      <div className="font-sans leading-relaxed p-5">
        <div className="max-w-[90%] mx-auto">

          {/* Terms and Conditions */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">
            📜 Terms and Conditions — New Friends Club
          </h2>
          <p className="italic text-gray-600 mb-4">Effective Date: 1st April 2025</p>

          <p><strong>1. Acceptance of Terms</strong></p>
          <p>
            By registering, accessing, or using New Friends Club, you agree to these Terms, our Privacy Policy, and all applicable laws. If you do not agree, do not use our services.
          </p>

          <p className="mt-4"><strong>2. Eligibility</strong></p>
          <p>
            You must be at least 18 years old to use our website and services. By using the Site, you affirm that you meet this requirement.
          </p>

          <p className="mt-4"><strong>3. User Accounts</strong></p>
          <p>
            You are responsible for maintaining the confidentiality of your account and password.
            You agree to provide accurate and up-to-date information. We reserve the right to suspend or terminate accounts that violate our policies.
          </p>

          <p className="mt-4"><strong>4. Community Guidelines</strong></p>
          <ul className="list-disc ml-5">
            <li>Be respectful and inclusive.</li>
            <li>No harassment, hate speech, or illegal content.</li>
            <li>No spamming, advertising, or solicitation.</li>
          </ul>
          <p>We reserve the right to remove any content or terminate users who violate these guidelines.</p>

          <p className="mt-4"><strong>5. Intellectual Property</strong></p>
          <p>
            All content, trademarks, logos, and design elements are the property of New Friends Club or its licensors and protected by copyright laws. You may not copy, distribute, or exploit any part of the Site without permission.
          </p>

          <p className="mt-4"><strong>6. Disclaimers</strong></p>
          <p>
            New Friends Club provides a platform for making new friends but does not guarantee relationships, safety, or accuracy of user information. Users are responsible for their interactions with others.
          </p>

          <p className="mt-4"><strong>7. Limitation of Liability</strong></p>
          <p>
            New Friends Club is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the Site.
          </p>

          <p className="mt-4"><strong>8. Changes to Terms</strong></p>
          <p>
            We may modify these Terms at any time. Continued use of the Site after changes constitutes your acceptance of the updated Terms.
          </p>

          <p className="mt-4"><strong>9. Governing Law</strong></p>
          <p>
            These Terms are governed by the laws of India, without regard to conflict of law principles.
          </p>

          {/* Privacy Policy */}
          <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-5">
            🔒 Privacy Policy — New Friends Club
          </h2>
          <p className="italic text-gray-600 mb-4">Effective Date: 1st April 2025</p>

          <p><strong>1. Information We Collect</strong></p>
          <ul className="list-disc ml-5">
            <li><strong>Personal Information:</strong> Name, email, age, location, and profile details.</li>
            <li><strong>Usage Data:</strong> IP address, browser type, time spent on the site, and pages visited.</li>
            <li><strong>Cookies:</strong> To enhance site functionality and personalize content.</li>
          </ul>

          <p className="mt-4"><strong>2. How We Use Your Information</strong></p>
          <ul className="list-disc ml-5">
            <li>To create and manage your account.</li>
            <li>To connect you with other users.</li>
            <li>To improve our website and user experience.</li>
            <li>To send relevant updates or offers (only with your consent).</li>
          </ul>

          <p className="mt-4"><strong>3. Sharing of Information</strong></p>
          <p>
            We do not sell or rent your personal data. We may share your information:
          </p>
          <ul className="list-disc ml-5">
            <li>With service providers (e.g., hosting or analytics tools).</li>
            <li>If required by law or to protect our legal rights.</li>
          </ul>

          <p className="mt-4"><strong>4. Your Rights</strong></p>
          <ul className="list-disc ml-5">
            <li>Access, update, or delete your personal data.</li>
            <li>Opt-out of marketing communications.</li>
            <li>Request data portability or restrict processing.</li>
          </ul>
          <p>
            You can manage your privacy settings through your account dashboard or by contacting us.
          </p>

          <p className="mt-4"><strong>5. Data Security</strong></p>
          <p>
            We use encryption and other security measures to protect your information. However, no method of transmission over the internet is 100% secure.
          </p>

          <p className="mt-4"><strong>6. Third-Party Links</strong></p>
          <p>
            Our site may link to other websites. We are not responsible for their privacy practices.
          </p>

          <p className="mt-4"><strong>7. Children’s Privacy</strong></p>
          <p>
            Our services are not intended for anyone under 18. We do not knowingly collect data from children.
          </p>

          <p className="mt-4"><strong>8. Changes to This Policy</strong></p>
          <p>
            We may update this Privacy Policy. Significant changes will be notified via email or website notice.
          </p>

          <p className="mt-4"><strong>9. Contact Us</strong></p>
          <p>
            For questions or concerns about your privacy, please contact us at: <a href="mailto:info@newfriendsclub.in" className="text-blue-600 underline">info@newfriendsclub.in</a>
          </p>
        </div>
      </div>

      <ScheduleSection />
      <MapSection />
    </>
  );
};

export default TermsAndPrivacy;