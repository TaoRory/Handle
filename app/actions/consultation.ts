"use server"

import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/supabase";

// Định nghĩa payload tự động nhận diện từ schema của Database
type InsertRequest = Database['public']['Tables']['consultation_requests']['Insert'];

export async function submitConsultation(formData: FormData) {
    const supabase = await createClient();

    const newRequest: InsertRequest = {
        full_name: formData.get("fullName") as string,
        email: formData.get("email") as string,
        phone_number: formData.get("phone") as string,
        message: formData.get("message") as string,
    };

    const { data, error } = await supabase
        .from("consultation_requests")
        .insert(newRequest)
        .select()
        .single();

    if (error) {
        console.error("Database Error:", error.message);
        return { success: false, message: "Đã có lỗi xảy ra. Vui lòng thử lại." };
    }

    return { success: true, data };
}