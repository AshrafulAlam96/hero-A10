import React from "react";
import { FaUserEdit, FaSearch, FaPaperPlane, FaBookOpen } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserEdit className="text-blue-600 text-4xl mb-3" />,
      title: "Create Your Profile",
      desc: "Set up your StudyMate profile by adding your name, subject, and study goals.",
    },
    {
      icon: <FaSearch className="text-blue-600 text-4xl mb-3" />,
      title: "Find Study Partners",
      desc: "Browse or search for like-minded learners from your university or field.",
    },
    {
      icon: <FaPaperPlane className="text-blue-600 text-4xl mb-3" />,
      title: "Send Connection Requests",
      desc: "Invite others to connect and build your learning circle instantly.",
    },
    {
      icon: <FaBookOpen className="text-blue-600 text-4xl mb-3" />,
      title: "Study & Grow Together",
      desc: "Share notes, discuss concepts, and achieve better results as a team.",
    },
  ];

  return (
    
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          How StudyMate Works
        </h2>
        <p className="text-gray-100 text-lg mb-10 max-w-2xl mx-auto">
          StudyMate helps students connect and collaborate through four simple steps.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-blue-100 rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
  );
};

export default HowItWorks;
