# Chrome Extension

Chrome 브라우저에서 동작하는 확장 프로그램입니다.

## 요구 사항

Google Chrome

Node.js 20.x 이상

npm 10.x 이상

## 실행방법

### sh

```sh
git clone https://github.com/j93es/snip-text-chrome-extension.git
cd snip-text-chrome-extension

npm install
npm run build
```

빌드가 완료되면 dist/ 디렉터리에 확장 프로그램을 설치할 수 있는 결과물이 생성됩니다.

project/
├── src/ # 확장 프로그램 소스 코드
├── public/ # 정적 리소스 및 manifest 등
├── dist/ # 빌드 결과물
├── package.json
└── README.md

## Chrome에 설치

빌드가 완료된 후 Chrome에서 다음 순서로 확장 프로그램을 설치합니다.

1. Chrome에서 chrome://extensions를 엽니다.

2. 우측 상단의 개발자 모드를 활성화합니다.

3. 압축해제된 확장 프로그램을 로드를 선택합니다.

4. 프로젝트의 dist/ 디렉터리를 선택합니다.

5. 확장 프로그램이 목록에 표시되는지 확인합니다.

6. 코드를 수정한 경우, 다시 빌드한 후 Chrome 확장 프로그램 관리 화면에서 업데이트 버튼을 눌러 변경 사항을 반영합니다.
