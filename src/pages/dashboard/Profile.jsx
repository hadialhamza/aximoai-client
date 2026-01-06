import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Save,
  X,
  Camera,
  Calendar,
  Github,
  Linkedin,
  Globe,
  Briefcase,
  Award,
  Box,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useSecureAxios from "@/hooks/useSecureAxios";
import Container from "@/components/ui/container/Container";
import MyBtn from "@/components/ui/buttons/MyBtn";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    displayName: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    about: "",
    github: "",
    linkedin: "",
    website: "",
    skills: "React, Node.js, MongoDB, Tailwind CSS", // Stored as string, split for UI
  });

  // Mock Stats (You can fetch these from backend later)
  const stats = [
    { label: "Models", value: "12", icon: Box },
    { label: "Purchases", value: "8", icon: Briefcase },
    { label: "Reputation", value: "Top 10%", icon: Award },
  ];

  // Fetch user data
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          const data = res.data;
          setFormData({
            displayName: data.displayName || user.displayName || "Aximo User",
            headline: data.headline || "AI & Machine Learning Enthusiast",
            email: data.email || user.email || "",
            phone: data.phone || "+1 (555) 123-4567",
            location: data.location || "San Francisco, CA",
            about:
              data.about ||
              "Passionate about exploring the frontiers of Artificial Intelligence. Experienced in building scalable ML models and integrating them into user-friendly applications.",
            github: data.github || "github.com/hadialhamza",
            linkedin: data.linkedin || "linkedin.com/in/hadi",
            website: data.website || "aximo.ai",
            skills:
              data.skills ||
              "React, Node.js, MongoDB, Tailwind CSS, Python, TensorFlow",
          });
        })
        .catch((err) => console.error(err))
        .finally(() => setPageLoading(false));
    }
  }, [user, axiosSecure]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // API call to update user
      await axiosSecure.put(`/users/${user.email}`, formData);
      setIsEditing(false);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your changes have been saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to update profile", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/50 pb-20">
      {/* 1. Hero Cover Area with Gradient Overlay */}
      <div className="h-64 md:h-80 w-full relative overflow-hidden group">
        <img
          src="https://i.ibb.co.com/fzvxCQ0q/cover-photo.jpg"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Cover Actions */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-black/40 hover:bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 text-sm font-medium cursor-pointer border border-white/10">
            <Camera className="w-4 h-4" /> Change Cover
          </button>
        </div>
      </div>

      <Container>
        {/* 2. Profile Header & Actions */}
        <div className="relative -mt-20 md:-mt-24 mb-8 flex flex-col md:flex-row items-end gap-6 px-2">
          {/* Avatar */}
          <div className="relative group shrink-0 mx-auto md:mx-0">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-[6px] border-base-100 bg-base-100 shadow-2xl overflow-hidden relative z-10">
              <img
                src={user?.photoURL || "https://i.ibb.co/Fm6d0pP/user.png"}
                alt="Profile"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <button className="absolute bottom-3 right-3 z-20 bg-primary text-white p-2.5 rounded-full shadow-lg hover:bg-primary/90 hover:scale-110 transition-all cursor-pointer border-4 border-base-100">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* User Info Header */}
          <div className="flex-1 text-center md:text-left w-full">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-2">
              <div className="w-full">
                {isEditing ? (
                  <div className="space-y-3 mb-2 animate-in fade-in zoom-in-95 duration-300">
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className="bg-base-100 border border-primary/50 text-2xl md:text-4xl font-bold text-foreground rounded-lg px-3 py-1 w-full md:w-2/3 focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="Your Name"
                    />
                    <input
                      type="text"
                      name="headline"
                      value={formData.headline}
                      onChange={handleChange}
                      className="bg-base-100 border border-primary/50 text-lg text-muted rounded-lg px-3 py-1 w-full md:w-2/3 focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="Your Headline (e.g. AI Engineer)"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground font-heading tracking-tight mb-1">
                      {formData.displayName}
                    </h1>
                    <p className="text-lg text-muted font-light flex items-center justify-center md:justify-start gap-2">
                      {formData.headline}
                    </p>
                  </>
                )}
              </div>

              {/* Edit/Save Buttons */}
              <div className="flex gap-2 shrink-0 mb-1">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn btn-ghost btn-sm"
                    >
                      Cancel
                    </button>
                    <MyBtn
                      onClick={handleSave}
                      disabled={loading}
                      className="gap-2 shadow-lg shadow-primary/20"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Save Changes
                    </MyBtn>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium border border-border bg-base-100 hover:bg-base-200 hover:border-primary/30 transition-all cursor-pointer shadow-sm text-foreground"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Stats Row (New Feature) */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-base-100 border border-border p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center md:flex-row md:justify-start gap-3 hover:border-primary/30 transition-colors group"
            >
              <div className="p-3 bg-base-200 rounded-xl text-muted group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                <stat.icon size={20} />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-foreground font-heading">
                  {stat.value}
                </h4>
                <p className="text-xs text-muted uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-base-100 border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold font-heading mb-5 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Contact Info
              </h3>
              <div className="space-y-5">
                <InfoItem icon={Mail} label="Email" value={formData.email} />
                <InfoItem
                  icon={Phone}
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                <InfoItem
                  icon={MapPin}
                  label="Location"
                  name="location"
                  value={formData.location}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                <InfoItem
                  icon={Calendar}
                  label="Member Since"
                  value="January 2024"
                />
              </div>
            </div>

            {/* Social Links Card (New) */}
            <div className="bg-base-100 border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold font-heading mb-5 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Social Presence
              </h3>
              <div className="space-y-4">
                <SocialInput
                  icon={Github}
                  label="GitHub"
                  name="github"
                  value={formData.github}
                  isEditing={isEditing}
                  onChange={handleChange}
                  placeholder="username"
                />
                <SocialInput
                  icon={Linkedin}
                  label="LinkedIn"
                  name="linkedin"
                  value={formData.linkedin}
                  isEditing={isEditing}
                  onChange={handleChange}
                  placeholder="username"
                />
                <SocialInput
                  icon={Globe}
                  label="Website"
                  name="website"
                  value={formData.website}
                  isEditing={isEditing}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Me */}
            <div className="bg-base-100 border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold font-heading mb-4">About Me</h3>
              {isEditing ? (
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-base-200/50 border border-border rounded-xl p-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-base-100 resize-none transition-all leading-relaxed"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-muted leading-relaxed whitespace-pre-line text-lg">
                  {formData.about}
                </p>
              )}
            </div>

            {/* Skills / Tags (New) */}
            <div className="bg-base-100 border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold font-heading mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" /> Skills & Expertise
              </h3>

              {isEditing ? (
                <div>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full bg-base-200/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
                    placeholder="Separate skills with commas (e.g. React, Design)"
                  />
                  <p className="text-xs text-muted mt-2">
                    Separate tags with commas.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.split(",").map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-base-200 text-foreground text-sm font-medium border border-border"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

// --- Reusable Sub-components ---

const InfoItem = ({ icon: Icon, label, value, isEditing, name, onChange }) => (
  <div className="flex items-center gap-3 group">
    <div className="w-10 h-10 rounded-xl bg-base-200/50 flex items-center justify-center text-muted group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-0.5">
        {label}
      </p>
      {isEditing && name ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-base-200/50 border-b-2 border-primary/50 px-2 py-0.5 focus:outline-none focus:bg-base-100 rounded-t"
        />
      ) : (
        <p className="text-foreground font-medium truncate text-sm md:text-base">
          {value}
        </p>
      )}
    </div>
  </div>
);

const SocialInput = ({
  icon: Icon,
  label,
  value,
  isEditing,
  name,
  onChange,
  placeholder,
}) => (
  <div className="flex items-center gap-3">
    <Icon className="w-5 h-5 text-muted shrink-0" />
    {isEditing ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-base-200/50 border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary"
      />
    ) : (
      <a
        href="#"
        className="text-sm font-medium text-primary hover:underline truncate"
      >
        {value || <span className="text-muted italic">Not connected</span>}
      </a>
    )}
  </div>
);

export default Profile;
