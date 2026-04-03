import { useState, useEffect, useRef } from "react";
import bg from "../assets/contact-bg.png";


export default function Contact() {
  const formRef = useRef(null);
const [visible, setVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
      } else {
        setVisible(false); // 👈 RESET when out of view
      }
    },
    { threshold: 0.3 }
  );

  if (formRef.current) {
    observer.observe(formRef.current);
  }

  return () => {
    if (formRef.current) observer.unobserve(formRef.current);
  };
}, []);


  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const formData = new FormData(e.target);
    formData.append("access_key", "bda53429-1124-4fa1-a5de-50ef0c456dcf");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setStatus("Subscribed successfully ✅");
      e.target.reset();
    } else {
      setStatus("Something went wrong ❌");
    }
  };

  return (
    <>
      {/* MAIN CONTACT SECTION */}
      <section
        id="contact"
        className="relative w-full h-[650px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* FORM CONTAINER */}
        <div className="relative w-full max-w-6xl mx-auto px-6 md:px-20 flex justify-end">
<div
  ref={formRef}
  className={`bg-[#1b1a16] text-white p-8 md:p-10 w-full md:w-[520px] shadow-2xl 
  transition-all duration-700
  ${visible ? "opacity-100 translate-y-0 animate-fadeUp" : "opacity-0 translate-y-16"}`}
>

            {/* SMALL TEXT */}
            <p className="text-xs tracking-widest text-gray-400 mb-2">
              STAY CONNECTED
            </p>

            {/* HEADING */}
            <h2 className="text-3xl font-bold mb-4">
              JOIN OUR COMMUNITY
            </h2>

            {/* DESC */}
            <p className="text-gray-400 text-sm mb-6">
              Be part of the movement. Get updates on campaigns,
              events, and actions across Goa’s talukas.
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

              
              <input
                type="text"
                name="name"
                placeholder="Full Name*"
                required
                className="w-full bg-[#2a2925] p-3 text-sm outline-none"
              />

              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="phone"
                  placeholder="Telephone Number*"
                  required
                  className="bg-[#2a2925] p-3 text-sm outline-none"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="bg-[#2a2925] p-3 text-sm outline-none"
                />
              </div>

              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="taluka"
                  placeholder="Taluka*"
                  required
                  className="bg-[#2a2925] p-3 text-sm outline-none"
                />

                <input
                  type="text"
                  name="village"
                  placeholder="Village/Town*"
                  required
                  className="bg-[#2a2925] p-3 text-sm outline-none"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="bg-yellow-400 text-black px-6 py-2 font-semibold hover:scale-105 transition"
              >
                Subscribe
              </button>

              {/* STATUS */}
              {status && (
                <p className="text-sm text-gray-400 mt-2">{status}</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* BOTTOM STRIP */}
      <div className="bg-[#f5f1e8] text-black py-4 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center text-sm">
        <h3 className="font-bold italic text-lg">
          ENOUGH IS ENOUGH
        </h3>

        <p className="text-gray-600">
          📍 Panjim, Goa
        </p>

        <p className="text-gray-600">
          📞 +91 9898989898
        </p>
      </div>
    </>
  );
}