import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTutor, setEditTutor] = useState(null);

  const getToken = () => localStorage.getItem("token");

  const fetchMyTutors = () => {
    const token = getToken();
axios.get(`${import.meta.env.VITE_API_URL}/tutors/my-tutors`, { 
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setTutors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching tutors:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyTutors();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = getToken();
          await axios.delete(`${import.meta.env.VITE_API_URL}/tutors/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTutors(tutors.filter((t) => t._id !== id));
          toast.success("Tutor deleted successfully!");
        } catch (err) {
          console.log("Failed to delete tutor:", err);
          toast.error("Failed to delete tutor!");
        }
      }
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      photo: e.target.photo.value,
      subject: e.target.subject.value,
      availableDays: e.target.availableDays.value,
      availableTime: e.target.availableTime.value,
      hourlyFee: Number(e.target.hourlyFee.value),
      totalSlot: Number(e.target.totalSlot.value),
      sessionStartDate: e.target.sessionStartDate.value,
      institution: e.target.institution.value,
      experience: e.target.experience.value,
      location: e.target.location.value,
      teachingMode: e.target.teachingMode.value,
    };

    try {
      const token = getToken();
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/tutors/${editTutor._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTutors(tutors.map((t) => (t._id === editTutor._id ? res.data : t)));
      setEditTutor(null);
      toast.success("Tutor updated successfully!");
    } catch (err) {
      console.log("Failed to update tutor:", err);
      toast.error("Failed to update tutor!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        My Tutors
      </h2>

      {tutors.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            You haven't added any tutors yet!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <table className="w-full text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Photo</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Fee</th>
                <th className="px-6 py-4">Slots</th>
                <th className="px-6 py-4">Mode</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor, index) => (
                <tr key={tutor._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{index + 1}</td>
                  <td className="px-6 py-4">
                    <img src={tutor.photo} alt={tutor.name} className="w-12 h-12 rounded-full object-cover" />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">{tutor.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{tutor.subject}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">${tutor.hourlyFee}/hr</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{tutor.totalSlot}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{tutor.teachingMode}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditTutor(tutor)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition text-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(tutor._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editTutor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-2xl shadow-2xl my-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Update Tutor</h3>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input type="text" name="name" defaultValue={editTutor.name} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo URL</label>
                <input type="text" name="photo" defaultValue={editTutor.photo} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <input type="text" name="subject" defaultValue={editTutor.subject} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Available Days</label>
                <input type="text" name="availableDays" defaultValue={editTutor.availableDays} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Available Time</label>
                <input type="text" name="availableTime" defaultValue={editTutor.availableTime} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hourly Fee</label>
                <input type="number" name="hourlyFee" defaultValue={editTutor.hourlyFee} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Slots</label>
                <input type="number" name="totalSlot" defaultValue={editTutor.totalSlot} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Session Start Date</label>
                <input type="date" name="sessionStartDate"
                  defaultValue={editTutor.sessionStartDate?.split('T')[0]} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Institution</label>
                <input type="text" name="institution" defaultValue={editTutor.institution} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience</label>
                <input type="text" name="experience" defaultValue={editTutor.experience} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input type="text" name="location" defaultValue={editTutor.location} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teaching Mode</label>
                <select name="teachingMode" defaultValue={editTutor.teachingMode} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option>Online</option>
                  <option>Offline</option>
                  <option>Both</option>
                </select>
              </div>
              <div className="md:col-span-2 flex gap-3 mt-2">
                <button type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                  Save Changes
                </button>
                <button type="button" onClick={() => setEditTutor(null)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-300 transition font-semibold">
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

export default MyTutors;