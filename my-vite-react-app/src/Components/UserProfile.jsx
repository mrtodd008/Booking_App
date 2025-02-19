import PropTypes from "prop-types";

const UserProfile = ({ user }) => {
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <img src={user.profilePicture} alt="Profile" />
      <p>Instagram: {user.socialLinks?.instagram}</p>
      <p>Twitter: {user.socialLinks?.twitter}</p>
      <p>Facebook: {user.socialLinks?.facebook}</p>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    profilePicture: PropTypes.string,
    socialLinks: PropTypes.shape({
      instagram: PropTypes.string,
      twitter: PropTypes.string,
      facebook: PropTypes.string,
    }),
  }),
};

export default UserProfile;
