import LeadForm from "@/components/LeadForm";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-8 text-white overflow-hidden">
        {/* Background with overlay */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(rgba(139, 0, 0, 0.8), rgba(60, 0, 0, 0.9)),
              url('https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1600') center/cover`,
          }}
        />

        <div className="max-w-3xl z-10">
          <div className="inline-block border-2 border-white/40 px-6 py-2 font-oswald text-sm tracking-[0.2em] uppercase mb-6">
            Authentic Smoked BBQ
          </div>
          <h1 className="font-oswald text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-wide leading-tight mb-4 drop-shadow-lg">
            Just Like Dad&apos;s
            <span className="block text-[0.5em] font-medium tracking-[0.15em] opacity-90">
              Barbecue Catering
            </span>
          </h1>
          <p className="text-xl mb-10 opacity-90 max-w-lg mx-auto">
            Low and slow. The way it&apos;s meant to be. Catering for events that matter.
          </p>
          <a
            href="#booking"
            className="inline-block bg-white text-[#8b0000] px-10 py-4 font-oswald text-xl font-bold uppercase tracking-wider hover:bg-[#ffd700] hover:scale-105 transition-all"
          >
            Book Your Event
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm tracking-[0.15em] uppercase opacity-70">
          <span>Scroll to explore</span>
          <span className="block text-center mt-2 text-xl animate-bounce-slow">↓</span>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-oswald text-4xl font-bold uppercase text-[#8b0000] mb-2">
              We Bring the Smoke
            </h2>
            <p className="text-gray-600 text-lg">Full-service catering for any size event</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon="🍖"
              title="Backyard Parties"
              description="Birthday bashes, family reunions, neighborhood cookouts—we've got you covered with real pit-smoked barbecue."
            />
            <ServiceCard
              icon="🤝"
              title="Corporate Events"
              description="Impress clients, reward your team, or celebrate company milestones with food they won't forget."
            />
            <ServiceCard
              icon="💍"
              title="Weddings & More"
              description="Rehearsal dinners, receptions, and celebrations. Let us handle the food so you can enjoy the moment."
            />
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 px-8 bg-[#8b0000] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-oswald text-4xl font-bold uppercase mb-2">
              Get a Free Quote
            </h2>
            <p className="text-white/80 text-lg">
              Tell us about your event and we&apos;ll be in touch within 24 hours
            </p>
          </div>

          <LeadForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8">
        <p className="font-oswald text-xl uppercase tracking-wider text-[#8b0000] mb-1">
          Just Like Dad&apos;s Barbecue
        </p>
        <p>&copy; {new Date().getFullYear()} &bull; Slow Smoked. Family Made.</p>
      </footer>
    </>
  );
}

function ServiceCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white border-b-4 border-[#8b0000] p-8 hover:-translate-y-1 hover:shadow-xl transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-oswald text-xl font-bold uppercase text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
