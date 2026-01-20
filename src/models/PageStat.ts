import mongoose from "mongoose";

const PageStatSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    hearts: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.models.PageStat ||
  mongoose.model("PageStat", PageStatSchema);
