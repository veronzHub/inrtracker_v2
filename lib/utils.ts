import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numberToWord = (num: number) => {
  const words: { [key: number]: string } = {
    0.5: "Half",
    1: "One",
    1.5: "One and a half",
    2: "Two",
    2.5: "Two and a half",
    3: "Three",
    3.5: "Three and a half",
    4: "Four",
    4.5: "Four and a half",
    5: "Five",
    5.5: "Five and a half",
    6: "Six",
    6.5: "Six and a half",
    7: "Seven",
    7.5: "Seven and a half",
    8: "Eight",
    8.5: "Eight and a half",
    9: "Nine",
    9.5: "Nine and a half",
  };

  return words[num] || num;
};
