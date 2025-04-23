import mongoose from "mongoose";

const identifiedPokemonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    identifiedAt: { type: Date, default: Date.now },
    imageUrl: { type: String, default: "" },
    rarity: {
      type: String,
      enum: ["common", "rare", "legendary", "mythical"],
      default: "common",
    },
    type: { type: [String] , default: ["normal"] },
    description: { type: String, default: "" },
    attacks: { type: [String] , default: [] },
  },
  { _id: false }
); // _id: false prevents Mongoose from generating _id for each subdoc if not needed

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isverified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    default: null,
  },
  otpValidity: {
    type: Number,
    default: null,
  },
  resetOtp: {
    type: String,
    default: null,
  },
  resetOtpValidity: {
    type: Number,
    default: null,
  },

  //user details
  profilePic: { type: String, default: "" }, // URL or filename
  height: { type: Number, default: null }, // in cm or inches
  weight: { type: Number, default: null }, // in kg or lbs
  gender: { type: String, enum: ["Male", "Female", "Other", ""], default: "" },
  hometown: { type: String, default: "" },
  trainerType: { type: String, default: "" },
  favPokemon: { type: String, default: "" },
  trainerId: { type: String, unique: true, sparse: true }, // Optional unique ID
  age: { type: Number, default: null },
  power: { type: Number, default: 10 },
  stamina: { type: Number, default: 80 },
  experience: { type: Number, default: 0 },

  identifiedPokemon: { type: [identifiedPokemonSchema], default: [] },
});

const User = mongoose.model("User", userSchema);

export default User;
