import mongoose from "mongoose";
import { sluggerPlugin } from "mongoose-slugger-plugin";
import paginate from "mongoose-paginate-v2";

export interface LikeType extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId | string;
}

export interface RatingType extends mongoose.Document {
  comment: string;
  rating: number;
  user: mongoose.Schema.Types.ObjectId | string;
}

export interface ProductType extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  previousPrice: Number;
  onSale: boolean;
  color: string;
  brand: string;
  stock: number;
  shipping: boolean;
  icon: string;
  image: string[];
  slug: string;
  sold: number;
  category: mongoose.Schema.Types.ObjectId | string;
  tags: mongoose.Schema.Types.ObjectId[] | string[];
  like: LikeType[];
  rating: RatingType[];
}

const LikeSchema = new mongoose.Schema<LikeType>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const RatingSchema = new mongoose.Schema<RatingType>(
  {
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    comment: {
      type: String,
      trim: true,
      minlength: 1,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Define your schema as normal.
const ProductSchema = new mongoose.Schema<ProductType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      text: true, // for text search
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      default: 0.0,
    },
    previousPrice: Number,
    onSale: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    color: String,
    brand: String,
    stock: Number,
    shipping: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    image: [
      {
        secure_url: {
          type: String,
        },
        public_id: String,
      },
    ],
    like: [LikeSchema],
    rating: [RatingSchema],
    icon: String,
    slug: { type: String, lowercase: true, index: true },
  },
  { timestamps: true }
);

// paginate with this plugin
ProductSchema.plugin(paginate);

// create a unique index for slug generation;
// here, the slugs must be unique for each city
ProductSchema.index(
  { name: 1, slug: 1 },
  { name: "category_slug", unique: true }
);

// add the plugin
ProductSchema.plugin(sluggerPlugin, {
  // the property path which stores the slug value
  slugPath: "slug",
  // specify the properties which will be used for generating the slug
  generateFrom: ["name"],
  // specify the max length for the slug
  maxLength: 30,
  // the unique index, see above
  index: "category_slug",
});

export default mongoose.models.Product ||
  mongoose.model<ProductType, mongoose.PaginateModel<ProductType>>(
    "Product",
    ProductSchema
  );
