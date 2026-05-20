import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddTutor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    subject: "",
    availableDays: "",
    availableTime: "",
    hourlyFee: "",
    totalSlot: "",
    sessionStartDate: "",
    institution: "",
    experience: "",
    location: "",
    teachingMode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tutorData = {
      ...formData,
      totalSlot: Number(formData.totalSlot),
      hourlyFee: Number(formData.hourlyFee),
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("${import.meta.env.VITE_API_URL}/tutors", tutorData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Tutor added successfully!");
      navigate("/my-tutors");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add tutor!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-12 bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Add New Tutor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tutor Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required
              placeholder="Enter tutor name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo URL</label>
            <input type="text" name="photo" value={formData.photo} onChange={handleChange} required
              placeholder="imgbb / postimage link"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject / Category</label>
            <select name="subject" value={formData.subject} onChange={handleChange} required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="">Select Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
              <option value="Bangla">Bangla</option>
              <option value="Computer Science">Computer Science</option>
              <option value="History">History</option>
              <option value="Geography">Geography</option>
              <option value="Economics">Economics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Available Days</label>
            <input type="text" name="availableDays" value={formData.availableDays} onChange={handleChange} required
              placeholder="e.g. Sun - Thu"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Available Time</label>
            <input type="text" name="availableTime" value={formData.availableTime} onChange={handleChange} required
              placeholder="e.g. 5:00 PM - 8:00 PM"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hourly Fee ($)</label>
            <input type="number" name="hourlyFee" value={formData.hourlyFee} onChange={handleChange} required
              placeholder="e.g. 20"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Slots</label>
            <input type="number" name="totalSlot" value={formData.totalSlot} onChange={handleChange} required
              placeholder="e.g. 10"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Session Start Date</label>
            <input type="date" name="sessionStartDate" value={formData.sessionStartDate} onChange={handleChange} required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Institution</label>
            <input type="text" name="institution" value={formData.institution} onChange={handleChange} required
              placeholder="University/College name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience</label>
            <input type="text" name="experience" value={formData.experience} onChange={handleChange} required
              placeholder="e.g. 3 years"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location (Area/City)</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required
              placeholder="e.g. Dhaka"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teaching Mode</label>
            <select name="teachingMode" value={formData.teachingMode} onChange={handleChange} required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Both">Both</option>
            </select>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold text-lg">
            {loading ? "Adding..." : "Add Tutor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTutor;