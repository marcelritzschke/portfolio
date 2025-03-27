import React, { SetStateAction, useEffect, useRef } from "react";

interface HeroSectionProps {
  setIsAtHeroSection: React.Dispatch<SetStateAction<any>>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setIsAtHeroSection }) => {
  const heroSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerHeroSection = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAtHeroSection(true);
          } else {
            setIsAtHeroSection(false);
          }
        });
      },
      { threshold: 0.8 }
    );
    const heroSection = heroSectionRef.current?.querySelector(".hero-section");
    if (heroSection) observerHeroSection.observe(heroSection);

    return () => {
      if (heroSection) observerHeroSection.unobserve(heroSection);
    };
  }, []);

  return (
    <div ref={heroSectionRef}>
      <div className="hero-section vh-100 bg-dark text-white">
        <div className="container h-100 d-flex flex-column">
          <div className="row flex-grow-1 d-flex justify-content-center align-items-center">
            {/* Upper Section */}
            <div className="col-auto text-start">
              <h1 className="greeting">Hello, I'm Marcel 👋</h1>
              <p className="bio">
                Mercedes-Benz China, Software Engineer, Welcome!
              </p>
            </div>
            <div className="col-auto text-start">
              <img
                src="headshot.jpg"
                alt="Profile"
                className="profile-picture"
                style={{
                  borderRadius: "50%",
                  marginTop: "20px",
                  width: "200px",
                }}
              />
            </div>
          </div>
          {/* <div className="flex-grow-1"></div> */}
          <div className="row mb-3">
            {/* Icons Section */}
            <div className="col d-flex justify-content-center">
              <a
                href="weixin://contacts/profile/senzendhartha"
                className="icon-hover text-white mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-wechat" style={{ fontSize: "2rem" }}></i>
              </a>
              <a
                href="https://cn.linkedin.com/in/marcel-ritzschke-a953a41a0"
                className="icon-hover text-white mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-linkedin" style={{ fontSize: "2rem" }}></i>
              </a>
              <a
                href="https://github.com/marcelritzschke"
                className="icon-hover text-white mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-github" style={{ fontSize: "2rem" }}></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
