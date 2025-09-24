import React from "react";
import useSensorData from "./useSensorData";
import './App.css'

export default function App() {
  const data = useSensorData();
  const latest = data[0] || {}; // 최신 데이터
  // 최신 10개 데이터, 왼쪽=오래된, 오른쪽=최신
const recentData = data.slice(0, 10);
 // 최근 10개 데이터, 왼쪽이 오래된 데이터

  return (
    <div className="app-container">
      <h1>Sensor Dashboard</h1>

      {/* 최신 값 카드 */}
      <div className="card-container">
        <div className="card distance-card">
          <h2>거리</h2>
          <p className="card-value green">{latest.distance ?? "--"} cm</p>
        </div>
        <div className="card temperature-card">
          <h2>온도</h2>
          <p className="card-value red">{latest.temperature ?? "--"} °C</p>
        </div>
        <div className="card humidity-card">
          <h2>습도</h2>
          <p className="card-value blue">{latest.humidity ?? "--"} %</p>
        </div>
      </div>

      {/* 최근 데이터 막대 그래프 */}
      <div className="graph-container">
        <h3>Recent Distance (last 10)</h3>
        <div className="bar-graph">
          {recentData.map((d, i) => {
            const height = d.distance ? Math.min(d.distance * 3, 150) : 0;
            return (
              <div key={i} className="bar" style={{ height }}>
                <span className="bar-label">{d.distance}</span>
              </div>
            )
          })}
        </div>
        <div className="bar-timestamps">
          {recentData.map((d, i) => (
            <span key={i}>{new Date(d.timestamp).toLocaleTimeString()}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
