require("dotenv").config();
const User = require("../Model/UserModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

module.exports = {
  SignupUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

    if (!name.trim() || !email.trim() || !password.trim()) {
  return res.status(400).json({ message: "Please fill all inputs" });
}

      const existingUser = await User.findOne({
        $or: [
          { email: email },
          { name: name }
        ]
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email or User name  already in use" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      if (!user) {
        return res.status(500).json({ message: "Error creating user" });
      }

     return  res.status(201).json({ message: "User created" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { name, password } = req.body;

      if (name === "" || password === "") {
        return res.status(400).json({ message: "Please fill all inputs" });
      }

      const user = await User.findOne({ name: name });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const compare = await bcrypt.compare(password, user.password);

      if (!compare) {
        return res.status(404).json({ message: "Incorrect Password" });
      }

      const token = jwt.sign(
        { name: user.name },
        process.env.USER_ACCES_TOKEN_SECRET,
        {
          expiresIn: 86400,
        }
      );

      res
        .status(200)
        .json({ message: "Login success", user: user, token: token, name:name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
