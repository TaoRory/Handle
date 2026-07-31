import type { Localized, Partner } from "@/types";

/**
 * Partner facilities.
 *
 * These are **illustrative placeholders**, not real institutions — no existing
 * hospital's name or trademark is reproduced here. `PartnerLogo` draws each one
 * as a typographic monogram lockup so the marquee reads as a real logo wall
 * without borrowing anyone's identity. Replace with licensed marks (and a
 * `logo` image field on this type) before launch.
 */
const kinds = {
  vi: {
    international: "Bệnh viện quốc tế",
    general: "Bệnh viện đa khoa",
    fertility: "Trung tâm hỗ trợ sinh sản",
    eye: "Bệnh viện mắt",
    dental: "Hệ thống nha khoa",
    cardiac: "Trung tâm tim mạch",
    diagnostics: "Trung tâm chẩn đoán",
    rehab: "Trung tâm phục hồi chức năng",
  },
  en: {
    international: "International hospital",
    general: "General hospital",
    fertility: "Fertility centre",
    eye: "Eye hospital",
    dental: "Dental group",
    cardiac: "Cardiac centre",
    diagnostics: "Diagnostic centre",
    rehab: "Rehabilitation centre",
  },
} as const;

const cities = {
  vi: {
    hcmc: "TP. Hồ Chí Minh",
    hanoi: "Hà Nội",
    danang: "Đà Nẵng",
    cantho: "Cần Thơ",
  },
  en: {
    hcmc: "Ho Chi Minh City",
    hanoi: "Hanoi",
    danang: "Da Nang",
    cantho: "Can Tho",
  },
} as const;

export const partners: Localized<Partner[]> = {
  vi: [
    {
      id: "viet-an",
      name: "Việt An International",
      monogram: "VA",
      kind: kinds.vi.international,
      city: cities.vi.hcmc,
    },
    {
      id: "an-phuc",
      name: "An Phúc Fertility",
      monogram: "AP",
      kind: kinds.vi.fertility,
      city: cities.vi.hcmc,
    },
    {
      id: "minh-chau",
      name: "Minh Châu Eye",
      monogram: "MC",
      kind: kinds.vi.eye,
      city: cities.vi.hanoi,
    },
    {
      id: "dong-a",
      name: "Đông Á Dental",
      monogram: "ĐA",
      kind: kinds.vi.dental,
      city: cities.vi.danang,
      logo: "/images/partners/dong-a.png",
    },
    {
      id: "truong-sinh",
      name: "Trường Sinh Cardiac",
      monogram: "TS",
      kind: kinds.vi.cardiac,
      city: cities.vi.hanoi,
    },
    {
      id: "bao-an",
      name: "Bảo An Diagnostics",
      monogram: "BA",
      kind: kinds.vi.diagnostics,
      city: cities.vi.hcmc,
    },
    {
      id: "sao-mai",
      name: "Sao Mai General",
      monogram: "SM",
      kind: kinds.vi.general,
      city: cities.vi.cantho,
    },
    {
      id: "thanh-tam",
      name: "Thanh Tâm Recovery",
      monogram: "TT",
      kind: kinds.vi.rehab,
      city: cities.vi.danang,
    },
  ],
  en: [
    {
      id: "viet-an",
      name: "Viet An International",
      monogram: "VA",
      kind: kinds.en.international,
      city: cities.en.hcmc,
    },
    {
      id: "an-phuc",
      name: "An Phuc Fertility",
      monogram: "AP",
      kind: kinds.en.fertility,
      city: cities.en.hcmc,
    },
    {
      id: "minh-chau",
      name: "Minh Chau Eye",
      monogram: "MC",
      kind: kinds.en.eye,
      city: cities.en.hanoi,
    },
    {
      id: "dong-a",
      name: "Dong A Dental",
      monogram: "DA",
      kind: kinds.en.dental,
      city: cities.en.danang,
      logo: "/images/partners/dong-a.png",
    },
    {
      id: "truong-sinh",
      name: "Truong Sinh Cardiac",
      monogram: "TS",
      kind: kinds.en.cardiac,
      city: cities.en.hanoi,
    },
    {
      id: "bao-an",
      name: "Bao An Diagnostics",
      monogram: "BA",
      kind: kinds.en.diagnostics,
      city: cities.en.hcmc,
    },
    {
      id: "sao-mai",
      name: "Sao Mai General",
      monogram: "SM",
      kind: kinds.en.general,
      city: cities.en.cantho,
    },
    {
      id: "thanh-tam",
      name: "Thanh Tam Recovery",
      monogram: "TT",
      kind: kinds.en.rehab,
      city: cities.en.danang,
    },
  ],
};
