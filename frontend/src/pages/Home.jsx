import React from "react";

const Home = () => {
  return (
    <main className="bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* ============================================= */}
      {/* Hero Section */}
      {/* ============================================= */}
      <section className="text-center py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
          Stop Searching. Start Learning.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Track thousands of online courses from top platforms and never miss a
          deal. Your all-in-one hub for upskilling.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#start"
            className="inline-block bg-cyan-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-cyan-600 dark:bg-teal-400 dark:hover:bg-teal-500 transform hover:-translate-y-1 transition-all duration-300"
          >
            Start Tracking for Free
          </a>
        </div>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          No credit card required. Free forever.
        </p>

        <div className="mt-12 flex justify-center items-center gap-6 sm:gap-12 flex-wrap grayscale opacity-80">
          {["Coursera", "Udemy", "edX", "upGrad", "NPTEL"].map((brand) => (
            <span
              key={brand}
              className="font-semibold text-lg text-slate-500 dark:text-slate-400"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* ============================================= */}
      {/* How It Works Section */}
      {/* ============================================= */}
      <section className="py-16 bg-white dark:bg-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl sm:text-4xl font-bold mb-12">
            How It Works in 3 Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "🔍",
                title: "1. Find Your Course",
                desc: "Search our library of 200,000+ courses or browse expert-curated lists by subject.",
              },
              {
                icon: "📌",
                title: "2. Add to Watchlist",
                desc: "Add courses to your dashboard with one click to monitor them.",
              },
              {
                icon: "🔔",
                title: "3. Get Notified",
                desc: "Get instant alerts when prices drop or new top-rated courses appear.",
              },
            ].map((step, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <div className="text-4xl sm:text-5xl mb-4">{step.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* Features Section */}
      {/* ============================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl sm:text-4xl font-bold mb-12">
            A Smarter Way to Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "💰 Price Drop Alerts",
                desc: "Save thousands on your education. Get notified of discounts up to 90% off.",
              },
              {
                title: "📊 All-in-One Dashboard",
                desc: "Organize and compare all your learning interests in one place.",
              },
              {
                title: "🚀 New Course Discovery",
                desc: "Be the first to know about the newest high-rated courses.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* Social Proof Section */}
      {/* ============================================= */}
      <section className="py-16 bg-slate-800 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl sm:text-4xl font-bold mb-12">
            Trusted by Over 50,000 Learners in India
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                quote:
                  'Course Monitor Hub is a game-changer! I got an alert when a Python course dropped from ₹3,499 to ₹499. Instantly bought it!',
                name: "Priya R., Software Engineer, Bengaluru",
              },
              {
                quote:
                  "As a student, finding the right digital marketing course within budget was tough. This platform made it so easy.",
                name: "Aman S., BBA Student, Delhi",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-slate-700/50 p-6 sm:p-8 rounded-2xl flex flex-col"
              >
                <blockquote className="text-sm sm:text-lg italic text-slate-300 flex-grow border-l-4 border-cyan-500 dark:border-teal-400 pl-4 sm:pl-6">
                  "{testimonial.quote}"
                </blockquote>
                <cite className="mt-4 sm:mt-6 font-bold not-italic text-slate-200 text-sm sm:text-base">
                  – {testimonial.name}
                </cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* Final CTA Section */}
      {/* ============================================= */}
      <section
        id="start"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-bold">
            Ready to Unlock Your Potential?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Sign up in 30 seconds. Start building your skills and saving money
            today.
          </p>
          <a
            href="signup"
            className="mt-8 inline-block bg-cyan-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-cyan-600 dark:bg-teal-400 dark:hover:bg-teal-500 transform hover:-translate-y-1 transition-all duration-300"
          >
            Create Your Free Account
          </a>
        </div>
      </section>
    </main>
  );
};

export default Home;
