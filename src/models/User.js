const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: { type: String, required: true, min: 6, max: 255, lowercase: true },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      lowercase: true,
      unique: true,
    },
    password: { type: String, required: true, min: 6, max: 255 },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('user', userSchema);
