import type { Localized, PagesContent } from "@/types";

/**
 * Copy for the standalone routes.
 *
 * Same contract as `content/vi.ts` and `content/en.ts` — every string the
 * route renders lives here, no component holds literal marketing text — but
 * kept in its own file so the homepage dictionary does not grow a section per
 * page added.
 *
 * The FAQ blocks are written as questions someone actually types into a search
 * box, not as questions a brochure would ask itself. They are the reason these
 * pages can be quoted by an answer engine at all, and each answer has to stand
 * alone when it is lifted out of the page and read on its own.
 */
export const pages: Localized<PagesContent> = {
  vi: {
    cost: {
      metaTitle: "Chi phí điều trị tại Việt Nam — bảng giá 2026",
      metaDescription:
        "Chi phí điều trị tại Việt Nam theo từng chuyên khoa: implant, IVF, LASIK, tim mạch. Khoảng giá tham khảo, so sánh với Mỹ, và những gì báo giá đã bao gồm.",
      breadcrumb: "Chi phí",

      hero: {
        title: "Chi phí điều trị tại",
        accent: "Việt Nam.",
        lead: "Đây là các khoảng giá tham khảo theo mặt bằng thị trường, kèm phần so sánh với Mỹ. Chúng tôi công bố khoảng giá thay vì một con số, vì một con số duy nhất là một lời hứa mà không ai giữ được trước khi đọc hồ sơ của bạn.",
        primaryCta: "Nhận báo giá cho ca của bạn",
        secondaryCta: "Xem bảng giá",
      },

      table: {
        title: "Khoảng giá theo",
        accent: "thủ thuật.",
        lead: "Cột so sánh là mặt bằng tại Mỹ, dùng thống nhất cho mọi dòng. Chọn nước nào có lợi nhất cho từng dòng thì bảng này sẽ đẹp hơn và vô nghĩa hơn.",
        colProcedure: "Thủ thuật",
        colVietnam: "Tại Việt Nam",
        colAbroad: "Tại Mỹ",
        colSaving: "Chênh lệch",
        caption:
          "Khoảng chi phí tham khảo theo thủ thuật tại Việt Nam, so sánh với mặt bằng tại Mỹ",
        disclaimer:
          "Đây là khoảng giá tham khảo theo mặt bằng thị trường, không phải báo giá của Handle. Chi phí thực tế chỉ xác định được sau khi bác sĩ đọc hồ sơ của bạn. Chúng tôi gửi báo giá bằng văn bản trước khi bạn đặt vé.",
      },

      inclusions: {
        title: "Báo giá của chúng tôi gồm những",
        accent: "gì.",
        lead: "Và không gồm những gì. Phần thứ hai mới là phần đáng đọc — một danh sách chỉ có cái được bao gồm thì không nói lên điều gì.",
        includedLabel: "Đã bao gồm",
        excludedLabel: "Chưa bao gồm",
      },

      factors: {
        title: "Vì sao hai người có thể được báo giá",
        accent: "khác nhau.",
        lead: "Cùng một thủ thuật vẫn có khoảng dao động. Bốn yếu tố dưới đây giải thích gần hết phần chênh lệch đó.",
      },

      faq: {
        title: "Câu hỏi về",
        accent: "chi phí.",
        items: [
          {
            id: "how-much-cheaper",
            question: "Điều trị tại Việt Nam rẻ hơn bao nhiêu so với Mỹ?",
            answer:
              "Theo các khoảng giá trong bảng trên, phần lớn thủ thuật thấp hơn 60–80% so với mặt bằng tại Mỹ. Chênh lệch lớn nhất nằm ở nhóm can thiệp phức tạp như tim mạch; nhỏ nhất ở nhóm chỉnh nha và tầm soát. Con số này chưa tính vé máy bay và lưu trú, nên với các thủ thuật ở đầu thấp của bảng, bạn nên cộng thêm chi phí đi lại trước khi so sánh.",
          },
          {
            id: "handle-fee",
            question: "Giá trên đã bao gồm phí dịch vụ của Handle chưa?",
            answer:
              "Chưa. Bảng trên là chi phí y tế tại cơ sở điều trị. Phí điều phối của Handle được báo riêng trong cùng một bản báo giá, để bạn nhìn rõ mình trả cho bệnh viện bao nhiêu và trả cho chúng tôi bao nhiêu. Chúng tôi không nhận hoa hồng làm tăng giá điều trị của bạn.",
          },
          {
            id: "prepay",
            question: "Tôi có phải trả trước không?",
            answer:
              "Tư vấn ban đầu và bản báo giá là miễn phí, không ràng buộc. Bạn chỉ thanh toán sau khi đã nhận báo giá bằng văn bản và đồng ý với kế hoạch điều trị. Phần chi phí y tế được thanh toán trực tiếp cho cơ sở điều trị theo quy định của cơ sở đó.",
          },
          {
            id: "insurance",
            question: "Bảo hiểm ở nước tôi có chi trả cho điều trị tại Việt Nam không?",
            answer:
              "Tùy hợp đồng. Một số bảo hiểm quốc tế chi trả điều trị ngoài nước sở tại, một số chỉ chi trả trường hợp cấp cứu. Chúng tôi chuẩn bị hồ sơ, hóa đơn và tóm tắt bệnh án bằng tiếng Anh theo định dạng các công ty bảo hiểm thường yêu cầu, nhưng quyết định chi trả thuộc về công ty bảo hiểm của bạn.",
          },
          {
            id: "overrun",
            question: "Chi phí có phát sinh sau khi đã báo giá không?",
            answer:
              "Phần điều trị nằm trong phác đồ đã báo thì không. Phát sinh chỉ xảy ra khi tình trạng thực tế khác với hồ sơ ban đầu, hoặc khi có biến chứng cần can thiệp thêm — cả hai trường hợp đều được thông báo và xin ý kiến bạn trước khi thực hiện, không bao giờ tính sau.",
          },
          {
            id: "total-trip",
            question: "Tổng chi phí một chuyến điều trị gồm những khoản nào?",
            answer:
              "Bốn khoản: chi phí y tế tại cơ sở điều trị, phí điều phối của Handle, vé máy bay, và lưu trú ngoài số ngày nằm viện. Hai khoản đầu nằm trong báo giá chúng tôi gửi bạn; hai khoản sau bạn tự chủ động, và chúng tôi đưa ra ước tính theo thời gian điều trị dự kiến để bạn tính tổng.",
          },
        ],
      },

      closing: {
        title: "Gửi hồ sơ, nhận báo giá bằng văn bản trong",
        accent: "48 giờ.",
        lead: "Không mất phí, không ràng buộc. Bạn nhận được khoảng chi phí cho đúng ca của mình thay vì một bảng giá chung.",
        action: "Tư vấn miễn phí",
      },
    },

    service: {
      breadcrumbRoot: "Dịch vụ",
      index: {
        metaTitle: "Dịch vụ y tế tại Việt Nam cho khách quốc tế",
        metaDescription:
          "Sáu chuyên khoa Handle điều phối tại Việt Nam: tầm soát sức khỏe, IVF, mắt, nha khoa, thẩm mỹ và tim mạch. Thời gian, chi phí tham khảo và cách chúng tôi hỗ trợ.",
        title: "Chuyên khoa chúng tôi",
        accent: "điều phối.",
        lead: "Với mỗi chuyên khoa, bạn cần biết ba điều trước khi đặt vé: mất bao lâu, tốn khoảng bao nhiêu, và ai chịu trách nhiệm khi có việc phát sinh. Mỗi trang dưới đây trả lời cả ba.",
        cardAction: "Xem chi tiết",
      },
      includes: {
        title: "Chúng tôi lo phần",
        accent: "hậu cần.",
        lead: "Phần y khoa thuộc về bác sĩ. Phần còn lại — vốn là phần khiến người ta bỏ cuộc — thuộc về chúng tôi.",
      },
      facts: {
        title: "Những con số bạn cần để lên",
        accent: "kế hoạch.",
      },
      suitedFor: {
        title: "Phù hợp với",
        accent: "ai.",
      },
      cost: {
        title: "Khoảng chi phí",
        accent: "tham khảo.",
        lead: "Khoảng giá theo mặt bằng thị trường, không phải báo giá của Handle. Chi phí thực tế xác định sau khi bác sĩ đọc hồ sơ của bạn.",
        action: "Xem toàn bộ bảng giá",
        empty: "Chuyên khoa này được báo giá theo từng ca. Gửi hồ sơ để nhận khoảng chi phí cụ thể.",
      },
      faq: {
        title: "Câu hỏi thường",
        accent: "gặp.",
      },
      related: {
        title: "Chuyên khoa",
        accent: "khác.",
      },
      closing: {
        title: "Gửi hồ sơ, nhận kế hoạch điều trị trong",
        accent: "48 giờ.",
        lead: "Không mất phí, không ràng buộc. Bạn nhận được tên bác sĩ, lịch dự kiến và khoảng chi phí cho đúng ca của mình.",
        action: "Tư vấn miễn phí",
      },
    },
  },

  en: {
    cost: {
      metaTitle: "Cost of Treatment in Vietnam — 2026 Price Guide",
      metaDescription:
        "What treatment in Vietnam costs by specialty: implants, IVF, LASIK, cardiac care. Reference price bands, compared against the US, and what a quote covers.",

      breadcrumb: "Cost",

      hero: {
        title: "What treatment in Vietnam",
        accent: "costs.",
        lead: "These are market reference bands, set beside the equivalent in the United States. We publish a range rather than a figure, because a single figure is a promise nobody can keep before reading your records.",
        primaryCta: "Get a quote for your case",
        secondaryCta: "See the bands",
      },

      table: {
        title: "Bands by",
        accent: "procedure.",
        lead: "The comparison column is the United States for every row. Picking whichever country flattered each row would make this table look better and mean nothing.",
        colProcedure: "Procedure",
        colVietnam: "In Vietnam",
        colAbroad: "In the US",
        colSaving: "Difference",
        caption:
          "Reference cost bands by procedure in Vietnam, compared with United States pricing",
        disclaimer:
          "These are market reference bands, not a Handle quote. Your actual cost is settled once a surgeon has read your records. We send that quote in writing before you book a flight.",
      },

      inclusions: {
        title: "What a quote",
        accent: "covers.",
        lead: "And what it does not. The second list is the one worth reading — a list of inclusions on its own tells you nothing.",
        includedLabel: "Included",
        excludedLabel: "Not included",
      },

      factors: {
        title: "Why two people are quoted",
        accent: "differently.",
        lead: "One procedure still carries a range. These four things account for most of the spread.",
      },

      faq: {
        title: "Questions about",
        accent: "cost.",
        items: [
          {
            id: "how-much-cheaper",
            question: "How much cheaper is treatment in Vietnam than in the US?",
            answer:
              "Across the bands above, most procedures run 60–80% below US pricing. The gap is widest for complex intervention such as cardiac work and narrowest for orthodontics and screening. Those figures exclude flights and accommodation, so for procedures at the lower end of the table you should add travel before comparing.",
          },
          {
            id: "handle-fee",
            question: "Do these prices include Handle's fee?",
            answer:
              "No. The table is the medical cost at the treating facility. Handle's coordination fee is quoted separately in the same document, so you can see what goes to the hospital and what goes to us. We take no commission that raises the price of your treatment.",
          },
          {
            id: "prepay",
            question: "Do I have to pay anything up front?",
            answer:
              "The first consultation and the written quote are free and carry no obligation. You pay only after you have the quote and have agreed the treatment plan. Medical costs are paid directly to the treating facility on that facility's terms.",
          },
          {
            id: "insurance",
            question: "Will my insurer at home cover treatment in Vietnam?",
            answer:
              "It depends on the policy. Some international plans cover elective treatment outside your country of residence; others cover emergencies only. We prepare records, invoices and a discharge summary in English in the format insurers usually ask for, but the coverage decision is your insurer's.",
          },
          {
            id: "overrun",
            question: "Can the cost change after I have been quoted?",
            answer:
              "Not for treatment inside the protocol you were quoted for. A change happens only if your condition differs from the records supplied, or if a complication needs further intervention — and in both cases you are told and asked before anything proceeds, never billed afterwards.",
          },
          {
            id: "total-trip",
            question: "What does a full treatment trip cost in total?",
            answer:
              "Four things: the medical cost at the facility, Handle's coordination fee, flights, and accommodation beyond your inpatient days. The first two are in the quote we send you. The last two you arrange yourself, and we give you an estimate against the expected length of treatment so you can total it.",
          },
        ],
      },

      closing: {
        title: "Send your records, get a written quote within",
        accent: "48 hours.",
        lead: "Free, and no obligation. You get a band for your case rather than a general price list.",
        action: "Free consultation",
      },
    },

    service: {
      breadcrumbRoot: "Services",
      index: {
        metaTitle: "Medical Services in Vietnam for International Patients",
        metaDescription:
          "The six specialties Handle coordinates in Vietnam: health screening, IVF, eye surgery, dental, cosmetic surgery and cardiology. Timings, reference costs and what we handle.",
        title: "The specialties we",
        accent: "coordinate.",
        lead: "For any specialty you need three things settled before booking a flight: how long it takes, roughly what it costs, and who is accountable when something changes. Each page below answers all three.",
        cardAction: "Read more",
      },
      includes: {
        title: "We handle the",
        accent: "logistics.",
        lead: "The medicine belongs to the surgeon. Everything around it — the part that makes people give up — belongs to us.",
      },
      facts: {
        title: "The numbers you need to",
        accent: "plan.",
      },
      suitedFor: {
        title: "Who this",
        accent: "suits.",
      },
      cost: {
        title: "Reference",
        accent: "cost.",
        lead: "Market reference bands, not a Handle quote. Your actual cost is settled once a surgeon has read your records.",
        action: "See the full price guide",
        empty: "This specialty is quoted case by case. Send your records for a band on yours.",
      },
      faq: {
        title: "Common",
        accent: "questions.",
      },
      related: {
        title: "Other",
        accent: "specialties.",
      },
      closing: {
        title: "Send your records, get a treatment plan within",
        accent: "48 hours.",
        lead: "Free, and no obligation. You get a named surgeon, an expected schedule and a cost band for your case.",
        action: "Free consultation",
      },
    },
  },
};
