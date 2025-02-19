const User = require("../Models/User");

// Get the logged-in user's profile (replace with auth middleware if needed)
exports.getUserProfile = async (req, res) => {
  // return res.json({ message: "User profile" });

  try {
    console.log(req.params);
    // Assuming `req.user.id` comes from authentication middleware
    const user = await User.findOne({ email: req.params.email }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
