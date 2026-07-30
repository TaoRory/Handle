import type { Experience, Localized } from "@/types";

/** The non-clinical half of the stay — what recovery actually feels like. */
export const experiences: Localized<Experience[]> = {
  vi: [
    {
      id: "cuisine",
      slug: "am-thuc",
      icon: "utensils",
      title: "Ẩm thực tinh tế",
      body: "Thực đơn phù hợp với chỉ định của bác sĩ, từ quán vỉa hè đến nhà hàng fine dining.",
      media: {
        alt: "Mâm món Việt bày trên bàn gỗ mộc, ánh sáng tự nhiên buổi trưa",
        glyph: "utensils",
        tone: "clay",
      },
    },
    {
      id: "sightseeing",
      slug: "tham-quan",
      icon: "landmark",
      title: "Tham quan & khám phá",
      body: "Lịch trình nhẹ nhàng quanh thành phố, sắp xếp theo thể trạng từng ngày của bạn.",
      media: {
        alt: "Phố cổ với đèn lồng giấy lúc hoàng hôn, tông vàng ấm",
        glyph: "landmark",
        tone: "gold",
      },
    },
    {
      id: "shopping",
      slug: "mua-sam",
      icon: "shopping-bag",
      title: "Mua sắm cao cấp",
      body: "Đưa đón tới các trung tâm thương mại và tiệm may đo truyền thống.",
      media: {
        alt: "Không gian cửa hiệu cao cấp với ánh sáng ấm và chất liệu gỗ sáng",
        glyph: "shopping-bag",
        tone: "linen",
      },
    },
    {
      id: "coffee",
      slug: "ca-phe",
      icon: "coffee",
      title: "Cà phê & văn hóa",
      body: "Những buổi sáng chậm rãi trong các quán cà phê đặc trưng của người Việt.",
      media: {
        alt: "Ly cà phê phin đặt cạnh cửa sổ nắng, bàn gỗ tối",
        glyph: "coffee",
        tone: "dusk",
      },
    },
    {
      id: "wellness",
      slug: "thu-gian",
      icon: "waves",
      title: "Thư giãn & chăm sóc",
      body: "Spa và trị liệu phục hồi được chọn lọc, phù hợp với giai đoạn hậu phẫu.",
      media: {
        alt: "Góc spa yên tĩnh với đá ấm, khăn cuộn và cây xanh",
        glyph: "waves",
        tone: "sage",
      },
    },
    {
      id: "tips",
      slug: "meo-du-lich",
      icon: "compass",
      title: "Mẹo du lịch hữu ích",
      body: "Cẩm nang ngắn về visa, tiền tệ, SIM và di chuyển — gửi trước khi bạn khởi hành.",
      media: {
        alt: "Sổ tay du lịch, hộ chiếu và bản đồ giấy trên nền vải lanh",
        glyph: "compass",
        tone: "sand",
      },
    },
  ],
  en: [
    {
      id: "cuisine",
      slug: "cuisine",
      icon: "utensils",
      title: "Considered cuisine",
      body: "Menus that respect your doctor's instructions, from street stalls to fine dining.",
      media: {
        alt: "A spread of Vietnamese dishes on a raw wood table in natural midday light",
        glyph: "utensils",
        tone: "clay",
      },
    },
    {
      id: "sightseeing",
      slug: "sightseeing",
      icon: "landmark",
      title: "Sightseeing & discovery",
      body: "Gentle itineraries around the city, paced against how you feel that day.",
      media: {
        alt: "An old-quarter street of paper lanterns at dusk in warm amber light",
        glyph: "landmark",
        tone: "gold",
      },
    },
    {
      id: "shopping",
      slug: "shopping",
      icon: "shopping-bag",
      title: "Considered shopping",
      body: "Transfers to the city's design districts and to traditional bespoke tailors.",
      media: {
        alt: "A refined boutique interior with warm lighting and pale timber fittings",
        glyph: "shopping-bag",
        tone: "linen",
      },
    },
    {
      id: "coffee",
      slug: "coffee",
      icon: "coffee",
      title: "Coffee & culture",
      body: "Slow mornings in the cafés that define how this country actually lives.",
      media: {
        alt: "A phin coffee set beside a sunlit window on a dark wooden table",
        glyph: "coffee",
        tone: "dusk",
      },
    },
    {
      id: "wellness",
      slug: "wellness",
      icon: "waves",
      title: "Rest & recovery",
      body: "Vetted spa and recovery therapies appropriate to your post-operative stage.",
      media: {
        alt: "A quiet spa corner with warm stones, rolled towels and green foliage",
        glyph: "waves",
        tone: "sage",
      },
    },
    {
      id: "tips",
      slug: "travel-tips",
      icon: "compass",
      title: "Practical travel notes",
      body: "A short brief on visas, currency, SIM cards and transport — sent before you fly.",
      media: {
        alt: "A travel notebook, passport and paper map laid out on linen",
        glyph: "compass",
        tone: "sand",
      },
    },
  ],
};
