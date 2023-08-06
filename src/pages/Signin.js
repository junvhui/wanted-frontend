import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SigninContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: #007bff;
`;

const Input = styled.input`
  padding: 8px;
  margin: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 8px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: #fff;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 비밀번호

  useEffect(() => {
    const jwtToken = localStorage.getItem("token"); // 토큰 유효성 검사
    if (jwtToken) {
      navigate("/todo");
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignin = () => {
    fetch("https://www.pre-onboarding-selection-task.shop/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("token", data.access_token); // 토큰 저장
          navigate("/todo"); // todo 페이지로 이동
        } else {
          alert("로그인 실패!");
        }
      })
      .catch((error) => {
        alert("로그인 실패!");
      });
  };

  return (
    <SigninContainer>
      <Title>로그인</Title>
      <Input
        data-testid="email-input"
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="이메일"
      />
      <Input
        data-testid="password-input"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="비밀번호"
      />

      <Button data-testid="signin-button" onClick={handleSignin}>
        로그인
      </Button>
    </SigninContainer>
  );
}

export default Signin;
