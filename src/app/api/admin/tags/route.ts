import TagModel from "@/models/TagModel";
import mongodbConnect from "@/utils/mongodbConnect";
import { NextResponse } from "next/server";

// create tag POST /api/admin/tags
export async function GET(req: Request) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body

  try {
    let tags = await TagModel.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      tags,
      message: "Success",
    });
  } catch (error: any) {
    console.log("TAG_LIST_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// create tag POST /api/admin/tags
export async function POST(req: Request) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body
  const { name, icon, category } = await req.json();

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
    let tag = new TagModel({ name, icon, category });
    tag = await tag.save();
    return NextResponse.json({
      tag,
      message: "Successfully registered, please sign in",
    });
  } catch (error: any) {
    console.log("TAG_CREATE_ERROR", error);
    return NextResponse.json(
      { error: error?._message ? error?._message : error?.message },
      { status: 500 }
    );
  }
}
