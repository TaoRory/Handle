import type { CostFactor, CostInclusion, CostItem, Localized } from "@/types";

/* ------------------------------------------------------------------ *
 *  ⚠️  REFERENCE BANDS — VERIFY BEFORE LAUNCH
 *
 *  These are market reference ranges compiled from publicly reported
 *  Vietnamese medical-tourism pricing, not quotes Handle has issued. They
 *  are here so the page has the shape and the substance it needs; they are
 *  not yet Handle's numbers.
 *
 *  This is the highest-risk placeholder on the site, and it is a different
 *  category from the invented testimonials and stats elsewhere: a reader
 *  books a flight against a price. Two consequences follow, and neither is
 *  optional.
 *
 *  1. Every band is published as a *range* and framed on the page as a
 *     reference, never as a quote. A single number reads as a promise.
 *  2. No price is emitted into the JSON-LD graph. `Offer.priceSpecification`
 *     is what earns a price-rich result, and feeding a crawler figures no
 *     one has committed to is the same error as the `AggregateRating` that
 *     was removed from `lib/json-ld.ts` — a machine-readable claim about a
 *     business, made by a machine. It goes in the day the numbers are real.
 *
 *  The comparison column is the United States throughout. One system, named
 *  in the row, because a comparison against an unnamed "abroad" is not a
 *  comparison — and quietly picking whichever country flattered the gap most
 *  per row would be the dishonest version of this table.
 * ------------------------------------------------------------------ */

