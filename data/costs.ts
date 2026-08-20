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
      id: "fertility-ivf-1",
      category: "FERTILITY & IVF",
      serviceId: "fertility",
      procedure: "IVF Treatment",
      unit: "một chu kỳ",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "Mỹ",
      aud: { from: 0, to: 0 },
      note: "Nhập tên gói dịch vụ và khoảng giá thực tế.",
    },
    {
      id: "fertility-ivf-2",
      category: "FERTILITY & IVF",
      serviceId: "fertility",
      procedure: "Fertility Consultation & Diagnostic Workup",
      unit: "một ca",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "Mỹ",
      aud: { from: 0, to: 0 },
      note: "Bạn sẽ điền chi tiết theo từng trường hợp.",
    },
    {
      id: "gastro-1",
      category: "GASTROENTEROLOGY",
      serviceId: "digestive",
      procedure: "Gastroscopy / Upper GI Endoscopy",
      unit: "một lần",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "Mỹ",
      aud: { from: 0, to: 0 },
      note: "Thêm tên thủ thuật và bao gồm gì.",
    },
    {
      id: "gastro-2",
      category: "GASTROENTEROLOGY",
      serviceId: "digestive",
      procedure: "Colonoscopy / GI Cancer Screening",
      unit: "một lần",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "Mỹ",
      aud: { from: 0, to: 0 },
      note: "Đến đây bạn chỉnh khoảng giá và mô tả.",
    },
    {
      id: "screening-1",
      category: "COMPREHENSIVE HEALTH & CANCER SCREENING",
      serviceId: "checkup",
      procedure: "Executive Health Screening Package",
      unit: "trọn gói",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "Mỹ",
      aud: { from: 0, to: 0 },
      note: "Điền tên gói, xét nghiệm và chi phí.",
    },
    {
      id: "screening-2",
      category: "COMPREHENSIVE HEALTH & CANCER SCREENING",
      serviceId: "checkup",
      procedure: "Cancer Screening Bundle",
      unit: "trọn gói",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "Mỹ",
      aud: { from: 0, to: 0 },
      note: "Thêm các xét nghiệm lựa chọn và chi phí đi kèm.",
    },
    {
      id: "oph-1",
      category: "OPHTHALMOLOGY",
      serviceId: "eye",
      procedure: "Refractive Surgery (LASIK / SMILE)",
      unit: "hai mắt",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "Mỹ",
      aud: { from: 0, to: 0 },
      note: "Ghi phương pháp, thiết bị và giá thực tế.",
    },
    {
      id: "oph-2",
      category: "OPHTHALMOLOGY",
      serviceId: "eye",
      procedure: "Cataract Surgery",
      unit: "mỗi mắt",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "Mỹ",
      aud: { from: 0, to: 0 },
      note: "Điền loại IOL và chi phí theo từng bệnh nhân.",
    },
    {
      id: "cardio-1",
      category: "CARDIOLOGY",
      serviceId: "cardio",
      procedure: "Cardiac Consultation & Diagnostics",
      unit: "một ca",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "Mỹ",
      aud: { from: 0, to: 0 },
      note: "Thêm xét nghiệm, bác sĩ và hành trình điều trị.",
    },
    {
      id: "cardio-2",
      category: "CARDIOLOGY",
      serviceId: "cardio",
      procedure: "Coronary Angiography / Stent",
      unit: "một lần",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "Mỹ",
      aud: { from: 0, to: 0 },
      note: "Bạn điền chi phí thực tế sau khi có phác đồ.",
    },
  ],
  en: [
    {
      id: "fertility-ivf-1",
      category: "FERTILITY & IVF",
      serviceId: "fertility",
      procedure: "IVF Treatment",
      unit: "per cycle",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "the US",
      aud: { from: 0, to: 0 },
      note: "Add the package name and the actual price range.",
    },
    {
      id: "fertility-ivf-2",
      category: "FERTILITY & IVF",
      serviceId: "fertility",
      procedure: "Fertility Consultation & Diagnostic Workup",
      unit: "per consult",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "the US",
      aud: { from: 0, to: 0 },
      note: "Update with the patient case and clinic detail.",
    },
    {
      id: "gastro-1",
      category: "GASTROENTEROLOGY",
      serviceId: "digestive",
      procedure: "Gastroscopy / Upper GI Endoscopy",
      unit: "per procedure",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "the US",
      aud: { from: 0, to: 0 },
      note: "Add what the quote includes and the exact range.",
    },
    {
      id: "gastro-2",
      category: "GASTROENTEROLOGY",
      serviceId: "digestive",
      procedure: "Colonoscopy / GI Cancer Screening",
      unit: "per procedure",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "the US",
      aud: { from: 0, to: 0 },
      note: "Replace with the final clinic pricing.",
    },
    {
      id: "screening-1",
      category: "COMPREHENSIVE HEALTH & CANCER SCREENING",
      serviceId: "checkup",
      procedure: "Executive Health Screening Package",
      unit: "full package",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "the US",
      aud: { from: 0, to: 0 },
      note: "Fill in test list and package pricing.",
    },
    {
      id: "screening-2",
      category: "COMPREHENSIVE HEALTH & CANCER SCREENING",
      serviceId: "checkup",
      procedure: "Cancer Screening Bundle",
      unit: "full package",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "the US",
      aud: { from: 0, to: 0 },
      note: "Add any optional diagnostics and out-of-pocket items.",
    },
    {
      id: "oph-1",
      category: "OPHTHALMOLOGY",
      serviceId: "eye",
      procedure: "Refractive Surgery (LASIK / SMILE)",
      unit: "both eyes",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "the US",
      aud: { from: 0, to: 0 },
      note: "Add the exact technology and surgeon fee.",
    },
    {
      id: "oph-2",
      category: "OPHTHALMOLOGY",
      serviceId: "eye",
      procedure: "Cataract Surgery",
      unit: "per eye",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "the US",
      aud: { from: 0, to: 0 },
      note: "Insert lens type and procedure pricing.",
    },
    {
      id: "cardio-1",
      category: "CARDIOLOGY",
      serviceId: "cardio",
      procedure: "Cardiac Consultation & Diagnostics",
      unit: "per consult",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "the US",
      aud: { from: 0, to: 0 },
      note: "Add the test bundle and what is included.",
    },
    {
      id: "cardio-2",
      category: "CARDIOLOGY",
      serviceId: "cardio",
      procedure: "Coronary Angiography / Stent",
      unit: "per procedure",
      usd: { from: 0, to: 0 },
      vnd: { from: 0, to: 0 },
      abroad: { from: 0, to: 0 },
      abroadRegion: "the US",
      aud: { from: 0, to: 0 },
      note: "Replace this template with the final quote data.",
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
