import ProductModel from "@/models/ProductModel";
import mongodbConnect from "@/utils/mongodbConnect";
import { NextResponse } from "next/server";

// get product GET /api/admin/products/[productId]
export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body

  try {
    const product = await ProductModel.findById(params.productId);

    return NextResponse.json({
      product,
      message: "Success",
    });
  } catch (error: any) {
    console.log("PRODUCT_GET_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// update product PUT /api/admin/products/[productId]
export async function PUT(
  req: Request,
  { params }: { params: { productId: string } }
) {
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
    const product = await ProductModel.findByIdAndUpdate(
      params.productId,
      {
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
      },
      { new: true }
    );

    return NextResponse.json({
      product,
      message: "Successfully Updated",
    });
  } catch (error: any) {
    console.log("PRODUCT_UPDATE_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// delete product DELETE /api/admin/products/[productId]
export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body

  try {
    const product = await ProductModel.findByIdAndDelete(params.productId);

    return NextResponse.json({
      product,
      message: "Successfully deleted the product",
    });
  } catch (error: any) {
    console.log("PRODUCT_DELETE_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
