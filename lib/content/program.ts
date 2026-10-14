import type { IconName } from "@/components/ui/Icon";

export type ProgramItem = { title: string; body: string; icon: IconName };

export const programs: ProgramItem[] = [
  { title: "TK / KB", body: "Pembentukan karakter dasar dan motorik.", icon: "seedling" },
  { title: "MI", body: "Kurikulum terpadu dengan tahfidz 2 juz.", icon: "book" },
  { title: "MTS", body: "Ilmu-ilmu umum diperkuat dengan bahasa Arab.", icon: "compass" },
  { title: "MA", body: "Peminatan sains dan sosial, siap lanjut kuliah.", icon: "star" },
  { title: "Dayah", body: "Program asrama dan pengasuh.", icon: "moon" },
  { title: "Beasiswa", body: "Keringanan biaya bagi murid berprestasi.", icon: "heart" },
];