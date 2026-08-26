import type { CostCategory, CostItem, Localized, OtherSpecialty } from "@/types";

/* ------------------------------------------------------------------ *
 *  The client's published price schedule, transcribed.
 *
 *  Quoted in Australian dollars, which is the currency the schedule arrived
 *  in. Converting into a second currency would only add an exchange rate
 *  that goes stale between deploys and a number nobody has agreed to.
 *
 *  Three rules the schedule itself sets, which the table has to keep:
 *
 *  1. **A range, never a figure.** Even one procedure moves with the
 *     facility, the materials and the case.
 *  2. **`isOpenEnded` renders the trailing "+".** Where the source writes
 *     "A$3,500–8,000+" the upper bound is a starting point, not a ceiling;
 *     dropping the plus turns it into a cap nobody offered.
 *  3. **Some rows cannot be banded at all.** Surgery, donor pathways and
 *     genetic testing are quoted case by case, and a screening report is
 *     included in whichever package was bought. `CostPrice` carries that
 *     distinction rather than leaving a blank cell to be read as free.
 *
 *  Still deliberately absent from the JSON-LD graph.
 *  `Offer.priceSpecification` is what earns a price-rich result, and these
 *  are reference bands for a coordinated journey rather than a checkout
 *  price — the same reasoning that keeps `AggregateRating` out of
 *  `lib/json-ld.ts`.
 * ------------------------------------------------------------------ */

const quote = { kind: "quote" } as const;
const included = { kind: "included" } as const;

/** `aud(3500, 8000, true)` → a band rendered as "A$3,500 – A$8,000+". */
const aud = (from: number, to: number, isOpenEnded = false) =>
  ({ kind: "band", aud: { from, to, ...(isOpenEnded ? { isOpenEnded } : {}) } }) as const;

export const costCategories: Localized<CostCategory[]> = {
  vi: [
    {
      id: "fertility",
      serviceId: "fertility",
      title: "Hỗ trợ sinh sản & IVF",
      intro:
        "Đánh giá khả năng sinh sản, IUI, IVF và điều phối sức khỏe sinh sản. Đây là một hành trình điều trị có người dẫn, không phải một thủ thuật đơn lẻ.",
      journey: [],
    },
    {
      id: "digestive",
      serviceId: "digestive",
      title: "Tiêu hóa",
      intro:
        "Đánh giá sức khỏe tiêu hóa, nội soi dạ dày, nội soi đại tràng và tầm soát bệnh lý cùng ung thư đường tiêu hóa.",
      journey: [
        {
          id: "journey",
          label: "Hành trình tiêu hóa thường gặp",
          aud: { from: 300, to: 800, isOpenEnded: true },
        },
      ],
    },
    {
      id: "screening",
      serviceId: "checkup",
      title: "Tầm soát sức khỏe & ung thư toàn diện",
      intro:
        "Tầm soát dự phòng thiết kế theo tuổi, giới, tiền sử, yếu tố nguy cơ và mục tiêu tầm soát của từng khách hàng.",
      journey: [
        {
          id: "executive",
          label: "Tầm soát sức khỏe cao cấp",
          aud: { from: 1000, to: 2000, isOpenEnded: true },
        },
        {
          id: "cancer",
          label: "Tầm soát ung thư toàn diện",
          aud: { from: 1000, to: 2500, isOpenEnded: true },
        },
      ],
    },
    {
      id: "eye",
      serviceId: "eye",
      title: "Nhãn khoa",
      intro:
        "Khám mắt, chẩn đoán hình ảnh và điều phối điều trị cho các bệnh lý mắt thường gặp lẫn phức tạp.",
      journey: [
        {
          id: "journey",
          label: "Hành trình chăm sóc mắt thường gặp",
          aud: { from: 200, to: 1000, isOpenEnded: true },
        },
      ],
    },
    {
      id: "cardio",
      serviceId: "cardio",
      title: "Tim mạch",
      intro:
        "Đánh giá tim mạch dự phòng, chẩn đoán và điều phối chăm sóc tim mạch chuyên sâu.",
      journey: [
        {
          id: "journey",
          label: "Hành trình tim mạch thường gặp",
          aud: { from: 300, to: 1500, isOpenEnded: true },
        },
      ],
    },
  ],
  en: [
    {
      id: "fertility",
      serviceId: "fertility",
      title: "Fertility & IVF",
      intro:
        "Fertility assessment, IUI, IVF and reproductive-health coordination. This is a guided treatment journey rather than a single procedure.",
      journey: [],
    },
    {
      id: "digestive",
      serviceId: "digestive",
      title: "Gastroenterology",
      intro:
        "Digestive health assessment, gastroscopy, colonoscopy and screening for gastrointestinal disease and cancer.",
      journey: [
        {
          id: "journey",
          label: "Typical digestive health journey",
          aud: { from: 300, to: 800, isOpenEnded: true },
        },
      ],
    },
    {
      id: "screening",
      serviceId: "checkup",
      title: "Comprehensive health & cancer screening",
      intro:
        "Preventive health assessment designed around age, sex, medical history, risk factors and your own screening objectives.",
      journey: [
        {
          id: "executive",
          label: "Executive health screening",
          aud: { from: 1000, to: 2000, isOpenEnded: true },
        },
        {
          id: "cancer",
          label: "Comprehensive cancer screening",
          aud: { from: 1000, to: 2500, isOpenEnded: true },
        },
      ],
    },
    {
      id: "eye",
      serviceId: "eye",
      title: "Ophthalmology",
      intro:
        "Eye examination, diagnostic imaging and coordination of treatment for common and complex eye conditions.",
      journey: [
        {
          id: "journey",
          label: "Typical eye care journey",
          aud: { from: 200, to: 1000, isOpenEnded: true },
        },
      ],
    },
    {
      id: "cardio",
      serviceId: "cardio",
      title: "Cardiology",
      intro:
        "Preventive cardiovascular assessment, diagnosis and coordination of specialist cardiac care.",
      journey: [
        {
          id: "journey",
          label: "Typical cardiac healthcare journey",
          aud: { from: 300, to: 1500, isOpenEnded: true },
        },
      ],
    },
  ],
};

