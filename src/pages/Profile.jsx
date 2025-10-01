import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaSave,
  FaTimes,
  FaLink,
  FaCalendar,
  FaEnvelope,
  FaSpinner,
  FaGlobe,
  FaPen,
} from "react-icons/fa";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    website: user?.website || "",
  });
  const [website, setWebsite] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const existingPosts = JSON.parse(
    localStorage.getItem("socialMediaPosts") || "[]"
  );
  let NumberOfPosts = existingPosts.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    updateUser(formData);
    setIsEditing(false);
    setIsSubmitting(false);
    setWebsite(formData.website);
    console.log(formData.website);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const cancelEdit = () => {
    setFormData({
      name: user?.name || "",
      bio: user?.bio || "",
      website: user?.website || "",
    });
    setIsEditing(false);
  };

  const getMemberDuration = () => {
    const joinDate = new Date(user?.createdAt);
    const now = new Date();
    const months =
      (now.getFullYear() - joinDate.getFullYear()) * 12 +
      (now.getMonth() - joinDate.getMonth());

    if (months < 1) return "New member";
    if (months < 12)
      return `${months} month${months > 1 ? "s" : ""} on platform`;
    return `${Math.floor(months / 12)} year${
      Math.floor(months / 12) > 1 ? "s" : ""
    } on platform`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-3">
            Your Profile
          </h1>
          <p className="text-slate-300 text-lg">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {" "}
          {/* Main Profile Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
              {/* Profile Header */}
              <div className="flex flex-col lg:flex-row items-start justify-between mb-8 gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl">
                    <FaUser className="text-white text-3xl" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-slate-900"></div>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {user?.name}
                  </h2>
                  <div className="flex items-center space-x-4 text-slate-300 mb-3">
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-slate-400 text-sm" />
                      <span className="text-sm">{user?.email}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                      {" "}
                      <FaCalendar className="text-slate-400 text-sm" />
                      <span className="text-sm">{getMemberDuration()}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Joined{" "}
                    {new Date(user?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Edit Toggle */}
              <div className="flex-shrink-0">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
                  >
                    <FaEdit className="text-sm" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={cancelEdit}
                      className="bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30 flex items-center space-x-2"
                    >
                      <FaTimes />
                      <span>Cancel</span>
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaSave />
                      )}
                      <span>{isSubmitting ? "Saving..." : "Save"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Form/Info */}
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-slate-200 flex items-center space-x-2"
                    >
                      <FaUser className="text-cyan-400 text-sm" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label
                      htmlFor="website"
                      className="text-sm font-semibold text-slate-200 flex items-center space-x-2"
                    >
                      <FaGlobe className="text-cyan-400 text-sm" />
                      <span>Website</span>
                      <span className="text-slate-400 text-xs font-normal">
                        (Optional)
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                        className="w-full px-4 py-4 pl-11 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      />
                      <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="bio"
                    className="text-sm font-semibold text-slate-200 flex items-center space-x-2"
                  >
                    <FaPen className="text-cyan-400 text-sm" />
                    <span>Bio</span>
                    <span className="text-slate-400 text-xs font-normal">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell your story... Share your passions, expertise, or what makes you unique."
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none leading-relaxed"
                  />
                  <p className="text-slate-400 text-sm">
                    {formData.bio.length}/250 characters •{" "}
                    {250 - formData.bio.length} remaining
                  </p>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                {/* Bio Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>About Me</span>
                  </h3>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p className="text-slate-300 leading-relaxed text-lg">
                      {user?.bio || (
                        <span className="text-slate-400 italic">
                          No bio provided yet. Share something about yourself to
                          let others know you better.
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Website Section */}
                {user?.website && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Website</span>
                    </h3>
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 font-medium text-lg transition-colors duration-300 flex items-center space-x-2 group"
                      >
                        <FaGlobe className="text-lg" />
                        <span className="group-hover:underline">
                          {user.website}
                        </span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stats */}
            <div className=" mt-12 flex items-center mb-4 justify-center pt-8 border-t border-white/10">
              <div className="text-center bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {NumberOfPosts}
                </div>
                <div className="text-slate-400 text-sm mt-2">
                  Posts Published
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Profile Completion
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Basic Info</span>
                <span className="text-green-400 text-sm font-semibold">
                  Complete
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Bio</span>
                <span
                  className={user?.bio ? "text-green-400" : "text-amber-400"}
                >
                  {user?.bio ? "Complete" : "Pending"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Website</span>
                <span
                  className={
                    user?.website ? "text-green-400" : "text-slate-400"
                  }
                >
                  {user?.website ? "Added" : "Optional"}
                </span>
              </div>
            </div>
            <div className="mt-4 bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${
                    (user?.bio ? 50 : 0) + (user?.website ? 25 : 0) + 25
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20 backdrop-blur-lg rounded-2xl border border-cyan-400/30 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/create-post">
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30 text-left">
                  Create New Post
                </button>
              </Link>
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-bold text-white mb-3">Member Since</h3>
            <div className="flex items-center space-x-3 text-slate-300">
              <FaCalendar className="text-cyan-400 text-lg" />
              <p className="text-sm">
                {new Date(user?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <p className="text-slate-400 text-sm mt-2">{getMemberDuration()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
