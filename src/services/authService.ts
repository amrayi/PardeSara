import type { User } from "../types/user";

const SIMULATED_DELAY = 600;
const MOCK_PHONE = "09123456789";
const MOCK_PASSWORD = "123456";

export async function login(
  phone: string,
  password: string
): Promise<{ user: User; token: string }> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

  if (phone !== MOCK_PHONE || password !== MOCK_PASSWORD) {
    throw new Error("شماره موبایل یا رمز عبور اشتباه است.");
  }

  return {
    user: { 
      id: "u1", 
      fullName: "کاربر مهمان", 
      email: "", 
      phone, 
      role: "customer" as const
    },
    token: "mock-token-abc123",
  };
}

export async function signup(
  fullName: string,
  phone: string,
  password: string
): Promise<{ user: User; token: string }> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

  // فعلاً فقط mock - در نسخه واقعی چک می‌کنیم که شماره تکراری نباشه
  console.log(`[mock] ثبت‌نام موفق: ${fullName} - ${phone}`);

  return {
    user: { 
      id: "u" + Date.now(), 
      fullName, 
      email: "", 
      phone, 
      role: "customer" as const
    },
    token: "mock-token-" + Date.now(),
  };

  // ---- نسخه آینده ----
  // return postData({ endPoint: "/auth/signup", data: { fullName, phone, password } });
}