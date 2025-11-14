"use client";
import ProtectedRoute from "../_components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

          <div className="space-y-4">
            <div>
              <label className="font-semibold">Name:</label>
              <p className="text-gray-600">{user?.name}</p>
            </div>
            <div>
              <label className="font-semibold">Email:</label>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <div>
              <label className="font-semibold">Role:</label>
              <p className="text-gray-600">{user?.role}</p>
            </div>
            <div>
              <label className="font-semibold">Email Verified:</label>
              <p className="text-gray-600">{user?.email_verified ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
