import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema({
  username: { type: String, required: true },

  credential: { type: String, required: true, unique: true },
  used: { type: Boolean, default: false },
});

const Credential = mongoose.model("CouponCredential", credentialSchema);

export default Credential;
