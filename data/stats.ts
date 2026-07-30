import type { Localized, Stat } from "@/types";

/**
 * The four figures on the gold band.
 *
 * Illustrative sample data — every one of these is a claim, so replace with
 * numbers the business can actually evidence before launch.
 *
 * `value` keeps its locale's thousands separator; `StatCounter` reads the digits
 * back out to animate.
 */
export const stats: Localized<Stat[]> = {
  vi: [
    {
      id: "patients",
      icon: "users-round",
      value: "2.400",
      suffix: "+",
      label: "Bệnh nhân quốc tế được đồng hành",
    },
    {
      id: "partners",
      icon: "hospital",
      value: "35",
      suffix: "+",
      label: "Bệnh viện & phòng khám đối tác",
    },
    {
      id: "saving",
      icon: "wallet",
      value: "62",
      suffix: "%",
      label: "Chi phí tiết kiệm trung bình",
    },
    {
      id: "response",
      icon: "clock",
      value: "24",
      suffix: "h",
      label: "Thời gian phản hồi tối đa",
    },
  ],
  en: [
    {
      id: "patients",
      icon: "users-round",
      value: "2,400",
      suffix: "+",
      label: "International patients guided",
    },
    {
      id: "partners",
      icon: "hospital",
      value: "35",
      suffix: "+",
      label: "Partner hospitals and clinics",
    },
    {
      id: "saving",
      icon: "wallet",
      value: "62",
      suffix: "%",
      label: "Average saving versus home care",
    },
    {
      id: "response",
      icon: "clock",
      value: "24",
      suffix: "h",
      label: "Maximum time to first reply",
    },
  ],
};
