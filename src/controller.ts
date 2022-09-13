import { Context, Handler } from "aws-lambda";
import {
  AVAILABLE_TIME_ARRAY,
  AVALIABLE_TIME_LIST,
  DATE_LIST,
  MAIN_LIST,
  RESTAURANT_ARRAY,
  RESTAURANT_LIST,
  WEEK_ARRAY,
} from "./const";
import { createDB, readDB } from "./db";
import { menuParser, timeParser } from "./parser";

// TODO: 엔티티 및 context 사용하기
const router = async (says: string, userKey: string) => {
  if (RESTAURANT_ARRAY.includes(says)) {
    // 식당에 관한 발화가 들어올 시 식당 정보 임시로 저장
    createDB(userKey, String(RESTAURANT_ARRAY.indexOf(says, 0)));
    return DATE_LIST;
  } else if (WEEK_ARRAY.includes(says)) {
    // 날짜에 관한 발화가 들어올 시, 지정된 식당 정보 반환
    const dbInfo = await readDB(userKey);
    return await menuParser(dbInfo?.value, says);
  } else if (AVAILABLE_TIME_ARRAY.includes(says)) {
    return await timeParser(says);
  } else if (says === "처음으로") {
    return MAIN_LIST;
  } else if (says === "식단 정보") {
    return RESTAURANT_LIST;
  } else if (says === "식당 이용 가능 시간") {
    return AVALIABLE_TIME_LIST;
  } else {
    return MAIN_LIST;
  }
};

const main: Handler = async (event: any, context: Context) => {
  try {
    const body = JSON.parse(event.body);
    console.log(JSON.stringify(body));
    // 유저 발언과 key값 처리
    const says = String(body.userRequest.utterance);
    const userKey = String(body.userRequest.user.id);
    // 응답값 반환하기
    const data = await router(says, userKey);
    const response = { statusCode: 200, body: JSON.stringify(data) };
    return response;
  } catch (e) {
    console.log("error", JSON.stringify(e));
    const response = {
      statusCode: 404,
      body: JSON.stringify(e),
    };
    return response;
  }
};

export { main };
