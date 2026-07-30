import type { Localized, Testimonial } from "@/types";

/**
 * Patient stories.
 *
 * Illustrative sample content for the design build — replace with consented,
 * verifiable quotes before launch. Names are partially anonymised in the same
 * shape a real post-treatment survey would be published.
 */
export const testimonials: Localized<Testimonial[]> = {
  vi: [
    {
      id: "jessica",
      quote:
        "Handle đã tổ chức hành trình của gia đình tôi một cách thật suôn sẻ. Bệnh viện tuyệt vời, đội ngũ chăm sóc hơn cả mong đợi, và tôi luôn biết bước tiếp theo là gì.",
      author: "Jessica L.",
      context: "Kiểm tra sức khỏe tổng quát · 2025",
      location: "Melbourne, Úc",
      rating: 5,
      media: {
        alt: "Chân dung Jessica L. tại nhà, ánh sáng tự nhiên",
        glyph: "users-round",
        tone: "sand",
      },
    },
    {
      id: "michael",
      quote:
        "Từ lúc đón ở sân bay đến buổi tái khám cuối cùng, mọi thứ đều được chuẩn bị sẵn. Có người phiên dịch trong mỗi buổi hẹn khiến tôi thật sự yên tâm.",
      author: "Michael R.",
      context: "Phẫu thuật tim mạch · 2025",
      location: "Vancouver, Canada",
      rating: 5,
      media: {
        alt: "Chân dung Michael R. ngoài trời, tông xám ấm",
        glyph: "heart-pulse",
        tone: "clay",
      },
    },
    {
      id: "sophie",
      quote:
        "Chi phí thấp hơn đáng kể so với báo giá tôi nhận ở Singapore, nhưng chất lượng chăm sóc thì không hề kém. Báo giá ban đầu đúng đến từng khoản.",
      author: "Sophie T.",
      context: "Phẫu thuật mắt · 2024",
      location: "Singapore",
      rating: 5,
      media: {
        alt: "Chân dung Sophie T. trong văn phòng sáng",
        glyph: "eye",
        tone: "dusk",
      },
    },
    {
      id: "daniel",
      quote:
        "Tôi đã tự tìm hiểu suốt nhiều tháng và vẫn bế tắc. Handle sắp xếp xong toàn bộ trong hai tuần, kèm một kế hoạch tôi thật sự hiểu được.",
      author: "Daniel K.",
      context: "Nha khoa phục hình · 2025",
      location: "Seoul, Hàn Quốc",
      rating: 5,
      media: {
        alt: "Chân dung Daniel K. bên cửa sổ, tông trung tính",
        glyph: "smile",
        tone: "sage",
      },
    },
    {
      id: "amelie",
      quote:
        "Điều khiến tôi bất ngờ nhất là phần sau điều trị. Ba tháng sau khi về nước, họ vẫn chủ động liên hệ để theo dõi tiến triển của tôi.",
      author: "Amélie D.",
      context: "Hỗ trợ sinh sản (IVF) · 2024",
      location: "Lyon, Pháp",
      rating: 5,
      media: {
        alt: "Chân dung Amélie D. trong không gian ấm",
        glyph: "baby",
        tone: "linen",
      },
    },
    {
      id: "hoang",
      quote:
        "Mẹ tôi không nói tiếng Anh và tôi thì ở nước ngoài. Có một điều phối viên duy nhất cập nhật cho cả hai chúng tôi là điều tôi biết ơn nhất.",
      author: "Hoàng N.",
      context: "Chăm sóc người thân · 2025",
      location: "Sydney, Úc",
      rating: 5,
      media: {
        alt: "Chân dung Hoàng N. ngoài trời buổi chiều",
        glyph: "hand-heart",
        tone: "gold",
      },
    },
  ],
  en: [
    {
      id: "jessica",
      quote:
        "Handle organised my family's trip so smoothly. The hospital was excellent, the care team went beyond what we expected, and I always knew what came next.",
      author: "Jessica L.",
      context: "Executive health screening · 2025",
      location: "Melbourne, Australia",
      rating: 5,
      media: {
        alt: "Portrait of Jessica L. at home in natural light",
        glyph: "users-round",
        tone: "sand",
      },
    },
    {
      id: "michael",
      quote:
        "From the airport pickup to the final review, everything was already arranged. Having an interpreter in every appointment is what actually put me at ease.",
      author: "Michael R.",
      context: "Cardiac surgery · 2025",
      location: "Vancouver, Canada",
      rating: 5,
      media: {
        alt: "Portrait of Michael R. outdoors in warm grey tones",
        glyph: "heart-pulse",
        tone: "clay",
      },
    },
    {
      id: "sophie",
      quote:
        "It cost far less than the quote I was given in Singapore, and the standard of care was not a step down. The original estimate held, line for line.",
      author: "Sophie T.",
      context: "Eye surgery · 2024",
      location: "Singapore",
      rating: 5,
      media: {
        alt: "Portrait of Sophie T. in a bright office",
        glyph: "eye",
        tone: "dusk",
      },
    },
    {
      id: "daniel",
      quote:
        "I had been researching on my own for months and getting nowhere. Handle had it arranged in two weeks, with a plan I could actually follow.",
      author: "Daniel K.",
      context: "Restorative dentistry · 2025",
      location: "Seoul, South Korea",
      rating: 5,
      media: {
        alt: "Portrait of Daniel K. beside a window in neutral tones",
        glyph: "smile",
        tone: "sage",
      },
    },
    {
      id: "amelie",
      quote:
        "The part that surprised me was the aftercare. Three months after I flew home they were still checking in on how I was doing.",
      author: "Amélie D.",
      context: "Fertility & IVF · 2024",
      location: "Lyon, France",
      rating: 5,
      media: {
        alt: "Portrait of Amélie D. in a warm interior",
        glyph: "baby",
        tone: "linen",
      },
    },
    {
      id: "hoang",
      quote:
        "My mother speaks no English and I live abroad. Having one coordinator keeping both of us updated is what I am most grateful for.",
      author: "Hoang N.",
      context: "Caring for a parent · 2025",
      location: "Sydney, Australia",
      rating: 5,
      media: {
        alt: "Portrait of Hoang N. outdoors in afternoon light",
        glyph: "hand-heart",
        tone: "gold",
      },
    },
  ],
};
