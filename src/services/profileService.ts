import type { ProfileFormValues } from "../types/profile";

const SIMULATED_DELAY = 500;

const mockProfile: ProfileFormValues = {
  fullName: "علی رضایی",
  phone: "09123456789",
  password: "mockpass123",
};

export async function getProfile(): Promise<ProfileFormValues> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  return mockProfile;

  // ---- نسخه آینده ----
  // return getData<ProfileFormValues>({ endPoint: "/profile" });
}

export async function updateProfile(data: ProfileFormValues): Promise<ProfileFormValues> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  console.log("[mock] بروزرسانی پروفایل:", data);
  return data;

  // ---- نسخه آینده ----
  // return putData({ endPoint: "/profile", data });
}