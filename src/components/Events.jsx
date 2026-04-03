import { useEffect, useState, useRef } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // 🔥 Scroll animation (re-trigger every scroll)
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

  // 🔥 Fetch events
  useEffect(() => {
    fetch(
      "https://www.googleapis.com/calendar/v3/calendars/sairajnaik095@gmail.com/events?key=AIzaSyBghcm47-8Bp_GVY1KiEX-rCI7virngLi0"
    )
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 🔥 FILTER + SORT EVENTS
  const filteredEvents = [...events]
    .filter((event) => {
      const eventDate = new Date(
        event.start?.dateTime || event.start?.date
      );
      return eventDate >= new Date(); // only future events
    })
    .sort((a, b) => {
      const dateA = new Date(a.start?.dateTime || a.start?.date);
      const dateB = new Date(b.start?.dateTime || b.start?.date);
      return dateA - dateB; // ascending
    });

  return (
    <section
      id="events"
      ref={sectionRef}
      className="bg-[#f5f1e8] text-black py-24 px-6 md:px-24"
    >
      {/* Label */}
      <p className="text-xs tracking-widest text-gray-500 mb-2">
        GET INVOLVED
      </p>

      {/* Heading */}
      <div className="flex justify-between items-center mb-10">
        <h2
          className={`text-4xl md:text-5xl font-extrabold tracking-tight transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          UPCOMING EVENTS
        </h2>

        <button className="border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition">
          View All Events
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-black/20 mb-6"></div>

      {/* Events */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filteredEvents.length === 0 ? (
        <p className="text-gray-500">No upcoming events</p>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event, index) => {
            const title =
              event.summary && event.summary.trim() !== ""
                ? event.summary
                : "Untitled Event";

            const description =
              event.description && event.description.trim() !== ""
                ? event.description
                : "No description available";

            const dateObj = new Date(
              event.start?.dateTime || event.start?.date
            );

            const day = dateObj.toLocaleString("en-IN", {
              day: "2-digit",
            });

            const month = dateObj.toLocaleString("en-IN", {
              month: "short",
            });

            const time = dateObj.toLocaleString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row md:items-center md:justify-between border border-black/20 px-4 py-5 transition-all duration-500 hover:bg-black/5 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* LEFT */}
                <div className="flex gap-4">
                  {/* Date Box */}
                  <div className="bg-yellow-400 text-black w-16 h-16 flex flex-col items-center justify-center font-bold shrink-0">
                    <span className="text-lg">{day}</span>
                    <span className="text-xs uppercase">{month}</span>
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="font-semibold text-lg">{title}</h3>

                    <p className="text-sm text-gray-600 mt-1">
                      {time}
                    </p>

                    <p className="text-sm text-gray-700 mt-2 max-w-md line-clamp-2 hover:line-clamp-none transition">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <a
                  href={event.htmlLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 md:mt-0 border border-black px-4 py-2 text-sm hover:bg-black hover:text-white transition"
                >
                  Details →
                </a>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}