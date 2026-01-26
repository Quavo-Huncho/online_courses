export default function HomePage() {
  return (
    <section className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">
        Learn Skills That Matter
      </h1>

      <p className="text-gray-400 max-w-xl mx-auto">
        Join thousands of learners and gain practical skills through
        structured online courses.
      </p>

      <div className="mt-8">
        <a
          href="/courses"
          className="bg-white text-black px-6 py-2 rounded"
        >
          Browse Courses
        </a>
      </div>
    </section>
  );
}
