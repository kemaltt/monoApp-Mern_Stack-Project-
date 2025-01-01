import { registerUser } from "./register-user";

export const register = async (req, res) => {

  try {
    const { email, password, username } = req.body;

    if (!email) {
      throw new Error("E-Mail is required.");
    }

    if (!password) {
      throw new Error("Password is required.");
    }

    if (!username) {
      throw new Error("Username is required.");
    }

    const user = await registerUser({ email, password, username });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      err: error.message || "Unknown error while registering new user.",
    });
  }
}