import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ProfileImageUploader from "../components/ProfileImageUploader";
import FoundItemsList from "../components/FoundItemsList";

function ProfilePage() {
  const { userId } = useParams();
  const { user: currentUser, updateProfileImage } = useAuth();

  const [profileUser, setProfileUser] = useState(undefined); // undefined = loading, null = not found
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let userData = currentUser;

        if (userId && parseInt(userId) !== currentUser?.id) {
          const userRes = await fetch(`/api/users/${userId}`);
          if (!userRes.ok) throw new Error("User not found");
          userData = await userRes.json();
        }

        setProfileUser(userData);

        const itemsRes = await fetch(`/api/found-items/user/${userData.id}`);
        if (!itemsRes.ok) throw new Error("Failed to fetch items");
        const itemsData = await itemsRes.json();
        setUserItems(itemsData);
      } catch (err) {
        console.error(err);
        setProfileUser(null);
        setUserItems([]);
      }
    };

    fetchProfile();
  }, [userId, currentUser]);

  if (profileUser === undefined) return <div>Loading...</div>;
  if (profileUser === null) return <div>User not found</div>;

  const isCurrentUser = profileUser.id === currentUser?.id;

  return (
    <div style={{ textAlign: "center", paddingTop: "2rem" }}>
      <h1>{isCurrentUser ? "My Profile" : `${profileUser.name}'s Profile`}</h1>

      {/* Avatar Section */}
      <div
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          overflow: "hidden",
          margin: "1rem auto",
          border: "2px solid #ddd",
          cursor: isCurrentUser ? "pointer" : "default",
        }}
      >
        {isCurrentUser ? (
          <ProfileImageUploader
            image={profileUser.profileImage}
            onChange={updateProfileImage}
          />
        ) : (
          <img
            src={profileUser.profileImage || "/default-avatar.png"}
            alt={profileUser.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>

      <h2>{profileUser.name}</h2>
      <p>{profileUser.email}</p>

      {userItems.length > 0 ? (
        <FoundItemsList foundItems={userItems} />
      ) : (
        <p>
          {isCurrentUser
            ? "You haven't posted any items yet."
            : "No items posted yet."}
        </p>
      )}
    </div>
  );
}

export default ProfilePage;
