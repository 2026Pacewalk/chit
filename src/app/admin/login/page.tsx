import type { Metadata } from "next";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-md py-16">
      <h1 className="text-center font-display text-3xl font-semibold text-ink-950">
        Admin Login
      </h1>
      <div className="gold-rule mx-auto mt-5 w-24" />
      <AdminLoginForm />
    </div>
  );
}
