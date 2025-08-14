import React, { useEffect, useState } from "react";

const CourseCard = ({ course }) => (
  <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 flex flex-col overflow-hidden">
    <a href={course.url} target="_blank" rel="noopener noreferrer" className="block">
      <img
        src={course.image || "https://via.placeholder.com/400x225?text=No+Image"}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
    </a>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2">
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-600 dark:hover:text-cyan-400"
        >
          {course.title}
        </a>
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3 flex-grow">
        {course.description || "No description available."}
      </p>
      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <a
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cyan-600 dark:bg-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-cyan-700 dark:hover:bg-cyan-400 transition"
        >
          View Course
        </a>
      </div>
    </div>
  </article>
);

function Courses() {
  const [search, setSearch] = useState("");
  const [coursesByPlatform, setCoursesByPlatform] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    // Logic for fetching courses...
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://course-api-beryl.vercel.app/api/all-courses?search=${encodeURIComponent(search)}`
      );
      if (!res.ok) throw new Error("Failed to fetch from backend");

      const data = await res.json();
      const backendCourses = data.map((course) => ({
        title: course.title || "Untitled Course",
        description:
          course.description || course.desc || "No description available.",
        image:
          course.image ||
          course.img ||
          "https://via.placeholder.com/400x225?text=No+Image",
        url: course.url,
        platform: course.platform || "Unknown",
      }));

      let udemyCourses = [];
      try {
        const udemyRes = await fetch(
          `https://udemy-paid-courses-for-free-api.p.rapidapi.com/rapidapi/courses/search?page=1&page_size=20&query=${encodeURIComponent(
            search
          )}`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
              "X-RapidAPI-Host":
                "udemy-paid-courses-for-free-api.p.rapidapi.com",
            },
          }
        );

        if (udemyRes.ok) {
          const udemyData = await udemyRes.json();
          udemyCourses = (udemyData.courses || []).map((c) => ({
            title:
              c.title?.trim() ||
              c.course?.title?.trim() ||
              c.name?.trim() ||
              "Untitled Course",
            description:
              c.headline?.trim() ||
              c.description?.trim() ||
              c.course?.headline?.trim() ||
              c.summary?.trim() ||
              "No description available.",
            image:
              c.image_480x270 ||
              c.image_240x135 ||
              c.image ||
              c.course?.image_480x270 ||
              "https://via.placeholder.com/400x225?text=No+Image",
            url:
              (c.url?.startsWith("http")
                ? c.url
                : `https://www.udemy.com${c.url || ""}`) ||
              (c.course?.url?.startsWith("http")
                ? c.course.url
                : `https://www.udemy.com${c.course?.url || ""}`) ||
              "#",
            platform: "Udemy",
          }));
        }
      } catch (udemyErr) {
        console.warn("Udemy fetch failed:", udemyErr);
      }

      const allCourses = [...backendCourses, ...udemyCourses];
      const grouped = allCourses.reduce((acc, course) => {
        if (!acc[course.platform]) acc[course.platform] = [];
        acc[course.platform].push(course);
        return acc;
      }, {});

      setCoursesByPlatform(grouped);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const renderPlatform = (title, list) => (
    <section className="mb-8 sm:mb-12" key={title}>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 dark:text-white">
        {title}
      </h2>
      {list.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {list.map((course, i) => (
            <CourseCard key={`${course.url}-${i}`} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No courses found.</p>
      )}
    </section>
  );

  return (
    <main className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-center dark:text-white">
          All Online Courses
        </h1>

        {/* Search */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center mb-6 sm:mb-10 gap-2">
          <input
            type="text"
            placeholder="Search for any topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchCourses()}
            className="px-4 py-2 w-full sm:w-80 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={fetchCourses}
            className="bg-cyan-600 dark:bg-cyan-500 text-white px-4 py-2 rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-cyan-700 dark:hover:bg-cyan-400 transition"
          >
            Search
          </button>
        </div>
        
        {/* Status Messages */}
        {loading && <p className="text-center font-medium text-gray-600 dark:text-gray-300">Loading...</p>}
        {error && <p className="text-center font-medium text-red-600 dark:text-red-400">{error}</p>}

        {!loading &&
          !error &&
          Object.keys(coursesByPlatform).length > 0 &&
          Object.entries(coursesByPlatform).map(([platform, list]) =>
            renderPlatform(platform, list)
          )}
      </div>
    </main>
  );
}

export default Courses;