import { SECTION_IDS, siteConfig } from "@/lib/site-config";

import type { SiteContent } from "@/types";

/**
 * Vietnamese — the primary language of the site.
 *
 * Every string the homepage renders lives here. Components receive copy as
 * props; none of them contain literal marketing text.
 */
export const vi: SiteContent = {
  locale: "vi",
  htmlLang: "vi-VN",

  nav: {
    links: [
      { id: "home", label: "Trang chủ", href: `#${SECTION_IDS.hero}` },
      { id: "about", label: "Giới thiệu", href: `#${SECTION_IDS.about}` },
      { id: "services", label: "Dịch vụ", href: `#${SECTION_IDS.services}` },
      { id: "journey", label: "Hành trình", href: `#${SECTION_IDS.journey}` },
      { id: "partners", label: "Đối tác", href: `#${SECTION_IDS.partners}` },
      { id: "stories", label: "Khách hàng", href: `#${SECTION_IDS.testimonials}` },
    ],
    cta: "Tư vấn miễn phí",
    navLabel: "Điều hướng chính",
    homeLabel: "Handle — về trang chủ",
    menuLabel: "Mở menu điều hướng",
    closeLabel: "Đóng menu",
    localeLabel: "Chọn ngôn ngữ",
  },

  hero: {
    titleLead: "Chăm sóc sức khỏe\ntại Việt Nam.",
    titleAccent: "Handled.",
    lead: "Từ tư vấn, đặt lịch, phiên dịch, di chuyển đến phục hồi — chúng tôi lo trọn phần hậu cần để bạn chỉ cần tập trung vào việc hồi phục.",
    primaryCta: "Tư vấn miễn phí",
    secondaryCta: "Xem video giới thiệu",
    badges: [
      { id: "hospitals", icon: "shield-check", label: "Bệnh viện & bác sĩ uy tín" },
      { id: "pricing", icon: "banknote", label: "Minh bạch chi phí" },
      { id: "journey", icon: "route", label: "Đồng hành trọn hành trình" },
      { id: "privacy", icon: "file-check", label: "Bảo mật thông tin tuyệt đối" },
    ],
    media: {
      alt: "Chuyên viên Handle đón khách hàng quốc tế tại sảnh bệnh viện, ánh sáng ấm buổi sáng",
      glyph: "hand-heart",
      tone: "sand",
      seed: "handle-hero-arrival",
    },
  },

  partners: {
    eyebrow: "Đối tác y tế uy tín",
    title: "Chúng tôi làm việc cùng các cơ sở y tế hàng đầu",
    action: "Xem tất cả đối tác",
  },

  whyVietnam: {
    eyebrow: "Bối cảnh",
    title: "Vì sao ngày càng nhiều người chọn điều trị tại",
    accent: "Việt Nam?",
    lead: "Không phải vì họ muốn đi xa. Mà vì họ muốn được điều trị sớm hơn và hợp lý hơn.",
  },

  about: {
    eyebrow: "Về Handle",
    title: "Đó là lý do Handle",
    accent: "ra đời.",
    body: [
      "Handle biến mỗi quyết định điều trị thành một hành trình được chuẩn bị trọn vẹn: hồ sơ được dịch và thẩm định, bác sĩ được lựa chọn theo đúng chuyên khoa, lịch hẹn được xác nhận trước khi bạn lên máy bay.",
      "Bạn có một Personal Care Plan bằng ngôn ngữ của mình, một điều phối viên duy nhất chịu trách nhiệm, và một mức chi phí được báo trước — không phát sinh, không phỏng đoán.",
    ],
    action: "Tìm hiểu về Handle",
    secondaryAction: "Xem hành trình",
    pills: [
      { id: "plan", icon: "clipboard-list", label: "Personal Care Plan" },
      { id: "coordinator", icon: "user-round-check", label: "Một điều phối viên" },
      { id: "quote", icon: "receipt", label: "Báo giá trọn gói" },
    ],
    media: {
      alt: "Điều phối viên Handle trao đổi Personal Care Plan cùng gia đình bệnh nhân trong phòng tư vấn",
      glyph: "notebook-pen",
      tone: "linen",
      seed: "handle-about-consult",
    },
  },

  whyUs: {
    eyebrow: "Vì sao chọn Handle",
    title: "Một đầu mối duy nhất cho toàn bộ",
    accent: "hành trình.",
    lead: "Sáu cam kết định hình cách chúng tôi làm việc với mỗi khách hàng.",
  },

  journey: {
    eyebrow: "Quy trình",
    title: "Hành trình cùng",
    accent: "Handle",
    lead: "Chúng tôi đồng hành cùng bạn từng bước, từ email đầu tiên đến lần tái khám sau khi bạn đã về nhà.",
    action: "Xem chi tiết hành trình",
  },

  stats: {
    eyebrow: "Con số",
    title: "Những gì chúng tôi đã",
    accent: "làm được.",
    lead: "Số liệu tổng hợp từ các ca Handle đã điều phối, cập nhật quý gần nhất.",
  },

  services: {
    eyebrow: "Chuyên khoa",
    title: "Dịch vụ y tế chúng tôi hỗ trợ",
    action: "Xem tất cả dịch vụ",
  },

  experiences: {
    eyebrow: "Ngoài phòng khám",
    title: "Trải nghiệm tại Việt Nam",
    action: "Xem tất cả trải nghiệm",
  },

  testimonials: {
    eyebrow: "Câu chuyện khách hàng",
    title: "Những người đã đi cùng chúng tôi",
    lead: "Trích từ khảo sát sau điều trị, được đăng với sự đồng ý của khách hàng.",
  },

  faq: {
    eyebrow: "Giải đáp",
    title: "Câu hỏi thường",
    accent: "gặp.",
    lead: "Sáu điều được hỏi nhiều nhất trước khi một hành trình bắt đầu.",
    help: {
      title: "Chưa thấy câu trả lời bạn cần?",
      body: "Nhắn cho đội ngũ Handle. Chúng tôi trả lời trong vòng 24 giờ làm việc, bằng tiếng Việt hoặc tiếng Anh, và buổi tư vấn đầu tiên hoàn toàn miễn phí.",
      action: "Hỏi trực tiếp",
    },
  },

  cta: {
    title: "Sẵn sàng bắt đầu hành trình chăm sóc sức khỏe",
    accent: "của bạn?",
    lead: "Đặt lịch tư vấn miễn phí với đội ngũ Handle ngay hôm nay. Phản hồi trong vòng 24 giờ làm việc.",
    whatsapp: "Chat trên WhatsApp",
    consultation: "Tư vấn miễn phí",
    form: {
      eyebrow: "Biểu mẫu tư vấn",
      title: "Để lại thông tin, chúng tôi sẽ chủ động liên hệ",
      lead: "Chỉ cần vài dòng ngắn. Đội ngũ Handle sẽ xem nhu cầu của bạn và phản hồi với bước tiếp theo phù hợp.",
      chatLabel: "Chat trên WhatsApp",
      qrEyebrow: "Quét mã nhanh",
      qrTitle: "Hoặc liên hệ ngay",
      qrLead: "Nếu muốn nhắn ngay, dùng điện thoại quét mã để mở cuộc trò chuyện với đội ngũ Handle.",
      qrAction: "Mở WhatsApp ngay",
      nameLabel: "Họ và tên",
      emailLabel: "Email",
      phoneLabel: "Số điện thoại",
      messageLabel: "Bạn đang quan tâm điều gì?",
      namePlaceholder: "Nguyễn Văn A",
      emailPlaceholder: "ten@domain.com",
      phonePlaceholder: "+84...",
      messagePlaceholder: "Mô tả nhu cầu, chuyên khoa hoặc thời gian bạn muốn được tư vấn.",
      submit: "Gửi thông tin",
      success: "Cảm ơn bạn. Chúng tôi đã nhận thông tin và sẽ phản hồi sớm nhất có thể.",
      error: "Đã có lỗi xảy ra. Vui lòng thử lại.",
      hint: "Phản hồi trong vòng 24 giờ làm việc.",
      privacy: "Thông tin của bạn chỉ được dùng để liên hệ tư vấn và sẽ không chia sẻ cho bên thứ ba.",
      chips: ["Hỗ trợ tiếng Việt & tiếng Anh", "Thông tin được giữ kín"],
    },
  },

  sectionNav: {
    label: "Mục lục trang",
    items: [
      { id: SECTION_IDS.whyVietnam, label: "Bối cảnh" },
      { id: SECTION_IDS.about, label: "Về Handle" },
      { id: SECTION_IDS.whyUs, label: "Vì sao chọn" },
      { id: SECTION_IDS.journey, label: "Hành trình" },
      { id: SECTION_IDS.stats, label: "Con số" },
      { id: SECTION_IDS.services, label: "Dịch vụ" },
      { id: SECTION_IDS.testimonials, label: "Khách hàng" },
      { id: SECTION_IDS.faq, label: "Giải đáp" },
    ],
  },

  floatingCta: "Chat trên WhatsApp",

  intro: {
    skip: "Bỏ qua",
    loading: "Đang mở trang Handle",
  },

  footer: {
    tagline: "You heal. We handle the rest.",
    columns: [
      {
        id: "company",
        title: "Về chúng tôi",
        links: [
          { id: "about", label: "Giới thiệu", href: `#${SECTION_IDS.about}` },
          { id: "team", label: "Đội ngũ", href: `#${SECTION_IDS.whyUs}` },
          { id: "partners", label: "Đối tác", href: `#${SECTION_IDS.partners}` },
          { id: "careers", label: "Tuyển dụng", href: `#${SECTION_IDS.cta}` },
        ],
      },
      {
        id: "services",
        title: "Dịch vụ",
        links: [
          {
            id: "checkup",
            label: "Kiểm tra sức khỏe tổng quát",
            href: `#${SECTION_IDS.services}`,
          },
          {
            id: "ivf",
            label: "Hỗ trợ sinh sản (IVF)",
            href: `#${SECTION_IDS.services}`,
          },
          { id: "eye", label: "Điều trị mắt", href: `#${SECTION_IDS.services}` },
          { id: "dental", label: "Nha khoa", href: `#${SECTION_IDS.services}` },
          { id: "aesthetic", label: "Thẩm mỹ", href: `#${SECTION_IDS.services}` },
          { id: "cardio", label: "Tim mạch", href: `#${SECTION_IDS.services}` },
        ],
      },
      {
        id: "support",
        title: "Hỗ trợ",
        links: [
          { id: "faq", label: "Câu hỏi thường gặp", href: `#${SECTION_IDS.journey}` },
          { id: "payment", label: "Hướng dẫn thanh toán", href: `#${SECTION_IDS.cta}` },
          { id: "terms", label: "Điều khoản sử dụng", href: `#${SECTION_IDS.cta}` },
          { id: "privacy", label: "Chính sách bảo mật", href: `#${SECTION_IDS.cta}` },
        ],
      },
    ],
    contactTitle: "Liên hệ",
    address: siteConfig.addressLines.join(", "),
    legal: `© ${new Date().getFullYear()} Handle Healthcare Journey. Bảo lưu mọi quyền.`,
    socials: [
      {
        id: "fb",
        label: "Facebook",
        platform: "facebook",
        href: siteConfig.socials.facebook,
      },
      {
        id: "ig",
        label: "Instagram",
        platform: "instagram",
        href: siteConfig.socials.instagram,
      },
      {
        id: "yt",
        label: "YouTube",
        platform: "youtube",
        href: siteConfig.socials.youtube,
      },
      {
        id: "li",
        label: "LinkedIn",
        platform: "linkedin",
        href: siteConfig.socials.linkedin,
      },
    ],
  },

  a11y: {
    skipToContent: "Chuyển tới nội dung chính",
    previous: "Câu chuyện trước",
    next: "Câu chuyện tiếp theo",
    goToSlide: "Chuyển tới câu chuyện",
    slideStatus: "Câu chuyện {current} trên {total}",
  },

  notFound: {
    title: "Không tìm thấy trang này.",
    lead: "Đường dẫn có thể đã thay đổi. Hãy quay lại trang chủ hoặc trao đổi trực tiếp với đội ngũ của chúng tôi.",
    home: "Về trang chủ",
    contact: "Tư vấn miễn phí",
  },
};
