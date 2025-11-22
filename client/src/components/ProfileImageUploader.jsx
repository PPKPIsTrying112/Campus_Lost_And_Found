import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

function ProfileImageUploader({ image }) {
  const fileInputRef = useRef();
  const { user, updateProfileImage } = useAuth();

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", user.id);

    const res = await fetch("http://localhost:5000/api/profile-picture/profile-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      updateProfileImage(data.url);
    } else {
      alert("Error uploading image");
    }
  };

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleUpload(file);
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Clickable Circle */}
      <div
        onClick={() => fileInputRef.current.click()}
        style={{
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "3px solid #ccc",
          cursor: "pointer",
          margin: "0 auto 1rem",
          transition: "0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <img
          src={
            image ||
            "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
          }
          alt="Profile"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onSelectFile}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ProfileImageUploader;
