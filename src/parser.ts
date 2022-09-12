import axios from "axios";
import { OutputList } from "./types";
import { load } from "cheerio";
import {
  getSelectorForDomitory,
  getSelectorForStudentBunsic,
  getSelectorForTime,
  getSelectorForWorker,
  RESTAURANT_URL_ARRAY,
  WEEK_ARRAY,
} from "./const";
import dayjs from "dayjs";
import { Cheerio, AnyNode } from "cheerio";

const rawCheerioToString = (input: Cheerio<AnyNode>) => {
  return input
    .text()
    .split("\t")
    .filter((r) => r !== " \n" && r !== "" && r !== "\n")
    .join("");
};

export const menuParser = async (
  resIdx: string | undefined,
  says: string
): Promise<OutputList> => {
  if (typeof resIdx === "undefined") return {} as OutputList;

  const data = (await axios.get(RESTAURANT_URL_ARRAY[Number(resIdx)])).data;
  const $ = load(data);
  let text = "선택한 날짜 : ";
  const nowDay =
    says === "오늘"
      ? dayjs().get("day")
      : says === "일요일"
      ? 7
      : WEEK_ARRAY.indexOf(says, 0);

  // 각 식당에 대해서 경우의 수를 나누어야 할 듯 하다.
  switch (resIdx) {
    case "0":
    case "5":
      // 학생식당, 분식당
      const header = rawCheerioToString(
        $(getSelectorForStudentBunsic(nowDay, "header"))
      );
      const launch = rawCheerioToString(
        $(getSelectorForStudentBunsic(nowDay, "menu"))
      );
      const add = header + "\n" + launch;
      text += add;
      break;
    case "1":
    case "2":
    case "3":
      // 기숙사
      const header2 = rawCheerioToString(
        $(getSelectorForDomitory(nowDay, 1, "header"))
      );
      const launch2_1 = rawCheerioToString(
        $(getSelectorForDomitory(nowDay, 1, "menu"))
      );
      const launch2_2 = rawCheerioToString(
        $(getSelectorForDomitory(nowDay, 2, "menu"))
      );
      const add2 = header2 + "\n" + launch2_1 + "\n" + launch2_2;
      text += add2;
      break;
    case "4":
      // 교직원
      const header3 = rawCheerioToString(
        $(getSelectorForWorker(nowDay, 1, "header"))
      );
      const launch3_1 = rawCheerioToString(
        $(getSelectorForWorker(nowDay, 1, "menu"))
      );
      const launch3_2 = rawCheerioToString(
        $(getSelectorForWorker(nowDay, 2, "menu"))
      );
      const add3 = header3 + "\n" + launch3_1 + "\n" + launch3_2;
      text += add3;
      break;
    default:
      break;
  }

  return {
    version: "2.0",
    template: {
      outputs: [{ simpleText: { text } }],
      quickReplies: [
        { label: "처음으로", action: "message", messageText: "처음으로" },
      ],
    },
  };
};

export const timeParser = async (location: string): Promise<OutputList> => {
  // 기숙사 시간 TODO: 하드코딩
  let text = "";
  if (location === "기숙사 시간") {
    text += `학기중\n`;
    text += ` 푸름관\n`;
    text += `  중식 시간\n`;
    text += `  - 평일 : 11:30 ~ 13:30\n`;
    text += `  - 주말 : 12:00 ~ 13:00\n`;
    text += `  석식 시간\n`;
    text += `  - 평일 : 17:00 ~ 19:00\n`;
    text += `  - 주말 : 17:00 ~ 18:00\n`;
    text += ` 오름관\n`;
    text += `  중식 시간\n`;
    text += `  - 평일 : 11:30 ~ 13:30\n`;
    text += `  - 주말 : 12:00 ~ 13:30\n`;
    text += `  석식 시간\n`;
    text += `  - 평일 : 17:00 ~ 19:00\n`;
    text += `  - 주말 : 17:00 ~ 18:30\n`;
    text += `방학중(푸름관, 오름관)\n`;
    text += ` 중식 시간\n`;
    text += `  - 평일 : 12:00 ~ 13:30\n`;
    text += `  - 주말 : 12:00 ~ 13:00\n`;
    text += ` 석식 시간\n`;
    text += ` - 평일 : 17:00 ~ 18:30\n`;
    text += ` - 주말 : 17:00 ~ 18:00\n`;
  } else {
    let restaurant_idx = 0;
    switch (location) {
      case "학생식당 시간":
        restaurant_idx = 0;
        break;
      case "분식당 시간":
        restaurant_idx = 5;
        break;
      case "교직원 시간":
        restaurant_idx = 4;
        break;
      default:
        break;
    }
    const data = (await axios.get(RESTAURANT_URL_ARRAY[restaurant_idx])).data;
    const $ = load(data);
    text += rawCheerioToString($(getSelectorForTime(1)));
  }

  return {
    version: "2.0",
    template: {
      outputs: [{ simpleText: { text } }],
      quickReplies: [
        { label: "처음으로", action: "message", messageText: "처음으로" },
      ],
    },
  };
};
