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
    people: "Bệnh viện nhân dân",
    military: "Bệnh viện quân y",
    traditional: "Y học cổ truyền"
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
    people: "People's hospital",
    military: "Military hospital",
    traditional: "Traditional medicine"
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
      id: "115",
      name: "Bệnh viện nhân dân 115",
      monogram: "BV115",
      kind: kinds.vi.people,
      city: cities.vi.hcmc,
      logo: "/images/partners/115.jpg",
    },
    {
      id: "hoan-my",
      name: "Bệnh viện Đa khoa Hoàn Mỹ Sài Gòn",
      monogram: "HMS",
      kind: kinds.vi.general,
      city: cities.vi.hcmc,
      logo: "/images/partners/hoan-my.png",
    },
    {
      id: "cho-ray",
      name: "Bệnh viện Chợ Rẫy",
      monogram: "CR",
      kind: kinds.vi.general,
      city: cities.vi.hcmc,
      logo: "/images/partners/cho-ray.png",
    },
    {
      id: "quan-y",
      name: "Bệnh viện Quân Y 175",
      monogram: "175",
      kind: kinds.vi.military,
      city: cities.vi.hcmc,
      logo: "/images/partners/175.png",
    },
    {
      id: "mat-viet",
      name: "Bệnh viện Mắt Việt",
      monogram: "MV",
      kind: kinds.vi.eye,
      city: cities.vi.hcmc,
      logo: "/images/partners/mat-viet.png",
    },
    {
      id: "doctor-check",
      name: "Phòng khám đa khoa Doctor Check",
      monogram: "DC",
      kind: kinds.vi.diagnostics,
      city: cities.vi.hcmc,
      logo: "/images/partners/doctor-check.png",
    },
    {
      id: "sao-mai",
      name: "Phòng khám Tim mạch Hồng Tâm",
      monogram: "HT",
      kind: kinds.vi.cardiac,
      city: cities.vi.hcmc,
      logo: "/images/partners/hong-tam.png",
    },
    {
      id: "skymed",
      name: "Phòng khám Phụ sản Hiếm muộn Skymed",
      monogram: "Skymed",
      kind: kinds.vi.fertility,
      city: cities.vi.hcmc,
      logo: "/images/partners/sky-med.png",
    },
    {
      id: "yhct",
      name: "Phòng khám Y Học Cổ Truyền",
      monogram: "YHCT",
      kind: kinds.vi.traditional,
      city: cities.vi.hcmc,
      logo: "/images/partners/yhct.png",
    },
    {
      id: "diag",
      name: "Trung tâm xét nghiệm Y Khoa DIAG",
      monogram: "DIAG",
      /* Was `rehab` — "Trung tâm phục hồi chức năng" beside a named testing
         laboratory. These are real companies now, so a wrong category is a
         wrong statement about someone else's business. */
      kind: kinds.vi.diagnostics,
      city: cities.vi.hcmc,
      logo: "/images/partners/diag.png",
    },

  ],
  en: [
    {
      id: "viet-an",
      name: "People's Hospital 115",
      monogram: "VA",
      kind: kinds.en.people,
      city: cities.en.hcmc,
      logo: "/images/partners/115.jpg",
    },
    {
      id: "an-phuc",
      name: "Hoan My Saigon General Hospital",
      monogram: "AP",
      kind: kinds.en.general,
      city: cities.en.hcmc,
      logo: "/images/partners/hoan-my.png",
    },
    {
      id: "minh-chau",
      name: "Cho Ray Hospital",
      monogram: "MC",
      kind: kinds.en.general,
      city: cities.en.hanoi,
      logo: "/images/partners/cho-ray.png",
    },
    {
      id: "dong-a",
      name: "Military Hospital 175",
      monogram: "DA",
      kind: kinds.en.military,
      city: cities.en.danang,
      logo: "/images/partners/175.png",
    },
    {
      id: "truong-sinh",
      name: "Viet Eye Hospital",
      monogram: "TS",
      kind: kinds.en.eye,
      city: cities.en.hanoi,
      logo: "/images/partners/mat-viet.png",
    },
    {
      id: "bao-an",
      name: "Doctor Check General Clinic",
      monogram: "BA",
      kind: kinds.en.diagnostics,
      city: cities.en.hcmc,
      logo: "/images/partners/doctor-check.png",
    },
    {
      id: "sao-mai",
      name: "Hong Tam Cardiology Clinic",
      monogram: "SM",
      kind: kinds.en.cardiac,
      city: cities.en.cantho,
      logo: "/images/partners/hong-tam.png",
    },
    {
      id: "thanh-tam",
      name: "Skymed Obstetrics and Infertility Clinic",
      monogram: "TT",
      kind: kinds.en.fertility,
      city: cities.en.danang,
      logo: "/images/partners/sky-med.png",
    },
    {
      id: "yhct",
      name: "Traditional Medicine Clinic",
      monogram: "YHCT",
      kind: kinds.en.traditional,
      city: cities.en.hcmc,
      logo: "/images/partners/yhct.png",
    },
    {
      id: "diag",
      name: "DIAG Medical Center",
      monogram: "DIAG",
      kind: kinds.en.diagnostics,
      city: cities.en.hcmc,
      logo: "/images/partners/diag.png",
    },
  ],
};
