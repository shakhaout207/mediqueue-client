import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const TutorDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tutors/${id}`)
      .then((res) => {
        setTutor(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const isBookingAvailable = () => {
    if (!tutor) return false;
    if (tutor.totalSlot <= 0) return false;
    const today = new Date();
    const sessionDate = new Date(tutor.sessionStartDate);
    if (today < sessionDate) return false;
    return true;
  };

  const getBookingMessage = () => {
    if (!tutor) return "";
    if (tutor.totalSlot <= 0) return "No available slots left.";
    const today = new Date();
    const sessionDate = new Date(tutor.sessionStartDate);
    if (today < sessionDate)
      return `Booking is not available yet for this tutor. Session starts on ${sessionDate.toLocaleDateString()}`;
    return "";
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBooking(true);
    const studentName = e.target.studentName.value;
    const phone = e.target.phone.value;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/bookings",
        {
          tutorId: tutor._id,
          studentName,
          phone,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setModalOpen(false);
      setTutor((prev) => ({ ...prev, totalSlot: prev.totalSlot - 1 }));
      Swal.fire({
        icon: "success",
        title: "Booking Successful!",
        text: "Your session has been booked successfully.",
        confirmButtonColor: "#2563eb",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed!");
    }
    setBooking(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <p className="text-center py-16 text-gray-500">Tutor not found!</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <img
          src={tutor.photo}
          alt={tutor.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {tutor.name}
          </h2>
          <p className="text-blue-600 text-lg font-medium mb-6">
            {tutor.subject}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400 text-sm">📍 Location</p>
              <p className="font-semibold text-gray-800 dark:text-white">{tutor.location}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400 text-sm">💰 Hourly Fee</p>
              <p className="font-semibold text-gray-800 dark:text-white">${tutor.hourlyFee}/hr</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400 text-sm">🗓️ Available Days & Time</p>
              <p className="font-semibold text-gray-800 dark:text-white">{tutor.availableDays} | {tutor.availableTime}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400 text-sm">🎯 Teaching Mode</p>
              <p className="font-semibold text-gray-800 dark:text-white">{tutor.teachingMode}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400 text-sm">🏫 Institution</p>
              <p className="font-semibold text-gray-800 dark:text-white">{tutor.institution}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400 text-sm">⭐ Experience</p>
              <p className="font-semibold text-gray-800 dark:text-white">{tutor.experience}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400 text-sm">🪑 Available Slots</p>
              <p className="font-semibold text-gray-800 dark:text-white">{tutor.totalSlot}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <p className="text-gray-500 dark:text-gray-400 text-sm">📅 Session Start Date</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {new Date(tutor.sessionStartDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {!isBookingAvailable() && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4">
              <p className="text-red-600 dark:text-red-400 font-medium text-center">
                ⚠️ {getBookingMessage()}
              </p>
            </div>
          )}

          <button
            onClick={() => setModalOpen(true)}
            disabled={!isBookingAvailable()}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isBookingAvailable() ? "Book Session" : "Booking Unavailable"}
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Book Session
            </h3>
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  defaultValue={user?.displayName}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  placeholder="Your phone number"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tutor
                </label>
                <input
                  type="text"
                  value={tutor.name}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Email
                </label>
                <input
                  type="text"
                  value={user?.email}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={booking}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  {booking ? "Booking..." : "Confirm Booking"}
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorDetails;