import heroMain from "../assets/hero1.png";
import heroSide from "../assets/hero2.png";
import slogan from "../assets/slogan.png"; // 🔥 your combined ENOUGH IS ENOUGH image

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-[#f5f1e8] px-6 md:px-20 py-16 overflow-hidden">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div>

          <p className="text-xs tracking-widest text-gray-500 mb-6">
            GOENCHE PORJECHI MAGNIM — CITIZENS’ CHARTER
          </p>


          <img
            src={slogan}
            alt="Enough is Enough"
            className="w-full max-w-[600px] object-contain"
          />

          <div className="mt-10 flex gap-4">
            <button className="bg-yellow-400 px-6 py-3 font-semibold hover:scale-105 transition">
              Read The Charter
            </button>

            <button className="border border-black px-6 py-3 hover:bg-black hover:text-white transition">
              Join Us
            </button>
          </div>
        </div>

        <div className="relative">

          <img
            src={heroMain}
            alt="main"
            className="w-full h-[320px] md:h-[420px] object-cover"
          />


          <img
            src={heroSide}
            alt="side"
            className="absolute -right-6 md:-right-10 bottom-[-30px] w-[140px] md:w-[180px] border-4 border-[#f5f1e8]"
          />
        </div>

      </div>
    </section>
  );
}