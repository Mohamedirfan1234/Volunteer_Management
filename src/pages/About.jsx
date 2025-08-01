// src/pages/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="text-primary">About Us 💡</h2>
        <p className="lead">
          Empowering communities through organized volunteering!
        </p>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <img
            src="https://uploads-ssl.webflow.com/5fd78b8937945a70a38caed1/62d98c6914a4a0f2b79baa68_1-p-1080.png"
            alt="Volunteering"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <p>
            Our platform connects passionate individuals with opportunities to
            make a real difference. Whether it's organizing clean-up drives,
            teaching children, or aiding disaster relief, we believe in
            community-powered change.
          </p>
          <p>
            With an easy-to-use interface, real-time event tracking, and secure
            signups, we aim to make volunteering impactful and hassle-free.
          </p>
          <p>
            <strong>Join us and be the change you want to see. 🌱</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
