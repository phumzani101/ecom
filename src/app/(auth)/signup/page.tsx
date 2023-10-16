"use client";
import config from "@/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = { name, email, password };
      const res = await fetch(`${config.apiUrl}/users/signup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        router.push("/signin");
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
                <h3 className="fw-bold mb-2">Sign Up</h3>
                <p>Follow the easy steps</p>
              </div>
            </div>
            <div className="col-12 mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="signup-name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="signup-name">Name</label>
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
                disabled={isLoading || !name || !email || !password}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* Text */}
      <div className="text-center mt-8">
        <p>
          Already have an account? <Link href="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
