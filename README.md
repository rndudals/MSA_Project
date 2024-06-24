# MSA_Project

# 프로젝트 소개
절약왕국 프로젝트는 MSA와 쿠버네티스를 기반으로 구축한 디지털 플랫폼으로, 최저가 공유와 거지방 커뮤니티를 통합하여 경제적이고 환경 친화적인 소비를 촉진하는 것을 목표로 한다. MSA를 통해 각 기능이 독립
적으로 개발되고 운영되어 유연성과 확장성이 향상된다. 쿠버네티스를 활용한 컨테이너 오케스트레이션은 높
은 가용성을 보장하고, 자동 스케일링 및 롤링 업데이트를 통해 서비스 중단 없이 효율적으로 자원을 관리한
다. 이로써 절약왕국은 사용자에게 안정적이고 지속 가능한 서비스를 제공한다.

### 서비스 개발 시 고려한 중점사항
- 마이크로 서비스 아키텍처 설계
단일 장애 지점을 최소화하여 서버 안정성 향상
각 서비스의 필요 리소스에 맞게 독립적으로 스케일링 가능

-	데이터 가용성 확보
각 서비스별로 적합한 데이터베이스 사용
독립적인 PV(PersistentVolume), PVC(PersistentVolumeClaim) 생성으로 데이터 영구 저장

-	자체 복구 기능 활용
쿠버네티스의 Sefl-healing 기능으로 비정상 컨테이너 자동 교체
안정적인 서비스 유지

-	무중단 배포 구현
쿠버네티스의 Rolling Update 기능 활용
새로운 버전 배포 시 서비스 중단 최소화 

-	자동 스케일링 적용
쿠버네티스의 Auto-Scaling 기능 활용
HPA(HorizontalPodAutoscaler)로 CPU 사용량에 따른 레플리카 셋 개수 조절

-	성능 모니터링 및 측정
Jmeter와 Lighthouse를 이용한 반응 속도 및 서비스 성능 측정



# 프로젝트 기능

### 1. 비회원/회원 가입 기능
![화면 캡처 2024-06-24 173201](https://github.com/rndudals/MSA_Project/assets/102203336/6380a198-a280-4471-972c-1fbc974a2eca)


### 2. 거지방 커뮤니티 자유게시판(Bulletin Board) 기능
![화면 캡처 2024-06-24 173223](https://github.com/rndudals/MSA_Project/assets/102203336/08220c47-1f9f-460e-a3f2-ff6cb10b8cfc)


### 3. 물품 최저가 공유 기능(Sharing Board) 기능
![화면 캡처 2024-06-24 173237](https://github.com/rndudals/MSA_Project/assets/102203336/6ec1a5aa-2edd-459b-a095-b800002ccb95)



# 프로젝트 구조
![1](https://github.com/rndudals/MSA_Project/assets/102203336/b9c01d9c-2061-469c-a398-a8078146407d)

### 총 5개의 서버
1. Front – Server(front-server)

2. 인증 서버 (auth-server)

3. 자유게시판 서버 (Bulletin Board-server : bb-server)

4. 자유게시판 댓글 서버 (Comment-server : cm-server)

5. 최저가 공유 서버 (Sharing Board- server : sb-server)



# Service Mesh
![2](https://github.com/rndudals/MSA_Project/assets/102203336/5a8390f2-6f1b-4edd-a76f-1119ed963d04)

각 서비스가 데이터베이스와 연결되어 있으며, istio-ingressgateway를 통해 외부 트래픽이 내부 서비스로 라우팅된다. 


