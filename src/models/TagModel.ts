import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { sluggerPlugin } from "mongoose-slugger-plugin";

export interface TagType extends mongoose.Document {
  name: string;
  icon: string;
  image: string;
  slug: string;
  category: mongoose.Schema.Types.ObjectId | string;
}

// Define your schema as normal.
var TagSchema = new mongoose.Schema<TagType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: String,
    icon: String,
    slug: String,
  },
  { timestamps: true }
);

// Apply the uniqueValidator plugin to TagSchema.
TagSchema.plugin(uniqueValidator, " is already taken");

// create a unique index for slug generation;
// here, the slugs must be unique for each city
TagSchema.index({ name: 1, slug: 1 }, { name: "category_slug", unique: true });

// add the plugin
TagSchema.plugin(sluggerPlugin, {
  // the property path which stores the slug value
  slugPath: "slug",
  // specify the properties which will be used for generating the slug
  generateFrom: ["name"],
  // specify the max length for the slug
  maxLength: 30,
  // the unique index, see above
  index: "category_slug",
});

export default mongoose.models.Tag || mongoose.model<TagType>("Tag", TagSchema);
