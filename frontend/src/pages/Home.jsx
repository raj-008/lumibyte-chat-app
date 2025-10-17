import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";

const Home = () => {
  return (
    <div className="overflow-hidden before:absolute before:top-0 before:start-1/2 min-h-screen bg-transparent dark:bg-neutral-800 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-10 before:-translate-x-1/2 before:pointer-events-none">
      <DarkModeToggle />
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 relative z-10">
        <div className="mt-5 max-w-2xl text-center mx-auto">
          <h1 className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent p-3">Personal AI Assistance</h1>
          <p className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">Ask Anything</p>
        </div>
        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-lg text-gray-600 dark:text-neutral-400">
            Lumibyte Chat is an AI-powered chat app, which provides you 99% accurate answers to your questions. We rely on our own trained machine learning models to provide accurate results.
          </p>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/chat" className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none py-3 px-4">
            New Chat
            <svg className="shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
