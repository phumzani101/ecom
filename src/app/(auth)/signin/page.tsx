"use client";
import config from "@/config";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = { email, password, redirect: false };
      const result = await signIn("credentials", formData);

      if (result?.error) {
        toast.error(result?.error);
      } else {
        toast.success("Welcome back!");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        className="card card-shadow border bg-light mb-3"
        onSubmit={handleSubmit}
      >
        <div className="card-body">
          <div className="row g-6">
            <div className="col-12 mb-3">
              <div className="text-center">
                <h3 className="fw-bold mb-2">Sign In</h3>
                <p>Login to your account</p>
              </div>
            </div>

            <div className="col-12 mb-3">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="signup-email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="signup-email">Email</label>
              </div>
            </div>
            <div className="col-12 mb-3">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="signup-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="signup-password">Password</label>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn btn-block btn-lg btn-primary w-100"
                type="submit"
                disabled={isLoading || !email || !password}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* Text */}
      <div className="text-center mt-8">
        <p>
          Do not have an account yet? <Link href="/signup">Sign up</Link>
        </p>
        <p>
          <Link href="/password/reset">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
