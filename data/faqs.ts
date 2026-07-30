import type { Faq, Localized } from "@/types";

/**
 * The six questions that actually block a decision.
 *
 * Ordered by how early they surface in a real enquiry: cost first, because it
 * is the one every patient asks before anything else.
 */
export const faqs: Localized<Faq[]> = {
  vi: [
    {
      id: "cost",
      question: "Chi phí dịch vụ của Handle được tính như thế nào?",
      answer:
        "Bạn nhận một báo giá trọn gói trước khi cam kết bất cứ điều gì, trong đó tách bạch chi phí y tế của bệnh viện và phí điều phối của Handle. Không có phí ẩn, không phát sinh sau điều trị. Buổi tư vấn đầu tiên và việc thẩm định hồ sơ là miễn phí.",
    },
    {
      id: "records",
      question: "Tôi cần chuẩn bị những giấy tờ y tế gì?",
      answer:
        "Chỉ cần những gì bạn đang có: kết quả xét nghiệm, chẩn đoán hình ảnh, đơn thuốc và tóm tắt bệnh án gần nhất. Chúng tôi lo phần dịch thuật y khoa và chuẩn hóa hồ sơ theo yêu cầu của từng bệnh viện.",
    },
    {
      id: "language",
      question: "Tôi không nói tiếng Việt thì sao?",
      answer:
        "Bạn luôn có phiên dịch y tế đi cùng trong mọi buổi hẹn, và toàn bộ kế hoạch điều trị, chỉ định cũng như đơn thuốc đều được cung cấp bằng ngôn ngữ của bạn.",
    },
    {
      id: "visa",
      question: "Handle có hỗ trợ visa và việc đi lại không?",
      answer:
        "Có. Chúng tôi hướng dẫn hồ sơ visa y tế, gợi ý lịch bay phù hợp với ngày phẫu thuật, đặt chỗ ở gần bệnh viện và bố trí xe đưa đón riêng trong suốt thời gian bạn ở Việt Nam.",
    },
    {
      id: "family",
      question: "Người thân đi cùng tôi có được hỗ trợ không?",
      answer:
        "Có. Người thân đi cùng được hỗ trợ chỗ ở, di chuyển và lịch trình như bạn, và điều phối viên sẽ cập nhật tiến trình cho họ trong thời gian bạn điều trị.",
    },
    {
      id: "aftercare",
      question: "Sau khi tôi về nước thì sao?",
      answer:
        "Toàn bộ hồ sơ, chỉ định và đơn thuốc được dịch và bàn giao trước khi bạn rời Việt Nam. Chúng tôi tiếp tục theo dõi từ xa và kết nối lại với bác sĩ điều trị khi bạn hoặc bác sĩ tại nước sở tại cần trao đổi.",
    },
  ],
  en: [
    {
      id: "cost",
      question: "How is Handle's fee calculated?",
      answer:
        "You receive one itemised quote before committing to anything, separating the hospital's medical costs from Handle's coordination fee. No hidden charges and nothing added afterwards. The first consultation and the review of your records are free.",
    },
    {
      id: "records",
      question: "What medical records do I need to prepare?",
      answer:
        "Whatever you already have: test results, imaging, prescriptions and your most recent clinical summary. We handle the medical translation and reformat everything to each hospital's requirements.",
    },
    {
      id: "language",
      question: "What if I do not speak Vietnamese?",
      answer:
        "A medical interpreter is with you in every appointment, and your care plan, clinical instructions and prescriptions are all provided in your own language.",
    },
    {
      id: "visa",
      question: "Do you help with visas and travel?",
      answer:
        "Yes. We guide the medical visa application, suggest flights that fit around your surgery date, book accommodation close to the hospital and arrange private transfers for your whole stay.",
    },
    {
      id: "family",
      question: "Is family travelling with me supported too?",
      answer:
        "Yes. Anyone travelling with you gets the same accommodation, transport and itinerary support, and your coordinator keeps them updated while you are being treated.",
    },
    {
      id: "aftercare",
      question: "What happens once I fly home?",
      answer:
        "Every report, instruction and prescription is translated and handed over before you leave Vietnam. We continue remote follow-up and reconnect you with your treating doctor whenever you or your physician at home needs it.",
    },
  ],
};
