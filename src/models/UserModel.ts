import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";

export interface UserType extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: String;
  image: String;
  resetCode: {
    data: String;
    expiresAt: Date;
  };
  //   poddy_trained: boolean;
  //   diet: string[];
  //   image_url: string;
  //   likes: string[];
  //   dislikes: string[];
  //   createdAt: Date;
  //   updatedAt: Date;
}

// Define your schema as normal.
var UserSchema = new mongoose.Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      index: true,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    image: String,
    resetCode: {
      data: String,
      expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000),
      },
    },
  },
  { timestamps: true }
);

// Apply the uniqueValidator plugin to userSchema.
UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// UserSchema.pre(/^find/, function (next) {
//   // .find({ status: "active" });
//   next();
// });

UserSchema.methods.authenticate = async function (userPassword: string) {
  return await bcrypt.compare(userPassword, this.password);
};

// UserSchema.methods.genOtp = function () {
//   const otpCode = parseInt(Math.random() * 1000000);
//   this.otp = {
//     code: otpCode,
//     expiresAt: Date.now() + 10 * 60 * 1000,
//   };
//   return otpCode;
// };

// UserSchema.methods.createJWT = function () {
//   return jwt.sign({ id: this._id }, config.jwtSecret, {
//     expiresIn: config.jwtExpiresIn,
//   });
// };

export default mongoose.models.User ||
  mongoose.model<UserType>("User", UserSchema);
