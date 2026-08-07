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
        alt: "Ống nghe và điện thoại đặt trên bàn khám sáng màu",
        src: "/images/photos/service-checkup.jpg",
        width: 1080,
        height: 810,
        blurDataURL:
          "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACwAQCdASoMAAkAA4BaJaQAAvaf8KLAAP72JG+7MBYCNronVvjcrOS11cVzr8bfd0yFHXZYAAA=",
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
        alt: "Bàn chân trẻ sơ sinh trên tấm chăn vải mềm",
        src: "/images/photos/service-fertility.jpg",
        width: 1080,
        height: 810,
        blurDataURL:
          "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADQAQCdASoMAAkAA4BaJQBOgCBvgeMeAAD+lKOO5DNgBS08G7cry035MHXpeK+Vt63Kcqb0z0onocqKvzh6HSFAAAA=",
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
        alt: "Cặp kính đặt trên mặt gỗ ấm dưới nắng chiều",
        src: "/images/photos/service-eye.jpg",
        width: 1080,
        height: 810,
        blurDataURL:
          "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoMAAkAA4BaJYgCdAEAI7ul6SAA/pT917zqA+VLEtKLGAEDH6Wicprn3lQzvZJIHNyl2SRtKYvZElei5b0mvSNAsngUQAAA",
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
        alt: "Màn hình siêu âm trong phòng chẩn đoán hình ảnh",
        src: "/images/photos/service-cardio.jpg",
        width: 1080,
        height: 810,
        blurDataURL:
          "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoMAAkAA4BaJZQCw7D2OC7TBAAA/uftQx5Na1JRtqN81vxkWd7VdeZd63SmaZ9UqxejcHNEAGFNtQkm7c4AAA==",
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
        alt: "Màn hình siêu âm trong phòng chẩn đoán hình ảnh",
        src: "/images/photos/tieu-hoa.png",
        width: 1080,
        height: 810,
        blurDataURL:
          "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoMAAkAA4BaJZQCw7D2OC7TBAAA/uftQx5Na1JRtqN81vxkWd7VdeZd63SmaZ9UqxejcHNEAGFNtQkm7c4AAA==",
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
        alt: "A stethoscope and a phone on a bright clinic desk",
        src: "/images/photos/service-checkup.jpg",
        width: 1080,
        height: 810,
        blurDataURL:
          "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACwAQCdASoMAAkAA4BaJaQAAvaf8KLAAP72JG+7MBYCNronVvjcrOS11cVzr8bfd0yFHXZYAAA=",
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
        alt: "A newborn's feet resting on a soft woven blanket",
        src: "/images/photos/service-fertility.jpg",
        width: 1080,
        height: 810,
        blurDataURL:
          "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADQAQCdASoMAAkAA4BaJQBOgCBvgeMeAAD+lKOO5DNgBS08G7cry035MHXpeK+Vt63Kcqb0z0onocqKvzh6HSFAAAA=",
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
        alt: "A pair of glasses on a warm wooden surface in late light",
        src: "/images/photos/service-eye.jpg",
        width: 1080,
        height: 810,
        blurDataURL:
          "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoMAAkAA4BaJYgCdAEAI7ul6SAA/pT917zqA+VLEtKLGAEDH6Wicprn3lQzvZJIHNyl2SRtKYvZElei5b0mvSNAsngUQAAA",
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
        alt: "An ultrasound monitor in a diagnostic imaging room",
        src: "/images/photos/service-cardio.jpg",
        width: 1080,
        height: 810,
        blurDataURL:
          "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoMAAkAA4BaJZQCw7D2OC7TBAAA/uftQx5Na1JRtqN81vxkWd7VdeZd63SmaZ9UqxejcHNEAGFNtQkm7c4AAA==",
        glyph: "heart-pulse",
        tone: "clay",
      },
    },
    {
      id: "digestive",
      slug: "tieu-hoa",
      icon: "salad",
      title: "Digestive",
      body: "Treatment for ulcers and GERD, gastrointestinal cancer screening, and painless endoscopy.",
      media: {
        alt: "Màn hình siêu âm trong phòng chẩn đoán hình ảnh",
        src: "/images/photos/tieu-hoa.png",
        width: 1080,
        height: 810,
        blurDataURL:
          "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADwAQCdASoMAAkAA4BaJZQCw7D2OC7TBAAA/uftQx5Na1JRtqN81vxkWd7VdeZd63SmaZ9UqxejcHNEAGFNtQkm7c4AAA==",
        glyph: "heart-pulse",
        tone: "clay",
      },
    },
  ],
};
