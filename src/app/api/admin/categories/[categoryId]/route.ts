import CategoryModel from "@/models/CategoryModel";
import mongodbConnect from "@/utils/mongodbConnect";
import { NextResponse } from "next/server";

// get category GET /api/admin/categories/[categoryId]
export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body

  try {
    const category = await CategoryModel.findById(params.categoryId);

    return NextResponse.json({
      category,
      message: "Success",
    });
  } catch (error: any) {
    console.log("CATEGORY_GET_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// update category PUT /api/admin/categories/[categoryId]
export async function PUT(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body
  const { name, icon } = await req.json();

  try {
    const category = await CategoryModel.findByIdAndUpdate(
      params.categoryId,
      { name, icon },
      { new: true }
    );

    return NextResponse.json({
      category,
      message: "Successfully Updated",
    });
  } catch (error: any) {
    console.log("CATEGORY_UPDATE_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// delete category DELETE /api/admin/categories/[categoryId]
export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body

  try {
    const category = await CategoryModel.findByIdAndUpdate(params.categoryId);

    return NextResponse.json({
      category,
      message: "Successfully deleted the category",
    });
  } catch (error: any) {
    console.log("CATEGORY_DELETE_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
