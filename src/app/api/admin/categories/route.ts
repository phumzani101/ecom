import CategoryModel from "@/models/CategoryModel";
import mongodbConnect from "@/utils/mongodbConnect";
import { NextResponse } from "next/server";

// create category POST /api/admin/categories
export async function GET(req: Request) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body

  try {
    let categories = await CategoryModel.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      categories,
      message: "Success",
    });
  } catch (error: any) {
    console.log("CATEGORY_LIST_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// create category POST /api/admin/categories
export async function POST(req: Request) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body
  const { name, icon } = await req.json();

  try {
    let category = new CategoryModel({ name, icon });
    category = await category.save();
    return NextResponse.json({
      category,
      message: "Successfully registered, please sign in",
    });
  } catch (error: any) {
    console.log("CATEGORY_CREATE_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
