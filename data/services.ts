import type { Localized, Service } from "@/types";

/**
 * Medical specialties Handle coordinates.
 *
 * Every `media.alt` here now describes the image that actually shipped, not the
 * shot that was once planned for the slot — a screen reader reads the file on
 * the server. Three of the five are composites rather than photographs and say
 * so, because "hình minh họa" is what a listener needs to know they are being
 * told about a diagram and not a patient.
 *
 * ⚠️ The five client-supplied sources are ~400–445px square. Cropped to the 4:3
 * these slots declare they land at roughly 440×330, against 1080×810 for the
 * originals they replaced. That is fine on the homepage card, which never
 * renders above ~200 CSS px, and visibly soft in the specialty-page hero, which
 * asks for ~630. Ask for ≥1200px wide originals before launch; the crop and
 * grade below will reproduce from them unchanged.
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
        alt: "Đĩa rau củ và trái cây tươi bên cuộn thước dây, hai người trao đổi qua tập hồ sơ trên bàn tư vấn",
        src: "/images/photos/service-checkup.jpg",
        width: 445,
        height: 334,
        blurDataURL:
          "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADwAQCdASoMAAkAA4BaJQBOgCHwyMnQqgAA/vOt5itg8n8+2n/w8WmwE/wcpFI4YK4as/8eEMsFRB2oj1TRBjqEYYmRel7lAAA=",
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
        alt: "Ảnh siêu âm thai đặt trên áo liền thân sơ sinh màu trắng, bên cạnh đôi giày len đan",
        src: "/images/photos/service-fertility.jpg",
        width: 400,
        height: 300,
        blurDataURL:
          "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAACQAQCdASoMAAkAA4BaJQBOgCGDsYAA/vYYCSGJNW08VfN2rD3hx6oztHD+g2dBtRUNY57WBdJCzOd0Hfm6ufQXAF6SAZ7a/UUYAAAA",
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
        alt: "Cận cảnh mắt người, có vòng ngắm quang học vẽ chồng lên tròng mắt",
        src: "/images/photos/service-eye.jpg",
        width: 419,
        height: 314,
        blurDataURL:
          "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoMAAkAA4BaJQBOgCFrhvHsgAD+sidnQ823Z9jtbDve2fXfV3ZgT4vW3Vg+Q7uHLTf79FT2fafIw0qpV+3YAAAA",
        glyph: "eye",
        tone: "dusk",
      },
    },
    // {
    //   id: "dental",
    //   slug: "nha-khoa",
    //   icon: "smile",
    //   title: "Nha khoa",
    //   body: "Cấy ghép implant, chỉnh nha trong suốt và phục hình thẩm mỹ toàn hàm.",
    //   media: {
    //     alt: "Ghế nha khoa và khay dụng cụ trong phòng điều trị sáng",
    //     src: "/images/photos/service-dental.jpg",
    //     width: 1080,
    //     height: 810,
    //     blurDataURL:
    //       "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoMAAkAA4BaJaQAAuyRpFpGEgAA/sRrRLC5E9Z+J+NNaD3YJG6EBkEe0GWqp0SJI/LO2RUX/IlfBUV5RsAAAA==",
    //     glyph: "smile",
    //     tone: "sage",
    //   },
    // },
    // {
    //   id: "aesthetic",
    //   slug: "tham-my",
    //   icon: "sparkles",
    //   title: "Thẩm mỹ",
    //   body: "Phẫu thuật thẩm mỹ và trẻ hóa da, thực hiện bởi bác sĩ được cấp chứng chỉ hành nghề.",
    //   media: {
    //     alt: "Khách hàng nhỏ tinh chất dưỡng da trên nền màu cát",
    //     src: "/images/photos/service-aesthetic.jpg",
    //     width: 1080,
    //     height: 810,
    //     blurDataURL:
    //       "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAQCdASoMAAkAA4BaJQBOgCPqVgJFxAAA/uBy+9wamv5cya9PMhLJ2skHy6YR2MJj+qrSV+AAAA==",
    //     glyph: "sparkles",
    //     tone: "gold",
    //   },
    // },
    {
      id: "cardio",
      slug: "tim-mach",
      icon: "heart-pulse",
      title: "Tim mạch",
      body: "Can thiệp mạch vành, điện sinh lý và chương trình phục hồi chức năng tim.",
      media: {
        alt: "Hình minh họa quả tim ba chiều đặt trên ống nghe, phía sau là đường điện tâm đồ",
        src: "/images/photos/service-cardio.jpg",
        width: 435,
        height: 326,
        blurDataURL:
          "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACwAQCdASoMAAkAA4BaJQBOgBubG2IAAP72WdeKzkWYBtQ0rqaEWfARk9hfbu2Fa3bvs+kHgDGlwUgkQ9ffhg09AAA=",
        glyph: "heart-pulse",
        tone: "clay",
      },
    },
    {
      id: "digestive",
      slug: "tieu-hoa",
      icon: "salad",
      title: "Tiêu hóa",
      body: "Điều trị viêm loét, trào ngược dạ dày, tầm soát ung thư đường tiêu hóa và nội soi không đau.",
      media: {
        // Was cardiology's alt on a 1.8MB PNG — an ultrasound-monitor sentence
        // describing a different specialty's picture entirely.
        alt: "Hình minh họa hệ tiêu hóa chiếu lên vùng bụng, hai bàn tay đặt hai bên",
        src: "/images/photos/service-digestive.jpg",
        width: 441,
        height: 331,
        blurDataURL:
          "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAQCdASoMAAkAA4BaJYgCdAELYSVeRkAA/t/xAxEgIwihl2+0bADUyy3hpHxpJPe9aPUZTc/JwAAA",
        glyph: "salad",
        tone: "linen",
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
        alt: "A plate of fresh vegetables and fruit beside a tape measure, two people talking over notes at a consulting desk",
        src: "/images/photos/service-checkup.jpg",
        width: 445,
        height: 334,
        blurDataURL:
          "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAADwAQCdASoMAAkAA4BaJQBOgCHwyMnQqgAA/vOt5itg8n8+2n/w8WmwE/wcpFI4YK4as/8eEMsFRB2oj1TRBjqEYYmRel7lAAA=",
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
        alt: "An ultrasound scan lying on a white babygrow, knitted booties beside it",
        src: "/images/photos/service-fertility.jpg",
        width: 400,
        height: 300,
        blurDataURL:
          "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAACQAQCdASoMAAkAA4BaJQBOgCGDsYAA/vYYCSGJNW08VfN2rD3hx6oztHD+g2dBtRUNY57WBdJCzOd0Hfm6ufQXAF6SAZ7a/UUYAAAA",
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
        alt: "A close-up of a human eye with an optical targeting reticle drawn over the iris",
        src: "/images/photos/service-eye.jpg",
        width: 419,
        height: 314,
        blurDataURL:
          "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAADQAQCdASoMAAkAA4BaJQBOgCFrhvHsgAD+sidnQ823Z9jtbDve2fXfV3ZgT4vW3Vg+Q7uHLTf79FT2fafIw0qpV+3YAAAA",
        glyph: "eye",
        tone: "dusk",
      },
    },
    // {
    //   id: "dental",
    //   slug: "dental-care",
    //   icon: "smile",
    //   title: "Dental care",
    //   body: "Implants, clear aligners and full-arch aesthetic restoration.",
    //   media: {
    //     alt: "A dental chair and instrument tray in a bright treatment room",
    //     src: "/images/photos/service-dental.jpg",
    //     width: 1080,
    //     height: 810,
    //     blurDataURL:
    //       "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoMAAkAA4BaJaQAAuyRpFpGEgAA/sRrRLC5E9Z+J+NNaD3YJG6EBkEe0GWqp0SJI/LO2RUX/IlfBUV5RsAAAA==",
    //     glyph: "smile",
    //     tone: "sage",
    //   },
    // },
    // {
    //   id: "aesthetic",
    //   slug: "aesthetics",
    //   icon: "sparkles",
    //   title: "Aesthetics",
    //   body: "Cosmetic surgery and skin rejuvenation, performed only by board-certified surgeons.",
    //   media: {
    //     alt: "A client applying a skincare serum against a sand-toned backdrop",
    //     src: "/images/photos/service-aesthetic.jpg",
    //     width: 1080,
    //     height: 810,
    //     blurDataURL:
    //       "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAQCdASoMAAkAA4BaJQBOgCPqVgJFxAAA/uBy+9wamv5cya9PMhLJ2skHy6YR2MJj+qrSV+AAAA==",
    //     glyph: "sparkles",
    //     tone: "gold",
    //   },
    // },
    {
      id: "cardio",
      slug: "cardiology",
      icon: "heart-pulse",
      title: "Cardiology",
      body: "Coronary intervention, electrophysiology and structured cardiac rehabilitation.",
      media: {
        alt: "A three-dimensional illustration of a heart resting on a stethoscope, an ECG trace behind it",
        src: "/images/photos/service-cardio.jpg",
        width: 435,
        height: 326,
        blurDataURL:
          "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACwAQCdASoMAAkAA4BaJQBOgBubG2IAAP72WdeKzkWYBtQ0rqaEWfARk9hfbu2Fa3bvs+kHgDGlwUgkQ9ffhg09AAA=",
        glyph: "heart-pulse",
        tone: "clay",
      },
    },
    {
      id: "digestive",
      // English slug, like every other record in this locale. It was `tieu-hoa`
      // — safe to change because the route 404'd until now, so there is no live
      // URL to redirect.
      slug: "digestive-care",
      icon: "salad",
      title: "Digestive",
      body: "Treatment for ulcers and GERD, gastrointestinal cancer screening, and painless endoscopy.",
      media: {
        alt: "An illustration of the digestive tract overlaid on an abdomen, a hand resting either side",
        src: "/images/photos/service-digestive.jpg",
        width: 441,
        height: 331,
        blurDataURL:
          "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAQCdASoMAAkAA4BaJYgCdAELYSVeRkAA/t/xAxEgIwihl2+0bADUyy3hpHxpJPe9aPUZTc/JwAAA",
        glyph: "salad",
        tone: "linen",
      },
    },
  ],
};
