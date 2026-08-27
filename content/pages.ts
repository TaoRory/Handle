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
        "Bảng giá tham khảo theo chuyên khoa tại Việt Nam: IVF, nội soi tiêu hóa, tầm soát, mắt và tim mạch. Chi phí ước tính bằng AUD và những gì mỗi khoản bao gồm.",
      breadcrumb: "Chi phí",

      hero: {
        title: "Chi phí điều trị tại",
        accent: "Việt Nam.",
        lead: "Bảng giá tham khảo theo từng chuyên khoa, tính bằng đô la Úc. Chúng tôi công bố khoảng giá thay vì một con số, vì một con số duy nhất là một lời hứa mà không ai giữ được trước khi đọc hồ sơ của bạn.",
        primaryCta: "Nhận báo giá cho ca của bạn",
        secondaryCta: "Xem bảng giá",
      },

      table: {
        title: "Bảng giá theo",
        accent: "chuyên khoa.",
        lead: "Mỗi nhóm mở đầu bằng khoảng chi phí cho cả hành trình, rồi mới đến từng hạng mục. Đọc theo thứ tự đó, vì phần lớn ca điều trị là một chuỗi dịch vụ đi cùng nhau chứ không phải một dòng đơn lẻ.",
        colService: "Dịch vụ",
        colCovers: "Bao gồm những gì",
        colEstimated: "Chi phí ước tính (AUD)",
        quoteLabel: "Báo giá riêng",
        includedLabel: "Đã gồm / tùy gói",
        caption:
          "Khoảng chi phí tham khảo theo chuyên khoa và theo từng dịch vụ, tính bằng đô la Úc",
        disclaimer:
          "Đây là khoảng chi phí tham khảo, không phải báo giá của Handle. Con số thực tế phụ thuộc vào cơ sở thực hiện, vật tư sử dụng và tình trạng cụ thể của bạn, và chỉ xác định được sau khi bác sĩ đọc hồ sơ. Dấu cộng nghĩa là mức trên là điểm khởi đầu chứ không phải mức trần. Chúng tôi gửi báo giá bằng văn bản trước khi bạn đặt vé.",
      },

      others: {
        title: "Chuyên khoa khác chúng tôi",
        accent: "điều phối.",
        lead: "Ngoài mạng lưới chuyên khoa chính, Handle vẫn kết nối bạn với bệnh viện tư, bác sĩ chuyên khoa và trung tâm y tế trên khắp Việt Nam theo nhu cầu từng người.",
        journeyLabel: "Hành trình ước tính",
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
            id: "why-aud",
            question: "Vì sao bảng giá tính bằng đô la Úc?",
            answer:
              "Vì phần lớn khách hàng của chúng tôi đang sống tại Úc, và một bảng giá bằng đồng tiền của họ là bảng giá họ tự tính được mà không phải quy đổi. Chi phí y tế được thanh toán trực tiếp cho cơ sở điều trị bằng tiền đồng theo tỷ giá tại thời điểm thanh toán, nên con số đô la Úc là mức tham chiếu để lập kế hoạch, không phải số tiền cố định.",
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
            id: "plus-sign",
            question: "Dấu cộng sau khoảng giá nghĩa là gì?",
            answer:
              "Nghĩa là mức trên của khoảng đó là điểm khởi đầu, không phải mức trần. Với những hạng mục như IVF hay tầm soát chuyên sâu, phần vượt lên phụ thuộc vào thuốc, vật tư và số kỹ thuật cần làm thêm, những thứ chỉ biết được khi đã có phác đồ. Chúng tôi để dấu này thay vì đưa một con số gọn gàng rồi báo phát sinh sau.",
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
        metaTitle: "Dịch vụ khám chữa bệnh tại Việt Nam",
        metaDescription:
          "Handle hỗ trợ người nước ngoài và Việt kiều khám chữa bệnh tại Việt Nam: chọn bệnh viện, đặt lịch, phiên dịch, di chuyển và theo dõi sau điều trị.",
        title: "Dịch vụ khám chữa bệnh",
        accent: "tại Việt Nam.",
        lead: "Handle giúp người nước ngoài và Việt kiều tìm cơ sở y tế phù hợp, chuẩn bị hồ sơ và điều phối hành trình điều trị. Bác sĩ và bệnh viện chịu trách nhiệm chuyên môn; Handle phụ trách phần hỗ trợ.",
        overview: {
          title: "Handle hỗ trợ hành trình",
          accent: "như thế nào.",
          lead: "Handle không phải bệnh viện và không thay thế tư vấn của bác sĩ. Chúng tôi là đơn vị hỗ trợ điều phối, giúp người bệnh tiếp cận cơ sở khám chữa bệnh phù hợp tại Việt Nam và theo sát các đầu việc ngoài chuyên môn y khoa.",
          items: [
            {
              id: "before",
              title: "Trước khi đến Việt Nam",
              body: "Tiếp nhận nhu cầu và hồ sơ hiện có, hỗ trợ tìm bệnh viện hoặc bác sĩ phù hợp, sắp xếp lịch và cung cấp kế hoạch dự kiến để bạn chủ động thời gian.",
            },
            {
              id: "during",
              title: "Trong quá trình khám và điều trị",
              body: "Điều phối lịch hẹn, phiên dịch y tế, di chuyển và thông tin giữa người bệnh với cơ sở y tế khi lịch trình hoặc yêu cầu thay đổi.",
            },
            {
              id: "after",
              title: "Sau khi hoàn tất điều trị",
              body: "Hỗ trợ nhận tài liệu xuất viện, lịch tái khám và phối hợp các đầu việc theo dõi sau điều trị khi bạn trở về nơi cư trú.",
            },
          ],
        },
        listTitle: "Các chuyên khoa Handle đang hỗ trợ",
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
        lead: "Khoảng chi phí tham khảo tính bằng đô la Úc, không phải báo giá của Handle. Con số thực tế xác định sau khi bác sĩ đọc hồ sơ của bạn.",
        action: "Xem toàn bộ bảng giá",
        empty: "Chuyên khoa này được báo giá theo từng ca. Gửi hồ sơ để nhận khoảng chi phí cụ thể.",
        quoteLabel: "Báo giá riêng",
        includedLabel: "Đã gồm / tùy gói",
        disclaimer:
          "Dấu cộng nghĩa là mức trên là điểm khởi đầu chứ không phải mức trần. Chi phí phụ thuộc vào cơ sở thực hiện, vật tư và tình trạng cụ thể của bạn.",
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
        "What treatment in Vietnam costs by specialty: IVF, endoscopy, screening, eye and cardiac care. Reference bands in AUD and what each one covers.",

      breadcrumb: "Cost",

      hero: {
        title: "What treatment in Vietnam",
        accent: "costs.",
        lead: "Reference bands by specialty, quoted in Australian dollars. We publish a range rather than a figure, because a single figure is a promise nobody can keep before reading your records.",
        primaryCta: "Get a quote for your case",
        secondaryCta: "See the bands",
      },

      table: {
        title: "The schedule, by",
        accent: "specialty.",
        lead: "Each group opens with the range a coordinated course of care actually costs, then lists the individual services. Read it in that order — most treatment is a sequence of services that go together, not a single line.",
        colService: "Service",
        colCovers: "What it covers",
        colEstimated: "Estimated cost (AUD)",
        quoteLabel: "Custom quote",
        includedLabel: "Included / package dependent",
        caption:
          "Reference cost bands by specialty and by service, quoted in Australian dollars",
        disclaimer:
          "These are reference bands, not a Handle quote. Your actual cost depends on the facility, the materials used and your own case, and is settled once a doctor has read your records. A trailing plus means the upper figure is where a case starts rather than where it stops. We send the written quote before you book a flight.",
      },

      others: {
        title: "Other specialties we",
        accent: "coordinate.",
        lead: "Beyond our core specialist network, Handle can still arrange access to private hospitals, specialist doctors and medical centres across Vietnam, based on what you need.",
        journeyLabel: "Estimated journey",
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
            id: "why-aud",
            question: "Why is the schedule quoted in Australian dollars?",
            answer:
              "Because most of the people we work with live in Australia, and a schedule in their own currency is one they can plan against without doing arithmetic first. Medical costs are settled directly with the treating facility in Vietnamese đồng at the rate on the day, so the Australian figure is a planning reference rather than a fixed amount.",
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
            id: "plus-sign",
            question: "What does the plus after a range mean?",
            answer:
              "That the upper figure is where a case starts, not where it stops. For work like IVF or advanced screening, what sits above it depends on medication, materials and how many additional procedures are needed — none of which is known until there is a protocol. We print the sign rather than quote a tidy number and bill the difference later.",
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
          "Handle helps international patients access medical services in Vietnam, including hospital matching, appointments, interpreters, transfers and follow-up.",
        title: "Medical services",
        accent: "in Vietnam.",
        lead: "Handle helps international patients find an appropriate healthcare provider, prepare records and coordinate the treatment journey. Hospitals and physicians remain responsible for all clinical decisions; Handle manages the support around them.",
        overview: {
          title: "How Handle supports your",
          accent: "care journey.",
          lead: "Handle is not a hospital and does not replace medical advice. We coordinate non-clinical support so international patients can access suitable licensed healthcare providers in Vietnam with fewer logistical and language barriers.",
          items: [
            {
              id: "before",
              title: "Before you travel",
              body: "We review your request and available records, help identify a suitable hospital or physician, arrange appointments and outline an expected schedule.",
            },
            {
              id: "during",
              title: "During consultation and treatment",
              body: "We coordinate appointments, medical interpretation, local transfers and communication with the healthcare provider when plans or requirements change.",
            },
            {
              id: "after",
              title: "After treatment",
              body: "We help collect discharge documents, confirm follow-up dates and coordinate non-clinical follow-up tasks after you return home.",
            },
          ],
        },
        listTitle: "Specialties currently supported by Handle",
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
        lead: "Reference bands in Australian dollars, not a Handle quote. Your actual cost is settled once a doctor has read your records.",
        action: "See the full schedule",
        empty: "This specialty is quoted case by case. Send your records for a band on yours.",
        quoteLabel: "Custom quote",
        includedLabel: "Included / package dependent",
        disclaimer:
          "A trailing plus means the upper figure is where a case starts rather than where it stops. Cost depends on the facility, the materials and your own case.",
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
