import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Editing <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance Video Editor</h4>
                <h5>Personal Brand Projects</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Started editing short-form videos for creators and local
              businesses with a focus on clean pacing and retention-driven
              storytelling.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Social Reel Specialist</h4>
                <h5>Instagram & YouTube Shorts</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Scaled output with repeatable reel formats, caption workflows,
              and faster revision rounds for recurring client content.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Creative Editing Partner</h4>
                <h5>Brand & Creator Collaborations</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Delivering platform-native edits for ads, reels, and promotional
              content that look cinematic and perform on social feeds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
