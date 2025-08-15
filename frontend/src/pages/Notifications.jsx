import React from 'react';

const Notifications = () => {
  return (
    <main className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Notifications</h1>
      
      {/* You can map over your notifications here later */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-gray-700 dark:text-gray-300">
          You have no new notifications.
        </p>
      </div>

    </div>
    </main>
  );
};

export default Notifications;