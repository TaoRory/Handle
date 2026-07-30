import type { Localized, Reason } from "@/types";

/**
 * "Why is treatment abroad even a question?" — the tension band.
 *
 * Four pain points, ordered so the first two describe the problem at home and
 * the last two describe what Vietnam and a coordinator solve.
 */
export const reasons: Localized<Reason[]> = {
  vi: [
    {
      id: "waiting",
      icon: "clock",
      title: "Thời gian chờ quá lâu",
      body: "Ở nhiều hệ thống y tế công, một ca khám chuyên khoa hoặc phẫu thuật có thể kéo dài từ vài tuần đến vài tháng — trong khi bệnh không chờ.",
    },
    {
      id: "cost",
      icon: "banknote",
      title: "Chi phí điều trị quá cao",
      body: "Nhiều dịch vụ y tế có chi phí cao hơn đáng kể so với Việt Nam, ngay cả khi bạn đã có bảo hiểm chi trả một phần.",
    },
    {
      id: "value",
      icon: "shield-check",
      title: "Việt Nam mang lại hiệu quả chi phí",
      body: "Nhiều bệnh viện và bác sĩ tại Việt Nam đáp ứng tiêu chuẩn quốc tế với mức chi phí hợp lý hơn nhiều lần.",
    },
    {
      id: "logistics",
      icon: "users-round",
      title: "Tự sắp xếp không hề đơn giản",
      body: "Lịch hẹn, hồ sơ bệnh án, visa, đưa đón, chỗ ở, phiên dịch, theo dõi sau điều trị — mỗi khâu là một đầu mối khác nhau.",
    },
  ],
  en: [
    {
      id: "waiting",
      icon: "clock",
      title: "The waiting list is too long",
      body: "In many public systems a specialist appointment or a surgical slot can be weeks or months away — while the condition does not wait.",
    },
    {
      id: "cost",
      icon: "banknote",
      title: "Treatment costs too much",
      body: "Common procedures cost several times more at home than in Vietnam, even after insurance covers part of the bill.",
    },
    {
      id: "value",
      icon: "shield-check",
      title: "Vietnam delivers real value",
      body: "Accredited hospitals and internationally trained specialists meet the same standards at a fraction of the price.",
    },
    {
      id: "logistics",
      icon: "users-round",
      title: "Arranging it yourself is hard",
      body: "Appointments, medical records, visas, transfers, accommodation, interpreting, follow-up — every step is a different point of contact.",
    },
  ],
};
