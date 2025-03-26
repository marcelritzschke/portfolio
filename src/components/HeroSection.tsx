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
          <div className="row align-items-center mt-5">
            <div className="col-md-6 text-end">
              <h1 className="greeting">Hello, I'm Marcel 👋</h1>
              <p className="bio">
                Software Engineer at Mercedes-Benz. Welcome!
              </p>
            </div>
            <div className="col-md-6 text-start">
              <img
                src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                alt="Profile"
                className="profile-picture"
                style={{ borderRadius: "50%", marginTop: "20px" }}
              />
            </div>
          </div>
          <div className="flex-grow-1"></div>
          <div className="row mb-3">
            <div className="col d-flex justify-content-center">
              <a
                href="https://wechat.com"
                className="text-white mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-wechat" style={{ fontSize: "2rem" }}></i>
              </a>
              <a
                href="https://linkedin.com"
                className="text-white mx-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-linkedin" style={{ fontSize: "2rem" }}></i>
              </a>
              <a
                href="https://github.com"
                className="text-white mx-3"
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
