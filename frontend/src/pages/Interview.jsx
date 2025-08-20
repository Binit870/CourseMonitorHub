import React, { useState } from "react";
// --- NEW: Import libraries for file parsing ---
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import mammoth from 'mammoth';

// --- NEW: Required setup for the PDF parsing library ---
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`;

// --- NEW: SVG Icon for the Generate button ---
const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-12a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 17h.01M19 17h.01M16 14h.01M19 14h.01M12 21a9 9 0 000-18h0" />
    </svg>
);

// --- COMPANY DATA (Static Information) ---
const companies = [
  {
    name: "Google",
    eligibility:
      "Bachelor's degree in Computer Science or related technical field, or equivalent practical experience. Strong knowledge of data structures, algorithms, and software design.",
    process: [
      {
        round: "Online Assessment",
        description: "Coding test with algorithm and data structure questions on platforms like HackerRank.",
      },
      {
        round: "Technical Round 1 & 2",
        description: "Two rounds of problem-solving and coding. Expect medium to hard LeetCode-style questions.",
      },
      {
        round: "System Design Round",
        description: "High-level design of a large-scale system (e.g., YouTube, Google Drive).",
      },
      {
        round: "Googliness & Leadership (HR)",
        description: "Behavioral questions, past project discussions, and cultural fit assessment.",
      },
    ],
    questions: [
      { q: "Design a system like Google Docs.", a: "Focus on real-time collaboration, data storage, conflict resolution (CRDTs or Operational Transforms), and scalability." },
      { q: "Find the k-th largest element in an array.", a: "Explain solutions using sorting (O(n log n)) and a min-heap or Quickselect algorithm (average O(n))." },
      { q: "What happens when you type 'google.com' into your browser and press Enter?", a: "Describe the full process: DNS resolution, TCP handshake, HTTP request/response, and browser rendering." },
      { q: "Given a dictionary of words, find the longest word that can be built one character at a time by other words in the dictionary.", a: "This can be solved efficiently using a Trie data structure and depth-first search (DFS)." },
      { q: "Design the backend for a service like YouTube.", a: "Discuss video uploading/processing pipeline, storage (CDN), database schema for videos/users, and recommendation algorithm." },
      { q: "Tell me about a time you had a disagreement with a team member.", a: "Use the STAR method. Focus on professional disagreement, data-driven arguments, and a collaborative resolution." },
      { q: "How is data stored and retrieved in Google Search?", a: "Discuss crawling, indexing (inverted indexes), and ranking algorithms like PageRank." },
      { q: "Implement a Least Recently Used (LRU) Cache.", a: "The optimal solution uses a combination of a hash map (for O(1) lookups) and a doubly linked list (for O(1) additions/removals)." },
      { q: "What is your favorite Google product and how would you improve it?", a: "Show your product sense. Pick a product, identify a user problem, and propose a concrete, well-reasoned feature." },
      { q: "Given two sorted arrays, find the median.", a: "Explain the naive approach (merging arrays) and the optimal binary search approach (O(log(min(m,n))))." },
    ],
  },
  {
    name: "Amazon",
    eligibility: "Currently enrolled in or recently graduated from a Bachelor's or Master's degree program in Computer Science, Engineering, or a related field. Customer-obsessed mindset.",
    process: [
      {
        round: "Online Assessment",
        description: "Multiple parts: Coding problems, work-style simulation, and logical reasoning tests.",
      },
      {
        round: "Technical Phone Screen",
        description: "Coding problems and discussion of Amazon's Leadership Principles.",
      },
      {
        round: "On-site/Virtual Loop (3-4 interviews)",
        description: "Multiple interviews with a mix of coding, system design, and behavioral questions heavily focused on Leadership Principles.",
      },
    ],
    questions: [
      { q: "Tell me about a time you had to deal with a difficult customer.", a: "Frame your answer using the STAR method (Situation, Task, Action, Result) and tie it to the 'Customer Obsession' leadership principle." },
      { q: "Design the recommendation system for Amazon.com.", a: "Discuss collaborative filtering, content-based filtering, and hybrid models. Mention scalability and cold-start problems." },
      { q: "Given a binary tree, check if it is a valid Binary Search Tree (BST).", a: "Explain the recursive approach with a min/max range or an in-order traversal method where the output must be sorted." },
      { q: "Tell me about a time you took a calculated risk.", a: "Link this to the 'Bias for Action' principle. Explain how you analyzed the situation, weighed the pros and cons, and what the outcome was." },
      { q: "Design a system to handle Amazon's flash sales (like Prime Day).", a: "Focus on high availability, scalability, and consistency. Discuss caching, message queues, and database scaling strategies." },
      { q: "Find the number of islands in a 2D grid.", a: "This is a classic graph traversal problem. Explain how to solve it using either Depth-First Search (DFS) or Breadth-First Search (BFS)." },
      { q: "Tell me about a time you disagreed with your manager.", a: "Link this to the 'Have Backbone; Disagree and Commit' principle. Show that you can respectfully challenge ideas with data, but also commit to the final decision." },
      { q: "Implement a data structure that supports insert, delete, and getRandom in O(1) time.", a: "The solution involves using a hash map and a dynamic array (or list) to achieve the required time complexities." },
      { q: "Design an Amazon Locker system.", a: "Consider the database schema for lockers, packages, and users. Discuss the API design for dropping off and picking up packages, and how to handle locker availability." },
      { q: "Tell me about a time you failed.", a: "Connect this to 'Ownership' and 'Learn and Be Curious'. Focus on what you learned from the experience and how you applied those learnings later." },
    ],
  },
  {
    name: "Microsoft",
    eligibility: "Pursuing a degree (BS, MS, or PhD) in a relevant technical discipline. Strong coding and problem-solving skills are essential.",
    process: [
      {
        round: "Online Test / Phone Screen",
        description: "Initial screening with coding problems on DS/Algo, often focusing on linked lists, trees, and arrays.",
      },
      {
        round: "On-site/Virtual Loop (3-4 interviews)",
        description: "A series of technical interviews covering coding, algorithms, and system design. One interviewer is often an 'as-appropriate' senior member for a behavioral/hiring manager chat.",
      },
    ],
    questions: [
      { q: "Reverse a linked list.", a: "Provide both iterative (using three pointers: prev, current, next) and recursive solutions. Be prepared to discuss space/time complexity." },
      { q: "Explain the difference between a process and a thread.", a: "A process is an instance of a program with its own memory space, while threads are components of a process that share memory and resources." },
      { q: "Why do you want to work for Microsoft?", a: "Align your personal goals with Microsoft's mission ('empower every person...'), products (like Azure, Office 365, VS Code), and collaborative culture." },
      { q: "Given a string, find the first non-repeating character.", a: "A common approach is to use a hash map to count character frequencies, then iterate through the string again to find the first character with a count of 1." },
      { q: "Design a system like OneDrive or Dropbox.", a: "Focus on file synchronization, handling large files (chunking), metadata storage, and conflict resolution for offline edits." },
      { q: "Tell me about a challenging project you worked on.", a: "Use the STAR method. Emphasize the technical challenges, your specific contributions, and the positive outcome or what you learned." },
      { q: "How would you design an API for a traffic control system?", a: "Think about the resources (intersections, cars, signals), the endpoints (e.g., GET /intersections/{id}, POST /cars/report_location), and data formats." },
      { q: "Implement a function to check if two binary trees are identical.", a: "This is a classic recursion problem. The base cases are when both nodes are null (true) or one is null (false)." },
      { q: "What is cloud computing? Explain the difference between IaaS, PaaS, and SaaS.", a: "Use an analogy like pizza-as-a-service. IaaS (Infrastructure) is the ingredients, PaaS (Platform) is a delivered pizza, SaaS (Software) is dining at a restaurant." },
      { q: "Sort an array of 0s, 1s, and 2s.", a: "This is the 'Dutch National Flag' problem. The optimal solution is a single-pass, in-place algorithm using three pointers (low, mid, high) with O(n) time and O(1) space." },
    ],
  },
  {
    name: "Meta",
    eligibility: "Bachelor's or Master's in Computer Science or a related field. Experience building and shipping products at scale is highly valued.",
    process: [
      {
        round: "Technical Phone Screen",
        description: "A coding interview focused on algorithms and data structures. Communication is key.",
      },
      {
        round: "On-site/Virtual Loop (4-5 interviews)",
        description: "Includes two coding rounds, a system design round, and a behavioral ('Jedi') interview focused on your past projects and teamwork.",
      },
    ],
    questions: [
      { q: "Given an array of integers, return the indices of two numbers that add up to a specific target.", a: "The brute force is O(n^2). The optimal solution uses a hash map for a one-pass, O(n) time complexity approach." },
      { q: "Design Instagram's news feed.", a: "Discuss the 'fan-out' approach, trade-offs between push vs. pull models, API design, and how you would rank the posts." },
      { q: "Tell me about a time you had to move fast to get a project done.", a: "This relates to Meta's 'Move Fast' motto. Use the STAR method to describe a situation where you prioritized speed without sacrificing too much quality." },
      { q: "Merge k sorted linked lists.", a: "A common solution is to use a min-heap to efficiently keep track of the smallest element among all lists, leading to an O(n log k) time complexity." },
      { q: "How would you design a URL shortener like bit.ly?", a: "Focus on the hash generation function (and collision resolution), database schema, and handling redirects. Discuss read/write-heavy nature of the system." },
      { q: "Validate an IP address (both IPv4 and IPv6).", a: "This is a string parsing problem. Break down the string by delimiters ('.' or ':') and validate each segment according to the rules of the IP version." },
      { q: "How would you build a feature like 'People You May Know'?", a: "Explain the concept of graph traversal and finding mutual friends. Discuss how to rank suggestions based on the number of mutual connections, shared interests, etc." },
      { q: "Implement a basic version of the `ls` command in Linux.", a: "This question tests your understanding of file systems and system calls. You would need to read directory contents and format the output." },
      { q: "Tell me about a project you're proud of and why.", a: "Be passionate. Explain the problem, your role, the tech stack, the challenges you overcame, and the impact of the project." },
      { q: "Given a stream of numbers, how would you find the median at any point?", a: "The classic solution is to use two heaps: a max-heap for the smaller half of numbers and a min-heap for the larger half. This keeps the heaps balanced and the medians accessible in O(1) time." },
    ],
  },
    {
    name: "Apple",
    eligibility: "Strong CS fundamentals (DS/Algo, OS, Networking). For many roles, experience with C++, Objective-C, or Swift is a major plus. High attention to detail.",
    process: [
      {
        round: "Phone / FaceTime Screen",
        description: "Interviews with team members covering your resume, past projects, and technical questions.",
      },
      {
        round: "On-site/Virtual Loop (5-7 interviews)",
        description: "A long day of deep-dive interviews with various team members, including cross-functional partners. The bar for coding proficiency is very high.",
      },
    ],
    questions: [
      { q: "What is your favorite Apple product and what is one feature you would add?", a: "Show your passion for user experience and product design. The feature should solve a real user problem and fit seamlessly into the existing product." },
      { q: "You're in a car and you have a rope. How would you determine the length of the car?", a: "This is a classic creative problem-solving question. There's no single right answer; they want to see your thought process. (e.g., fold the rope in half repeatedly, mark it, measure the mark)." },
      { q: "Implement a hash map from scratch.", a: "You need to explain the core components: an array of buckets (often linked lists or trees), a hashing function, and a collision resolution strategy (like chaining)." },
      { q: "What happens from the moment you press the power button on an iPhone to when the home screen appears?", a: "Describe the bootloader process, kernel initialization, loading drivers, and starting up the main operating system services and UI." },
      { q: "Design the data structures for the Apple Music app.", a: "Think about how to store songs, albums, artists, playlists, and user libraries. Discuss how to efficiently retrieve data, e.g., 'all songs by artist X'." },
      { q: "Tell me about a time you had to work with a difficult person.", a: "Focus on empathy, communication, and finding common ground. Apple's culture is highly collaborative, so they value this skill." },
      { q: "Given an array, find if there are any duplicates.", a: "Discuss the trade-offs between different solutions: sorting the array (O(n log n) time, O(1) space if in-place) vs. using a hash set (O(n) time, O(n) space)." },
      { q: "How does Wi-Fi work?", a: "Explain the basics of radio waves, IEEE 802.11 standards, and the process of a device connecting to an access point (SSID, authentication, DHCP)." },
      { q: "Write a function that takes a URL and downloads its content.", a: "This tests your knowledge of networking APIs. You should be able to outline the steps of opening a connection, sending a request, and reading the response stream." },
      { q: "If you have 1000 coins and one is heavier, how do you find it in the minimum number of weighs using a balance scale?", a: "This is a ternary search problem. You can divide the coins into three groups (e.g., 333, 333, 334) to find the solution much faster than a binary search." },
    ],
  },
  {
    name: "Netflix",
    eligibility: "Generally hires senior engineers with extensive experience in distributed systems, cloud computing, and a specific domain. A strong alignment with their culture memo is crucial.",
    process: [
      {
        round: "Initial Screen with Manager/Senior Engineer",
        description: "A conversation about your experience and how it aligns with Netflix's needs and culture.",
      },
      {
        round: "Technical Screen",
        description: "Often a practical system design or architecture discussion rather than pure LeetCode.",
      },
      {
        round: "Full Loop Interview",
        description: "A series of interviews focused on system design, technical depth, and deep-dives into their culture principles like 'Freedom and Responsibility'.",
      },
    ],
    questions: [
      { q: "How would you design a video streaming service like Netflix?", a: "Cover the entire pipeline: video ingestion and encoding (e.g., using services like AWS Elastic Transcoder), content delivery network (CDN) strategy, and client-side buffering." },
      { q: "Tell me about a time you exercised 'Freedom and Responsibility'.", a: "This is a core cultural value. Describe a situation where you took initiative and ownership of a major decision without needing explicit permission, and how you handled the outcome." },
      { q: "Design a system for A/B testing on the Netflix homepage.", a: "Discuss how to assign users to different experiment groups, how to log user interactions, and how to analyze the results to make a data-driven decision." },
      { q: "How would you ensure high availability and fault tolerance for a critical microservice?", a: "Talk about redundancy (multiple instances), load balancing, health checks, circuit breakers, and graceful degradation." },
      { q: "What are the challenges of managing a large microservices architecture?", a: "Discuss issues like service discovery, inter-service communication (REST vs. gRPC), distributed tracing for debugging, and maintaining data consistency." },
      { q: "How does TCP differ from UDP?", a: "TCP is a connection-oriented, reliable protocol that guarantees ordering (e.g., for file transfers). UDP is a connectionless, unreliable protocol that is faster and used for streaming (e.g., video calls, online gaming)." },
      { q: "Tell me about a complex technical problem you solved.", a: "Go deep. Explain the problem, the various approaches you considered, why you chose your final solution, and what the trade-offs were. They want to see your thought process." },
      { q: "Design the 'Top 10' feature for Netflix.", a: "Discuss how you would aggregate viewing data in near real-time (e.g., using a stream processing system like Kafka and Flink/Spark), and how you would efficiently calculate and serve the rankings." },
      { q: "How do you stay current with new technologies?", a: "This relates to the 'Curiosity' value. Mention blogs, conferences, personal projects, and how you evaluate whether a new technology is worth adopting." },
      { q: "Design an API for the Netflix login system.", a: "Focus on security. Discuss authentication (password hashing, JWTs), authorization, rate limiting to prevent brute-force attacks, and session management." },
    ],
  },
];

// --- API Call Functions ---
const fetchAIQuestionsAndAnswers = async (topic) => {
    try {
        const response = await fetch(`http://localhost:5000/api/interview/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic }),
        });
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error("Error fetching topic Q&A:", error);
        return [];
    }
};

