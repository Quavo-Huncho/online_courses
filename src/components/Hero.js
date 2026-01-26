export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Learn Skills That <span className="text-sky-400">Change Your Future</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
          High-quality online courses designed to help you grow, build real projects,
          and become job-ready.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/courses"
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Browse Courses
          </a>

          <a
            href="/about"
            className="border border-slate-400 hover:border-white px-8 py-3 rounded-lg transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
