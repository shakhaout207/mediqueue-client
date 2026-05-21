import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Medi<span className="text-green-400">Queue</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            MediQueue is a tutor booking platform that simplifies online learning by connecting students with expert tutors.
          </p>
        </div>

        {/* Learning Services */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg md:text-xl font-semibold text-white">Learning Services</h3>
          <ul className="space-y-2 text-sm md:text-base">
            <li><Link to="/tutors" className="hover:text-green-400 transition duration-200">Browse Tutors</Link></li>
            <li><Link to="/add-tutor" className="hover:text-green-400 transition duration-200">Become a Tutor</Link></li>
            <li><Link to="/my-booked-sessions" className="hover:text-green-400 transition duration-200">My Sessions</Link></li>
            <li><Link to="/" className="hover:text-green-400 transition duration-200">How It Works</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg md:text-xl font-semibold text-white">Contact Us</h3>
          <p className="text-sm md:text-base flex items-center gap-2">📧 support@mediqueue.com</p>
          <p className="text-sm md:text-base flex items-center gap-2">📞 +880 1234 567890</p>
          <div className="flex gap-7 text-2xl mt-2">
            <a href="#" className="hover:text-blue-500 transition duration-200"><FaFacebook /></a>
            <a href="#" className="hover:text-sky-400 transition duration-200"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-600 transition duration-200"><FaLinkedin /></a>
            <a href="#" className="hover:text-red-500 transition duration-200"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MediQueue. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;