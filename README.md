# linc-realtime-simulator
Linc Reatime AQI Simulator API는 다음과 같은 API를 제공합니다.


## 1.1. API의 구성
GET 통신방식으로 URL 뒤의 aqi_simulator_v_1_0을 호출하면 실시간 데이터 20건을 전송합니다.


## 1.2. 호출주소
Web server API를 사용하기 위한 서버 주소는 다음과 같습니다.
```
> http://somnium.me:8089/aqi_simulator_v_1_0
``` 

## 1.3. Parameter 구성

> ### [Request]
>  ```json
> ```

> ### [Response]
>  ```json
>   {
>    "aqi_data_tier_tuples": [
>        {
>            "ssn": 0,
>            "wmac": "E09631AE7AB1",
>            "timestamp": 1572157775,
>            "temperature": 475,
>            "co_aqi": 414,
>            "o3_aqi": 459,
>            "no2_aqi": 138,
>            "pm25_aqi": 252,
>            "pm10_aqi": 296,
>            "lat": 35.86837,
>            "lng": 128.597688
>        },
>        ...
>        {
>            "ssn": 20,
>            "wmac": "58D52351719C",
>            "timestamp": 1572157775,
>            "temperature": 292,
>            "co_aqi": 125,
>            "o3_aqi": 376,
>            "no2_aqi": 81,
>            "pm25_aqi": 391,
>            "pm10_aqi": 22,
>            "lat": 35.86677,
>            "lng": 128.597788
>        }
>    ]
>}
> ```
