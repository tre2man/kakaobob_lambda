
# 카카오톡 밥친구 Serverless 버전
기존의 카카오톡 밥친구 서버가 비용이 너무 많이 나와서, 서버리스로 이전했습니다.
## 기술스택
- Serverless
- Typescript
- DynamoDB
---
## 사용법
### 로컬 테스트하기
```
# serverless.yml - 프라이빗 메서드 해제 후 실행
sls offline
```
### 배포하기
```
serverless deploy
```
### 요청 보내기
```json
{
  Body : "JSON 형식으로 카카오톡 스킬 참고",
  Header : {
    x-api-key : "키 값"
  }
}
```
## 환경변수
```
config/config.js
```

## 추후 개선점
- 각 발화마다 엔티티를 설정해야하는데... 급하게 만드느라 하드코딩으로 작성함.
