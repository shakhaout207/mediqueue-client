import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTutors = (searchVal = "", start = "", end = "") => {
    setLoading(true);
    let url = "http://localhost:5000/tutors?";
    if (searchVal) url += `search=${searchVal}&`;
    if (start) url += `startDate=${start}&`;
    if (end) url += `endDate=${end}&`;

    axios.get(url)
      .then((res) => {
        setTutors(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTutors(search, startDate, endDate);
  };

  const handleReset = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    fetchTutors();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
        All Tutors
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
        Find and book the perfect tutor for your needs
      </p>

      <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by tutor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white col-span-1 md:col-span-2"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            Reset
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : tutors.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">😔</p>
          <p className="text-xl text-gray-500 dark:text-gray-400">No tutors found!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div key={tutor._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <img
                src={tutor.photo}
                alt={tutor.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{tutor.name}</h3>
                <p className="text-blue-600 font-medium mb-1">{tutor.subject}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">📍 {tutor.location}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">💰 ${tutor.hourlyFee}/hr</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">🗓️ {tutor.availableDays} | {tutor.availableTime}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">🎯 {tutor.teachingMode}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">🪑 Slots: {tutor.totalSlot}</p>
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
    </div>
  );
};

export default Tutors;