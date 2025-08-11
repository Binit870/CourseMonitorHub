/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { PlayCircle, Calendar, Megaphone } from 'lucide-react';

// --- MOCK DATA ---
const mockData = {
  lastCourse: {
    id: 1,
    title: 'Advanced React Patterns',
    lastLesson: 'Lesson 5: Custom Hooks',
    thumbnail: "https://dummyimage.com/150x150/06B6D4/FFFFFF&text=React"
  },
  upcomingDeadlines: [
    { id: 1, course: 'Modern JavaScript (ES2025)', task: 'Quiz 2', due: 'Aug 15, 2025' },
    { id: 2, course: 'Advanced React Patterns', task: 'Project Submission', due: 'Aug 20, 2025' },
  ],
  announcements: [
    { id: 1, text: "New 'State Machines' module added to the React course!", from: 'Instructor' },
    { id: 2, text: "Scheduled maintenance this Friday at 10 PM IST.", from: 'Platform' },
  ]
};
// --- END MOCK DATA ---

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Your Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* === MAIN CONTENT === */}
          <main className="lg:col-span-2 space-y-8">
            
            {/* Continue Learning Widget */}
            <section className="bg-blue-600 dark:bg-blue-700 text-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6">
              <img
                src={mockData.lastCourse.thumbnail}
                alt="Course"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-md border-2 border-blue-300"
              />
              <div className="flex-grow text-center md:text-left">
                <p className="font-semibold text-blue-200">CONTINUE WHERE YOU LEFT OFF</p>
                <h2 className="text-xl sm:text-2xl font-bold mt-1">{mockData.lastCourse.title}</h2>
                <p className="text-blue-100">{mockData.lastCourse.lastLesson}</p>
              </div>
              <button className="bg-white text-blue-700 font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg w-full md:w-auto flex items-center justify-center gap-2 hover:bg-blue-50 transition-all">
                <PlayCircle size={20} />
                Jump Back In
              </button>
            </section>

            {/* Announcements Widget */}
            <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
                <Megaphone size={22} /> Announcements
              </h3>
              <ul className="space-y-4">
                {mockData.announcements.map(item => (
                  <li key={item.id} className="p-4 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <p className="text-sm text-slate-800 dark:text-slate-200">{item.text}</p>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{item.from}</span>
                  </li>
                ))}
              </ul>
            </section>
          </main>

          {/* === SIDEBAR === */}
          <aside className="space-y-8">
            {/* Upcoming Deadlines */}
            <section className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
                <Calendar size={22} /> Upcoming Deadlines
              </h3>
              <ul className="space-y-3">
                {mockData.upcomingDeadlines.map(item => (
                  <li key={item.id}>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{item.task}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {item.course} - Due: {item.due}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
