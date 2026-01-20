import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String },
    message: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);
