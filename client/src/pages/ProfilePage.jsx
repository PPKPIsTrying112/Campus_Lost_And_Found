// src/pages/ProfilePage.jsx
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ProfileImageUploader from "../components/ProfileImageUploader";

function ProfilePage() {
  const { user, updateProfileImage } = useAuth();

  return (
    <div style={{ textAlign: "center", paddingTop: "2rem" }}>
      <h1>My Profile</h1>

      <ProfileImageUploader
        image={user?.profileImage}
        onChange={updateProfileImage}
      />

      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
}

export default ProfilePage;
