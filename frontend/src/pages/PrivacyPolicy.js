import React from 'react';
import '../styles/PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="privacy-policy-page">
      <h2>PRIVACY POLICY</h2>
      <p>At Margem Techno, we care deeply about your privacy and the security of your personal data. Whether you're browsing our platform, sharing content, or attending our events, we want you to feel safe and informed.</p>

      <h3>What We Collect</h3>
      <ul>
        <li>Basic contact details (e.g. name, email) when you sign up or get in touch</li>
        <li>Content you share (photos, videos, comments)</li>
        <li>Usage data (like page visits or interactions) via cookies and analytics</li>
      </ul>

      <h3>Why We Collect It</h3>
      <ul>
        <li>To operate and improve the platform</li>
        <li>To communicate with our community about events, features and updates</li>
        <li>To ensure safety, moderation, and respect within the community</li>
      </ul>

      <h3>How We Store & Protect Your Data</h3>
      <p>Your data is stored securely using industry-standard systems. We do not sell your information to third parties. We only share data when necessary to provide our services, or when legally required.</p>

      <h3>Your Rights</h3>
      <p>You have the right to access, edit or delete your personal information at any time. Just contact us at <a href="mailto:margem.techno@gmail.com">margem.techno@gmail.com</a> and we’ll help you out.</p>

      <h3>Third-Party Services</h3>
      <p>We may use trusted third-party tools (like analytics or event ticketing) which have their own privacy policies. We choose services carefully and only work with those who respect your data.</p>

      <h3>Updates</h3>
      <p>This policy may be updated occasionally. We’ll notify you if we make significant changes, and your continued use of the platform means you agree with the latest version.</p>
    </div>
  );
}

export default PrivacyPolicy;
