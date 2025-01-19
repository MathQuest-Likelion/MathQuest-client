import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Container,
  Header,
  ChartWrapper,
  CommentSection,
  CommentTitle,
  CommentText,
} from "../styles/LearningReportStyles";
import Footer from '../shared/components/Footer';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.js에 필요한 스케일과 플러그인 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const LearningReport = () => {
  const [chartData, setChartData] = useState(null);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken"); // 토큰을 localStorage에서 가져옴

    // axios 요청 시 인증 헤더 추가
    axios
      .get("https://mathquestpro.shop/problem/reports/weekly/", {
        headers: {
          Authorization: `Bearer ${authToken}`, // 액세스 토큰을 Authorization 헤더에 추가
        },
      })
      .then((response) => {
        const { correct, incorrect } = response.data.data;

        // 요일 및 데이터 추출 (월요일부터 일요일 순)
        const days = ["월", "화", "수", "목", "금", "토", "일"];
        const correctValues = days.map((_, index) => correct[index]);
        const incorrectValues = days.map((_, index) => incorrect[index]);

        // Chart.js 데이터 구성
        const chartData = {
          labels: days,
          datasets: [
            {
              label: "맞은 문제",
              data: correctValues,
              backgroundColor: "#5F4B8B",
            },
            {
              label: "틀린 문제",
              data: incorrectValues,
              backgroundColor: "#D3D3D3",
            },
          ],
        };

        // 맞은 문제 총합 계산
        const totalCorrect = correctValues.reduce((sum, val) => sum + val, 0);

        // 코멘트 조건
        if (totalCorrect >= 15) {
          setComment("정말 잘하고 있어요!");
        } else if (totalCorrect >= 10) {
          setComment("훌륭합니다!");
        } else if (totalCorrect >= 5) {
          setComment("좋은 출발입니다!");
        } else {
          setComment("조금 더 노력하세요!");
        }

        setChartData(chartData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("데이터를 불러오는 데 실패했습니다.");
        setIsLoading(false);
      });
  }, []);

  // Chart.js 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Container>
      <Header>학습량 분석</Header>
      {isLoading ? (
        <p>데이터를 불러오는 중입니다...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <ChartWrapper>
            <Bar data={chartData} options={options} />
          </ChartWrapper>
          <CommentSection>
            <CommentTitle>한줄평</CommentTitle>
            <CommentText>{comment}</CommentText>
          </CommentSection>
        </>
      )}
      <Footer />
    </Container>
  );
};

export default LearningReport;
