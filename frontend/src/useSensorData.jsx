import { useState, useEffect } from "react";

export default function useSensorData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 환경변수에서 백엔드 API URL 가져오기
                const apiUrl = import.meta.env.VITE_API_URL; // 여기 수정
                const res = await fetch(`${apiUrl}/api/sensor`);  // Cloudtype 서버의 최종 URL

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const json = await res.json();

                // timestamp 기준 내림차순 정렬 (최신 데이터가 앞)
                const sorted = json.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setData(sorted);
            } catch (err) {
                console.error("Failed to fetch sensor data:", err);
            }
        };

        fetchData(); // 초기 호출
        const interval = setInterval(fetchData, 5000); // 5초마다 갱신

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, []);

    return data;
}
