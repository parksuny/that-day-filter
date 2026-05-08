# That Day Filter

That Day Filter는 사용자가 업로드한 사진과 그 순간의 감정/상황을 바탕으로 감정 기반 필터를 적용하고, 결과 이미지를 사진 일기처럼 저장하는 웹 서비스입니다.

사용자는 사진을 업로드한 뒤, 사진을 찍었을 때의 상황과 느꼈던 감정, 분위기를 입력합니다.  
백엔드는 입력된 텍스트를 기반으로 적절한 필터를 선택하고, 실제 이미지 파일에 필터를 적용한 뒤 원본 이미지와 필터 적용 이미지를 저장합니다.

---

## 주요 기능

- 사진 업로드
- 사진을 찍었을 때의 상황 입력
- 감정/분위기 입력
- 감정 기반 필터 자동 선택
- Spring Boot 백엔드에서 실제 필터 이미지 생성
- 원본 이미지 및 필터 이미지 로컬 저장
- MySQL에 사진 메타데이터 저장
- 갤러리에서 저장된 필터 이미지 조회
- 사진 상세 페이지에서 감정/상황 메모 확인

---

## 현재 구현된 MVP Flow

```text
/create
사진 업로드
→ 상황/감정 입력
→ Spring Boot 서버로 이미지와 텍스트 전송
→ 백엔드에서 감정 키워드 기반 필터 선택
→ Java ImageIO 기반 이미지 필터 생성
→ 원본/필터 이미지 경로를 MySQL에 저장
→ 프론트에서 필터 적용 결과 표시

/gallery
백엔드에서 저장된 사진 목록 조회
→ 필터 적용 이미지 카드 형태로 표시

/gallery/[photoId]
특정 사진 상세 조회
→ 필터 이미지, 상황, 감정, 적용 필터 정보 표시
```

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- lucide-react

### Backend

- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- MySQL
- Java ImageIO

### Database

- MySQL

---

## Project Structure

```text
that-day-filter/
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── create/
│   │   ├── gallery/
│   │   ├── login/
│   │   └── signup/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── package.json
│
├── backend/
│   ├── src/main/java/com/thatdayfilter/
│   │   ├── photo/
│   │   ├── filter/
│   │   ├── storage/
│   │   └── security/
│   ├── src/main/resources/
│   │   └── application.yml
│   ├── build.gradle
│   ├── gradlew
│   └── gradlew.bat
│
├── database/
├── docs/
├── README.md
└── .gitignore
```

---

## Backend API

### 1. 사진 업로드 및 필터 생성

```http
POST /api/photos
Content-Type: multipart/form-data
```

### Form Data

| Key | Type | Description |
|---|---|---|
| userId | Text | 임시 사용자 ID |
| title | Text | 사진 제목 |
| situation | Text | 사진을 찍었을 때의 상황 |
| mood | Text | 당시 감정과 분위기 |
| file | File | 업로드할 이미지 파일 |

### Example Response

```json
{
  "id": 1,
  "userId": 1,
  "title": "비 오는 저녁",
  "originalImageUrl": "/uploads/original/51a3252a-0c9d-4339-b302-6f784417c934.jpg",
  "filteredImageUrl": "/uploads/filtered/4de2884e-d19a-4ed7-b977-a859e480d38b.jpg",
  "situation": "비가 온 뒤 혼자 걸어가던 길",
  "mood": "조금 외롭고 차분했음",
  "filterType": "SOFT_RAIN_BLUE",
  "filterName": "Soft Rain Blue",
  "createdAt": "2026-05-09T00:44:44.5989104"
}
```

---

### 2. 사용자별 사진 목록 조회

```http
GET /api/photos/user/{userId}
```

예시:

```http
GET /api/photos/user/1
```

---

### 3. 사진 상세 조회

```http
GET /api/photos/{photoId}
```

예시:

```http
GET /api/photos/1
```

---

### 4. 사진 삭제

```http
DELETE /api/photos/{photoId}
```

---

## Filter Types

