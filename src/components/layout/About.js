import React from "react";

function About() {
  return (
    <div className="about">
      <div className="inner_about">
        <h1>MEDVISION</h1>
        <div className="about_div">
          <p>
            MEDVISION is India’s largest comprehensive diagnostic network with
            over 65 state-of-the-art centers spread across 10 cities. Vijaya
            Diagnostic Centre has a qualified team of over 1800 professionals
            consisting of some of the country’s top radiologists, pathologists
            and healthcare professionals. This has enabled oriented diagnostic
            services that help us in establishing trust and reliability with our
            patients
          </p>
          <img src="/img/lab.jpg" alt="testing in lab"></img>
        </div>
      </div>
      <div className="inner_about">
        <h1>Why Medvision</h1>
        <div className="about_div">
          <p>
            With a vision of providing comprehensive, innovative and
            state-of-the-art diagnostic services under one roof, in a reliable,
            affordable and customer-centric manner, Dr. S. Surender Reddy
            founded Vijaya Diagnostic Centre in 1981. In the past 4 decades,
            Vijaya Diagnostic Centre has constantly worked towards providing
            excellent quality throughout all its centers and has been the
            pioneer in using the latest technological trends to deliver
            best-in-class healthcare to its patients. Today, Vijaya Diagnostic
            Centre has expanded to over 52 Centers in Hyderabad, in addition to
            other branches in Warangal, Hanamkonda, Nizamabad, Kurnool, Nellore,
            Visakhapatnam, Kolkata and Gurgaon.
          </p>
          <img src="/img/whymed.jpg" alt="nurse treating"></img>
        </div>
      </div>
    </div>
  );
}

export default About;
