import type { Localized, ServiceDetail } from "@/types";

/**
 * Long-form content for the six specialty pages.
 *
 * Keyed to `Service.id`; the URL slug lives in `services.ts` and is read from
 * there, so there is exactly one record naming each page.
 *
 * ⚠️ Written as a working draft for a site that has not launched. It describes
 * how the coordination works and what a patient has to plan around, and it is
 * deliberately thin on clinical claims — nothing here states a success rate, a
 * complication rate or an outcome, because those are figures a provider has to
 * stand behind and this content has no provider behind it yet. The timings are
 * ordinary planning ranges for these procedures, not commitments. Have a
 * clinician read every line before launch.
 *
 * The FAQs are the reason these pages can be quoted by an answer engine, so
 * each answer has to stand alone when it is lifted out of the page: no "as
 * mentioned above", no answer that depends on the paragraph before it.
 */
export const serviceDetails: Localized<ServiceDetail[]> = {
  vi: [
    {
      id: "checkup",
      metaTitle: "Khám sức khỏe tổng quát tại Việt Nam cho người nước ngoài",
      metaDescription:
        "Gói tầm soát chuyên sâu tại Việt Nam hoàn tất trong 1–2 ngày, kết quả song ngữ. Handle đặt lịch, phiên dịch, đưa đón và giải thích kết quả với bác sĩ.",
      heading: "Khám sức khỏe tổng quát",
      headingAccent: "tại Việt Nam.",
      intro: [
        "Một gói tầm soát chuyên sâu ở Việt Nam thường hoàn tất trong một đến hai ngày làm việc, thay vì rải ra nhiều tuần với mỗi hạng mục một lần hẹn. Đó là lý do nhiều người sống ở nước ngoài gộp việc kiểm tra sức khỏe vào một chuyến về thăm nhà.",
        "Điều khiến việc này khó không phải là y khoa, mà là hậu cần: chọn gói nào cho đúng độ tuổi và tiền sử, đặt được lịch liền hai ngày, và hiểu được kết quả khi nó về. Đó là ba việc chúng tôi làm.",
      ],
      includes: [
        {
          id: "package",
          icon: "clipboard-list",
          title: "Chọn gói theo hồ sơ, không theo bảng giá",
          body: "Chúng tôi gửi tiền sử và độ tuổi của bạn cho bác sĩ trước, để gói tầm soát được chọn theo những gì cần tầm soát thật.",
        },
        {
          id: "schedule",
          icon: "calendar-check",
          title: "Lịch liền mạch trong 1–2 ngày",
          body: "Các hạng mục được xếp liền nhau theo thứ tự đúng, gồm cả những mục cần nhịn ăn từ tối hôm trước.",
        },
        {
          id: "interpreter",
          icon: "message-circle",
          title: "Phiên dịch y tế đi cùng",
          body: "Có mặt ở buổi đọc kết quả, nơi bạn cần hiểu chính xác chứ không cần hiểu đại khái.",
        },
        {
          id: "report",
          icon: "file-text",
          title: "Kết quả song ngữ, đọc được ở nước ngoài",
          body: "Bản kết quả có tiếng Anh để bác sĩ gia đình của bạn ở nước sở tại dùng được ngay.",
        },
      ],
      facts: [
        { id: "days", icon: "clock", label: "Thời gian thực hiện", value: "1–2 ngày làm việc" },
        { id: "stay", icon: "bed-double", label: "Số ngày cần ở lại", value: "3–4 ngày" },
        { id: "result", icon: "file-check", label: "Có kết quả đầy đủ", value: "2–5 ngày" },
        { id: "fasting", icon: "utensils", label: "Chuẩn bị", value: "Nhịn ăn 8 tiếng trước buổi đầu" },
      ],
      suitedFor: [
        "Người sống ở nước ngoài muốn gộp việc kiểm tra sức khỏe vào chuyến về thăm gia đình",
        "Người đang chờ lịch tầm soát dài ngày ở nước sở tại",
        "Người có tiền sử gia đình cần theo dõi định kỳ nhưng chi phí ở nước sở tại quá cao",
      ],
      faqs: [
        {
          id: "how-long",
          question: "Khám sức khỏe tổng quát ở Việt Nam mất bao lâu?",
          answer:
            "Phần thực hiện thường gói trong một đến hai ngày làm việc nếu lịch được đặt liền mạch từ trước. Kết quả đầy đủ, gồm các xét nghiệm cần thời gian nuôi cấy hoặc giải phẫu bệnh, thường có sau hai đến năm ngày. Nên tính khoảng ba đến bốn ngày ở lại để kịp nghe bác sĩ đọc kết quả trực tiếp thay vì nhận qua email.",
        },
        {
          id: "english-report",
          question: "Kết quả có bằng tiếng Anh để bác sĩ ở nước tôi đọc được không?",
          answer:
            "Có. Chúng tôi yêu cầu bản kết quả song ngữ ngay từ khi đặt lịch, vì một bản chỉ có tiếng Việt sẽ khiến bác sĩ gia đình của bạn phải cho làm lại xét nghiệm. Nếu cơ sở không phát hành song ngữ, chúng tôi lo phần dịch thuật có xác nhận.",
        },
        {
          id: "which-package",
          question: "Tôi nên chọn gói tầm soát nào?",
          answer:
            "Không nên chọn theo bảng giá. Gói phù hợp phụ thuộc vào tuổi, giới, tiền sử gia đình và những gì bạn đã tầm soát gần đây. Chúng tôi gửi thông tin đó cho bác sĩ trước chuyến đi và đề xuất gói dựa trên ý kiến của họ, nên bạn không trả tiền cho những hạng mục không cần và không bỏ sót hạng mục cần.",
        },
      ],
    },

    {
      id: "fertility",
      metaTitle: "Chi phí và quy trình IVF tại Việt Nam cho khách quốc tế",
      metaDescription:
        "Một chu kỳ IVF tại Việt Nam, từ đánh giá ban đầu đến theo dõi thai kỳ sớm. Thời gian cần ở lại, các mốc phải có mặt, và những gì Handle điều phối.",
      heading: "Hỗ trợ sinh sản và IVF",
      headingAccent: "tại Việt Nam.",
      intro: [
        "IVF là chuyên khoa mà hậu cần ảnh hưởng trực tiếp đến kết quả, vì chu kỳ không chờ ai. Có những mốc bắt buộc phải có mặt đúng ngày, và một chuyến bay đặt sai làm hỏng cả chu kỳ chứ không chỉ làm chậm nó.",
        "Chúng tôi lập lịch ngược từ những mốc đó: bạn biết trước cần ở Việt Nam bao lâu, giai đoạn nào theo dõi được từ xa, và giai đoạn nào không.",
      ],
      includes: [
        {
          id: "timeline",
          icon: "route",
          title: "Lịch dựng ngược từ các mốc bắt buộc có mặt",
          body: "Chọc hút và chuyển phôi là hai mốc không dời được. Mọi thứ khác được xếp quanh chúng.",
        },
        {
          id: "records",
          icon: "file-text",
          title: "Thẩm định hồ sơ trước khi bay",
          body: "Kết quả xét nghiệm và chu kỳ đã thực hiện trước đó được dịch và gửi bác sĩ, để buổi hẹn đầu tiên không phải là buổi làm lại từ đầu.",
        },
        {
          id: "remote",
          icon: "phone",
          title: "Phân biệt rõ phần theo dõi từ xa",
          body: "Một phần theo dõi có thể làm ở nước sở tại. Chúng tôi nói rõ phần nào, để bạn không ở lại lâu hơn cần thiết.",
        },
        {
          id: "privacy",
          icon: "shield-check",
          title: "Giữ kín thông tin",
          body: "Đây là chuyên khoa nhiều người không muốn ai biết. Hồ sơ chỉ đến tay những người trực tiếp tham gia điều trị.",
        },
      ],
      facts: [
        { id: "cycle", icon: "clock", label: "Một chu kỳ", value: "4–6 tuần" },
        { id: "stay", icon: "bed-double", label: "Cần ở lại Việt Nam", value: "12–18 ngày" },
        { id: "visits", icon: "calendar-check", label: "Mốc bắt buộc có mặt", value: "2 mốc chính" },
        { id: "followup", icon: "heart-pulse", label: "Theo dõi thai kỳ sớm", value: "Đến tuần 8–10" },
      ],
      suitedFor: [
        "Các cặp đôi đang chờ danh sách IVF dài ở nước sở tại",
        "Người đã thực hiện một hoặc nhiều chu kỳ và muốn ý kiến chuyên khoa thứ hai",
        "Người muốn có gia đình ở gần trong suốt quá trình điều trị",
      ],
      faqs: [
        {
          id: "how-long-stay",
          question: "Làm IVF ở Việt Nam cần ở lại bao lâu?",
          answer:
            "Thường là mười hai đến mười tám ngày cho phần bắt buộc có mặt, trong một chu kỳ kéo dài bốn đến sáu tuần. Phần đầu của quá trình kích thích buồng trứng có thể theo dõi ở nước sở tại nếu bạn có bác sĩ phối hợp; hai mốc không dời được là chọc hút trứng và chuyển phôi. Chúng tôi lập lịch ngược từ hai mốc đó trước khi bạn đặt vé.",
        },
        {
          id: "previous-cycles",
          question: "Tôi đã làm IVF ở nước khác. Có phải làm lại xét nghiệm từ đầu không?",
          answer:
            "Phần lớn là không, nếu hồ sơ đầy đủ và chưa quá cũ. Chúng tôi gửi kết quả xét nghiệm, phác đồ và kết quả các chu kỳ trước cho bác sĩ đọc trước chuyến đi. Bác sĩ sẽ nói rõ hạng mục nào chấp nhận được và hạng mục nào cần làm lại — bạn biết điều đó trước khi bay, không phải khi đã đến nơi.",
        },
        {
          id: "embryo-storage",
          question: "Phôi trữ đông có chuyển về nước tôi được không?",
          answer:
            "Về mặt kỹ thuật là được, nhưng phụ thuộc vào quy định của cả hai nước và của cơ sở lưu trữ, và không phải nước nào cũng cho phép. Đây là câu hỏi cần trả lời trước khi bắt đầu chu kỳ chứ không phải sau, nên chúng tôi đưa nó vào buổi tư vấn đầu tiên nếu bạn có ý định đó.",
        },
      ],
    },

    {
      id: "eye",
      metaTitle: "Mổ mắt tại Việt Nam: LASIK, SMILE và đục thủy tinh thể",
      metaDescription:
        "Phẫu thuật khúc xạ và đục thủy tinh thể tại Việt Nam. Thời gian hồi phục, khi nào được bay, chi phí tham khảo và những gì Handle điều phối.",
      heading: "Phẫu thuật mắt",
      headingAccent: "tại Việt Nam.",
      intro: [
        "Phẫu thuật khúc xạ và đục thủy tinh thể là hai nhóm thủ thuật ngắn — tính bằng phút — nhưng cần thời gian theo dõi sau mổ và có giới hạn về việc đi máy bay ngay sau đó. Phần lớn rắc rối của khách quốc tế nằm ở chỗ đặt vé về quá sát.",
        "Chúng tôi xếp lịch quanh buổi tái khám bắt buộc và nói rõ ngày sớm nhất bạn có thể bay, trước khi bạn mua vé.",
      ],
      includes: [
        {
          id: "assessment",
          icon: "scan-eye",
          title: "Đo và đánh giá trước khi cam kết",
          body: "Không phải mắt nào cũng phù hợp với LASIK hay SMILE. Buổi đo diễn ra trước, và nếu không phù hợp thì nói ngay.",
        },
        {
          id: "lens",
          icon: "eye",
          title: "Giải thích rõ lựa chọn thủy tinh thể",
          body: "Với mổ Phaco, loại thủy tinh thể nhân tạo là yếu tố quyết định phần lớn chênh lệch chi phí. Bạn được biết mình đang chọn gì.",
        },
        {
          id: "aftercare",
          icon: "calendar-check",
          title: "Tái khám nằm trong lịch, không nằm ngoài",
          body: "Buổi kiểm tra sau mổ được đặt trước, và ngày bay về được tính từ đó.",
        },
        {
          id: "transfer",
          icon: "route",
          title: "Đưa đón sau mổ",
          body: "Bạn không tự lái xe hay tự bắt taxi trong ngày mổ và ngày hôm sau.",
        },
      ],
      facts: [
        { id: "surgery", icon: "clock", label: "Thời gian mổ", value: "10–30 phút mỗi mắt" },
        { id: "stay", icon: "bed-double", label: "Cần ở lại Việt Nam", value: "5–7 ngày" },
        { id: "fly", icon: "plane", label: "Được bay sau", value: "3–7 ngày, theo chỉ định" },
        { id: "recovery", icon: "activity", label: "Sinh hoạt bình thường", value: "1–2 tuần" },
      ],
      suitedFor: [
        "Người đeo kính hoặc kính áp tròng nhiều năm và muốn xử lý dứt điểm trong một chuyến đi",
        "Người có chỉ định mổ đục thủy tinh thể nhưng đang chờ lịch ở nước sở tại",
        "Người muốn dùng loại thủy tinh thể cao cấp mà bảo hiểm ở nước sở tại không chi trả",
      ],
      faqs: [
        {
          id: "fly-after",
          question: "Sau mổ mắt bao lâu thì được bay?",
          answer:
            "Thông thường từ ba đến bảy ngày, và con số cụ thể do bác sĩ phẫu thuật quyết định sau buổi tái khám đầu tiên chứ không phải theo một quy tắc chung. Áp suất cabin và không khí khô trên máy bay là hai yếu tố khiến việc bay quá sớm gây khó chịu và làm chậm hồi phục. Chúng tôi khuyến nghị đặt vé linh hoạt hoặc đặt sau buổi tái khám.",
        },
        {
          id: "not-suitable",
          question: "Nếu tôi bay sang rồi mới biết mắt không phù hợp để mổ thì sao?",
          answer:
            "Đó là lý do buổi đo và đánh giá được xếp trước, ngay trong ngày đầu tiên. Nếu độ dày giác mạc hoặc tình trạng mắt không phù hợp với phương pháp bạn dự định, bác sĩ sẽ nói ngay và đề xuất phương án khác nếu có. Bạn không bị tính chi phí phẫu thuật cho một ca không diễn ra.",
        },
        {
          id: "both-eyes",
          question: "Mổ hai mắt cùng lúc hay cách ngày?",
          answer:
            "Với phẫu thuật khúc xạ, hai mắt thường được mổ trong cùng một buổi. Với mổ đục thủy tinh thể, hai mắt thường cách nhau vài ngày đến vài tuần để theo dõi mắt đầu tiên trước. Điều này ảnh hưởng trực tiếp đến số ngày bạn cần ở lại, nên nó được xác định trước khi lên lịch chuyến đi.",
        },
      ],
    },

    {
      id: "dental",
      metaTitle: "Trồng răng implant tại Việt Nam: chi phí và thời gian",
      metaDescription:
        "Cấy ghép implant, chỉnh nha trong suốt và phục hình toàn hàm tại Việt Nam. Số lần phải sang, thời gian tích hợp xương và chi phí tham khảo.",
      heading: "Nha khoa và cấy ghép implant",
      headingAccent: "tại Việt Nam.",
      intro: [
        "Nha khoa là chuyên khoa mà chênh lệch chi phí lớn nhất và cũng là chuyên khoa dễ bị làm ẩu nhất. Một trụ implant rẻ hơn ba lần không có nghĩa là cùng một trụ.",
        "Điều quan trọng hơn giá: implant cần thời gian tích hợp xương, nghĩa là phần lớn ca cần hai chuyến sang chứ không phải một. Chúng tôi nói rõ điều đó từ đầu, vì kế hoạch đi lại của bạn phụ thuộc vào nó.",
      ],
      includes: [
        {
          id: "brand",
          icon: "shield-check",
          title: "Nói rõ trụ implant thuộc hệ thống nào",
          body: "Loại trụ quyết định phần lớn chênh lệch giá, và quyết định cả việc bác sĩ ở nước bạn có xử lý được về sau hay không.",
        },
        {
          id: "twostage",
          icon: "calendar-check",
          title: "Lên kế hoạch cho cả hai chuyến",
          body: "Chuyến một đặt trụ, chuyến hai gắn mão. Cả hai được lên lịch cùng lúc, không để bạn tự tính.",
        },
        {
          id: "imaging",
          icon: "microscope",
          title: "Phim và kế hoạch điều trị gửi trước",
          body: "Bác sĩ xem phim CT của bạn trước khi bạn bay, nên kế hoạch và chi phí không thay đổi khi bạn đến nơi.",
        },
        {
          id: "records",
          icon: "file-text",
          title: "Hồ sơ bàn giao để theo dõi tại nước sở tại",
          body: "Bạn về nước với hồ sơ đủ để một nha sĩ khác tiếp nhận theo dõi.",
        },
      ],
      facts: [
        { id: "trip1", icon: "plane", label: "Chuyến một — đặt trụ", value: "5–7 ngày" },
        { id: "osseo", icon: "clock", label: "Chờ tích hợp xương", value: "3–6 tháng" },
        { id: "trip2", icon: "plane", label: "Chuyến hai — gắn mão", value: "3–5 ngày" },
        { id: "aligner", icon: "smile", label: "Chỉnh nha trong suốt", value: "12–24 tháng, theo dõi từ xa" },
      ],
      suitedFor: [
        "Người cần nhiều trụ implant, nơi chênh lệch chi phí đủ lớn để bù chi phí đi lại",
        "Người cần phục hình toàn hàm và muốn làm gọn trong hai chuyến",
        "Người về Việt Nam định kỳ và muốn ghép lịch điều trị vào các chuyến đã có",
      ],
      faqs: [
        {
          id: "how-many-trips",
          question: "Trồng răng implant ở Việt Nam cần sang mấy lần?",
          answer:
            "Phần lớn ca cần hai chuyến. Chuyến đầu đặt trụ, mất khoảng năm đến bảy ngày. Sau đó trụ cần ba đến sáu tháng để tích hợp với xương hàm — giai đoạn này bạn ở nhà. Chuyến hai để gắn mão sứ, mất ba đến năm ngày. Một số ca đủ điều kiện làm implant tức thì trong một chuyến, nhưng điều đó phải do bác sĩ xác định trên phim CT, không phải mặc định.",
        },
        {
          id: "implant-brand",
          question: "Làm sao biết trụ implant dùng cho tôi là loại nào?",
          answer:
            "Bạn có quyền biết và nên hỏi trước khi đồng ý. Hệ thống implant được ghi rõ trong báo giá và trong hồ sơ bàn giao, kèm mã trụ. Điều này quan trọng không chỉ vì giá: nếu sau này bạn cần xử lý ở nước sở tại, nha sĩ ở đó cần biết hệ thống nào để đặt đúng phụ kiện.",
        },
        {
          id: "aligner-abroad",
          question: "Chỉnh nha trong suốt có làm được khi tôi sống ở nước ngoài không?",
          answer:
            "Được, vì phần lớn liệu trình là đeo khay tại nhà. Bạn cần có mặt cho buổi lấy dấu và lên kế hoạch ban đầu, sau đó các bộ khay được gửi theo lịch và tiến trình được theo dõi từ xa qua ảnh. Thường chỉ cần quay lại một đến hai lần trong toàn bộ liệu trình mười hai đến hai mươi bốn tháng.",
        },
      ],
    },

    {
      id: "aesthetic",
      metaTitle: "Phẫu thuật thẩm mỹ tại Việt Nam: chi phí và hồi phục",
      metaDescription:
        "Phẫu thuật thẩm mỹ và trẻ hóa da tại Việt Nam, thực hiện bởi bác sĩ có chứng chỉ hành nghề. Thời gian hồi phục, khi nào được bay và chi phí tham khảo.",
      heading: "Phẫu thuật thẩm mỹ",
      headingAccent: "tại Việt Nam.",
      intro: [
        "Đây là chuyên khoa cần nói thẳng nhất. Thẩm mỹ ở Việt Nam có cả cơ sở rất tốt lẫn cơ sở không nên đặt chân tới, và mức giá không phải là thứ phân biệt hai loại đó.",
        "Chúng tôi chỉ làm việc với bác sĩ có chứng chỉ hành nghề phẫu thuật tạo hình và cơ sở được cấp phép thực hiện thủ thuật tương ứng. Nếu một yêu cầu nằm ngoài phạm vi đó, chúng tôi từ chối thay vì tìm nơi nhận.",
      ],
      includes: [
        {
          id: "credentials",
          icon: "award",
          title: "Kiểm tra chứng chỉ hành nghề trước khi giới thiệu",
          body: "Bác sĩ được nêu tên, và phạm vi hành nghề được kiểm tra chứ không chỉ được tin.",
        },
        {
          id: "consult",
          icon: "message-circle",
          title: "Tư vấn trước chuyến đi, có phiên dịch",
          body: "Bạn trao đổi với bác sĩ sẽ mổ cho mình trước khi bay, không phải với nhân viên tư vấn.",
        },
        {
          id: "recovery",
          icon: "bed-double",
          title: "Nơi hồi phục yên tĩnh, không phải khách sạn phố",
          body: "Vài ngày đầu sau mổ cần chỗ nghỉ phù hợp và người kiểm tra định kỳ.",
        },
        {
          id: "aftercare",
          icon: "phone",
          title: "Theo dõi sau khi bạn về nước",
          body: "Ảnh và tình trạng được gửi lại bác sĩ theo lịch, chứ không kết thúc ở sân bay.",
        },
      ],
      facts: [
        { id: "surgery", icon: "clock", label: "Thời gian phẫu thuật", value: "1–4 giờ, tùy thủ thuật" },
        { id: "stay", icon: "bed-double", label: "Cần ở lại Việt Nam", value: "7–14 ngày" },
        { id: "fly", icon: "plane", label: "Được bay sau", value: "7–10 ngày, theo chỉ định" },
        { id: "settle", icon: "activity", label: "Kết quả ổn định", value: "3–6 tháng" },
      ],
      suitedFor: [
        "Người đã tìm hiểu kỹ và muốn một cơ sở được kiểm chứng thay vì một quảng cáo",
        "Người cần đủ thời gian hồi phục kín đáo trước khi quay lại công việc",
        "Người muốn trao đổi trực tiếp với bác sĩ phẫu thuật trước khi quyết định",
      ],
      faqs: [
        {
          id: "safety",
          question: "Làm sao biết cơ sở thẩm mỹ ở Việt Nam có an toàn không?",
          answer:
            "Hai thứ cần kiểm tra và đều kiểm tra được: bác sĩ có chứng chỉ hành nghề phẫu thuật tạo hình hay không, và cơ sở có được cấp phép thực hiện đúng loại thủ thuật đó hay không. Giá và mức độ nổi tiếng trên mạng xã hội không nói lên điều gì về hai điểm này. Handle kiểm tra cả hai trước khi giới thiệu, và từ chối những yêu cầu nằm ngoài phạm vi hành nghề của bác sĩ.",
        },
        {
          id: "recovery-time",
          question: "Sau phẫu thuật thẩm mỹ bao lâu thì bay về được?",
          answer:
            "Thường là bảy đến mười ngày, tùy thủ thuật và tùy diễn tiến của bạn. Ngồi máy bay đường dài quá sớm sau phẫu thuật làm tăng nguy cơ sưng nề và huyết khối, nên đây là mốc do bác sĩ quyết định sau khi kiểm tra chứ không phải mốc bạn tự chọn. Nên tính dư vài ngày trong kế hoạch.",
        },
        {
          id: "revision",
          question: "Nếu kết quả không như mong đợi thì xử lý thế nào?",
          answer:
            "Kết quả thẩm mỹ cần ba đến sáu tháng để ổn định, nên đánh giá quá sớm thường là đánh giá sai. Sau mốc đó, nếu vẫn cần chỉnh sửa, điều kiện và chi phí phụ thuộc vào chính sách của cơ sở đã thực hiện — đây là điều cần hỏi và ghi vào thỏa thuận trước khi mổ, không phải sau. Chúng tôi đưa câu hỏi này vào buổi tư vấn trước chuyến đi.",
        },
      ],
    },

    {
      id: "cardio",
      metaTitle: "Điều trị tim mạch tại Việt Nam cho bệnh nhân quốc tế",
      metaDescription:
        "Can thiệp mạch vành, điện sinh lý và phục hồi chức năng tim tại Việt Nam. Hồ sơ cần chuẩn bị, thời gian nằm viện và chi phí tham khảo.",
      heading: "Tim mạch",
      headingAccent: "tại Việt Nam.",
      intro: [
        "Đây là chuyên khoa có chênh lệch chi phí lớn nhất trong bảng của chúng tôi, và cũng là chuyên khoa cần thẩm định hồ sơ kỹ nhất trước khi bay.",
        "Tim mạch không phải là thứ nên sắp xếp gấp. Nếu tình trạng của bạn cần can thiệp trong vài ngày tới, hãy điều trị ở nơi bạn đang ở. Trang này dành cho các ca có kế hoạch — nơi việc chuẩn bị kỹ có ích, chứ không phải nơi thời gian là yếu tố quyết định.",
      ],
      includes: [
        {
          id: "review",
          icon: "microscope",
          title: "Bác sĩ tim mạch đọc hồ sơ trước khi bạn bay",
          body: "Kết quả chụp mạch, siêu âm tim và thuốc đang dùng được dịch và gửi trước. Nếu không nên đi, chúng tôi nói vậy.",
        },
        {
          id: "hospital",
          icon: "hospital",
          title: "Chọn cơ sở theo năng lực can thiệp, không theo tiện nghi",
          body: "Với chuyên khoa này, phòng thông tim và ê-kíp trực là tiêu chí, không phải phòng bệnh.",
        },
        {
          id: "companion",
          icon: "users-round",
          title: "Sắp xếp cho người đi cùng",
          body: "Không ai nên làm thủ thuật tim một mình ở nước ngoài. Chúng tôi lo cả phần lưu trú và di chuyển cho người thân đi kèm.",
        },
        {
          id: "handover",
          icon: "file-check",
          title: "Bàn giao cho bác sĩ ở nước sở tại",
          body: "Tóm tắt bệnh án, thuốc và lịch theo dõi bằng tiếng Anh, ở định dạng bác sĩ của bạn dùng được.",
        },
      ],
      facts: [
        { id: "procedure", icon: "clock", label: "Thời gian can thiệp", value: "1–2 giờ" },
        { id: "inpatient", icon: "bed-double", label: "Nằm viện", value: "2–4 ngày" },
        { id: "stay", icon: "map-pin", label: "Cần ở lại Việt Nam", value: "10–14 ngày" },
        { id: "fly", icon: "plane", label: "Được bay sau", value: "7–14 ngày, theo chỉ định" },
      ],
      suitedFor: [
        "Bệnh nhân có chỉ định can thiệp theo kế hoạch, hồ sơ đã đầy đủ",
        "Người đang chờ lịch can thiệp dài ở nước sở tại và tình trạng cho phép chờ đợi có kiểm soát",
        "Người cần ý kiến chuyên khoa thứ hai trước khi quyết định phương án điều trị",
      ],
      faqs: [
        {
          id: "records-needed",
          question: "Tôi cần chuẩn bị hồ sơ gì trước khi sang điều trị tim mạch?",
          answer:
            "Tối thiểu: kết quả chụp mạch vành gần nhất kèm hình ảnh, siêu âm tim, điện tâm đồ, danh sách thuốc đang dùng với liều lượng, và tóm tắt bệnh án. Nếu đã từng đặt stent hoặc phẫu thuật tim, cần cả hồ sơ lần đó. Chúng tôi dịch và gửi bác sĩ đọc trước, để buổi hẹn đầu tiên là buổi bàn phương án chứ không phải buổi thu thập thông tin.",
        },
        {
          id: "emergency",
          question: "Trường hợp cấp cứu có sang Việt Nam điều trị được không?",
          answer:
            "Không nên. Nếu tình trạng của bạn cần can thiệp trong vài ngày tới, hãy điều trị tại nơi bạn đang ở — thời gian bay, thời gian thẩm định hồ sơ và thời gian sắp xếp lịch đều không phù hợp với một ca cấp cứu. Dịch vụ này dành cho các ca có kế hoạch, nơi việc chuẩn bị kỹ mang lại lợi ích thật.",
        },
        {
          id: "companion",
          question: "Tôi có nên đi cùng người thân không?",
          answer:
            "Nên. Sau can thiệp mạch vành, bạn sẽ có vài ngày cần hỗ trợ trong sinh hoạt, và có người ở cùng khi bác sĩ trao đổi phương án là điều khác biệt thật sự. Chúng tôi sắp xếp lưu trú và di chuyển cho người đi cùng như một phần của kế hoạch, không tính là việc phát sinh.",
        },
      ],
    },
  ],

  en: [
    {
      id: "checkup",
      metaTitle: "Executive Health Screening in Vietnam for Foreigners",
      metaDescription:
        "A deep screening package in Vietnam completed in one to two days, reported in English. Handle books it, interprets, drives you and sits through the results.",
      heading: "Executive health screening",
      headingAccent: "in Vietnam.",
      intro: [
        "A thorough screening package in Vietnam usually finishes inside one or two working days rather than spreading across weeks with a separate appointment for each item. That is why many people living abroad fold a check-up into a trip home.",
        "What makes it hard is not the medicine, it is the logistics: choosing the right package for your age and history, getting two consecutive days booked, and understanding the results when they land. Those are the three things we do.",
      ],
      includes: [
        {
          id: "package",
          icon: "clipboard-list",
          title: "The package chosen from your records, not a price list",
          body: "Your history and age go to a doctor first, so the screening covers what actually needs screening.",
        },
        {
          id: "schedule",
          icon: "calendar-check",
          title: "Consecutive appointments across one or two days",
          body: "Items sequenced in the right order, including the ones that need you fasting from the night before.",
        },
        {
          id: "interpreter",
          icon: "message-circle",
          title: "A medical interpreter with you",
          body: "Present at the results consultation, where you need to understand exactly rather than roughly.",
        },
        {
          id: "report",
          icon: "file-text",
          title: "A report your doctor at home can read",
          body: "Issued in English as well as Vietnamese, so your GP can use it instead of re-ordering the tests.",
        },
      ],
      facts: [
        { id: "days", icon: "clock", label: "Time to complete", value: "1–2 working days" },
        { id: "stay", icon: "bed-double", label: "Days in country", value: "3–4 days" },
        { id: "result", icon: "file-check", label: "Full results", value: "2–5 days" },
        { id: "fasting", icon: "utensils", label: "Preparation", value: "Fast 8 hours before day one" },
      ],
      suitedFor: [
        "People living abroad folding a check-up into a trip home",
        "Anyone facing a long screening wait in their own system",
        "Anyone with a family history needing regular monitoring priced out of reach at home",
      ],
      faqs: [
        {
          id: "how-long",
          question: "How long does a full health screening in Vietnam take?",
          answer:
            "The appointments themselves usually fit into one or two working days when they are booked consecutively in advance. Full results, including tests that need culture or pathology time, typically follow in two to five days. Allow three to four days in country so you can hear the results from the doctor in person rather than receiving them by email.",
        },
        {
          id: "english-report",
          question: "Will the report be in English for my doctor at home?",
          answer:
            "Yes. We request a bilingual report at the point of booking, because a Vietnamese-only report leaves your GP with no option but to re-order the tests. Where a facility cannot issue one, we arrange certified translation.",
        },
        {
          id: "which-package",
          question: "Which screening package should I choose?",
          answer:
            "Not the one chosen from a price list. The right package depends on your age, sex, family history and what you have already been screened for recently. We send that to a doctor before your trip and recommend a package on their advice, so you neither pay for items you do not need nor miss ones you do.",
        },
      ],
    },

    {
      id: "fertility",
      metaTitle: "IVF in Vietnam: Cost, Timeline and What to Expect",
      metaDescription:
        "A full IVF cycle in Vietnam, from first assessment to early pregnancy monitoring. Days in country, the dates you must be present, and what Handle coordinates.",
      heading: "Fertility and IVF",
      headingAccent: "in Vietnam.",
      intro: [
        "IVF is the specialty where logistics affect the outcome directly, because a cycle waits for nobody. Some dates you have to be present for, and a flight booked wrong ruins a cycle rather than merely delaying it.",
        "We schedule backwards from those dates: you know how long you need to be in Vietnam, which phase can be monitored remotely, and which cannot.",
      ],
      includes: [
        {
          id: "timeline",
          icon: "route",
          title: "A schedule built backwards from the fixed dates",
          body: "Retrieval and transfer cannot move. Everything else is arranged around them.",
        },
        {
          id: "records",
          icon: "file-text",
          title: "Records reviewed before you fly",
          body: "Previous results and cycles translated and sent ahead, so the first appointment is not a fresh start.",
        },
        {
          id: "remote",
          icon: "phone",
          title: "A clear line around what can be monitored at home",
          body: "Part of the monitoring can happen where you live. We say which part, so you do not stay longer than you need to.",
        },
        {
          id: "privacy",
          icon: "shield-check",
          title: "Kept private",
          body: "This is a specialty many people tell no one about. Records reach only the people treating you.",
        },
      ],
      facts: [
        { id: "cycle", icon: "clock", label: "One cycle", value: "4–6 weeks" },
        { id: "stay", icon: "bed-double", label: "Days in Vietnam", value: "12–18 days" },
        { id: "visits", icon: "calendar-check", label: "Dates you must attend", value: "2 fixed points" },
        { id: "followup", icon: "heart-pulse", label: "Early pregnancy monitoring", value: "To week 8–10" },
      ],
      suitedFor: [
        "Couples facing long IVF waiting lists at home",
        "Anyone who has had one or more cycles and wants a second specialist opinion",
        "Anyone who wants family nearby through treatment",
      ],
      faqs: [
        {
          id: "how-long-stay",
          question: "How long do I need to stay in Vietnam for IVF?",
          answer:
            "Usually twelve to eighteen days for the part requiring your presence, within a cycle running four to six weeks. The early stimulation phase can often be monitored at home if you have a doctor willing to coordinate; the two dates that cannot move are egg retrieval and embryo transfer. We build the schedule backwards from those before you book flights.",
        },
        {
          id: "previous-cycles",
          question: "I have had IVF elsewhere. Will I have to repeat all the tests?",
          answer:
            "Mostly no, provided the records are complete and not too old. We send previous results, protocols and cycle outcomes to the doctor before your trip, and they tell you which items are acceptable and which need repeating — you know that before you fly rather than after you arrive.",
        },
        {
          id: "embryo-storage",
          question: "Can frozen embryos be shipped to my country?",
          answer:
            "Technically yes, but it depends on the regulations in both countries and on the storage facility, and not every country permits it. This is a question to settle before a cycle begins rather than after, so we raise it in the first consultation if that is something you intend.",
        },
      ],
    },

    {
      id: "eye",
      metaTitle: "Eye Surgery in Vietnam: LASIK, SMILE and Cataract",
      metaDescription:
        "Refractive and cataract surgery in Vietnam. Recovery time, when you can fly, reference costs and what Handle coordinates around the procedure.",
      heading: "Eye surgery",
      headingAccent: "in Vietnam.",
      intro: [
        "Refractive and cataract procedures are short — measured in minutes — but they need post-operative review and they limit flying immediately afterwards. Most of the trouble international patients run into comes from booking the return flight too tight.",
        "We schedule around the mandatory follow-up and tell you the earliest date you can fly, before you buy the ticket.",
      ],
      includes: [
        {
          id: "assessment",
          icon: "scan-eye",
          title: "Measured and assessed before anyone commits",
          body: "Not every eye suits LASIK or SMILE. The assessment happens first, and an unsuitable eye is called on the day.",
        },
        {
          id: "lens",
          icon: "eye",
          title: "The lens choice explained",
          body: "For cataract surgery the intraocular lens drives most of the cost difference. You know what you are choosing.",
        },
        {
          id: "aftercare",
          icon: "calendar-check",
          title: "Follow-up inside the schedule, not after it",
          body: "The post-operative check is booked in advance, and the flight home is counted from it.",
        },
        {
          id: "transfer",
          icon: "route",
          title: "Driven, on the day and the day after",
          body: "You are not finding your own taxi with a patched eye.",
        },
      ],
      facts: [
        { id: "surgery", icon: "clock", label: "Time in theatre", value: "10–30 minutes per eye" },
        { id: "stay", icon: "bed-double", label: "Days in Vietnam", value: "5–7 days" },
        { id: "fly", icon: "plane", label: "Cleared to fly", value: "3–7 days, on advice" },
        { id: "recovery", icon: "activity", label: "Back to normal activity", value: "1–2 weeks" },
      ],
      suitedFor: [
        "Long-term glasses or contact lens wearers wanting it resolved in one trip",
        "Anyone with a cataract referral facing a long wait at home",
        "Anyone wanting a premium lens their insurer at home will not fund",
      ],
      faqs: [
        {
          id: "fly-after",
          question: "How soon can I fly after eye surgery?",
          answer:
            "Usually three to seven days, and the exact date is the surgeon's call at your first post-operative check rather than a general rule. Cabin pressure and dry cabin air are what make flying too early uncomfortable and slow healing. We recommend a flexible ticket, or booking the return only after that check.",
        },
        {
          id: "not-suitable",
          question: "What if I fly out and my eyes turn out to be unsuitable?",
          answer:
            "That is why the assessment is scheduled first, on the day you arrive. If corneal thickness or eye health does not suit the procedure you had in mind, the surgeon says so and proposes an alternative where one exists. You are not charged a surgical fee for an operation that does not happen.",
        },
        {
          id: "both-eyes",
          question: "Are both eyes done at once or on separate days?",
          answer:
            "For refractive surgery, both eyes are usually treated in the same session. For cataract surgery, the two are normally separated by days or weeks so the first eye can be reviewed before the second. This changes how long you need to stay, so it is settled before the trip is scheduled.",
        },
      ],
    },

    {
      id: "dental",
      metaTitle: "Dental Implants in Vietnam: Cost, Trips and Timeline",
      metaDescription:
        "Implants, clear aligners and full-arch restoration in Vietnam. How many trips it takes, how long osseointegration needs, and reference costs.",
      heading: "Dental care and implants",
      headingAccent: "in Vietnam.",
      intro: [
        "Dentistry carries the widest cost gap and is also the easiest work to have done badly. An implant fixture that costs a third as much is not the same fixture.",
        "More important than price: implants need time to integrate with bone, which means most cases take two trips rather than one. We say so at the start, because your travel plans depend on it.",
      ],
      includes: [
        {
          id: "brand",
          icon: "shield-check",
          title: "The implant system named",
          body: "It drives most of the price difference, and it decides whether a dentist at home can service the work later.",
        },
        {
          id: "twostage",
          icon: "calendar-check",
          title: "Both trips planned together",
          body: "Fixture on the first, crown on the second. Scheduled at the same time rather than left to you.",
        },
        {
          id: "imaging",
          icon: "microscope",
          title: "Imaging and plan reviewed before you fly",
          body: "The dentist reads your CT scan in advance, so the plan and the price do not change once you arrive.",
        },
        {
          id: "records",
          icon: "file-text",
          title: "Records for whoever follows up at home",
          body: "You leave with enough documentation for another dentist to take over.",
        },
      ],
      facts: [
        { id: "trip1", icon: "plane", label: "Trip one — fixture", value: "5–7 days" },
        { id: "osseo", icon: "clock", label: "Integration period", value: "3–6 months" },
        { id: "trip2", icon: "plane", label: "Trip two — crown", value: "3–5 days" },
        { id: "aligner", icon: "smile", label: "Clear aligners", value: "12–24 months, monitored remotely" },
      ],
      suitedFor: [
        "Anyone needing several implants, where the cost gap covers the travel",
        "Anyone needing full-arch restoration and wanting it done across two trips",
        "Anyone travelling to Vietnam regularly who can attach treatment to trips already planned",
      ],
      faqs: [
        {
          id: "how-many-trips",
          question: "How many trips do dental implants in Vietnam take?",
          answer:
            "Most cases take two. The first places the fixture and runs five to seven days. The fixture then needs three to six months to integrate with the jawbone, which you spend at home. The second trip fits the crown and takes three to five days. Some cases qualify for immediate loading in a single trip, but that is a decision made on your CT scan, not a default.",
        },
        {
          id: "implant-brand",
          question: "How do I know which implant system is being used?",
          answer:
            "You are entitled to know and should ask before agreeing. The system is named in the quote and in your discharge records, with the fixture reference. This matters beyond price: if the work ever needs attention at home, the dentist there needs to know which system to order components for.",
        },
        {
          id: "aligner-abroad",
          question: "Can I do clear aligner treatment while living abroad?",
          answer:
            "Yes, because most of the course is wearing trays at home. You need to attend for the initial scan and planning, after which sets are shipped on schedule and progress is monitored remotely by photograph. Most people return only once or twice across a twelve to twenty-four month course.",
        },
      ],
    },

    {
      id: "aesthetic",
      metaTitle: "Cosmetic Surgery in Vietnam: Cost, Safety and Recovery",
      metaDescription:
        "Cosmetic surgery and skin rejuvenation in Vietnam with board-certified surgeons. Recovery time, when you can fly and reference costs.",
      heading: "Cosmetic surgery",
      headingAccent: "in Vietnam.",
      intro: [
        "This is the specialty that needs the plainest talking. Vietnamese aesthetics includes excellent practices and places nobody should walk into, and price is not what separates the two.",
        "We work only with surgeons certified in plastic surgery, at facilities licensed for the procedure in question. Where a request falls outside that, we decline it rather than find somewhere that will take it.",
      ],
      includes: [
        {
          id: "credentials",
          icon: "award",
          title: "Credentials checked before anyone is recommended",
          body: "The surgeon is named, and their scope of practice is verified rather than assumed.",
        },
        {
          id: "consult",
          icon: "message-circle",
          title: "A pre-trip consultation, interpreted",
          body: "You speak to the surgeon who will operate, not to a sales consultant.",
        },
        {
          id: "recovery",
          icon: "bed-double",
          title: "Somewhere quiet to recover",
          body: "The first days need a suitable place to rest and someone checking on you, not a city-centre hotel.",
        },
        {
          id: "aftercare",
          icon: "phone",
          title: "Follow-up once you are home",
          body: "Photographs and progress go back to the surgeon on a schedule; it does not end at the airport.",
        },
      ],
      facts: [
        { id: "surgery", icon: "clock", label: "Time in theatre", value: "1–4 hours by procedure" },
        { id: "stay", icon: "bed-double", label: "Days in Vietnam", value: "7–14 days" },
        { id: "fly", icon: "plane", label: "Cleared to fly", value: "7–10 days, on advice" },
        { id: "settle", icon: "activity", label: "Result settles", value: "3–6 months" },
      ],
      suitedFor: [
        "Anyone who has done the research and wants a verified practice rather than an advertisement",
        "Anyone who needs enough time to recover privately before returning to work",
        "Anyone who wants to speak with the operating surgeon before deciding",
      ],
      faqs: [
        {
          id: "safety",
          question: "How do I know a cosmetic surgery practice in Vietnam is safe?",
          answer:
            "Two things are worth checking and both can be checked: whether the surgeon is certified in plastic surgery, and whether the facility is licensed for that category of procedure. Price and social-media following tell you nothing about either. Handle verifies both before recommending anyone, and declines requests that fall outside a surgeon's scope of practice.",
        },
        {
          id: "recovery-time",
          question: "How long after cosmetic surgery can I fly home?",
          answer:
            "Usually seven to ten days, depending on the procedure and on how you are healing. A long-haul flight too soon after surgery raises the risk of swelling and clots, so this is the surgeon's decision after examining you rather than a date you pick. Build a few spare days into the plan.",
        },
        {
          id: "revision",
          question: "What happens if I am unhappy with the result?",
          answer:
            "Cosmetic results take three to six months to settle, so judging one earlier usually means judging it wrong. After that point, if revision is still warranted, the terms and cost depend on the operating facility's policy — which is something to ask about and get in writing before surgery, not after. We put that question into the pre-trip consultation.",
        },
      ],
    },

    {
      id: "cardio",
      metaTitle: "Cardiac Treatment in Vietnam for International Patients",
      metaDescription:
        "Coronary intervention, electrophysiology and cardiac rehabilitation in Vietnam. Records to prepare, inpatient days and reference costs.",
      heading: "Cardiology",
      headingAccent: "in Vietnam.",
      intro: [
        "This carries the widest cost gap in our table, and it needs the most careful records review before anyone flies.",
        "Cardiac care is not something to arrange in a hurry. If your condition needs intervention within days, be treated where you are. This page is for planned cases — where preparing properly helps, rather than where time is the deciding factor.",
      ],
      includes: [
        {
          id: "review",
          icon: "microscope",
          title: "A cardiologist reads your records before you fly",
          body: "Angiography, echocardiogram and current medication translated and sent ahead. If you should not travel, we say so.",
        },
        {
          id: "hospital",
          icon: "hospital",
          title: "Facility chosen on capability, not on comfort",
          body: "For this specialty the catheterisation lab and the on-call team are the criteria, not the room.",
        },
        {
          id: "companion",
          icon: "users-round",
          title: "Arrangements for someone with you",
          body: "Nobody should have a cardiac procedure alone in another country. Accommodation and transfers cover your companion too.",
        },
        {
          id: "handover",
          icon: "file-check",
          title: "A handover your own cardiologist can use",
          body: "Discharge summary, medication and follow-up schedule in English, in the format your doctor works from.",
        },
      ],
      facts: [
        { id: "procedure", icon: "clock", label: "Procedure time", value: "1–2 hours" },
        { id: "inpatient", icon: "bed-double", label: "Inpatient stay", value: "2–4 days" },
        { id: "stay", icon: "map-pin", label: "Days in Vietnam", value: "10–14 days" },
        { id: "fly", icon: "plane", label: "Cleared to fly", value: "7–14 days, on advice" },
      ],
      suitedFor: [
        "Patients with a planned intervention and complete records",
        "Anyone facing a long wait at home whose condition allows a controlled delay",
        "Anyone wanting a second specialist opinion before choosing a treatment path",
      ],
      faqs: [
        {
          id: "records-needed",
          question: "What records do I need before travelling for cardiac treatment?",
          answer:
            "At minimum: your most recent coronary angiography with the images, an echocardiogram, an ECG, a current medication list with doses, and a clinical summary. If you have had a stent or cardiac surgery before, those records too. We translate and send them ahead so the first appointment discusses a plan rather than gathers information.",
        },
        {
          id: "emergency",
          question: "Can I travel to Vietnam for emergency cardiac treatment?",
          answer:
            "You should not. If your condition needs intervention within days, be treated where you are — flight time, records review and scheduling are all incompatible with an emergency. This service is for planned cases, where preparing properly genuinely helps.",
        },
        {
          id: "companion",
          question: "Should someone travel with me?",
          answer:
            "Yes. After a coronary intervention you will have several days needing help with ordinary things, and having someone present when the cardiologist explains the plan makes a real difference. We arrange accommodation and transfers for a companion as part of the plan rather than as an extra.",
        },
      ],
    },
  ],
};