export const costItems: Localized<CostItem[]> = {
  vi: [
    {
      id: "checkup-full",
      serviceId: "checkup",
      procedure: "Tầm soát sức khỏe tổng quát chuyên sâu",
      unit: "trọn gói",
      usd: { from: 300, to: 1200 },
      vnd: { from: 8, to: 31 },
      abroad: { from: 2000, to: 5000 },
      abroadRegion: "Mỹ",
      note: "Hoàn tất trong 1–2 ngày, kết quả song ngữ.",
    },
    {
      id: "ivf-cycle",
      serviceId: "fertility",
      procedure: "Thụ tinh ống nghiệm (IVF)",
      unit: "một chu kỳ",
      usd: { from: 4000, to: 6500 },
      vnd: { from: 104, to: 169 },
      abroad: { from: 15000, to: 25000 },
      abroadRegion: "Mỹ",
      note: "Chưa gồm thuốc kích trứng và trữ phôi.",
    },
    {
      id: "ivf-freeze",
      serviceId: "fertility",
      procedure: "Trữ đông phôi",
      unit: "một năm",
      usd: { from: 400, to: 800 },
      vnd: { from: 10, to: 21 },
      abroad: { from: 1500, to: 3000 },
      abroadRegion: "Mỹ",
    },
    {
      id: "lasik",
      serviceId: "eye",
      procedure: "Phẫu thuật khúc xạ (LASIK / SMILE)",
      unit: "hai mắt",
      usd: { from: 1000, to: 2200 },
      vnd: { from: 26, to: 57 },
      abroad: { from: 4000, to: 6000 },
      abroadRegion: "Mỹ",
    },
    {
      id: "cataract",
      serviceId: "eye",
      procedure: "Phẫu thuật đục thủy tinh thể (Phaco)",
      unit: "mỗi mắt",
      usd: { from: 700, to: 1500 },
      vnd: { from: 18, to: 39 },
      abroad: { from: 3500, to: 7000 },
      abroadRegion: "Mỹ",
      note: "Khoảng giá thay đổi theo loại thủy tinh thể nhân tạo.",
    },
    {
      id: "implant",
      serviceId: "dental",
      procedure: "Cấy ghép implant",
      unit: "mỗi trụ",
      usd: { from: 700, to: 1600 },
      vnd: { from: 18, to: 42 },
      abroad: { from: 3000, to: 6000 },
      abroadRegion: "Mỹ",
      note: "Đã gồm trụ, abutment và mão sứ.",
    },
    {
      id: "aligner",
      serviceId: "dental",
      procedure: "Chỉnh nha trong suốt",
      unit: "trọn liệu trình",
      usd: { from: 2000, to: 4500 },
      vnd: { from: 52, to: 117 },
      abroad: { from: 5000, to: 8000 },
      abroadRegion: "Mỹ",
    },
    {
      id: "rhinoplasty",
      serviceId: "aesthetic",
      procedure: "Nâng mũi cấu trúc",
      unit: "một lần",
      usd: { from: 1800, to: 4000 },
      vnd: { from: 47, to: 104 },
      abroad: { from: 8000, to: 15000 },
      abroadRegion: "Mỹ",
    },
    {
      id: "stent",
      serviceId: "cardio",
      procedure: "Can thiệp mạch vành, đặt stent",
      unit: "một lần",
      usd: { from: 5000, to: 9000 },
      vnd: { from: 130, to: 234 },
      abroad: { from: 30000, to: 60000 },
      abroadRegion: "Mỹ",
      note: "Chưa gồm ngày nằm viện kéo dài ngoài phác đồ.",
    },
  ],
  en: [
    {
      id: "checkup-full",
      serviceId: "checkup",
      procedure: "Executive health screening",
      unit: "full package",
      usd: { from: 300, to: 1200 },
      vnd: { from: 8, to: 31 },
      abroad: { from: 2000, to: 5000 },
      abroadRegion: "the US",
      note: "Completed in one to two days, reported in both languages.",
    },
    {
      id: "ivf-cycle",
      serviceId: "fertility",
      procedure: "IVF",
      unit: "per cycle",
      usd: { from: 4000, to: 6500 },
      vnd: { from: 104, to: 169 },
      abroad: { from: 15000, to: 25000 },
      abroadRegion: "the US",
      note: "Stimulation medication and embryo storage not included.",
    },
    {
      id: "ivf-freeze",
      serviceId: "fertility",
      procedure: "Embryo freezing",
      unit: "per year",
      usd: { from: 400, to: 800 },
      vnd: { from: 10, to: 21 },
      abroad: { from: 1500, to: 3000 },
      abroadRegion: "the US",
    },
    {
      id: "lasik",
      serviceId: "eye",
      procedure: "Refractive surgery (LASIK / SMILE)",
      unit: "both eyes",
      usd: { from: 1000, to: 2200 },
      vnd: { from: 26, to: 57 },
      abroad: { from: 4000, to: 6000 },
      abroadRegion: "the US",
    },
    {
      id: "cataract",
      serviceId: "eye",
      procedure: "Cataract surgery (phaco)",
      unit: "per eye",
      usd: { from: 700, to: 1500 },
      vnd: { from: 18, to: 39 },
      abroad: { from: 3500, to: 7000 },
      abroadRegion: "the US",
      note: "The band moves with the intraocular lens chosen.",
    },
    {
      id: "implant",
      serviceId: "dental",
      procedure: "Dental implant",
      unit: "per implant",
      usd: { from: 700, to: 1600 },
      vnd: { from: 18, to: 42 },
      abroad: { from: 3000, to: 6000 },
      abroadRegion: "the US",
      note: "Fixture, abutment and crown included.",
    },
    {
      id: "aligner",
      serviceId: "dental",
      procedure: "Clear aligner treatment",
      unit: "full course",
      usd: { from: 2000, to: 4500 },
      vnd: { from: 52, to: 117 },
      abroad: { from: 5000, to: 8000 },
      abroadRegion: "the US",
    },
    {
      id: "rhinoplasty",
      serviceId: "aesthetic",
      procedure: "Structural rhinoplasty",
      unit: "per procedure",
      usd: { from: 1800, to: 4000 },
      vnd: { from: 47, to: 104 },
      abroad: { from: 8000, to: 15000 },
      abroadRegion: "the US",
    },
    {
      id: "stent",
      serviceId: "cardio",
      procedure: "Coronary intervention with stent",
      unit: "per procedure",
      usd: { from: 5000, to: 9000 },
      vnd: { from: 130, to: 234 },
      abroad: { from: 30000, to: 60000 },
      abroadRegion: "the US",
      note: "Excludes inpatient days beyond the planned protocol.",
    },
  ],
};

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
