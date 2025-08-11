import React from "react";
import { Twitter, Github, Linkedin, BookOpen } from "lucide-react";

const Footer = () => {
  const linkSections = [
    {
      title: "Solutions",
      links: ["Marketing", "Analytics", "Commerce", "Insights"],
    },
    {
      title: "Support",
      links: ["Pricing", "Documentation", "Guides", "API Status"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Jobs", "Press", "Partners"],
    },
    {
      title: "Legal",
      links: ["Claim", "Privacy", "Terms"],
    },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          
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

            {/* Social icons */}
            <div className="flex space-x-5">
              <a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">
                <Github size={24} />
              </a>
              <a href="#" className="hover:text-cyan-500 dark:hover:text-cyan-400">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:w-2/3">
            {linkSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold uppercase">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} CourseMonitorHub, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
