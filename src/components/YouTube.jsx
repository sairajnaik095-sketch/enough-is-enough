import { useEffect, useState, useRef } from "react";

export default function YouTube() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);


  useEffect(() => {
    fetch(
      "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=Enough%20is%20Enough%20Goa%20Justice%20Rebello&type=video&key=AIzaSyAA5uROMufA1d4WQ2EaX6IxePnivfpPmAY"
    )
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="bg-[#f5f1e8] text-black py-24 px-6 md:px-24"
    >
      {/* Heading */}
      <h2
        className={`text-4xl md:text-5xl font-extrabold mb-16 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        VOICE THAT MATTERS
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading videos...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          {videos.map((video, index) => {
            const videoId = video.id.videoId;
            const thumbnail = video.snippet.thumbnails.high.url;

            return (
              <div
                key={index}
                onMouseEnter={() => setActiveVideo(videoId)}
                onMouseLeave={() => setActiveVideo(null)}
                className={`group rounded-xl overflow-hidden border border-black/10 bg-white transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* VIDEO / THUMBNAIL */}
                {activeVideo === videoId ? (
                  <iframe
                    className="w-full h-56"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0`}
                    title="video"
                    allow="autoplay"
                  />
                ) : (
                  <div className="relative">
                    <img
                      src={thumbnail}
                      alt="thumbnail"
                      className="w-full h-56 object-cover transition duration-500 group-hover:scale-110 group-hover:blur-[1px]"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition"></div>

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition">
                        ▶ Play
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold group-hover:text-red-500 transition line-clamp-2">
                    {video.snippet.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(video.snippet.publishedAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}