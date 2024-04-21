export type TinsertWarfarinDosages = {
  start_date: number;
  day_of_week: number;
  dose: number;
  strength: number;
}[];

export type TWarfarinAccidentForm = {
  id: number;
  date: string;
  missed: boolean;
  incorrect: boolean;
  note: string | null;
};
