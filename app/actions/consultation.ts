"use server";

import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";

// Định nghĩa payload tự động nhận diện từ schema của Database
type InsertRequest = Database["public"]["Tables"]["consultation_requests"]["Insert"];

type Locale = "vi" | "en";

export type ConsultationFieldErrors = Partial<
  Record<"fullName" | "email" | "phone" | "message", string>
>;

export interface ConsultationState {
  success: boolean;
  message: string;
  fieldErrors?: ConsultationFieldErrors;
}

const defaultState: ConsultationState = {
  success: false,
  message: "",
};

const messages = {
  vi: {
    required: "Vui lòng điền đủ các trường bắt buộc.",
    invalidEmail: "Vui lòng nhập email hợp lệ.",
    success: "Cảm ơn bạn. Chúng tôi đã nhận thông tin và sẽ phản hồi sớm nhất có thể.",
    error: "Đã có lỗi xảy ra. Vui lòng thử lại.",
    name: "Vui lòng nhập họ tên.",
    email: "Vui lòng nhập email.",
    phone: "Vui lòng nhập số điện thoại.",
    message: "Vui lòng để lại nhu cầu của bạn.",
  },
  en: {
    required: "Please fill in all required fields.",
    invalidEmail: "Please enter a valid email address.",
    success: "Thank you. We received your details and will reply as soon as possible.",
    error: "Something went wrong. Please try again.",
    name: "Please enter your name.",
    email: "Please enter your email.",
    phone: "Please enter your phone number.",
    message: "Please tell us what you need.",
  },
} as const;

function normalizeLocale(value: FormDataEntryValue | null): Locale {
  return value === "vi" ? "vi" : "en";
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitConsultation(
  _previousState: ConsultationState,
  formData: FormData,
): Promise<ConsultationState> {
  const locale = normalizeLocale(formData.get("locale"));
  const copy = messages[locale];

  // Validate before touching Supabase: a visitor who mistypes their email
  // should get that back even if the database is unreachable.
  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  const fullName = getText(formData, "fullName");
  const email = getText(formData, "email");
  const phone = getText(formData, "phone");
  const message = getText(formData, "message");

  const fieldErrors: ConsultationFieldErrors = {};

  if (!fullName) fieldErrors.fullName = copy.name;
  if (!email) fieldErrors.email = copy.email;
  if (!phone) fieldErrors.phone = copy.phone;
  if (!message) fieldErrors.message = copy.message;

  if (email && !isValidEmail(email)) {
    fieldErrors.email = copy.invalidEmail;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      message: copy.required,
      fieldErrors,
    };
  }

  // Without credentials `createClient` throws, which would surface as an
  // unhandled server-action rejection rather than something the visitor can
  // read. Fail with the same message any other write failure produces.
  if (!isConfigured) {
    console.error("Supabase is not configured; consultation request dropped.");
    return { success: false, message: copy.error };
  }

  const supabase = await createClient();

  const newRequest: InsertRequest = {
    full_name: fullName,
    email,
    phone_number: phone,
    message,
  };

  const { error } = await supabase
    .from("consultation_requests")
    .insert(newRequest)
    .select()
    .single();

  if (error) {
    console.error("Database Error:", error.message);
    return { success: false, message: copy.error };
  }

  return { success: true, message: copy.success };
}

export const consultationInitialState = defaultState;
