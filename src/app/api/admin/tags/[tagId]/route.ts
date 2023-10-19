import TagModel from "@/models/TagModel";
import mongodbConnect from "@/utils/mongodbConnect";
import { NextResponse } from "next/server";

// get tag GET /api/admin/tags/[tagId]
export async function GET(
  req: Request,
  { params }: { params: { tagId: string } }
) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body

  try {
    const tag = await TagModel.findById(params.tagId);

    return NextResponse.json({
      tag,
      message: "Success",
    });
  } catch (error: any) {
    console.log("TAG_GET_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// update tag PUT /api/admin/tags/[tagId]
export async function PUT(
  req: Request,
  { params }: { params: { tagId: string } }
) {
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
    const tag = await TagModel.findByIdAndUpdate(
      params.tagId,
      { name, icon, category },
      { new: true }
    );

    return NextResponse.json({
      tag,
      message: "Successfully Updated",
    });
  } catch (error: any) {
    console.log("TAG_UPDATE_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// delete tag DELETE /api/admin/tags/[tagId]
export async function DELETE(
  req: Request,
  { params }: { params: { tagId: string } }
) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body

  try {
    const tag = await TagModel.findByIdAndDelete(params.tagId);

    return NextResponse.json({
      tag,
      message: "Successfully deleted the tag",
    });
  } catch (error: any) {
    console.log("TAG_DELETE_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
