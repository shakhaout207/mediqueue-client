import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyBookedSessions = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_API_URL}/bookings/my-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await axios.patch(
            `${import.meta.env.VITE_API_URL}/bookings/${id}/cancel`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setBookings(
            bookings.map((b) =>
              b._id === id ? { ...b, status: "cancelled" } : b
            )
          );
          toast.success("Booking cancelled successfully!");
        } catch {
          toast.error("Failed to cancel booking!");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
        My Booked Sessions
      </h2>

      {bookings.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400">
            You haven't booked any sessions yet!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <table className="w-full text-left table-auto border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Tutor Name</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    {booking.tutorName}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {booking.studentName}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {booking.studentEmail}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : booking.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={booking.status === "cancelled"}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookedSessions;