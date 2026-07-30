import type { JourneyStep, Localized } from "@/types";

/**
 * The nine-step concierge journey.
 *
 * `step` is stored rather than derived from the array index so a CMS editor can
 * reorder or insert a stop without the numbering silently shifting.
 */
export const journeySteps: Localized<JourneyStep[]> = {
  vi: [
    {
      id: "request",
      step: "01",
      icon: "search",
      title: "Gửi yêu cầu",
      body: "Chia sẻ nhu cầu và hồ sơ y tế của bạn. Chúng tôi phản hồi trong vòng 24 giờ làm việc.",
    },
    {
      id: "consult",
      step: "02",
      icon: "stethoscope",
      title: "Tư vấn chuyên sâu",
      body: "Đội ngũ y tế đọc hồ sơ và đề xuất phương án điều trị phù hợp với tình trạng của bạn.",
    },
    {
      id: "plan",
      step: "03",
      icon: "clipboard-list",
      title: "Personal Care Plan",
      body: "Bạn nhận kế hoạch điều trị chi tiết kèm báo giá minh bạch, trước khi cam kết bất cứ điều gì.",
    },
    {
      id: "prepare",
      step: "04",
      icon: "luggage",
      title: "Chuẩn bị chuyến đi",
      body: "Chúng tôi hỗ trợ visa, vé máy bay, khách sạn và lịch trình để bạn không phải lo hậu cần.",
    },
    {
      id: "arrive",
      step: "05",
      icon: "plane",
      title: "Đến Việt Nam",
      body: "Đón tận sân bay và hỗ trợ trọn vẹn thời gian lưu trú, kể cả cho người thân đi cùng.",
    },
    {
      id: "treatment",
      step: "06",
      icon: "hospital",
      title: "Điều trị",
      body: "Điều trị tại bệnh viện và với bác sĩ đã được lựa chọn, có phiên dịch y tế đi cùng.",
    },
    {
      id: "recover",
      step: "07",
      icon: "leaf",
      title: "Phục hồi",
      body: "Nghỉ dưỡng và chăm sóc phục hồi, theo dõi sát trong giai đoạn nhạy cảm nhất.",
    },
    {
      id: "records",
      step: "08",
      icon: "file-check",
      title: "Bàn giao hồ sơ",
      body: "Toàn bộ hồ sơ, chỉ định và đơn thuốc được dịch và bàn giao trước khi bạn về nước.",
    },
    {
      id: "followup",
      step: "09",
      icon: "heart-pulse",
      title: "Theo dõi sau điều trị",
      body: "Tiếp tục theo dõi từ xa và kết nối lại với bác sĩ điều trị khi bạn đã trở về nhà.",
    },
  ],
  en: [
    {
      id: "request",
      step: "01",
      icon: "search",
      title: "Send your request",
      body: "Tell us what you need and share your medical records. We reply within one business day.",
    },
    {
      id: "consult",
      step: "02",
      icon: "stethoscope",
      title: "Clinical consultation",
      body: "Our medical team reviews your file and proposes the treatment routes that fit your case.",
    },
    {
      id: "plan",
      step: "03",
      icon: "clipboard-list",
      title: "Personal Care Plan",
      body: "You receive a detailed plan and an itemised quote — before you commit to anything.",
    },
    {
      id: "prepare",
      step: "04",
      icon: "luggage",
      title: "Prepare the trip",
      body: "We handle the visa, flights, accommodation and itinerary so the logistics are never yours.",
    },
    {
      id: "arrive",
      step: "05",
      icon: "plane",
      title: "Arrive in Vietnam",
      body: "Airport pickup and full support throughout your stay, including for family travelling with you.",
    },
    {
      id: "treatment",
      step: "06",
      icon: "hospital",
      title: "Treatment",
      body: "Care at the hospital and with the specialist you chose, with a medical interpreter beside you.",
    },
    {
      id: "recover",
      step: "07",
      icon: "leaf",
      title: "Recovery",
      body: "A calm place to recover with close monitoring through the most delicate phase.",
    },
    {
      id: "records",
      step: "08",
      icon: "file-check",
      title: "Records handover",
      body: "Every report, instruction and prescription translated and handed to you before you fly home.",
    },
    {
      id: "followup",
      step: "09",
      icon: "heart-pulse",
      title: "Follow-up",
      body: "Remote monitoring continues, and we reconnect you with your treating doctor whenever needed.",
    },
  ],
};
