import type { Advantage, Localized } from "@/types";

/** The six commitments in "Why choose Handle". Order is deliberate. */
export const advantages: Localized<Advantage[]> = {
  vi: [
    {
      id: "single-contact",
      icon: "user-round-check",
      title: "Một đầu mối duy nhất",
      body: "Một điều phối viên chịu trách nhiệm làm việc với bệnh viện, bác sĩ, khách sạn và nhà cung cấp dịch vụ — khách hàng chỉ cần liên hệ qua 1 trợ lý cá nhân duy nhất để hành trình trải nghiệm được xuyên suốt và bảo mật.",
    },
    {
      id: "care-plan",
      icon: "clipboard-list",
      title: "Kế hoạch chăm sóc cá nhân hóa",
      body: "Mỗi khách hàng nhận một Personal Care Plan bằng ngôn ngữ của mình, xây dựng theo bệnh án và điều kiện riêng.",
    },
    {
      id: "transparent",
      icon: "receipt",
      title: "Minh bạch chi phí",
      body: "Báo giá chi tiết, không phí ẩn. Bạn biết trước từng khoản chi phí và hoàn toàn chủ động, tự do quyết định cho các dịnh vụ.",
    },
    {
      id: "network",
      icon: "hospital",
      title: "Đội ngũ y tế đáng tin cậy",
      body: "Chỉ hợp tác với bệnh viện đạt chuẩn và bác sĩ có hồ sơ chuyên môn được thẩm định độc lập.",
    },
    {
      id: "support",
      icon: "message-circle",
      title: "Đồng hành tại Việt Nam",
      body: "Hỗ trợ 24/7 trong suốt thời gian bạn ở Việt Nam, bằng ngôn ngữ bạn thấy thoải mái nhất.",
    },
    {
      id: "aftercare",
      icon: "life-buoy",
      title: "Hỗ trợ sau điều trị",
      body: "Theo dõi và hỗ trợ từ xa sau khi bạn về nước, kết nối lại với bác sĩ điều trị khi cần.",
    },
  ],
  en: [
    {
      id: "single-contact",
      icon: "user-round-check",
      title: "One point of contact",
      body: "A single coordinator manages all interactions with hospitals, doctors, hotels, and service providers — clients only need to contact one dedicated medical assistant for a seamless and confidential journey.",
    },
    {
      id: "care-plan",
      icon: "clipboard-list",
      title: "A personalised care plan",
      body: "Every patient receives a written Personal Care Plan in their own language, built around their records and circumstances.",
    },
    {
      id: "transparent",
      icon: "receipt",
      title: "Transparent pricing",
      body: "Detailed quotes, no hidden fees. You know every cost upfront, giving you complete control and the freedom to decide on services.",
    },
    {
      id: "network",
      icon: "hospital",
      title: "A vetted medical network",
      body: "We work only with accredited hospitals and specialists whose credentials we have independently verified.",
    },
    {
      id: "support",
      icon: "message-circle",
      title: "Support on the ground",
      body: "Round-the-clock help for the whole time you are in Vietnam, in whichever language you are most comfortable using.",
    },
    {
      id: "aftercare",
      icon: "life-buoy",
      title: "Aftercare once you are home",
      body: "Remote follow-up after you fly back, and a direct line to your treating doctor whenever you need it.",
    },
  ],
};
