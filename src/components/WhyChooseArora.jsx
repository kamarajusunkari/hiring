import React from 'react';
import '../styles/whyChooseArora.css';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_072701_f6a01abb-eb30-4559-9d6e-774362defbc3.mp4';

export default function WhyChooseArora() {
  return (
    <section
      id="why-choose-us"
      className="why-arora-section"
      aria-labelledby="why-arora-heading"
    >
      <div className="why-arora-wrapper">
        <h2 id="why-arora-heading" className="why-arora-heading">
          Why Choose Arora
        </h2>

        <div className="why-arora-grid">
          {/* Card 1: Text Card (Left) */}
          <div className="why-arora-card why-arora-card-pad">
            <div className="why-arora-blob-left" aria-hidden="true" />
            <div className="why-arora-card-content">
              <h3 className="why-arora-card-title">
                Pre-Vetted Talent
                <br />
                Matched in 48 Hours
              </h3>
              <p className="why-arora-card-body-mid">
                Every Arora engineer passes deep architectural evaluations, live refactoring reviews, and communication vetting so your team ships from day one.
              </p>
            </div>
          </div>

          {/* Card 2: Video Card (Center) */}
          <div className="why-arora-card why-arora-video-card">
            <div className="why-arora-video-wrap">
              <video
                className="why-arora-video"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={VIDEO_URL} type="video/mp4" />
              </video>
              <div className="why-arora-video-fade" aria-hidden="true" />
            </div>

            <div className="why-arora-video-footer">
              <h3 className="why-arora-card-title why-arora-video-title">
                Flexible Models &amp;
                <br />
                Global Timezone Sync
              </h3>
            </div>
          </div>

          {/* Card 3: Text Card (Right) */}
          <div className="why-arora-card why-arora-card-pad">
            <div className="why-arora-blob-right" aria-hidden="true" />
            <div className="why-arora-card-content">
              <h3 className="why-arora-card-title">
                100% IP Ownership
                <br />
                Zero Agency Lock-In
              </h3>
              <p className="why-arora-card-body-bottom">
                Scale hourly, weekly, or monthly with transparent quote-based pricing, strict NDA protection, and full ownership of every commit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
