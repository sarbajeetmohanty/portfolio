import "./styles/Work.css";

const reels = [
  {
    reelUrl: "https://www.instagram.com/reel/DU1IwGbCHRL/",
  },
  {
    reelUrl: "https://www.instagram.com/reel/C5tCZQ9pC1G/",
  },
  {
    reelUrl: "https://www.instagram.com/reel/DVl_IIyClmH/",
  },
];

function buildInstagramEmbedUrl(reelUrl: string) {
  try {
    const parsed = new URL(reelUrl);
    const match = parsed.pathname.match(/\/(?:reel|reels|p)\/([^/?#]+)/i);
    if (!match?.[1]) return reelUrl;
    return `https://www.instagram.com/reel/${match[1]}/embed`;
  } catch {
    return reelUrl;
  }
}

const Work = () => {
  return (
    <div className="work-section section-container" id="work">
      <div className="work-container">
        <h2>
          Edited <span>Reels</span>
        </h2>
        <p className="work-swipe-hint">Swipe sideways to browse reels</p>
        <div className="work-grid">
          {reels.map((reel, index) => (
            <article className="work-card" key={reel.reelUrl}>
              <div className="work-video-wrap">
                <iframe
                  src={buildInstagramEmbedUrl(reel.reelUrl)}
                  title={`Instagram Reel ${index + 1}`}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  className="work-video"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
