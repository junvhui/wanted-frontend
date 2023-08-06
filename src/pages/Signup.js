import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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

  const handleSignup = () => {
    if (!isEmailValid(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
    } else if (password.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
    } else {
      // SignUp api
      fetch("https://www.pre-onboarding-selection-task.shop/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((data) => {
          if (data.statusCode !== 400) {
            navigate("/signin");
            alert("회원가입 성공");
          } else {
            alert("중복된 이메일이 존재합니다.");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // 이메일 유효성 검사
  const isEmailValid = (email) => {
    return email.includes("@");
  };

  // 비밀번호 유효성 검사
  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const isValid = isEmailValid(email) && isPasswordValid(password);

  return (
    <SignupContainer>
      <Title>회원가입 페이지</Title>
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
      <Button
        data-testid="signup-button"
        onClick={handleSignup}
        disabled={!isValid}
      >
        회원가입
      </Button>
    </SignupContainer>
  );
}

export default Signup;

const SignupContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
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