const fetchResumeQuestions = async (resume) => {
    try {
        const response = await fetch(`http://localhost:5000/api/interview/generate-from-resume`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resume }),
        });
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error("Error fetching resume questions:", error);
        return [];
    }
};


const Interview = () => {
    const [selectedCompany, setSelectedCompany] = useState(companies[0]);
    
    // State for Topic-based Q&A
    const [searchQuery, setSearchQuery] = useState("");
    const [aiResults, setAiResults] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [error, setError] = useState("");
    const [activeAccordion, setActiveAccordion] = useState(null);

    // State for Resume-based Q&A
    const [resumeText, setResumeText] = useState("");
    const [resumeQuestions, setResumeQuestions] = useState([]);
    const [isResumeLoading, setIsResumeLoading] = useState(false);
    const [resumeError, setResumeError] = useState("");
    const [activeResumeAccordion, setActiveResumeAccordion] = useState(null);


    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        setIsLoading(true);
        setSearchPerformed(true);
        setError("");
        setAiResults([]);
        setActiveAccordion(null);

        const results = await fetchAIQuestionsAndAnswers(searchQuery);
        
        if (!results || results.length === 0) {
            setError(`Could not generate questions for "${searchQuery}". Please try another topic.`);
        } else {
            setAiResults(results);
        }
        
        setIsLoading(false);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setResumeText("");
        setResumeError("");
        setResumeQuestions([]);
        setIsResumeLoading(true);

        try {
            const extension = file.name.split('.').pop().toLowerCase();
            let text = "";

            if (extension === 'txt' || extension === 'md') {
                text = await file.text();
            } else if (extension === 'docx') {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.extractRawText({ arrayBuffer });
                text = result.value;
            } else if (extension === 'pdf') {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
                const numPages = pdf.numPages;
                let fullText = "";
                for (let i = 1; i <= numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    fullText += textContent.items.map(item => item.str).join(" ") + "\n";
                }
                text = fullText;
            } else {
                throw new Error("Unsupported file type. Please upload a .pdf, .docx, or .txt file.");
            }
            setResumeText(text);
        } catch (err) {
            console.error("File parsing error:", err);
            setResumeError(err.message || "Could not read the file.");
        } finally {
            setIsResumeLoading(false);
        }
    };
    
    const handleGenerateResumeQuestions = async () => {
        if (!resumeText) return;
        setIsResumeLoading(true);
        setResumeError("");
        setResumeQuestions([]);
        setActiveResumeAccordion(null);

        const questions = await fetchResumeQuestions(resumeText);

        if (!questions || questions.length === 0) {
            setResumeError("Could not generate questions from the provided resume.");
        } else {
            setResumeQuestions(questions);
        }

        setIsResumeLoading(false);
    };

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };
    const toggleResumeAccordion = (index) => {
        setActiveResumeAccordion(activeResumeAccordion === index ? null : index);
    };

    return (
        <main className="bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-cyan-700 dark:text-cyan-400 mb-6">
                    Company Interview Hub
                </h1>
                
                <div className="mb-8 p-5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-3 text-cyan-700 dark:text-cyan-400">Resume-Based Question Generator</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Upload your resume to get a list of personalized interview questions generated by AI.
                    </p>
                    <div className="mb-4">
                        <label htmlFor="resume-upload" className="w-full flex items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <div className="text-center">
                                <p className="font-semibold text-cyan-600 dark:text-cyan-400">Click to Upload Resume</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Accepts PDF, DOCX, TXT</p>
                            </div>
                            <input id="resume-upload" type="file" className="hidden" accept=".pdf,.docx,.doc,.txt,.md" onChange={handleFileChange} />
                        </label>
                    </div>

                    {resumeText && (
                        <div className="mt-4 text-center">
                            <button onClick={handleGenerateResumeQuestions} disabled={isResumeLoading} className="inline-flex items-center px-5 py-2 rounded-md bg-cyan-600 text-white font-semibold hover:bg-cyan-700 disabled:bg-cyan-400 transition-colors">
                                <SparklesIcon />
                                {isResumeLoading ? "Analyzing Resume..." : "Generate Questions from Resume"}
                            </button>
                        </div>
                    )}

                    {isResumeLoading && <p className="mt-4 text-center text-cyan-600 dark:text-cyan-400">Processing your file...</p>}
                    {resumeError && <p className="mt-4 text-center text-red-500">{resumeError}</p>}
                    
                    {resumeQuestions.length > 0 && (
                        <div className="mt-6 space-y-2">
                             <h3 className="text-lg font-bold mb-2">Generated Questions from Your Resume</h3>
                             {resumeQuestions.map((item, index) => (
                                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md">
                                    <button
                                        onClick={() => toggleResumeAccordion(index)}
                                        className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <span>{item.question}</span>
                                        <span className={`transform transition-transform duration-300 ${activeResumeAccordion === index ? 'rotate-180' : ''}`}>▼</span>
                                    </button>
                                    {activeResumeAccordion === index && (
                                        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{item.answer}</p>
                                        </div>
                                    )}
                                </div>
                             ))}
                        </div>
                    )}
                </div>

                <div className="mb-8 p-5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-3 text-cyan-700 dark:text-cyan-400">AI Topic Question Generator</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Enter any topic to generate practice questions with detailed answers.
                    </p>
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="e.g., React Hooks"
                            className="flex-grow p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                        <button type="submit" disabled={isLoading} className="px-5 py-2 rounded-md bg-cyan-600 text-white font-semibold hover:bg-cyan-700 disabled:bg-cyan-400">
                            {isLoading ? "🧠 Generating..." : "Generate Q&A"}
                        </button>
                    </form>

                    {searchPerformed && (
                        <div className="mt-6">
                            {isLoading ? (
                                <p className="text-cyan-600 dark:text-cyan-400">Generating questions from AI...</p>
                            ) : aiResults.length > 0 ? (
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold mb-2">Generated Questions for "{searchQuery}"</h3>
                                    {aiResults.map((item, index) => (
                                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md">
                                            <button
                                                onClick={() => toggleAccordion(index)}
                                                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <span>{item.question}</span>
                                                <span className={`transform transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`}>
                                                    ▼
                                                </span>
                                            </button>
                                            {activeAccordion === index && (
                                                <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                                                    <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{item.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-red-500">{error}</p>
                            )}
                        </div>
                    )}
                </div>

                <h2 className="text-2xl font-semibold mb-3">Company-Specific Information</h2>
                <div className="flex flex-wrap gap-3 mb-6">
                    {companies.map((company) => (
                        <button
                            key={company.name}
                            onClick={() => setSelectedCompany(company)}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition
                                ${selectedCompany.name === company.name
                                    ? "bg-cyan-600 text-white border-cyan-600"
                                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-cyan-50 dark:hover:bg-gray-700"
                                }`}
                        >
                            {company.name}
                        </button>
                    ))}
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-5 shadow space-y-6">
                    <h2 className="text-2xl font-semibold text-cyan-700 dark:text-cyan-400">
                        {selectedCompany.name}
                    </h2>

                    <div>
                        <h3 className="text-xl font-bold mb-2">Eligibility Criteria</h3>
                        <p className="text-gray-700 dark:text-gray-300">{selectedCompany.eligibility}</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-2">Interview Process</h3>
                        <ol className="space-y-4 list-decimal list-inside">
                            {selectedCompany.process.map((step, index) => (
                                <li key={index} className="text-gray-900 dark:text-gray-100">
                                    <p className="font-semibold inline">{step.round}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 ml-2">
                                        {step.description}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-2">Commonly Asked Questions</h3>
                        <ul className="space-y-3">
                            {selectedCompany.questions.map((item, index) => (
                                <li key={index} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                                    <p className="font-semibold text-gray-900 dark:text-gray-100">{item.q}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{item.a}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Interview;