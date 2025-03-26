import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface TimelineSectionProps {
  isAtHeroSection: boolean;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({
  isAtHeroSection,
}) => {
  const timelineData = [
    {
      year: "2020",
      title: "Started Learning Programming",
      description:
        "Began my journey into the world of programming with online courses. I started with basic HTML, CSS, and JavaScript, and gradually moved on to more complex topics. I spent countless hours practicing and building small projects to solidify my understanding.",
    },
    {
      year: "2021",
      title: "First Project",
      description:
        "Developed my first web application using HTML, CSS, and JavaScript. This project was a simple to-do list app that allowed users to add, edit, and delete tasks. It was a great learning experience and helped me understand the basics of web development.",
    },
    {
      year: "2022",
      title: "Learned React",
      description:
        "Dived into React.js and built several projects to enhance my skills. I created a weather app, a movie search app, and a personal blog. Each project taught me something new about React and helped me become more comfortable with the library.",
    },
    {
      year: "2023",
      title: "Portfolio Launch",
      description:
        "Launched my personal portfolio website to showcase my work. The portfolio includes all the projects I have worked on, along with detailed descriptions and links to the live versions and source code. It also features a blog where I share my thoughts on various programming topics.",
    },
  ];

  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAtHeroSection) {
      const items = timelineRef.current?.querySelectorAll(".timeline-item");
      items?.forEach((item) => item.classList.remove("in-view"));
    }
  }, [isAtHeroSection]);

  useEffect(() => {
    const observerTimeline = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            // entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 1.0 }
    );

    const items = timelineRef.current?.querySelectorAll(".timeline-item");
    items?.forEach((item) => observerTimeline.observe(item));

    return () => {
      items?.forEach((item) => observerTimeline.unobserve(item));
    };
  }, []);

  return (
    <div className="timeline-section pt-5">
      <div className="container">
        <h2 className="headline text-center mb-5">My Journey</h2>
        <div className="" ref={timelineRef}>
          {timelineData.map((item, index) => (
            <div className="row" key={index}>
              <div className="timeline-year position-relative col-3 text-end pe-5 border-end border-1">
                {/* <h5>
                  <span className="badge text-bg-dark">{item.year}</span>
                </h5> */}
                <div
                  className="timeline-circle position-absolute bg-white rounded-circle text-center text-dark d-flex align-items-center justify-content-center border border-muted"
                  style={{
                    width: "50px",
                    height: "50px",
                    top: "0%",
                    left: "calc(100% - 25px)",
                    transform: "translateY(-0%)",
                  }}
                >
                  {item.year}
                </div>
              </div>
              <div
                className="timeline-item card col-9 ms-5 mb-5"
                style={{ maxWidth: "600px" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
