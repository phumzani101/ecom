import UserModel from "@/models/UserModel";
import mongodbConnect from "@/utils/mongodbConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // connect to mongodb
  await mongodbConnect();
  // get form data or req body
  const { name, email, password } = await req.json();

  try {
    let user = new UserModel({ name, email, password });
    user = await user.save();
    return NextResponse.json({
      user,
      message: "Successfully registered, please sign in",
    });
  } catch (error: any) {
    console.log("SIGNUP_ERROR", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
