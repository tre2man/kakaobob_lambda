import dayjs from "dayjs";
import { OutputList } from "./types";

export const STUDENT_RESTAURANT_URL =
  "https://www.kumoh.ac.kr/ko/restaurant01.do";
export const WORKER_RESTAURANT_URL =
  "https://www.kumoh.ac.kr/ko/restaurant02.do";
export const BUNSIC_RESTAURANT_URL =
  "https://www.kumoh.ac.kr/ko/restaurant04.do";
export const PORUM_URL = "https://dorm.kumoh.ac.kr/dorm/restaurant_menu01.do";
export const ORUM1_URL = "https://dorm.kumoh.ac.kr/dorm/restaurant_menu02.do";
export const ORUM3_URL = "https://dorm.kumoh.ac.kr/dorm/restaurant_menu03.do";

export const RESTAURANT_URL_ARRAY = [
  STUDENT_RESTAURANT_URL,
  PORUM_URL,
  ORUM1_URL,
  ORUM3_URL,
  WORKER_RESTAURANT_URL,
  BUNSIC_RESTAURANT_URL,
];
export const RESTAURANT_ARRAY = [
  "학생식당",
  "푸름관",
  "오름1동",
  "오름3동",
  "교직원",
  "분식당",
];
export const WEEK_ARRAY = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
  "오늘",
];
export const AVAILABLE_TIME_ARRAY = [
  "학생식당 시간",
  "기숙사 시간",
  "교직원 시간",
  "분식당 시간",
];

/**
 * 기능 선택하는 메인 화면
 */
export const MAIN_LIST: OutputList = {
  version: "2.0",
  template: {
    outputs: [{ simpleText: { text: "🔧 원하시는 기능을 선택해 주세요. 🔧" } }],
    quickReplies: [
      { label: "식단 정보", action: "message", messageText: "식단 정보" },
      {
        label: "식당 이용 가능 시간",
        action: "message",
        messageText: "식당 이용 가능 시간",
      },
      { label: "정보", action: "message", messageText: "정보" },
    ],
  },
};

/**
 * 식당을 선택하는 리스트
 */
export const RESTAURANT_LIST: OutputList = {
  version: "2.0",
  template: {
    outputs: [{ simpleText: { text: "🍽 식당을 선택해 주세요. 🍽" } }],
    quickReplies: [
      { label: "학생식당", action: "message", messageText: "학생식당" },
      { label: "교직원", action: "message", messageText: "교직원" },
      { label: "푸름관", action: "message", messageText: "푸름관" },
      { label: "오름1동", action: "message", messageText: "오름1동" },
      { label: "오름3동", action: "message", messageText: "오름3동" },
      { label: "분식당", action: "message", messageText: "분식당" },
    ],
  },
};

/**
 * 날짜를 선택하는 리스트
 */
export const DATE_LIST: OutputList = {
  version: "2.0",
  template: {
    outputs: [
      {
        simpleText: {
          text:
            "📅 요일을 선택해 주세요. 📅\n\n오늘은 " +
            dayjs().get("year") +
            "년 " +
            (dayjs().get("month") + 1) +
            "월 " +
            dayjs().get("date") +
            "일 " +
            WEEK_ARRAY[dayjs().get("day")] +
            " 입니다.",
        },
      },
    ],
    quickReplies: [
      { label: "오늘", action: "message", messageText: "오늘" },
      { label: "월요일", action: "message", messageText: "월요일" },
      { label: "화요일", action: "message", messageText: "화요일" },
      { label: "수요일", action: "message", messageText: "수요일" },
      { label: "목요일", action: "message", messageText: "목요일" },
      { label: "금요일", action: "message", messageText: "금요일" },
      { label: "토요일", action: "message", messageText: "토요일" },
      { label: "일요일", action: "message", messageText: "일요일" },
    ],
  },
};

/**
 * 식당 이용 가능시간 알아보기
 */
export const AVALIABLE_TIME_LIST: OutputList = {
  version: "2.0",
  template: {
    outputs: [{ simpleText: { text: "식당을 선택해 주세요." } }],
    quickReplies: [
      { label: "학생식당", action: "message", messageText: "학생식당 시간" },
      { label: "기숙사", action: "message", messageText: "기숙사 시간" },
      { label: "교직원", action: "message", messageText: "교직원 시간" },
      { label: "분식당", action: "message", messageText: "분식당 시간" },
    ],
  },
};

/**
 * 학생식당 분식당 메뉴 및 헤더 셀렉터 받기
 */
export const getSelectorForStudentBunsic = (
  day: number,
  type: "header" | "menu"
) => {
  const core = `#jwxe_main_content > div.ko > div > div.menu-list-box > div > table`;
  if (type === "header") return core + ` > thead > tr > th:nth-child(${day})`;
  return core + ` > tbody > tr > td:nth-child(${day}) > ul`;
};

/**
 * 교직원식당 메뉴, 중/석식 및 헤더 셀렉터 받기
 */
export const getSelectorForWorker = (
  day: number,
  lunchOrDinner: 1 | 2,
  type: "header" | "menu"
) => {
  const core = `#jwxe_main_content > div.ko > div > div.menu-list-box > div > table`;
  if (type === "header") return core + ` > thead > tr > th:nth-child(${day})`;
  return (
    core +
    ` > tbody > tr:nth-child(${lunchOrDinner}) > td:nth-child(${day}) > ul`
  );
};

/**
 * 기숙사 식당 셀렉터 받기
 */
export const getSelectorForDomitory = (
  day: number,
  lunchOrDinner: 1 | 2,
  type: "header" | "menu"
) => {
  const core = `#jwxe_main_content > div > div > div > div > table`;
  if (type === "header") return core + ` > thead > tr > th:nth-child(${day})`;
  return (
    core +
    ` > tbody > tr:nth-child(${lunchOrDinner}) > td:nth-child(${day}) > ul`
  );
};

/**
 * 식당메뉴 셀렉터 받기 (지금은 하드코딩)
 */
export const getSelectorForTime = (type: 1 | 2 | 3) => {
  // 학생식당, 분식당, 교직원식당
  if (type === 1)
    return "#jwxe_main_content > div.ko > div > div.content-wrapper.mt20 > div:nth-child(3) > ul";
  // 생활관 학기중
  else if (type === 2)
    return "body > div.wrapper.fixed > div.sub-container.container > div.content-wrap > div.content-wrapper.mt20 > div:nth-child(4)";
  // 생활관 방학중
  else
    return "body > div.wrapper.fixed > div.sub-container.container > div.content-wrap > div.content-wrapper.mt20 > div:nth-child(5)";
};
