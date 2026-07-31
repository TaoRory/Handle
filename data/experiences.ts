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
        alt: "Tô phở bò nóng với hành và rau thơm",
        src: "/images/photos/experience-cuisine.jpg",
        width: 810,
        height: 1080,
        blurDataURL:
          "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAACQAgCdASoMABAAA4BaJaACdAYwTypzvJNRl1w2AAD+tfBeFx86Cc4N3XxsqSmhm0cdIMrDelElW70kdUQVFyNxJJeyjH4jEf0ixIJPyzN+eYo+0T++dejzE1v7x3+p1FCBZqBSVdZWNxgAAAA=",
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
        alt: "Người bán hàng đội nón lá giữa chợ Đông Ba, Huế",
        src: "/images/photos/experience-sightseeing.jpg",
        width: 810,
        height: 1080,
        blurDataURL:
          "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoMABAAA4BaJQBdgBwjrIPL1KIAzjj/Swe2T1n6tZGT9N8dOYj+fvJCTGCRWlJKfio+MhX8tPlaIKN5VQ9EB9k0RIePIwWyEQ4Sb1Zw5TyFwAAA",
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
        alt: "Trung tâm thương mại nhìn từ tầng trên",
        src: "/images/photos/experience-shopping.jpg",
        width: 810,
        height: 1080,
        blurDataURL:
          "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAABQAgCdASoMABAAA4BaJZwAD5IPNkY164a1aAAA/uryD/gFKhBZ+e8V2SjKy7ou/wmoM4iqqjbIN2n7ExIgEGGNxP4UPzsLFwRzXwHC0wYRdn4GrcMWgvRQAAA=",
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
        alt: "Phin cà phê Việt Nam nhỏ giọt bên đĩa bánh mì",
        src: "/images/photos/experience-coffee.jpg",
        width: 810,
        height: 1080,
        blurDataURL:
          "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQAgCdASoMABAAA4BaJQBOgYoCAuLcQLpq1mufcAD+1zyS+Ocg5uX5AbzmVyEc/gJJtMPsES5GBNbV6IoiVoHDOVSM5K67wKnkIMTwY7TV7Y09C91M3Rgrzj0LJCdYElbckaCAoJsAAA==",
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
        alt: "Những lọ tinh dầu trên quầy spa trong ánh sáng ấm",
        src: "/images/photos/experience-wellness.jpg",
        width: 810,
        height: 1080,
        blurDataURL:
          "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAQCdASoMABAAA4BaJQBOgBtwSUKczMAA/vCbVFwlYUNSybYUtgME8n7uI4JZbHNFH8EXdezbqP9r+NEe7BGvQ6zCH34XYmO6DvL4AAA=",
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
        alt: "Hộ chiếu đặt trên tấm bản đồ thế giới",
        src: "/images/photos/experience-tips.jpg",
        width: 810,
        height: 1080,
        blurDataURL:
          "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAwAgCdASoMABAAA4BaJbACdAEWPLiqvdOvAAD+AXOxuWuq0IEv3t8Bgd5rt7K5HGmN6qwtPhj2XHpfjaYvpEjDZnq4hPvuG3VmFn+HpcBm9mEYVzeQ6HgAAAA=",
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
        alt: "A bowl of beef phở with spring onion and herbs",
        src: "/images/photos/experience-cuisine.jpg",
        width: 810,
        height: 1080,
        blurDataURL:
          "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAACQAgCdASoMABAAA4BaJaACdAYwTypzvJNRl1w2AAD+tfBeFx86Cc4N3XxsqSmhm0cdIMrDelElW70kdUQVFyNxJJeyjH4jEf0ixIJPyzN+eYo+0T++dejzE1v7x3+p1FCBZqBSVdZWNxgAAAA=",
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
        alt: "A vendor in a conical hat at Đông Ba market in Huế",
        src: "/images/photos/experience-sightseeing.jpg",
        width: 810,
        height: 1080,
        blurDataURL:
          "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoMABAAA4BaJQBdgBwjrIPL1KIAzjj/Swe2T1n6tZGT9N8dOYj+fvJCTGCRWlJKfio+MhX8tPlaIKN5VQ9EB9k0RIePIwWyEQ4Sb1Zw5TyFwAAA",
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
        alt: "A shopping centre seen from the floor above",
        src: "/images/photos/experience-shopping.jpg",
        width: 810,
        height: 1080,
        blurDataURL:
          "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAABQAgCdASoMABAAA4BaJZwAD5IPNkY164a1aAAA/uryD/gFKhBZ+e8V2SjKy7ou/wmoM4iqqjbIN2n7ExIgEGGNxP4UPzsLFwRzXwHC0wYRdn4GrcMWgvRQAAA=",
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
        alt: "A Vietnamese phin dripping coffee beside a plate of bánh mì",
        src: "/images/photos/experience-coffee.jpg",
        width: 810,
        height: 1080,
        blurDataURL:
          "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQAgCdASoMABAAA4BaJQBOgYoCAuLcQLpq1mufcAD+1zyS+Ocg5uX5AbzmVyEc/gJJtMPsES5GBNbV6IoiVoHDOVSM5K67wKnkIMTwY7TV7Y09C91M3Rgrzj0LJCdYElbckaCAoJsAAA==",
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
        alt: "Bottles of massage oil on a spa counter in warm light",
        src: "/images/photos/experience-wellness.jpg",
        width: 810,
        height: 1080,
        blurDataURL:
          "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAQCdASoMABAAA4BaJQBOgBtwSUKczMAA/vCbVFwlYUNSybYUtgME8n7uI4JZbHNFH8EXdezbqP9r+NEe7BGvQ6zCH34XYmO6DvL4AAA=",
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
        alt: "A passport lying on a world map",
        src: "/images/photos/experience-tips.jpg",
        width: 810,
        height: 1080,
        blurDataURL:
          "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAwAgCdASoMABAAA4BaJbACdAEWPLiqvdOvAAD+AXOxuWuq0IEv3t8Bgd5rt7K5HGmN6qwtPhj2XHpfjaYvpEjDZnq4hPvuG3VmFn+HpcBm9mEYVzeQ6HgAAAA=",
        glyph: "compass",
        tone: "sand",
      },
    },
  ],
};
