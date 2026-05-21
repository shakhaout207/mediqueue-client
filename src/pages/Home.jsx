import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const slides = [
  {
    title: "Find Your Perfect Tutor",
    desc: "Browse hundreds of expert tutors and book sessions instantly.",
    bg: "from-blue-600 to-indigo-700",
  },
  {
    title: "Learn Anytime, Anywhere",
    desc: "Online and offline sessions available based on your preference.",
    bg: "from-green-500 to-teal-600",
  },
  {
    title: "Boost Your Academic Performance",
    desc: "Get personalized learning experience with top-rated tutors.",
    bg: "from-purple-600 to-pink-600",
  },
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tutors/home`)
      .then((res) => {
        setTutors(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Banner/Carousel */}
      <div
        className={`bg-gradient-to-r ${slides[current].bg} text-white py-24 px-8 text-center transition-all duration-700`}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {slides[current].title}
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          {slides[current].desc}
        </p>
        <Link
          to="/tutors"
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Browse Tutors
        </Link>
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-4 h-4 rounded-full transition ${
                i === current ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Available Tutors Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
          Available Tutors
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
          Meet our top-rated tutors ready to help you succeed
        </p>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : tutors.length === 0 ? (
          <p className="text-center text-gray-500">No tutors available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={tutor.photo}
                  alt={tutor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                    {tutor.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-1">
                    {tutor.subject}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                    📍 {tutor.location}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                    💰 ${tutor.hourlyFee}/hr
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    🎯 {tutor.teachingMode}
                  </p>
                  <Link
                    to={`/tutors/${tutor._id}`}
                    className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Book Session
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/tutors"
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition font-semibold"
          >
            View All Tutors
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "🔍",
                title: "Find a Tutor",
                desc: "Browse and search tutors by subject and availability.",
              },
              {
                icon: "📅",
                title: "Book a Session",
                desc: "Select your preferred time and book instantly.",
              },
              {
                icon: "📚",
                title: "Start Learning",
                desc: "Connect with your tutor and start your learning journey.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-blue-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "500+", label: "Expert Tutors" },
            { number: "10K+", label: "Students Enrolled" },
            { number: "50+", label: "Subjects Available" },
            { number: "98%", label: "Satisfaction Rate" },
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
              <p className="text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;