## Backend

## 브랜치명

`feature`, `develop`, `release`, `hotfix`, `master`

feature/create-movie

feature/signup

!!! feature는 develop에 merge~~~

release-1.1

release-1.2

hotfix-1.1.2 → master에서 checkout -b 

## 깃 브랜치 규칙
- master는 배포 전에만(건들면 아니되오 :☠☠☠)
- develop branch에만 merge
  - 기능 구현마다 브랜치 생성 후 풀리퀘스트
  - 기능 구현시 branch생성을 꼭 develop로 가서 branch 생성하기!!
  - 오류 수정마다 브랜치 생성 후 풀리퀘스트(여기도 연관 브랜치로 가서 새로 브랜치 생성)
  - hotfix의 경우 master에서 브랜치 생성


## issue 작성

영화 api 호출

-[ ] ~~이용해서 영화 api 호출



## 커밋메시지

[issue번호] feat: 한 일 적기

ex. [#190] feat: 영화 api 불러오기


## 깃 커밋 메세지 컨벤션
|```Feat```|```Docs```|```Refactor```|```Fix```|```Design```|```Rename```|```Remove```|
|-------|-------|--------|-------|-------|-------|-------|
|새로운 기능을 추가할 경우|문서를 수정한 경우|코드 리팩토링|버그를 고친 경우|CSS 등 사용자 UI 디자인 변경|파일 혹은 폴더명을 수정 또는 옮기는 작업|파일을 삭제하는 작업만 수행한 경우|
#### 참고할 사이트: https://url.kr/snxlhm
