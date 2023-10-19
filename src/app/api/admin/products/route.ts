import ProductModel from "@/models/ProductModel";
import mongodbConnect from "@/utils/mongodbConnect";
import { NextResponse } from "next/server";
import queryString from "query-string";

// create product POST /api/admin/products
export async function GET(req: Request) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body

  try {
    const searchParams = queryString.parseUrl(req.url).query;
    const { page = 1, limit = 10 } = searchParams || {};
    let query = {};

    const myCustomLabels = {
      totalDocs: "totalProducts",
      docs: "products",
    };

    const options = {
      page: page,
      limit: limit,
      customLabels: myCustomLabels,
    };

    // @ts-ignore: Unreachable code error
    let results = await ProductModel.paginate(query, options);

    return NextResponse.json({
      ...results,
      message: "Success",
    });
  } catch (error: any) {
    console.log("PRODUCT_LIST_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// create product POST /api/admin/products
export async function POST(req: Request) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body
  const {
    name,
    description,
    price,
    previousPrice,
    onSale,
    color,
    brand,
    stock,
    shipping,
    image,
    sold,
    category,
    tags,
  } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    );
  }

  try {
    let product = new ProductModel({
      name,
      description,
      price,
      previousPrice,
      onSale,
      color,
      brand,
      stock,
      shipping,
      image,
      sold,
      category,
      tags,
    });
    product = await product.save();
    return NextResponse.json({
      product,
      message: "Successfully registered, please sign in",
    });
  } catch (error: any) {
    console.log("PRODUCT_CREATE_ERROR", error);
    return NextResponse.json(
      { error: error?._message ? error?._message : error?.message },
      { status: 500 }
    );
  }
}
