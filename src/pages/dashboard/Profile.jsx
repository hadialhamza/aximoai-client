import React, { useState } from "react";
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
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Container from "@/components/ui/container/Container";
import MyBtn from "@/components/ui/buttons/MyBtn";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initial Form State
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "Aximo User",
    headline: "AI & Machine Learning Enthusiast",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    about:
      "Passionate about exploring the frontiers of Artificial Intelligence. Experienced in building scalable ML models and integrating them into user-friendly applications. Always learning and sharing knowledge with the community.",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset data if needed, or kept as is for now
  };

  return (
    <div className="min-h-screen bg-base-200/50 pb-20">
      {/* 1. Hero Cover Area */}
      <div className="h-64 md:h-80 w-full relative overflow-hidden group">
        <img
          src="https://i.ibb.co.com/fzvxCQ0q/cover-photo.jpg"
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Cover Edit Button */}
        <button className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer">
          <Camera className="w-5 h-5" />
        </button>
      </div>

      <Container>
        <div className="relative -mt-20 md:-mt-24 mb-6 flex flex-col md:flex-row items-end md:items-end gap-6 px-4">
          {/* 2. Avatar */}
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-base-100 dark:border-base-200 bg-base-100 shadow-2xl overflow-hidden flex items-center justify-center">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={formData.displayName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <User className="w-16 h-16 text-slate-400" />
                </div>
              )}
            </div>
            <button className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-transform hover:scale-105 cursor-pointer">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* 3. Main Info */}
          <div className="flex-1 pb-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="bg-transparent border-b-2 border-primary text-3xl md:text-4xl font-bold text-foreground focus:outline-none w-full md:w-auto text-center md:text-left"
                  />
                ) : (
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground font-heading tracking-tight">
                    {formData.displayName}
                  </h1>
                )}

                {isEditing ? (
                  <input
                    type="text"
                    name="headline"
                    value={formData.headline}
                    onChange={handleChange}
                    className="mt-2 bg-transparent border-b border-border text-lg text-muted focus:border-primary focus:outline-none w-full text-center md:text-left"
                  />
                ) : (
                  <p className="text-lg text-muted font-light mt-1">
                    {formData.headline}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-5 py-2.5 rounded-xl font-medium text-muted hover:bg-base-300 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                    <MyBtn
                      onClick={handleSave}
                      disabled={loading}
                      className="shadow-lg shadow-primary/25"
                    >
                      {loading ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save className="w-4 h-4" /> Save Changes
                        </>
                      )}
                    </MyBtn>
                  </>
                ) : (
                  <MyBtn
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="border-primary/20 hover:border-primary/50 hover:bg-primary/5"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </MyBtn>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Left Column: Contact & Personal Info */}
          <div className="space-y-6">
            <div className="bg-base-100 border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold font-heading mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Info
              </h3>

              <div className="space-y-4">
                <InfoItem
                  icon={Mail}
                  label="Email"
                  value={formData.email}
                  isEditing={false} // Email usually not editable here
                />
                <InfoItem
                  icon={Phone}
                  label="Phone"
                  value={formData.phone}
                  name="phone"
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                <InfoItem
                  icon={MapPin}
                  label="Location"
                  value={formData.location}
                  name="location"
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                <InfoItem
                  icon={Calendar}
                  label="Joined"
                  value="January 2024"
                  isEditing={false}
                />
              </div>
            </div>
          </div>

          {/* Right Column: About & Stats */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-base-100 border border-border rounded-3xl p-6 shadow-sm min-h-[300px]">
              <h3 className="text-lg font-semibold font-heading mb-4">
                About Me
              </h3>
              {isEditing ? (
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-base-200 rounded-xl p-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all"
                />
              ) : (
                <p className="text-muted leading-relaxed whitespace-pre-line">
                  {formData.about}
                </p>
              )}
            </div>

            {/* Optional: Activity Stats or Badges could go here */}
          </div>
        </div>
      </Container>
    </div>
  );
};

// Helper Component for Info Items with Edit State
const InfoItem = ({ icon: Icon, label, value, isEditing, name, onChange }) => (
  <div className="group">
    <label className="text-xs font-semibold text-muted uppercase tracking-wider mb-1 block">
      {label}
    </label>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center text-primary shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent border-b border-border focus:border-primary focus:outline-none py-1 text-foreground transition-all"
          />
        ) : (
          <p className="text-foreground font-medium truncate">{value}</p>
        )}
      </div>
    </div>
  </div>
);

export default Profile;
