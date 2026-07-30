import type { Localized, Service } from "@/types";

/**
 * Medical specialties Handle coordinates.
 *
 * `media.alt` is written as an art-direction brief — it becomes the real alt
 * text the moment a licensed photograph is dropped into `media.src`.
 */
export const services: Localized<Service[]> = {
  vi: [
    {
      id: "checkup",
      slug: "kiem-tra-suc-khoe-tong-quat",
      icon: "clipboard-list",
      title: "Kiểm tra sức khỏe tổng quát",
      body: "Gói tầm soát chuyên sâu hoàn tất trong 1–2 ngày, có kết quả song ngữ.",
      media: {
        alt: "Bác sĩ trao đổi kết quả tầm soát với khách hàng trong phòng khám sáng, tông kem ấm",
        glyph: "clipboard-list",
        tone: "linen",
      },
      isFeatured: true,
    },
    {
      id: "fertility",
      slug: "ho-tro-sinh-san-ivf",
      icon: "baby",
      title: "Hỗ trợ sinh sản (IVF)",
      body: "Đồng hành trọn chu kỳ IVF, từ đánh giá ban đầu đến theo dõi thai kỳ sớm.",
      media: {
        alt: "Bàn tay cha mẹ nâng niu bàn chân trẻ sơ sinh, ánh sáng dịu, nền vải lanh",
        glyph: "baby",
        tone: "sand",
      },
    },
    {
      id: "eye",
      slug: "dieu-tri-mat",
      icon: "scan-eye",
      title: "Điều trị mắt",
      body: "Phẫu thuật khúc xạ, đục thủy tinh thể và điều trị võng mạc với thiết bị thế hệ mới.",
      media: {
        alt: "Cận cảnh thiết bị đo khúc xạ trong phòng khám mắt, ánh sáng xanh dịu",
        glyph: "eye",
        tone: "dusk",
      },
    },
    {
      id: "dental",
      slug: "nha-khoa",
      icon: "smile",
      title: "Nha khoa",
      body: "Cấy ghép implant, chỉnh nha trong suốt và phục hình thẩm mỹ toàn hàm.",
      media: {
        alt: "Ghế nha khoa hiện đại trong phòng điều trị tối giản, tông trắng kem",
        glyph: "smile",
        tone: "sage",
      },
    },
    {
      id: "aesthetic",
      slug: "tham-my",
      icon: "sparkles",
      title: "Thẩm mỹ",
      body: "Phẫu thuật thẩm mỹ và trẻ hóa da, thực hiện bởi bác sĩ được cấp chứng chỉ hành nghề.",
      media: {
        alt: "Không gian phòng khám thẩm mỹ tối giản với ánh sáng khuếch tán và chất liệu đá ấm",
        glyph: "sparkles",
        tone: "gold",
      },
    },
    {
      id: "cardio",
      slug: "tim-mach",
      icon: "heart-pulse",
      title: "Tim mạch",
      body: "Can thiệp mạch vành, điện sinh lý và chương trình phục hồi chức năng tim.",
      media: {
        alt: "Màn hình theo dõi nhịp tim trong phòng can thiệp, tông xanh trầm",
        glyph: "heart-pulse",
        tone: "clay",
      },
    },
  ],
  en: [
    {
      id: "checkup",
      slug: "executive-health-screening",
      icon: "clipboard-list",
      title: "Executive health screening",
      body: "A deep diagnostic package completed in one to two days, reported in both languages.",
      media: {
        alt: "A doctor talking a patient through screening results in a bright, cream-toned clinic",
        glyph: "clipboard-list",
        tone: "linen",
      },
      isFeatured: true,
    },
    {
      id: "fertility",
      slug: "fertility-ivf",
      icon: "baby",
      title: "Fertility & IVF",
      body: "Support across the full IVF cycle, from first assessment to early pregnancy monitoring.",
      media: {
        alt: "Parents' hands cradling a newborn's feet, soft light on a linen background",
        glyph: "baby",
        tone: "sand",
      },
    },
    {
      id: "eye",
      slug: "ophthalmology",
      icon: "scan-eye",
      title: "Ophthalmology",
      body: "Refractive surgery, cataract procedures and retinal care on current-generation equipment.",
      media: {
        alt: "Close-up of refraction equipment in an eye clinic under soft blue light",
        glyph: "eye",
        tone: "dusk",
      },
    },
    {
      id: "dental",
      slug: "dental-care",
      icon: "smile",
      title: "Dental care",
      body: "Implants, clear aligners and full-arch aesthetic restoration.",
      media: {
        alt: "A modern dental chair in a minimal treatment room, white and cream tones",
        glyph: "smile",
        tone: "sage",
      },
    },
    {
      id: "aesthetic",
      slug: "aesthetics",
      icon: "sparkles",
      title: "Aesthetics",
      body: "Cosmetic surgery and skin rejuvenation, performed only by board-certified surgeons.",
      media: {
        alt: "A minimal aesthetic clinic interior with diffused light and warm stone surfaces",
        glyph: "sparkles",
        tone: "gold",
      },
    },
    {
      id: "cardio",
      slug: "cardiology",
      icon: "heart-pulse",
      title: "Cardiology",
      body: "Coronary intervention, electrophysiology and structured cardiac rehabilitation.",
      media: {
        alt: "Cardiac monitoring displays in an intervention suite, deep blue tones",
        glyph: "heart-pulse",
        tone: "clay",
      },
    },
  ],
};
