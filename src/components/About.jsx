import { useEffect, useRef, useState } from "react";
import aboutBg from "../assets/slogan.png";
import authorImg from "../assets/author.png";

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
      }
    );

    const current = sectionRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 px-6 md:px-24 overflow-hidden"
    >

      <div className="absolute inset-0 z-0">
        <img
          src={aboutBg}
          alt="background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>


      <div className="absolute inset-0 bg-[#f5f1e8]/90 z-0"></div>
      <h2
        className={`text-4xl md:text-5xl font-extrabold mb-16 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        ABOUT US
      </h2>
      {/* CONTENT */}
      <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

        {/* TEXT (fade from right) */}
        <div
          className={`transition-all duration-1000 ease-out ${visible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-16"
            }`}
        >
          <h2 className="text-6xl font-bold mb-10 leading-tight text-yellow-500">
            This is not a campaign. <br />
            This is a stand.
          </h2>

          <p className="text-black text-lg mb-6">
            “Enough is Enough” is a people’s movement against reckless
            development and environmental destruction in Goa.
          </p>

          <p className="text-black leading-relaxed">
            Led by Justice Ferdino Rebello, it brings together citizens,
            activists, and communities who believe that growth must not come
            at the cost of identity, ecology, and future generations.
          </p>
        </div>


        <div
          className={`transition-all duration-1000 ease-out ${visible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-16"
            }`}
        >
          <img
            src={authorImg}
            alt="author"
            className="w-full h-[420px] object-cover rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}