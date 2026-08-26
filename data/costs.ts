import type { CostFactor, CostInclusion, Localized } from "@/types";

/*
 * What Handle's own coordination fee covers, and what moves a quote.
 *
 * The priced schedule itself lives in `data/cost-schedule.ts` — that file is a
 * transcription of the client's document and should be edited as one, while
 * these two lists are site copy about how Handle works.
 */

/**
 * What a quoted figure covers, and — the half that builds more trust — what it
 * does not. An inclusions list without exclusions reads as marketing; the
 * exclusions are the reason a reader believes the inclusions.
 */
export const costInclusions: Localized<CostInclusion[]> = {
  vi: [
    { id: "consult", icon: "stethoscope", label: "Tư vấn và thẩm định hồ sơ trước điều trị", isIncluded: true },
    { id: "match", icon: "hospital", label: "Chọn bệnh viện và bác sĩ theo đúng chuyên khoa", isIncluded: true },
    { id: "plan", icon: "clipboard-list", label: "Personal Care Plan bằng ngôn ngữ của bạn", isIncluded: true },
    { id: "interpreter", icon: "message-circle", label: "Phiên dịch y tế trong suốt quá trình khám và điều trị", isIncluded: true },
    { id: "transfer", icon: "route", label: "Đưa đón sân bay và di chuyển giữa các buổi hẹn", isIncluded: true },
    { id: "followup", icon: "phone", label: "Theo dõi sau điều trị khi bạn đã về nước", isIncluded: true },
    { id: "flight", icon: "plane", label: "Vé máy bay quốc tế", isIncluded: false },
    { id: "stay", icon: "bed-double", label: "Lưu trú ngoài số ngày nằm viện theo phác đồ", isIncluded: false },
    { id: "complication", icon: "life-buoy", label: "Chi phí phát sinh do biến chứng cần điều trị thêm", isIncluded: false },
  ],
  en: [
    { id: "consult", icon: "stethoscope", label: "Pre-treatment consultation and records review", isIncluded: true },
    { id: "match", icon: "hospital", label: "Hospital and surgeon matched to the specialty", isIncluded: true },
    { id: "plan", icon: "clipboard-list", label: "A written Personal Care Plan in your language", isIncluded: true },
    { id: "interpreter", icon: "message-circle", label: "Medical interpreting through every appointment", isIncluded: true },
    { id: "transfer", icon: "route", label: "Airport pickup and transfers between appointments", isIncluded: true },
    { id: "followup", icon: "phone", label: "Follow-up once you are home again", isIncluded: true },
    { id: "flight", icon: "plane", label: "International flights", isIncluded: false },
    { id: "stay", icon: "bed-double", label: "Accommodation beyond the planned inpatient days", isIncluded: false },
    { id: "complication", icon: "life-buoy", label: "Additional treatment arising from complications", isIncluded: false },
  ],
};

/** Why two people are quoted differently for the same procedure. */
export const costFactors: Localized<CostFactor[]> = {
  vi: [
    {
      id: "complexity",
      icon: "activity",
      title: "Mức độ phức tạp của ca",
      body: "Cùng một thủ thuật, một ca không biến chứng và một ca cần can thiệp mở rộng nằm ở hai đầu của khoảng giá.",
    },
    {
      id: "material",
      icon: "microscope",
      title: "Vật tư và thiết bị sử dụng",
      body: "Loại trụ implant, thủy tinh thể nhân tạo hay stent được chọn thường là yếu tố chênh lệch lớn nhất trong một khoảng giá.",
    },
    {
      id: "facility",
      icon: "building",
      title: "Cơ sở thực hiện",
      body: "Bệnh viện quốc tế, bệnh viện công có khoa dịch vụ và phòng khám chuyên khoa có ba mặt bằng chi phí khác nhau.",
    },
    {
      id: "stay",
      icon: "clock",
      title: "Số ngày nằm viện",
      body: "Phác đồ dự kiến bao nhiêu ngày, và ca của bạn có yếu tố nào khiến thời gian theo dõi dài hơn hay không.",
    },
  ],
  en: [
    {
      id: "complexity",
      icon: "activity",
      title: "How complex the case is",
      body: "For one procedure, a straightforward case and one needing extended intervention sit at opposite ends of the same band.",
    },
    {
      id: "material",
      icon: "microscope",
      title: "Materials and devices",
      body: "Which implant fixture, intraocular lens or stent is used is usually the single largest source of spread within a band.",
    },
    {
      id: "facility",
      icon: "building",
      title: "Where it is performed",
      body: "International hospitals, public hospitals with private wings and specialist clinics run on three different cost bases.",
    },
    {
      id: "stay",
      icon: "clock",
      title: "Length of stay",
      body: "How many inpatient days the protocol expects, and whether anything in your case extends the monitoring period.",
    },
  ],
};
