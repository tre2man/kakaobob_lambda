/**
 * 리스트 응답 문구 타입
 */
export interface OutputList {
  version: string;
  template: {
    outputs: Array<{
      simpleText: {
        text: string;
      };
    }>;
    quickReplies: Array<{
      label: string;
      action: string;
      messageText: string;
    }>;
  };
}

/**
 * 캐로셀 응답 문구 타입
 */
export interface OutputCarousel {
  version: string;
  template: {
    outputs: Array<{
      carousel: {
        type: string;
        items: Array<{
          title: string;
          description: string;
        }>;
      };
    }>;
    quickReplies: Array<{
      label: string;
      action: string;
      messageText: string;
    }>;
  };
}

/**
 * DB에 저장되는 형식
 */
export interface UserInfo {
  id: string;
  value: string;
}
