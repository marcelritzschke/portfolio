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
      year: "2012",
      image: "masterthesis.png",
      subtitle: "Leipzig, Germany",
      title: "University of Leipzig",
      description:
        "Studied <strong>physics</strong>, earning a bachelor's and <strong>master's degree</strong> with a focus on semiconductor physics. Along the way, I discovered my passion for software engineering.",
    },
    {
      year: "2017",
      image: "efs.png",
      subtitle: "Ingolstadt, Germany",
      title: "e:fs TechHub GmbH",
      description:
        "Worked on HAF software engineering for an <strong>L4 parking</strong> function. Designed and optimized the <strong>trajectory & path planner</strong> module, leveraging CUDA parallelization and overseeing its architecture.",
    },
    {
      year: "2021",
      image: "cariad.png",
      subtitle: "Beijing, China",
      title: "CARIAD China",
      description:
        "Contributed to system engineering for the <strong>E3 2.0 vehicle architecture</strong>. Worked on <strong>AI.SDK</strong> development, shaping VW Group's next-generation operating system.",
    },
    {
      year: "2022",
      image: "mb.png",
      subtitle: "Beijing, China",
      title: "Mercedes-Benz China",
      description:
        "Worked on <strong>Gen5 L2+</strong> system adaption specifically for China market. Designed and implemented <strong>ODD and path planning</strong>, focusing on nationwide coverage for ramps and interchanges. Additionally, set up a mini HiL + SiL environment for UI/UX testing.",
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
      { threshold: 0.8 }
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
                className="timeline-item card col-9 ms-5 mb-5 m-0 p-0"
                style={{ maxWidth: "600px" }}
              >
                <img
                  className="card-img-top w-100"
                  src={item.image}
                  alt="Card image cap"
                  style={{ height: "200px", objectFit: "cover" }} // Adjust height as needed
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {item.subtitle}
                  </h6>
                  <p
                    className="card-text mt-3"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>
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
