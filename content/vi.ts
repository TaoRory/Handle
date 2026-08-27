import { serviceHref } from "@/data";
import { ROUTES, SECTION_IDS, siteConfig } from "@/lib/site-config";

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
      { id: "services", label: "Dịch vụ", href: ROUTES.services },
      /* A real route, not an anchor — and the one nav item that answers a
         question rather than naming a part of the site. */
      { id: "cost", label: "Chi phí", href: ROUTES.cost },
      { id: "journey", label: "Hành trình", href: `#${SECTION_IDS.journey}` },
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
    /* The em dash closes line two rather than opening the accent: a display
       serif set in italic starting on punctuation reads as a fragment, and the
       dash at the line end is what signals the turn into the gold phrase. */
    titleLead: "Chăm sóc sức khỏe\ntại Việt Nam —",
    titleAccent: "đã có chúng tôi lo.",
    lead: "Tư vấn, đặt lịch, phiên dịch, di chuyển — trọn gói hậu cần, để bạn chỉ việc tận hưởng dịch vụ y tế cao cấp.",
    primaryCta: "Tư vấn miễn phí",
    secondaryCta: "Xem video giới thiệu",
    badges: [
      { id: "hospitals", icon: "shield-check", label: "Bệnh viện & bác sĩ uy tín" },
      { id: "pricing", icon: "banknote", label: "Minh bạch chi phí" },
      { id: "journey", icon: "route", label: "Đồng hành trọn hành trình" },
      { id: "privacy", icon: "file-check", label: "Bảo mật thông tin tuyệt đối" },
    ],
    media: {
      alt: "Sảnh đón tiếp với quầy lễ tân đá cẩm thạch, tường gỗ lam và cây xanh",
      src: "/images/photos/hero-lobby.jpg",
      width: 1600,
      height: 2000,
      blurDataURL:
        "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAAAQAgCdASoMAA8AA4BaJQBOgBuffLvYUj3AAP7nOxuqnaMm9Iso0urHz6E8eDIHlYFwK6AraXsT8Knm7ubrElSuAAA=",
      glyph: "hand-heart",
      tone: "sand",
      seed: "handle-hero-arrival",
    },
  },

  partners: {
    eyebrow: "Đối tác y tế uy tín",
    title: "Chúng tôi làm việc cùng các cơ sở y tế hàng đầu",
    action: "Xem tất cả đối tác",
    dialogLead:
      "Bệnh viện, phòng khám và trung tâm chuyên khoa Handle phối hợp để đặt lịch và đưa bạn đến đúng nơi.",
    closeLabel: "Đóng danh sách đối tác",
  },

  whyVietnam: {
    title: "Vì sao ngày càng nhiều người chọn điều trị tại",
    accent: "Việt Nam?",
    lead: "Vì y tế Việt Nam giờ đây đã phát triển vượt bậc, với vô vàn lựa chọn và dịch vụ chăm sóc tối ưu.",
  },

  about: {
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
      alt: "Bốn nhân viên y tế mặc áo blouse và đồ scrubs cùng xem một bản ghi trên clipboard, bên cửa sổ phòng làm việc",
      src: "/images/photos/about.jpg",
      width: 1440,
      height: 900,
      blurDataURL:
        "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAADwAQCdASoMAAgAA4BaJZQAAsaZk0e7OAAA/uesJ/Lj+eoW+sSrvctTm4sI9JLxlnOXCR6/DN/LSSrpycsQAA==",
      glyph: "notebook-pen",
      tone: "linen",
      seed: "handle-about-consult",
    },
  },

  whyUs: {
    title: "Một đầu mối duy nhất cho toàn bộ",
    accent: "hành trình.",
    lead: "Sáu cam kết định hình cách chúng tôi làm việc với mỗi khách hàng. Bằng cái tâm trong từng dịch vụ và sự chuyên nghiệp xuyên suốt hành trình, Handle luôn đặt sự an tâm của khách hàng lên hàng đầu.",
  },

  journey: {
    title: "Hành trình cùng",
    accent: "Handle",
    lead: "Chúng tôi đồng hành cùng bạn từng bước, từ email đầu tiên đến lần tái khám sau khi bạn đã về nhà. Mỗi mốc đều có người phụ trách, thời gian phản hồi và việc cần làm tiếp theo.",
    action: "Xem chi tiết hành trình",
  },

  stats: {
    title: "Những gì chúng tôi đã",
    accent: "làm được.",
    lead: "Số liệu tổng hợp từ các ca Handle đã điều phối, cập nhật quý gần nhất. Những con số này phản ánh quy mô công việc thực tế chứ không phải lời hứa chung chung.",
  },

  services: {
    title: "Dịch vụ y tế chúng tôi hỗ trợ",
    /* Named "thẩm mỹ" until now — a specialty the site stopped offering when
       the record was commented out, still being promised in the sentence
       directly above the grid that no longer contains it. */
    lead: "Từ tầm soát, IVF đến tim mạch và tiêu hóa, chúng tôi giúp bạn chọn đúng chuyên khoa và đúng bệnh viện ngay từ đầu.",
    action: "Xem tất cả dịch vụ",
  },

  experiences: {
    title: "Trải nghiệm tại Việt Nam",
    lead: "Trong lúc hồi phục, bạn vẫn có thể ăn uống, nghỉ ngơi và khám phá Việt Nam theo nhịp phù hợp với tình trạng sức khỏe của mình.",
    action: "Xem tất cả trải nghiệm",
  },

  testimonials: {
    title: "Những người đã đi cùng chúng tôi",
    lead: "Trích từ khảo sát sau điều trị, được đăng với sự đồng ý của khách hàng.",
  },

  faq: {
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
      chatLabel: "Chat trên WhatsApp",
      nameLabel: "Họ và tên",
      emailLabel: "Email",
      phoneLabel: "Số điện thoại",
      messageLabel: "Bạn đang quan tâm điều gì?",
      namePlaceholder: "Nguyễn Văn A",
      emailPlaceholder: "ten@domain.com",
      phonePlaceholder: "+84...",
      messagePlaceholder:
        "Mô tả nhu cầu, chuyên khoa hoặc thời gian bạn muốn được tư vấn.",
      submit: "Gửi thông tin",
      success:
        "Cảm ơn bạn. Chúng tôi đã nhận thông tin và sẽ phản hồi sớm nhất có thể.",
      error: "Đã có lỗi xảy ra. Vui lòng thử lại.",
      hint: "Phản hồi trong vòng 24 giờ làm việc.",
      privacy:
        "Thông tin của bạn chỉ được dùng để liên hệ tư vấn và sẽ không chia sẻ cho bên thứ ba.",
      chips: ["Hỗ trợ tiếng Việt & tiếng Anh", "Thông tin được giữ kín"],
      sent: {
        eyebrow: "Đã tiếp nhận",
        title: "Thông tin của bạn đã",
        accent: "đến nơi.",
        lead: "Một chuyên viên điều phối sẽ đọc yêu cầu của bạn và liên hệ qua email hoặc số điện thoại bạn vừa để lại.",
        steps: [
          {
            id: "received",
            icon: "file-check",
            label: "Tiếp nhận",
            body: "Yêu cầu của bạn đã được ghi nhận an toàn.",
          },
          {
            id: "review",
            icon: "user-round-check",
            label: "Chuyên viên xem xét",
            body: "Chúng tôi đối chiếu nhu cầu với bệnh viện và bác sĩ phù hợp.",
          },
          {
            id: "reply",
            icon: "message-circle",
            label: "Phản hồi trong 24 giờ",
            body: "Bạn nhận được tư vấn đầu tiên, miễn phí và không ràng buộc.",
          },
        ],
        again: "Gửi yêu cầu khác",
      },
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

  floatingContact: {
    label: "Liên hệ ngay",
    title: "Chọn cách liên hệ",
    note: "Chúng tôi trả lời trong vòng 24 giờ làm việc, bằng tiếng Việt hoặc tiếng Anh.",
    closeLabel: "Đóng",
    channels: [
      {
        id: "zalo",
        icon: "message-circle",
        name: "Zalo",
        hint: "Nhắn tin nhanh trong nước",
      },
      {
        id: "whatsapp",
        icon: "globe",
        name: "WhatsApp",
        hint: "Dành cho khách ở nước ngoài",
      },
      {
        id: "phone-vn",
        icon: "phone",
        name: "Hotline Việt Nam",
        hint: "+84 77 333 3247 · giờ hành chính, GMT+7",
      },
      {
        id: "phone-au",
        icon: "phone",
        name: "Hotline Úc",
        hint: "+61 424 648 595 · giờ hành chính, AEST",
      },
      { id: "email", icon: "mail", name: "Email", hint: "Gửi kèm hồ sơ y tế" },
    ],
  },

  intro: {
    skip: "Bỏ qua",
    loading: "Đang mở trang Handle",
  },

  footer: {
    tagline: "You heal. We handle the rest.",
    phoneLabels: { vn: "Việt Nam", au: "Úc" },
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
            href: serviceHref("vi", "checkup"),
          },
          {
            id: "ivf",
            label: "Hỗ trợ sinh sản (IVF)",
            href: serviceHref("vi", "fertility"),
          },
          { id: "eye", label: "Điều trị mắt", href: serviceHref("vi", "eye") },
          // The digestive link pointed at `cardio` — a footer row promising one
          // specialty and opening another. Its id also carried a trailing space.
          {
            id: "digestive",
            label: "Tiêu hóa - Dạ dày - Đại trực tràng",
            href: serviceHref("vi", "digestive"),
          },
          { id: "cardio", label: "Tim mạch", href: serviceHref("vi", "cardio") },
        ],
      },
      {
        id: "support",
        title: "Hỗ trợ",
        links: [
          { id: "cost", label: "Chi phí điều trị", href: ROUTES.cost },
          { id: "faq", label: "Câu hỏi thường gặp", href: `#${SECTION_IDS.faq}` },
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
