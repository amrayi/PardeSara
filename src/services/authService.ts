import type { User } from "../types/user";

const SIMULATED_DELAY = 600;
const MOCK_OTP_CODE = "12345"; // برای تست: همیشه همین کد رو وارد کن

export async function sendOtp(phone: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  console.log(`[mock] کد تایید برای ${phone} ارسال شد. کد تستی: ${MOCK_OTP_CODE}`);

  // ---- نسخه آینده ----
  // return postData({ endPoint: "/auth/send-otp", data: { phone } });
}

export async function verifyOtp(
  phone: string,
  code: string
): Promise<{ user: User; token: string }> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

  if (code !== MOCK_OTP_CODE) {
    throw new Error("کد تایید اشتباه است.");
  }

  return {
    user: { id: "u1", fullName: "کاربر مهمان", email: "", phone, role: "customer" },
    token: "mock-token-abc123",
  };

  // ---- نسخه آینده ----
  // return postData({ endPoint: "/auth/verify-otp", data: { phone, code } });
}