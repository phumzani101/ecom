import mongoose from "mongoose";
// import uniqueValidator from "mongoose-unique-validator";
import { sluggerPlugin } from "mongoose-slugger-plugin";

export interface CategoryType extends mongoose.Document {
  name: string;
  icon: string;
  image: string;
  slug: string;
}

// Define your schema as normal.
var CategorySchema = new mongoose.Schema<CategoryType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: String,
    icon: String,
    slug: String,
  },
  { timestamps: true }
);

// Apply the uniqueValidator plugin to CategorySchema.

// create a unique index for slug generation;
// here, the slugs must be unique for each city
CategorySchema.index(
  { name: 1, slug: 1 },
  { name: "category_slug", unique: true }
);

// add the plugin
CategorySchema.plugin(sluggerPlugin, {
  // the property path which stores the slug value
  slugPath: "slug",
  // specify the properties which will be used for generating the slug
  generateFrom: ["name"],
  // specify the max length for the slug
  maxLength: 30,
  // the unique index, see above
  index: "category_slug",
});

export default mongoose.models.Category ||
  mongoose.model<CategoryType>("Category", CategorySchema);
