import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin, BookOpen, Instagram } from "lucide-react";

const Footer = () => {
  const linkSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Partners", path: "/partners" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "Help Center", path: "/help" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-start gap-8 md:gap-16 lg:gap-24">
          
          {/* Company Info */}
          <div className="space-y-6 md:w-1/3">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                CourseMonitorHub
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            {/* --- Social icons were REMOVED from here --- */}
          </div>

          {/* Links and Socials */}
          {/* --- MODIFIED: Adjusted grid columns to fit the new section --- */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {linkSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold uppercase">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* --- NEW: "Connect with us" section added here --- */}
            <div className="pl-4 ">
  {/* --- MODIFIED: Added text-lg to increase font size --- */}
  <h3 className="font-bold text-lg">
    Connect with us
  </h3>
  <div className="mt-4 flex space-x-5">
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 dark:hover:text-cyan-400">
      <Instagram size={32} />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 dark:hover:text-cyan-400">
      <Twitter size={32} />
    </a>
    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 dark:hover:text-cyan-400">
      <Github size={32} />
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 dark:hover:text-cyan-400">
      <Linkedin size={32} />
    </a>
  </div>
</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-8 text-center ">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} CourseMonitorHub, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;