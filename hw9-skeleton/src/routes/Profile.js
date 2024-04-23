import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <div className="Profile">
      <h3 className="Profile_header">Ddoski</h3>
      <img
        className="Profile_image"
        src="/assets/ddoskiProfilePicture.jpeg"
        alt="profile"
      />

      <div>
        <a href="https://www.calhacks.io">My Personal Website</a>
      </div>

      <div>
        {/* Task 4: Wrap this button in a tag in order for it to go back home */}
        <Link to="/">
            <button className="Profile_button">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
