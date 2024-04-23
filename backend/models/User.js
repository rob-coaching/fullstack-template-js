import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      select: false, // select false will not fetch password field when querying users.
      // So passwords of users will never get accidentally shared with frontend!
    },
  },
  {
    timestamps: true, // created two fields "createdAt" and "updatedAt" automatically
    versionKey: false, // prevents __v field on each created document
  }
);

const User = model("User", UserSchema);

export default User;
