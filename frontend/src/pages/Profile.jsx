import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { BookOpen, Award, BarChart2, Edit } from "lucide-react";

// --- MOCK DATA ---
const mockCourses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    progress: 75,
    thumbnail:
      "https://dummyimage.com/150x150/06B6D4/FFFFFF&text=React",
  },
  {
    id: 2,
    title: "Modern JavaScript (ES2025)",
    progress: 40,
    thumbnail:
      "https://dummyimage.com/150x150/06B6D4/FFFFFF&text=React",
  },
  {
    id: 3,
    title: "Tailwind CSS From Scratch",
    progress: 100,
    thumbnail:
      "https://dummyimage.com/150x150/06B6D4/FFFFFF&text=React",
  },
];

const mockStats = {
  hoursLearned: 42,
  coursesCompleted: 1,
  currentStreak: 12,
};

const Profile = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="bg-slate-50 min-h-screen dark:bg-slate-900 dark:text-slate-200">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10 text-center sm:text-left">
          <img
            src={
              user.avatar ||
              `https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`
            }
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-700 shadow-md mx-auto sm:mx-0"
          />
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Welcome back, {user.name}!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Ready to continue your learning journey?
            </p>
            <button className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-600 hover:underline dark:text-cyan-400">
              <Edit size={14} />
              Edit Profile
            </button>
          </div>
        </header>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-5 rounded-lg shadow dark:bg-slate-800 flex items-center gap-4">
            <BookOpen className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Courses Completed
              </p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {mockStats.coursesCompleted}
              </p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow dark:bg-slate-800 flex items-center gap-4">
            <BarChart2 className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Hours Learned
              </p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {mockStats.hoursLearned}
              </p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow dark:bg-slate-800 flex items-center gap-4">
            <Award className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Learning Streak
              </p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">
                {mockStats.currentStreak} Days
              </p>
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section>
          <h2 className="text-2xl font-semibold mb-5 text-slate-800 dark:text-white">
            My Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 dark:bg-slate-800"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-3 text-slate-800 dark:text-white">
                    {course.title}
                  </h3>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-700">
                    <div
                      className="bg-cyan-600 h-2.5 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-sm mt-2 text-slate-600 dark:text-slate-400">
                    {course.progress}% Complete
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