export const costItems: Localized<CostItem[]> = {
  vi: [
    /* ---- Hỗ trợ sinh sản & IVF ---- */
    {
      id: "fertility-consult",
      categoryId: "fertility",
      procedure: "Tư vấn hiếm muộn ban đầu",
      covers:
        "Bác sĩ chuyên khoa xem lại tiền sử sinh sản và các thăm dò đã làm, xác định bước chẩn đoán tiếp theo.",
      price: aud(40, 80),
    },
    {
      id: "fertility-couple",
      categoryId: "fertility",
      procedure: "Đánh giá sinh sản cho cả hai vợ chồng",
      covers:
        "Đánh giá phối hợp cho cả hai, thường gồm khám lâm sàng và các thăm dò sinh sản cơ bản.",
      price: aud(250, 600),
    },
    {
      id: "fertility-semen",
      categoryId: "fertility",
      procedure: "Xét nghiệm tinh dịch đồ",
      covers:
        "Đánh giá số lượng, độ di động và hình thái tinh trùng trong khuôn khổ khám nam khoa.",
      price: aud(50, 150),
    },
    {
      id: "fertility-ultrasound",
      categoryId: "fertility",
      procedure: "Siêu âm sinh sản nữ",
      covers:
        "Siêu âm vùng chậu hoặc đầu dò âm đạo để đánh giá tử cung, buồng trứng và sự phát triển nang noãn.",
      price: aud(50, 120),
    },
    {
      id: "fertility-ovulation",
      categoryId: "fertility",
      procedure: "Theo dõi rụng trứng",
      covers:
        "Siêu âm và/hoặc xét nghiệm máu nhiều lần để theo dõi nang noãn và canh thời điểm.",
      price: aud(100, 300, true),
    },
    {
      id: "fertility-iui",
      categoryId: "fertility",
      procedure: "IUI — mỗi chu kỳ",
      covers:
        "Bơm tinh trùng đã lọc rửa vào buồng tử cung quanh thời điểm rụng trứng; thuốc và theo dõi có thể tính thêm.",
      price: aud(500, 1000, true),
    },
    {
      id: "fertility-ivf-basic",
      categoryId: "fertility",
      procedure: "IVF — chu kỳ cơ bản",
      covers:
        "Kích thích buồng trứng, chọc hút noãn, thụ tinh và nuôi phôi theo phác đồ IVF.",
      price: aud(3500, 8000, true),
    },
    {
      id: "fertility-ivf-lab",
      categoryId: "fertility",
      procedure: "IVF — kỹ thuật labo bổ sung",
      covers:
        "Các kỹ thuật phôi học thêm như ICSI, hỗ trợ phôi thoát màng và labo chuyên sâu khi có chỉ định.",
      price: aud(5000, 10000, true),
    },
    {
      id: "fertility-transfer",
      categoryId: "fertility",
      procedure: "Chuyển phôi",
      covers:
        "Chuyển phôi đã chọn vào buồng tử cung; có thể nằm trong hoặc ngoài gói IVF tùy gói.",
      price: aud(500, 1500, true),
    },
    {
      id: "fertility-freeze",
      categoryId: "fertility",
      procedure: "Trữ đông phôi / noãn / tinh trùng",
      covers:
        "Đông lạnh và lưu trữ; chi phí thay đổi theo loại mẫu, thời gian lưu và cơ sở thực hiện.",
      price: aud(300, 1500, true),
    },
    {
      id: "fertility-pgt",
      categoryId: "fertility",
      procedure: "Xét nghiệm di truyền phôi (PGT)",
      covers: "Xét nghiệm di truyền phôi trước khi chuyển, khi có chỉ định lâm sàng.",
      price: quote,
    },
    {
      id: "fertility-donor",
      categoryId: "fertility",
      procedure: "Xin noãn / điều trị sinh sản phức tạp",
      covers:
        "Các phác đồ chuyên biệt cần mẫu hiến hoặc kỹ thuật labo, lâm sàng phức tạp.",
      price: quote,
    },

    /* ---- Tiêu hóa ---- */
    {
      id: "digestive-consult",
      categoryId: "digestive",
      procedure: "Khám chuyên khoa tiêu hóa",
      covers:
        "Đánh giá chuyên khoa cho đau bụng, trào ngược, viêm dạ dày, rối loạn đại tiện, xuất huyết, kết quả bất thường và các vấn đề tiêu hóa khác.",
      price: aud(40, 100),
    },
    {
      id: "digestive-gastro",
      categoryId: "digestive",
      procedure: "Nội soi dạ dày",
      covers:
        "Nội soi thực quản, dạ dày và tá tràng để đánh giá viêm, loét, trào ngược, xuất huyết và tổn thương.",
      price: aud(150, 300),
    },
    {
      id: "digestive-gastro-nbi",
      categoryId: "digestive",
      procedure: "Nội soi dạ dày có NBI",
      covers:
        "Kỹ thuật hình ảnh nội soi tăng cường, giúp bác sĩ quan sát tổn thương niêm mạc rõ hơn.",
      price: aud(200, 350),
    },
    {
      id: "digestive-gastro-sedation",
      categoryId: "digestive",
      procedure: "Nội soi dạ dày có tiền mê",
      covers:
        "Nội soi dạ dày thực hiện dưới tiền mê để giảm khó chịu; phần thuốc và gây mê có thể thay đổi.",
      price: aud(250, 450, true),
    },
    {
      id: "digestive-colon",
      categoryId: "digestive",
      procedure: "Nội soi đại tràng",
      covers:
        "Nội soi đại tràng tìm polyp, viêm, xuất huyết, bệnh lý đại trực tràng và tầm soát ung thư.",
      price: aud(200, 400),
    },
    {
      id: "digestive-colon-sedation",
      categoryId: "digestive",
      procedure: "Nội soi đại tràng có tiền mê",
      covers: "Nội soi đại tràng thực hiện dưới tiền mê.",
      price: aud(300, 500, true),
    },
    {
      id: "digestive-both-sedation",
      categoryId: "digestive",
      procedure: "Nội soi dạ dày + đại tràng có tiền mê",
      covers:
        "Nội soi cả đường tiêu hóa trên và dưới, thường dùng khi cần đánh giá toàn diện.",
      price: aud(400, 700, true),
    },
    {
      id: "digestive-biopsy",
      categoryId: "digestive",
      procedure: "Sinh thiết & giải phẫu bệnh",
      covers:
        "Lấy mẫu mô trong lúc nội soi và gửi giải phẫu bệnh khi phát hiện vùng nghi ngờ.",
      price: aud(50, 250, true),
    },
    {
      id: "digestive-polyp",
      categoryId: "digestive",
      procedure: "Cắt polyp",
      covers:
        "Cắt polyp đường tiêu hóa qua nội soi; chi phí cuối phụ thuộc kích thước, số lượng và kỹ thuật.",
      price: aud(150, 600, true),
    },
    {
      id: "digestive-cancer",
      categoryId: "digestive",
      procedure: "Tầm soát ung thư đường tiêu hóa",
      covers:
        "Đánh giá phối hợp, có thể gồm khám, xét nghiệm máu, nội soi và giải phẫu bệnh tùy mức nguy cơ.",
      price: aud(500, 1000, true),
    },
    {
      id: "digestive-advanced",
      categoryId: "digestive",
      procedure: "Thăm dò tiêu hóa chuyên sâu",
      covers:
        "Đánh giá phức tạp bằng nội soi hoặc chẩn đoán hình ảnh khi nghi ngờ bệnh lý; cần kế hoạch riêng.",
      price: quote,
    },

    /* ---- Tầm soát sức khỏe & ung thư ---- */
    {
      id: "screening-essential",
      categoryId: "screening",
      procedure: "Tầm soát sức khỏe cơ bản",
      covers:
        "Khai thác tiền sử, khám lâm sàng và các xét nghiệm nền để đánh giá sức khỏe tổng quát.",
      price: aud(300, 500),
    },
    {
      id: "screening-advanced",
      categoryId: "screening",
      procedure: "Tầm soát sức khỏe nâng cao",
      covers:
        "Xét nghiệm rộng hơn kèm chẩn đoán hình ảnh và một số khám chuyên khoa chọn theo hồ sơ nguy cơ.",
      price: aud(500, 1000),
    },
    {
      id: "screening-comprehensive",
      categoryId: "screening",
      procedure: "Tầm soát sức khỏe toàn diện",
      covers:
        "Đánh giá đa chuyên khoa, kết hợp xét nghiệm mở rộng, chẩn đoán hình ảnh và hội chẩn chuyên khoa.",
      price: aud(800, 1500, true),
    },
    {
      id: "screening-executive",
      categoryId: "screening",
      procedure: "Tầm soát sức khỏe cao cấp",
      covers:
        "Gói cao cấp, tối ưu thời gian, đa chuyên khoa, có kỹ thuật chẩn đoán chuyên sâu khi cần.",
      price: aud(1000, 2000, true),
    },
    {
      id: "screening-cancer-gi",
      categoryId: "screening",
      procedure: "Tầm soát ung thư — tiêu hóa",
      covers:
        "Có thể gồm nội soi dạ dày/đại tràng, xét nghiệm liên quan và giải phẫu bệnh khi có chỉ định.",
      price: aud(500, 1000, true),
    },
    {
      id: "screening-cancer-male",
      categoryId: "screening",
      procedure: "Tầm soát ung thư — nam giới",
      covers:
        "Có thể gồm tiêu hóa, tuyến tiền liệt và các hạng mục phù hợp theo tuổi và nguy cơ.",
      price: aud(800, 2000, true),
    },
    {
      id: "screening-cancer-female",
      categoryId: "screening",
      procedure: "Tầm soát ung thư — nữ giới",
      covers:
        "Có thể gồm vú, cổ tử cung, tiêu hóa và các hạng mục phù hợp theo tuổi và nguy cơ.",
      price: aud(800, 2000, true),
    },
    {
      id: "screening-imaging",
      categoryId: "screening",
      procedure: "Tầm soát bằng hình ảnh chuyên sâu",
      covers:
        "Tầm soát bằng CT/MRI khi có chỉ định lâm sàng và nằm trong gói đã chọn.",
      price: aud(300, 1500, true),
    },
    {
      id: "screening-genetic",
      categoryId: "screening",
      procedure: "Xét nghiệm gen / nguy cơ ung thư chuyên sâu",
      covers:
        "Xét nghiệm gen hoặc nguy cơ ung thư di truyền chuyên biệt khi có chỉ định lâm sàng.",
      price: quote,
    },
    {
      id: "screening-report",
      categoryId: "screening",
      procedure: "Hội chẩn & báo cáo y khoa",
      covers:
        "Bác sĩ đọc kết quả và đưa khuyến nghị cá nhân hóa sau khi tầm soát.",
      price: included,
    },

    /* ---- Nhãn khoa ---- */
    {
      id: "eye-exam",
      categoryId: "eye",
      procedure: "Khám mắt toàn diện",
      covers:
        "Đánh giá thị lực, khúc xạ, sức khỏe mắt và các bệnh lý nhãn khoa thường gặp.",
      price: aud(50, 120),
    },
    {
      id: "eye-advanced",
      categoryId: "eye",
      procedure: "Khám nhãn khoa chuyên sâu",
      covers: "Khám chuyên khoa chi tiết khi nghi ngờ hoặc đã có bệnh lý mắt.",
      price: aud(100, 250),
    },
    {
      id: "eye-refraction",
      categoryId: "eye",
      procedure: "Đo khúc xạ / kiểm tra thị lực",
      covers: "Đo độ để kê kính gọng hoặc kính áp tròng.",
      price: aud(30, 80),
    },
    {
      id: "eye-iop",
      categoryId: "eye",
      procedure: "Đo nhãn áp / tầm soát glôcôm",
      covers: "Đo áp lực nội nhãn và đánh giá nguy cơ hoặc dấu hiệu glôcôm.",
      price: aud(30, 100),
    },
    {
      id: "eye-retina-photo",
      categoryId: "eye",
      procedure: "Chụp đáy mắt",
      covers: "Chụp hình võng mạc để ghi nhận và đánh giá các bất thường.",
      price: aud(50, 150),
    },
    {
      id: "eye-oct",
      categoryId: "eye",
      procedure: "OCT — chụp cắt lớp võng mạc",
      covers:
        "Chụp võng mạc và thần kinh thị độ phân giải cao, dùng trong glôcôm, hoàng điểm và bệnh võng mạc.",
      price: aud(50, 150),
    },
    {
      id: "eye-field",
      categoryId: "eye",
      procedure: "Đo thị trường",
      covers:
        "Đo thị trường ngoại vi, thường dùng trong glôcôm và bệnh lý thần kinh thị.",
      price: aud(50, 150),
    },
    {
      id: "eye-cornea",
      categoryId: "eye",
      procedure: "Chẩn đoán giác mạc / bán phần trước",
      covers:
        "Đánh giá chi tiết giác mạc và các cấu trúc bán phần trước khi có chỉ định.",
      price: aud(50, 200),
    },
    {
      id: "eye-cataract-assess",
      categoryId: "eye",
      procedure: "Đánh giá đục thủy tinh thể",
      covers:
        "Khám chuyên khoa xác định mức độ đục thủy tinh thể và khả năng phẫu thuật.",
      price: aud(100, 300),
    },
    {
      id: "eye-cataract-surgery",
      categoryId: "eye",
      procedure: "Phẫu thuật đục thủy tinh thể",
      covers:
        "Lấy thủy tinh thể đục và đặt thủy tinh thể nhân tạo; loại IOL và độ phức tạp quyết định chi phí.",
      price: quote,
    },
    {
      id: "eye-glaucoma",
      categoryId: "eye",
      procedure: "Điều trị glôcôm / võng mạc",
      covers:
        "Phác đồ khác nhau nhiều theo chẩn đoán, có thể là laser, tiêm nội nhãn hoặc phẫu thuật.",
      price: quote,
    },

    /* ---- Tim mạch ---- */
    {
      id: "cardio-consult",
      categoryId: "cardio",
      procedure: "Khám chuyên khoa tim mạch",
      covers:
        "Đánh giá triệu chứng, yếu tố nguy cơ tim mạch, tiền sử và các kết quả đã có.",
      price: aud(50, 120),
    },
    {
      id: "cardio-ecg",
      categoryId: "cardio",
      procedure: "Điện tâm đồ lúc nghỉ",
      covers:
        "Ghi hoạt động điện của tim để phát hiện rối loạn nhịp và các thay đổi khác.",
      price: aud(20, 50),
    },
    {
      id: "cardio-echo",
      categoryId: "cardio",
      procedure: "Siêu âm tim",
      covers:
        "Siêu âm đánh giá cấu trúc và chức năng tim, gồm van tim và khả năng co bóp.",
      price: aud(40, 100),
    },
    {
      id: "cardio-holter",
      categoryId: "cardio",
      procedure: "Holter điện tâm đồ",
      covers:
        "Theo dõi điện tâm đồ liên tục, thường dùng để tìm rối loạn nhịp từng lúc.",
      price: aud(50, 150),
    },
    {
      id: "cardio-stress",
      categoryId: "cardio",
      procedure: "Điện tâm đồ gắng sức",
      covers:
        "Theo dõi đáp ứng của tim khi gắng sức, hỗ trợ đánh giá triệu chứng và nguy cơ tim mạch.",
      price: aud(100, 250),
    },
    {
      id: "cardio-bloods",
      categoryId: "cardio",
      procedure: "Xét nghiệm máu tim mạch",
      covers:
        "Có thể gồm mỡ máu, đường huyết/HbA1c và các xét nghiệm liên quan đến nguy cơ tim mạch.",
      price: aud(50, 200),
    },
    {
      id: "cardio-carotid",
      categoryId: "cardio",
      procedure: "Siêu âm Doppler động mạch cảnh",
      covers:
        "Đánh giá dòng chảy và mảng xơ vữa ở động mạch cảnh cấp máu cho não.",
      price: aud(50, 150),
    },
    {
      id: "cardio-basic-screen",
      categoryId: "cardio",
      procedure: "Tầm soát tim mạch cơ bản",
      covers:
        "Đánh giá phối hợp gồm khám, điện tâm đồ, xét nghiệm máu và một số hạng mục hình ảnh.",
      price: aud(300, 700),
    },
    {
      id: "cardio-advanced-screen",
      categoryId: "cardio",
      procedure: "Tầm soát tim mạch chuyên sâu",
      covers:
        "Đánh giá rộng hơn với siêu âm tim, hình ảnh mạch máu và các thăm dò bổ sung khi phù hợp.",
      price: aud(700, 1500, true),
    },
    {
      id: "cardio-ct",
      categoryId: "cardio",
      procedure: "CT mạch vành / hình ảnh tim chuyên sâu",
      covers:
        "Chẩn đoán hình ảnh không xâm lấn để đánh giá động mạch vành và một số bệnh lý tim.",
      price: aud(500, 1500, true),
    },
    {
      id: "cardio-cath",
      categoryId: "cardio",
      procedure: "Thông tim / can thiệp mạch vành",
      covers:
        "Thủ thuật xâm lấn để chẩn đoán hoặc can thiệp, như chụp mạch vành hoặc đặt stent.",
      price: quote,
    },
    {
      id: "cardio-surgery",
      categoryId: "cardio",
      procedure: "Phẫu thuật tim",
      covers:
        "Phẫu thuật phức tạp, cần báo giá riêng theo bệnh viện và ê-kíp phẫu thuật.",
      price: quote,
    },
  ],

  en: [
    /* ---- Fertility & IVF ---- */
    {
      id: "fertility-consult",
      categoryId: "fertility",
      procedure: "Initial fertility consultation",
      covers:
        "Specialist review of reproductive history and previous investigations; determines the next diagnostic steps.",
      price: aud(40, 80),
    },
    {
      id: "fertility-couple",
      categoryId: "fertility",
      procedure: "Couple fertility assessment",
      covers:
        "Coordinated assessment for both partners, typically including medical review and baseline fertility investigations.",
      price: aud(250, 600),
    },
    {
      id: "fertility-semen",
      categoryId: "fertility",
      procedure: "Semen analysis",
      covers:
        "Laboratory assessment of sperm count, motility and morphology as part of male fertility evaluation.",
      price: aud(50, 150),
    },
    {
      id: "fertility-ultrasound",
      categoryId: "fertility",
      procedure: "Female fertility ultrasound",
      covers:
        "Pelvic or transvaginal ultrasound to assess uterus, ovaries and follicular development.",
      price: aud(50, 120),
    },
    {
      id: "fertility-ovulation",
      categoryId: "fertility",
      procedure: "Ovulation monitoring",
      covers:
        "Serial ultrasound and blood testing to track follicular development and timing.",
      price: aud(100, 300, true),
    },
    {
      id: "fertility-iui",
      categoryId: "fertility",
      procedure: "IUI — per cycle",
      covers:
        "Prepared sperm is placed directly into the uterus around ovulation; medication and monitoring may be additional.",
      price: aud(500, 1000, true),
    },
    {
      id: "fertility-ivf-basic",
      categoryId: "fertility",
      procedure: "IVF — basic cycle",
      covers:
        "Ovarian stimulation, egg retrieval, fertilisation and embryo development under an IVF protocol.",
      price: aud(3500, 8000, true),
    },
    {
      id: "fertility-ivf-lab",
      categoryId: "fertility",
      procedure: "IVF — additional laboratory procedures",
      covers:
        "Additional embryology such as ICSI, assisted hatching and other laboratory work when clinically indicated.",
      price: aud(5000, 10000, true),
    },
    {
      id: "fertility-transfer",
      categoryId: "fertility",
      procedure: "Embryo transfer",
      covers:
        "Transfer of a selected embryo into the uterus; part of or additional to an IVF cycle depending on the package.",
      price: aud(500, 1500, true),
    },
    {
      id: "fertility-freeze",
      categoryId: "fertility",
      procedure: "Embryo, egg and sperm freezing",
      covers:
        "Cryopreservation and storage; pricing varies by material, duration and provider.",
      price: aud(300, 1500, true),
    },
    {
      id: "fertility-pgt",
      categoryId: "fertility",
      procedure: "PGT / genetic testing",
      covers: "Genetic testing of embryos before transfer when clinically appropriate.",
      price: quote,
    },
    {
      id: "fertility-donor",
      categoryId: "fertility",
      procedure: "Donor and complex reproductive treatment",
      covers:
        "Specialised pathways requiring donor material or complex laboratory and clinical procedures.",
      price: quote,
    },

    /* ---- Gastroenterology ---- */
    {
      id: "digestive-consult",
      categoryId: "digestive",
      procedure: "Gastroenterology consultation",
      covers:
        "Specialist assessment for abdominal pain, reflux, gastritis, bowel symptoms, bleeding, abnormal tests and other digestive concerns.",
      price: aud(40, 100),
    },
    {
      id: "digestive-gastro",
      categoryId: "digestive",
      procedure: "Gastroscopy",
      covers:
        "Endoscopic examination of the oesophagus, stomach and duodenum to assess inflammation, ulcers, reflux disease, bleeding and lesions.",
      price: aud(150, 300),
    },
    {
      id: "digestive-gastro-nbi",
      categoryId: "digestive",
      procedure: "Gastroscopy with NBI",
      covers:
        "Enhanced endoscopic imaging that helps the physician assess mucosal abnormalities more closely.",
      price: aud(200, 350),
    },
    {
      id: "digestive-gastro-sedation",
      categoryId: "digestive",
      procedure: "Gastroscopy with sedation",
      covers:
        "Gastroscopy performed under sedation for comfort; medication and anaesthesia components may vary.",
      price: aud(250, 450, true),
    },
    {
      id: "digestive-colon",
      categoryId: "digestive",
      procedure: "Colonoscopy",
      covers:
        "Endoscopic examination of the large bowel for polyps, inflammation, bleeding, colorectal disease and cancer screening.",
      price: aud(200, 400),
    },
    {
      id: "digestive-colon-sedation",
      categoryId: "digestive",
      procedure: "Colonoscopy with sedation",
      covers: "Colonoscopy performed under sedation.",
      price: aud(300, 500, true),
    },
    {
      id: "digestive-both-sedation",
      categoryId: "digestive",
      procedure: "Gastroscopy and colonoscopy with sedation",
      covers:
        "Combined upper and lower GI endoscopy, often used for comprehensive digestive assessment.",
      price: aud(400, 700, true),
    },
    {
      id: "digestive-biopsy",
      categoryId: "digestive",
      procedure: "Biopsy and pathology",
      covers:
        "Tissue sample taken during endoscopy and examined by pathology when a suspicious area is found.",
      price: aud(50, 250, true),
    },
    {
      id: "digestive-polyp",
      categoryId: "digestive",
      procedure: "Polyp removal",
      covers:
        "Endoscopic removal of a gastrointestinal polyp; final cost depends on size, number and technique.",
      price: aud(150, 600, true),
    },
    {
      id: "digestive-cancer",
      categoryId: "digestive",
      procedure: "Digestive cancer screening",
      covers:
        "Coordinated assessment that may combine consultation, blood tests, endoscopy and pathology depending on risk.",
      price: aud(500, 1000, true),
    },
    {
      id: "digestive-advanced",
      categoryId: "digestive",
      procedure: "Advanced GI investigation",
      covers:
        "Complex endoscopic or imaging-based evaluation for suspected disease; requires individual planning.",
      price: quote,
    },

    /* ---- Comprehensive health & cancer screening ---- */
    {
      id: "screening-essential",
      categoryId: "screening",
      procedure: "Essential health screening",
      covers:
        "Core medical history, examination and baseline laboratory tests for general health assessment.",
      price: aud(300, 500),
    },
    {
      id: "screening-advanced",
      categoryId: "screening",
      procedure: "Advanced health screening",
      covers:
        "Broader laboratory testing plus imaging and selected specialist assessments based on risk profile.",
      price: aud(500, 1000),
    },
    {
      id: "screening-comprehensive",
      categoryId: "screening",
      procedure: "Comprehensive health screening",
      covers:
        "Multi-specialty assessment combining broader laboratory testing, imaging and specialist review.",
      price: aud(800, 1500, true),
    },
    {
      id: "screening-executive",
      categoryId: "screening",
      procedure: "Executive health screening",
      covers:
        "Premium, time-efficient multi-specialty screening with advanced diagnostics where indicated.",
      price: aud(1000, 2000, true),
    },
    {
      id: "screening-cancer-gi",
      categoryId: "screening",
      procedure: "Cancer screening — digestive",
      covers:
        "May include gastroscopy or colonoscopy, relevant laboratory tests and pathology when indicated.",
      price: aud(500, 1000, true),
    },
    {
      id: "screening-cancer-male",
      categoryId: "screening",
      procedure: "Cancer screening — male",
      covers:
        "May include digestive, prostate and other age and risk-appropriate screening components.",
      price: aud(800, 2000, true),
    },
    {
      id: "screening-cancer-female",
      categoryId: "screening",
      procedure: "Cancer screening — female",
      covers:
        "May include breast, cervical, digestive and other age and risk-appropriate screening components.",
      price: aud(800, 2000, true),
    },
    {
      id: "screening-imaging",
      categoryId: "screening",
      procedure: "Advanced imaging screening",
      covers:
        "CT or MRI-based screening when clinically appropriate and included in the selected package.",
      price: aud(300, 1500, true),
    },
    {
      id: "screening-genetic",
      categoryId: "screening",
      procedure: "Genetic and advanced cancer-risk testing",
      covers:
        "Specialised genomic or hereditary cancer-risk testing when clinically indicated.",
      price: quote,
    },
    {
      id: "screening-report",
      categoryId: "screening",
      procedure: "Specialist review and medical report",
      covers:
        "Physician interpretation of findings and personalised recommendations after screening.",
      price: included,
    },

    /* ---- Ophthalmology ---- */
    {
      id: "eye-exam",
      categoryId: "eye",
      procedure: "Comprehensive eye examination",
      covers:
        "Assessment of visual acuity, refraction, eye health and common ocular conditions.",
      price: aud(50, 120),
    },
    {
      id: "eye-advanced",
      categoryId: "eye",
      procedure: "Advanced ophthalmology assessment",
      covers: "Detailed specialist examination for suspected or known eye disease.",
      price: aud(100, 250),
    },
    {
      id: "eye-refraction",
      categoryId: "eye",
      procedure: "Refraction and vision assessment",
      covers: "Measures prescription requirements for glasses or contact lenses.",
      price: aud(30, 80),
    },
    {
      id: "eye-iop",
      categoryId: "eye",
      procedure: "Intraocular pressure and glaucoma assessment",
      covers: "Measures eye pressure and evaluates risk or evidence of glaucoma.",
      price: aud(30, 100),
    },
    {
      id: "eye-retina-photo",
      categoryId: "eye",
      procedure: "Retinal photography",
      covers: "Imaging of the retina to document and assess retinal abnormalities.",
      price: aud(50, 150),
    },
    {
      id: "eye-oct",
      categoryId: "eye",
      procedure: "OCT — optical coherence tomography",
      covers:
        "High-resolution retinal and optic-nerve imaging used in glaucoma, macular and retinal assessment.",
      price: aud(50, 150),
    },
    {
      id: "eye-field",
      categoryId: "eye",
      procedure: "Visual field testing",
      covers:
        "Measures peripheral vision, commonly used in glaucoma and optic-nerve assessment.",
      price: aud(50, 150),
    },
    {
      id: "eye-cornea",
      categoryId: "eye",
      procedure: "Corneal and anterior-segment diagnostics",
      covers:
        "Detailed assessment of the cornea and front structures of the eye when clinically indicated.",
      price: aud(50, 200),
    },
    {
      id: "eye-cataract-assess",
      categoryId: "eye",
      procedure: "Cataract assessment",
      covers:
        "Specialist assessment to confirm cataract severity and determine suitability for surgery.",
      price: aud(100, 300),
    },
    {
      id: "eye-cataract-surgery",
      categoryId: "eye",
      procedure: "Cataract surgery",
      covers:
        "Removal of the cloudy lens and replacement with an intraocular lens; lens choice and clinical complexity affect cost.",
      price: quote,
    },
    {
      id: "eye-glaucoma",
      categoryId: "eye",
      procedure: "Glaucoma and retinal treatment",
      covers:
        "Treatment varies substantially by diagnosis and may involve laser, injection or surgery.",
      price: quote,
    },

    /* ---- Cardiology ---- */
    {
      id: "cardio-consult",
      categoryId: "cardio",
      procedure: "Cardiology consultation",
      covers:
        "Specialist assessment of symptoms, cardiovascular risk factors, medical history and existing test results.",
      price: aud(50, 120),
    },
    {
      id: "cardio-ecg",
      categoryId: "cardio",
      procedure: "Resting ECG",
      covers:
        "Records the heart's electrical activity to identify rhythm abnormalities and other cardiac changes.",
      price: aud(20, 50),
    },
    {
      id: "cardio-echo",
      categoryId: "cardio",
      procedure: "Echocardiogram",
      covers:
        "Ultrasound examination of heart structure and function, including valves and pumping function.",
      price: aud(40, 100),
    },
    {
      id: "cardio-holter",
      categoryId: "cardio",
      procedure: "Holter ECG monitoring",
      covers:
        "Continuous ambulatory ECG monitoring, typically used to investigate intermittent rhythm problems.",
      price: aud(50, 150),
    },
    {
      id: "cardio-stress",
      categoryId: "cardio",
      procedure: "Exercise and stress ECG",
      covers:
        "Monitors cardiac response to exercise and helps evaluate selected symptoms and cardiovascular risk.",
      price: aud(100, 250),
    },
    {
      id: "cardio-bloods",
      categoryId: "cardio",
      procedure: "Cardiovascular blood testing",
      covers:
        "May include cholesterol, glucose and HbA1c, and other tests relevant to cardiovascular risk.",
      price: aud(50, 200),
    },
    {
      id: "cardio-carotid",
      categoryId: "cardio",
      procedure: "Carotid Doppler ultrasound",
      covers:
        "Assesses blood flow and plaque in the carotid arteries supplying the brain.",
      price: aud(50, 150),
    },
    {
      id: "cardio-basic-screen",
      categoryId: "cardio",
      procedure: "Basic cardiovascular screening",
      covers:
        "Coordinated assessment combining consultation, ECG, blood testing and selected imaging.",
      price: aud(300, 700),
    },
    {
      id: "cardio-advanced-screen",
      categoryId: "cardio",
      procedure: "Advanced cardiovascular screening",
      covers:
        "Broader cardiac assessment with echocardiography, vascular imaging and additional diagnostics where appropriate.",
      price: aud(700, 1500, true),
    },
    {
      id: "cardio-ct",
      categoryId: "cardio",
      procedure: "Coronary CT and advanced cardiac imaging",
      covers:
        "Non-invasive imaging used to assess coronary arteries and selected cardiac conditions.",
      price: aud(500, 1500, true),
    },
    {
      id: "cardio-cath",
      categoryId: "cardio",
      procedure: "Cardiac catheterisation and intervention",
      covers:
        "Invasive diagnostic or interventional procedures such as coronary angiography or stenting.",
      price: quote,
    },
    {
      id: "cardio-surgery",
      categoryId: "cardio",
      procedure: "Cardiac surgery",
      covers:
        "Complex surgical treatment requiring individual hospital and surgeon quotation.",
      price: quote,
    },
  ],
};

