import React, { useRef, useState, useEffect } from "react";

// --- SVG Icon Components (Used by Home) ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const BookmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a2 2 0 10-4 0v.083A6 6 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


// --- Home Page Content ---
const Home = () => {
    // State and Refs for the component
    const [searchTerm, setSearchTerm] = useState('');
    const [activeAccordion, setActiveAccordion] = useState('');

    // State and Ref for Platform Scroller
    const scrollerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    
    // State to track if the scroller is visible on screen
    const [isScrollerVisible, setIsScrollerVisible] = useState(false);

    // Data for the component
    const platforms = [
        { "name": "Coursera", "url": "https://www.coursera.org" },
        { "name": "Udemy", "url": "https://www.udemy.com" },
        { "name": "edX", "url": "https://www.edx.org" },
        { "name": "upGrad", "url": "https://www.upgrad.com" },
        { "name": "NPTEL", "url": "https://nptel.ac.in" },
        { "name": "Great Learning", "url": "https://www.greatlearning.in" },
        { "name": "Simplilearn", "url": "https://www.simplilearn.com" },
        { "name": "LinkedIn Learning", "url": "https://www.linkedin.com/learning" },
        { "name": "freeCodeCamp", "url": "https://www.freecodecamp.org" },
        { "name": "Khan Academy", "url": "https://www.khanacademy.org" },
        { "name": "Udacity", "url": "https://www.udacity.com" },
        { "name": "Skillshare", "url": "https://www.skillshare.com" },
        { "name": "Codecademy", "url": "https://www.codecademy.com" },
        { "name": "Pluralsight", "url": "https://www.pluralsight.com" },
        { "name": "MasterClass", "url": "https://www.masterclass.com" },
        { "name": "FutureLearn", "url": "https://www.futurelearn.com" },
        { "name": "DataCamp", "url": "https://www.datacamp.com" },
        { "name": "Swayam", "url": "https://swayam.gov.in" }
    ];

    const features = [
        { title: "Price Drop Alerts", desc: "Save thousands on your education. Get notified of discounts up to 90% off." },
        { title: "All-in-One Dashboard", desc: "Organize and compare all your learning interests in one place." },
        { title: "New Course Discovery", desc: "Be the first to know about the newest high-rated courses." },
    ];

    const subjects = [
        { id: 'dev', title: 'Web Development', topics: ['HTML, CSS, and JavaScript', 'React, Angular, and Vue.js', 'Node.js and Express', 'Databases: SQL and MongoDB', 'DevOps and Cloud Deployment'] },
        { id: 'data', title: 'Data Science', topics: ['Python for Data Science', 'Machine Learning and AI', 'Data Visualization with Tableau', 'Deep Learning with TensorFlow', 'Big Data Analytics'] },
        { id: 'business', title: 'Business & Finance', topics: ['Financial Modeling', 'Digital Marketing Fundamentals', 'Project Management (PMP)', 'Leadership and Management', 'Stock Trading and Investing'] }
    ];

    const checkArrows = () => {
        if (scrollerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    // useEffect now also handles the Intersection Observer
    useEffect(() => {
        checkArrows();
        window.addEventListener('resize', checkArrows);

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsScrollerVisible(entry.isIntersecting);
            },
            { rootMargin: '0px', threshold: 0.1 }
        );

        const currentScroller = scrollerRef.current;
        if (currentScroller) {
            observer.observe(currentScroller);
        }

        return () => {
            window.removeEventListener('resize', checkArrows);
            if (currentScroller) {
                observer.unobserve(currentScroller);
            }
        };
    }, []);

    const handleScroll = (direction) => {
        if (scrollerRef.current) {
            const scrollAmount = scrollerRef.current.clientWidth / 2;
            scrollerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filteredFeatures = searchTerm.length === 0 ? features : features.filter(f => f.title.toLowerCase().includes(lowercasedSearchTerm) || f.desc.toLowerCase().includes(lowercasedSearchTerm));
    const filteredSubjects = searchTerm.length === 0 ? subjects : subjects.filter(s => s.title.toLowerCase().includes(lowercasedSearchTerm) || s.topics.some(t => t.toLowerCase().includes(lowercasedSearchTerm)));

    return (
        <main>
            {/* ============================================= */}
            {/* Hero Section */}
            {/* ============================================= */}
            <section className="relative text-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/30"></div>
                
                {/* Arrow rendering now depends on isScrollerVisible */}
                {isScrollerVisible && showLeftArrow && (
                    <button onClick={() => handleScroll('left')} className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                )}
                {isScrollerVisible && showRightArrow && (
                    <button onClick={() => handleScroll('right')} className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-slate-700 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                )}

                <div className="relative z-10">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Stop Searching. Start Learning.
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                        Track thousands of online courses from top platforms and never miss a deal. Your all-in-one hub for upskilling.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#start" className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transform hover:-translate-y-1 transition-all duration-300">
                            Start Tracking for Free
                        </a>
                    </div>
                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                        No credit card required. Free forever.
                    </p>

                    <div className="mt-16">
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">TRACKING COURSES FROM</p>
                        
                        <div className="mt-6 max-w-4xl mx-auto">
                            <div ref={scrollerRef} onScroll={checkArrows} className="flex items-center gap-4 sm:gap-8 overflow-x-auto scroll-smooth flex-nowrap scrollbar-hide px-4">
                                {platforms.map((brand) => (
                                    <a
                                        key={brand.name}
                                        href={brand.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-lg text-slate-500 dark:text-slate-400 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-300"
                                    >
                                        {brand.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* ============================================= */}
            {/* How It Works Section */}
            {/* ============================================= */}
            <section className="py-20 bg-white dark:bg-slate-800 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-center text-3xl sm:text-4xl font-bold mb-12 text-slate-900 dark:text-white">
                        How It Works in 3 Simple Steps
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: <SearchIcon />, title: "1. Find Your Course", desc: "Search our library of 200,000+ courses or browse expert-curated lists by subject." },
                            { icon: <BookmarkIcon />, title: "2. Add to Watchlist", desc: "Add courses to your dashboard with one click to monitor them." },
                            { icon: <BellIcon />, title: "3. Get Notified", desc: "Get instant alerts when prices drop or new top-rated courses appear." },
                        ].map((step, idx) => (
                            <div key={idx} className="p-6 sm:p-8 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                                <div className="flex justify-center text-indigo-500 dark:text-indigo-400 mb-4">{step.icon}</div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-slate-800 dark:text-slate-100">{step.title}</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================= */}
            {/* Explore Section with Search */}
            {/* ============================================= */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-center text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                        Explore Our Platform
                    </h2>
                    <p className="text-center mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
                        Use the search bar to filter our features and the subjects we cover.
                    </p>

                    <div className="mt-8 mb-12 relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search features or topics (e.g., 'Python', 'Dashboard')"
                            className="w-full py-3 pl-4 pr-10 text-lg text-slate-800 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </div>

                    {filteredFeatures.length === 0 && filteredSubjects.length === 0 ? (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">No Results Found</h3>
                            <p className="text-slate-500 dark:text-slate-400 mt-2">Try a different search term to find what you're looking for.</p>
                        </div>
                    ) : (
                        <>
                            {filteredFeatures.length > 0 && (
                                <div className="mb-16">
                                    <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">Features</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {filteredFeatures.map((feature, idx) => (
                                            <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-indigo-200/50 dark:hover:shadow-indigo-900/50 transform hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-slate-700">
                                                <h4 className="text-lg font-bold mb-3 text-indigo-600 dark:text-indigo-400">{feature.title}</h4>
                                                <p className="text-slate-600 dark:text-slate-300 text-sm">{feature.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {filteredSubjects.length > 0 && (
                                <div>
                                    <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">Subjects & Topics</h3>
                                    <div className="space-y-4">
                                        {filteredSubjects.map(subject => (
                                            <div key={subject.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                                                <button
                                                    onClick={() => setActiveAccordion(activeAccordion === subject.id ? '' : subject.id)}
                                                    className="w-full flex justify-between items-center p-5 text-left font-semibold text-slate-800 dark:text-slate-100"
                                                >
                                                    <span>{subject.title}</span>
                                                    <span className={`transform transition-transform duration-300 ${activeAccordion === subject.id ? 'rotate-180' : ''}`}>
                                                        <ChevronDownIcon />
                                                    </span>
                                                </button>
                                                {activeAccordion === subject.id && (
                                                    <div className="px-5 pb-5">
                                                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 border-t border-slate-200 dark:border-slate-700 pt-4">
                                                            {subject.topics.map(topic => <li key={topic}>{topic}</li>)}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* ============================================= */}
            {/* Social Proof Section */}
            {/* ============================================= */}
            <section className="py-20 bg-white dark:bg-slate-800 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-center text-3xl sm:text-4xl font-bold mb-12 text-slate-900 dark:text-white">
                        Trusted by Over 50,000 Learners in India
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[
                            { quote: 'Course Monitor Hub is a game-changer! I got an alert when a Python course dropped from ₹3,499 to ₹499. Instantly bought it!', name: "Priya R., Software Engineer, Bengaluru" },
                            { quote: "As a student, finding the right digital marketing course within budget was tough. This platform made it so easy.", name: "Aman S., BBA Student, Delhi" },
                        ].map((testimonial, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-700/50 p-6 sm:p-8 rounded-2xl flex flex-col shadow-lg">
                                <blockquote className="text-base sm:text-lg italic text-slate-600 dark:text-slate-300 flex-grow border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 sm:pl-6">
                                    "{testimonial.quote}"
                                </blockquote>
                                <cite className="mt-4 sm:mt-6 font-bold not-italic text-slate-700 dark:text-slate-200 text-sm sm:text-base">
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
            <section id="start" className="py-20 bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                        Ready to Unlock Your Potential?
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                        Sign up in 30 seconds. Start building your skills and saving money today.
                    </p>
                    <a href="/signup" className="mt-8 inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transform hover:-translate-y-1 transition-all duration-300">
                        Create Your Free Account
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Home;