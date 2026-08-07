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
        "Mỗi hành trình đều khác nhau, nên chi phí dịch vụ được tính riêng theo nhu cầu cụ thể của bạn - từ phạm vi hỗ trợ, thời gian lưu trú đến các dịch vụ đi kèm. Vui lòng liên hệ trực tiếp với đội ngũ Handle để được tư vấn và báo giá chi tiết.",
    },
    {
      id: "records",
      question: "Tôi cần chuẩn bị những giấy tờ y tế gì?",
      answer:
        "Điều phối viên của bạn sẽ hướng dẫn cụ thể tùy theo tình trạng và bệnh viện lựa chọn, nhưng thông thường bạn nên chuẩn bị hồ sơ bệnh án, kết quả xét nghiệm/chẩn đoán hình ảnh gần nhất, đơn thuốc đang sử dụng và giấy tờ tùy thân. Handle sẽ hỗ trợ tổng hợp và chuyển hồ sơ đến đúng chuyên khoa trước khi bạn đến Việt Nam.",
    },
    {
      id: "language",
      question: "Tôi không nói tiếng Việt thì sao?",
      answer:
        "Bạn không cần lo lắng, Handle bố trí phiên dịch y tế đồng hành trong suốt quá trình khám và điều trị, đảm bảo mọi trao đổi với bác sĩ đều được truyền đạt chính xác và đẩy đủ.",
    },
    {
      id: "visa",
      question: "Handle có hỗ trợ visa và việc đi lại không?",
      answer:
        "Có. Handle sẽ hỗ trợ tư vấn thủ tục visa y tế, đặt vé máy bay, đưa đón sân bay và di chuyển giữa khách sạn - bệnh viện trong suốt hành trình của bạn.",
    },
    {
      id: "family",
      question: "Người thân đi cùng tôi có được hỗ trợ không?",
      answer:
        "Có. Handle chăm sóc cả người thân đi cùng, từ chỗ ở, di chuyển đến phiên dịch, để cả gia đình đều an tâm trong suốt thời gian bạn điều trị.",
    },
    {
      id: "aftercare",
      question: "Sau khi tôi về nước thì sao?",
      answer:
        "Hành trình chưa dừng lại khi bạn rời Việt Nam. Điều phối viên của Handle vẫn tiếp tục theo dõi và kết nối bạn với bác sĩ để tái khám từ xa khi cần.",
    },
    {
      id: "timeline",
      question: "Mất bao lâu để bắt đầu điều trị?",
      answer:
        "Tùy chuyên khoa và tình trạng hồ sơ, nhưng phần lớn quy trình có thể bắt đầu ngay sau khi thẩm định hồ sơ và xác nhận lịch với bệnh viện. Chúng tôi sẽ cho bạn một mốc thời gian rõ ràng trước khi bạn quyết định bay.",
    },
  ],
  en: [
    {
      id: "cost",
      question: "How is Handle's fee calculated?",
      answer:
        "Every journey is unique, so service costs are tailored to your specific needs — from the scope of support and length of stay to additional services. Please contact the Handle team directly for personalized advice and a detailed quote.",
    },
    {
      id: "records",
      question: "What medical records do I need to prepare?",
      answer:
        "Your coordinator will provide specific guidance based on your medical condition and chosen hospital. Generally, you should prepare your medical records, recent test/imaging results, current prescriptions, and personal identification. Handle will assist in compiling and forwarding your documents to the correct department before you arrive in Vietnam.",
    },
    {
      id: "language",
      question: "What if I do not speak Vietnamese?",
      answer:
        "No need to worry. Handle provides a medical interpreter to accompany you throughout your examination and treatment, ensuring all communication with doctors is conveyed accurately and fully.",
    },
    {
      id: "visa",
      question: "Do you help with visas and travel?",
      answer:
        "Yes. Handle will support you with medical visa consultation, flight bookings, airport transfers, and commuting between your hotel and the hospital throughout your journey.",
    },
    {
      id: "family",
      question: "Is family travelling with me supported too?",
      answer:
        "Yes. Handle takes care of your accompanying family members as well — from accommodation and transportation to interpretation — ensuring peace of mind for the entire family throughout your treatment.",
    },
    {
      id: "aftercare",
      question: "What happens once I fly home?",
      answer:
        "Your journey does not end when you leave Vietnam. Your Handle coordinator will continue to follow up and connect you with doctors for remote follow-ups whenever needed.",
    },
    {
      id: "timeline",
      question: "How quickly can treatment start?",
      answer:
        "It depends on the specialty and the condition of your records, but in many cases we can begin as soon as the file review is complete and the hospital confirms a date. We give you a clear timeline before you decide to fly.",
    },
  ],
};