/**
 * Specialties Handle coordinates without running a priced schedule.
 *
 * Four columns rather than three, and a separate collection on purpose: each
 * row quotes a whole care journey rather than one procedure, so folding them
 * into the table above would mean two rows at the same indent meaning
 * different things.
 */
export const otherSpecialties: Localized<OtherSpecialty[]> = {
  vi: [
    {
      id: "ortho",
      name: "Cơ xương khớp & chấn thương chỉnh hình",
      covers: "Xương · Khớp · Cột sống · Chấn thương thể thao",
      journey: { from: 300, to: 1500, isOpenEnded: true },
      advanced: "Điều trị phức tạp hoặc phẫu thuật: báo giá riêng",
    },
    {
      id: "neuro",
      name: "Thần kinh & phẫu thuật thần kinh",
      covers: "Não · Thần kinh · Cột sống · Rối loạn thần kinh",
      journey: { from: 300, to: 1500, isOpenEnded: true },
      advanced: "Phẫu thuật thần kinh hoặc điều trị phức tạp: báo giá riêng",
    },
    {
      id: "dental",
      name: "Nha khoa & sức khỏe răng miệng",
      covers: "Nha khoa tổng quát · Implant · Thẩm mỹ · Phẫu thuật hàm mặt",
      journey: { from: 200, to: 3000, isOpenEnded: true },
      advanced: "Cấy ghép implant hoặc phục hình toàn hàm: báo giá riêng",
    },
    {
      id: "ent",
      name: "Tai mũi họng",
      covers: "Tai · Mũi · Họng · Xoang · Thính lực",
      journey: { from: 200, to: 1000, isOpenEnded: true },
      advanced: "Phẫu thuật: báo giá riêng",
    },
    {
      id: "derma",
      name: "Da liễu",
      covers: "Da · Tóc · Móng · Bệnh lý da liễu",
      journey: { from: 200, to: 1000, isOpenEnded: true },
      advanced: "Điều trị chuyên sâu hoặc phẫu thuật: báo giá riêng",
    },
    {
      id: "uro",
      name: "Tiết niệu",
      covers: "Thận · Đường tiết niệu · Nam khoa",
      journey: { from: 250, to: 1500, isOpenEnded: true },
      advanced: "Phẫu thuật hoặc điều trị chuyên sâu: báo giá riêng",
    },
    {
      id: "women",
      name: "Sức khỏe phụ nữ",
      covers: "Phụ khoa · Tuyến vú · Chăm sóc dự phòng",
      journey: { from: 250, to: 1500, isOpenEnded: true },
      advanced: "Phẫu thuật hoặc điều trị chuyên sâu: báo giá riêng",
    },
    {
      id: "onco",
      name: "Ung bướu",
      covers: "Chẩn đoán ung thư · Ý kiến thứ hai · Điều phối điều trị",
      journey: { from: 500, to: 5000, isOpenEnded: true },
      advanced: "Điều trị ung thư: báo giá riêng",
    },
    {
      id: "rehab",
      name: "Phục hồi chức năng & vật lý trị liệu",
      covers: "Vật lý trị liệu · Phục hồi · Sau phẫu thuật",
      journey: { from: 100, to: 1000, isOpenEnded: true },
      advanced: "Phục hồi dài hạn: báo giá riêng",
    },
    {
      id: "paeds",
      name: "Nhi khoa",
      covers: "Sức khỏe trẻ em · Phát triển · Chăm sóc dự phòng",
      journey: { from: 200, to: 1000, isOpenEnded: true },
      advanced: "Điều trị chuyên biệt: báo giá riêng",
    },
  ],
  en: [
    {
      id: "ortho",
      name: "Orthopedics & musculoskeletal",
      covers: "Bones · Joints · Spine · Sports injuries",
      journey: { from: 300, to: 1500, isOpenEnded: true },
      advanced: "Complex treatment or surgery: custom quote",
    },
    {
      id: "neuro",
      name: "Neurology & neurosurgery",
      covers: "Brain · Nerves · Spine · Neurological disorders",
      journey: { from: 300, to: 1500, isOpenEnded: true },
      advanced: "Neurosurgery or complex treatment: custom quote",
    },
    {
      id: "dental",
      name: "Dentistry & oral health",
      covers: "General dentistry · Implants · Cosmetic dentistry · Oral surgery",
      journey: { from: 200, to: 3000, isOpenEnded: true },
      advanced: "Dental implants or full-mouth rehabilitation: custom quote",
    },
    {
      id: "ent",
      name: "ENT",
      covers: "Ear · Nose · Throat · Sinus · Hearing",
      journey: { from: 200, to: 1000, isOpenEnded: true },
      advanced: "Surgery: custom quote",
    },
    {
      id: "derma",
      name: "Dermatology",
      covers: "Skin · Hair · Nails · Dermatological conditions",
      journey: { from: 200, to: 1000, isOpenEnded: true },
      advanced: "Advanced treatment or surgery: custom quote",
    },
    {
      id: "uro",
      name: "Urology",
      covers: "Kidney · Urinary tract · Men's health",
      journey: { from: 250, to: 1500, isOpenEnded: true },
      advanced: "Surgery or advanced treatment: custom quote",
    },
    {
      id: "women",
      name: "Women's health",
      covers: "Gynecology · Breast health · Preventive care",
      journey: { from: 250, to: 1500, isOpenEnded: true },
      advanced: "Surgery or advanced treatment: custom quote",
    },
    {
      id: "onco",
      name: "Oncology",
      covers: "Cancer diagnosis · Second opinion · Treatment coordination",
      journey: { from: 500, to: 5000, isOpenEnded: true },
      advanced: "Cancer treatment: custom quote",
    },
    {
      id: "rehab",
      name: "Rehabilitation & physiotherapy",
      covers: "Physical therapy · Recovery · Post-surgery rehabilitation",
      journey: { from: 100, to: 1000, isOpenEnded: true },
      advanced: "Long-term rehabilitation: custom quote",
    },
    {
      id: "paeds",
      name: "Pediatrics",
      covers: "Children's health · Development · Preventive care",
      journey: { from: 200, to: 1000, isOpenEnded: true },
      advanced: "Specialised treatment: custom quote",
    },
  ],
};