| Filter Type | Filter Name | Description |
|---|---|---|
| `SOFT_RAIN_BLUE` | Soft Rain Blue | 비, 외로움, 차분함, 우울함과 관련된 분위기 |
| `WARM_MEMORY` | Warm Memory | 따뜻함, 행복함, 설렘, 햇빛과 관련된 분위기 |
| `MIDNIGHT_FOCUS` | Midnight Focus | 밤, 집중, 고요함, 차분함과 관련된 분위기 |
| `DREAM_BLUR` | Dream Blur | 몽환적이고 흐릿한 꿈 같은 분위기 |
| `NEUTRAL_DIARY` | Neutral Diary Tone | 특정 감정 키워드가 없을 때 적용되는 기본 필터 |

---

## Local Setup

### 1. MySQL Database 생성

MySQL에서 아래 SQL을 실행합니다.

```sql
CREATE DATABASE that_day_filter;

CREATE USER 'filter_user'@'localhost' IDENTIFIED BY 'filter';

GRANT ALL PRIVILEGES ON that_day_filter.* TO 'filter_user'@'localhost';

FLUSH PRIVILEGES;
```

---

### 2. Backend 설정

`backend/src/main/resources/application.yml`

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/that_day_filter?serverTimezone=Asia/Seoul&characterEncoding=UTF-8
    username: filter_user
    password: filter
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true

  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

file:
  upload-dir: uploads
```

---

### 3. Backend 실행

```bash
cd backend
./gradlew bootRun
```

Windows PowerShell에서는 아래 명령어를 사용합니다.

```powershell
cd backend
.\gradlew.bat bootRun
```

Backend server:

```text
http://localhost:8080
```

---

### 4. Frontend 실행

```bash
cd frontend
npm install
npm run dev
```

Frontend server:

```text
http://localhost:3000
```

---

## Image Storage

현재 MVP에서는 업로드된 이미지를 백엔드 로컬 폴더에 저장합니다.

```text
backend/uploads/
├── original/
└── filtered/
```

- `original/`: 사용자가 업로드한 원본 이미지
- `filtered/`: 백엔드에서 필터가 적용된 결과 이미지

`uploads/` 폴더는 사용자 업로드 파일이므로 GitHub에 올리지 않습니다.

---

## Security Notes

현재 MVP에서는 빠른 개발과 테스트를 위해 API 접근을 열어둔 상태입니다.

향후 보안 개선 계획:

- 회원가입/로그인 구현
- JWT 기반 인증 적용
- 로그인한 사용자별 사진 접근 제한
- 본인 사진만 조회/삭제 가능하도록 권한 검증
- 이미지 파일 확장자 및 MIME type 검증 강화
- 업로드 파일 크기 제한
- 로컬 저장소에서 AWS S3로 이전
- AI API Key를 프론트에 노출하지 않고 백엔드에서만 관리

---

## Current Status

현재 구현 완료:

- Next.js 기반 프론트엔드 화면
- 사진 업로드 페이지
- 감정/상황 입력 UI
- Spring Boot 백엔드 이미지 업로드 API
- 감정 키워드 기반 필터 선택 로직
- Java ImageIO 기반 실제 필터 이미지 생성
- MySQL 저장
- 백엔드 데이터 기반 갤러리 조회
- 사진 상세 페이지 조회

---

## Future Improvements

- 사용자 회원가입 및 로그인
- 사진 삭제 UI 연결
- 필터 재생성 기능
- 감정 키워드 분석 고도화
- AI 이미지 편집 API 연동
- AWS S3 기반 이미지 저장
- 3초 감정 영상 생성 기능
- 날짜별/감정별 갤러리 필터링
- 공유 링크 생성
- 포트폴리오용 배포 환경 구성

---

## Project Goal

This project aims to connect photos with emotional context.

Instead of simply storing photos, That Day Filter preserves the situation, emotion, and atmosphere of the moment.  
The goal is to create a personalized emotional photo diary where each image reflects not only what was seen, but also how the moment felt.