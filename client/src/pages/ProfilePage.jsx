import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ProfileImageUploader from "../components/ProfileImageUploader";
import FoundItemsList from "../components/FoundItemsList";

function ProfilePage() {
  const { userId } = useParams(); // optional userId from URL
  const { user: currentUser, updateProfileImage } = useAuth();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(undefined); // undefined = loading, null = not found
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let userData = currentUser;

        // If userId is specified and it's not the logged-in user, fetch from API
        if (userId && parseInt(userId) !== currentUser?.id) {
          const userRes = await fetch(`/api/users/${userId}`);
          if (!userRes.ok) throw new Error("User not found");
          userData = await userRes.json();
        }

        setProfileUser(userData);

        // Fetch the found items for this user
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

      {isCurrentUser && (
        <ProfileImageUploader
          image={profileUser.profileImage}
          onChange={updateProfileImage}
        />
      )}

      <h2>{profileUser.name}</h2>
      <p>{profileUser.email}</p>

      <h3>{isCurrentUser ? "My Posts" : "Found Items"}</h3>
      {userItems.length > 0 ? (
        <FoundItemsList foundItems={userItems} />
      ) : (
        <p>{isCurrentUser ? "You haven't posted any items yet." : "No items posted yet."}</p>
      )}
    </div>
  );
}

export default ProfilePage;
