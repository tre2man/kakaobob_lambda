/**
 * dynamoDB 사용하기
 */

import AWS, { Credentials } from "aws-sdk";
import { UserInfo } from "./types";

AWS.config.update({
  region: "ap-northeast-2",
  credentials: new Credentials({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY as string,
  }),
});

const dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * 데이터 조회
 * @param userKey 탐색할 key
 * @returns 결과 value
 */
export const readDB = async (userKey: string): Promise<UserInfo | null> => {
  try {
    return new Promise((resolve) => {
      dynamo.get(
        {
          TableName: "kumohbob",
          Key: {
            id: userKey,
          },
        },
        (err, data) => {
          resolve(data.Item as UserInfo);
        }
      );
    });
  } catch (e) {
    return null;
  }
};

/**
 * 데이터 생성 OR 업데이트
 * @param userKey key
 * @param value value
 * @returns
 */
export const createDB = async (
  userKey: string,
  value: string
): Promise<boolean> => {
  try {
    return new Promise((resolve) => {
      dynamo.put(
        {
          TableName: "kumohbob",
          Item: {
            id: userKey,
            value,
          },
        },
        (err, data) => {
          resolve(true);
        }
      );
    });
  } catch (e) {
    console.log(e);
    return false;
  }
};
