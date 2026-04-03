import img1 from "../assets/hero1.png";
import img2 from "../assets/img2 (2).png";
import img3 from "../assets/img3 (2).png";

export default function Activities() {
  const data = [
    {
      img: img1,
      date: "MARCH 2026 • PRESS NOTE",
      title:
        "Charter submitted to the Governor of Goa and Chief Minister",
    },
    {
      img: img2,
      date: "MARCH 2026 • MEDIA",
      title:
        "Hundreds gather at rally demanding repeal of TCP Act amendments",
    },
    {
      img: img3,
      date: "FEB 2026 • APPEAL",
      title:
        "Open letter to Prime Minister on Goa’s hill-cutting crisis",
    },
  ];

  return (
    <section className="bg-[#eae6df] py-24 px-6 md:px-24">


      <p className="text-center text-xs tracking-widest text-gray-600 uppercase mb-4">
        Latest Updates
      </p>


      <h2 className="text-center text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
        OUR LATEST ACTIVITIES
      </h2>


      <div className="grid md:grid-cols-3 gap-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="group cursor-pointer"
          >

            <div className="overflow-hidden">
              <img
                src={item.img}
                alt="activity"
                className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-500"
              />
            </div>


            <div className="mt-4">
              <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">
                {item.date}
              </p>

              <h3 className="text-lg font-semibold leading-snug group-hover:underline">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      
      <div className="text-center mt-16">
        <button className="border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition">
          View All News
        </button>
      </div>
    </section>
  );
}