import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input.attrs({ type: "checkbox" })`
  margin-right: 8px;
`;

const TodoText = styled.span`
  font-size: 16px;
`;

const TodoWrap = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  width: 300px;
  display: flex;
`;

const TodoInput = styled.input.attrs({
  placeholder: "할 일을 입력하세요",
})`
  padding: 8px;
  margin-bottom: 8px;
  width: 300px;
  display: flex;
`;

const AddButton = styled.button`
  margin-left: 1rem;
  height: 2.12rem;
  width: 5rem;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  &:hover {
    opacity: 0.8;
  }
`;

const ModifyButton = styled.button`
  margin-left: 7rem;
  width: 3rem;
  height: 1.3rem;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  &:hover {
    opacity: 0.8;
  }
`;

const SubmitButton = styled.button`
  margin-left: 7rem;
  width: 3rem;
  height: 1.3rem;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  &:hover {
    opacity: 0.8;
  }
`;
const DeleteButton = styled.button`
  margin-left: 1rem;
  width: 3rem;
  height: 1.3rem;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  &:hover {
    opacity: 0.8;
  }
`;

const CancelButton = styled.button`
  margin-left: 1rem;
  width: 3rem;
  height: 1.3rem;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  &:hover {
    opacity: 0.8;
  }
`;

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [jwtToken, setJwtToken] = useState(""); // jwt 토큰
  const [editId, setEditId] = useState(null);
  const [editTodo, setEditTodo] = useState("");
  const [editTodoisCompleted, setEditTodoisCompleted] = useState(false);

  //값 적는 내용
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  // POST - Todo 추가
  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      return;
    }
    // createTodo
    fetch("https://www.pre-onboarding-selection-task.shop/todos", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + jwtToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: newTodo }),
    })
      .then((response) => response.json())
      .then((data) => {
        const newTodoItem = {
          id: data.id,
          todo: data.todo,
          isCompleted: false,
          userId: data.userId,
        };
        setTodos((todos) => [...todos, newTodoItem]);
      })
      .catch((error) => {
        alert("todo 리스트 추가에 실패했습니다.");
      });
    setNewTodo("");
  };

  //GET
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.replace("/signin");
    } else {
      setJwtToken(localStorage.getItem("token"));
    }
    if (jwtToken) {
      fetch("https://www.pre-onboarding-selection-task.shop/todos", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          for (let j = 0; j < response.length; j++) {
            const getTodoList = {
              id: response[j].id,
              todo: response[j].todo,
              isCompleted: response[j].isCompleted,
              userId: response[j].userId,
            };
            console.log(getTodoList);
            setTodos((todos) => [...todos, getTodoList]);
          }
        })
        .catch((error) => {});
    }
  }, [jwtToken]);

  // 체크박스
  const handleTodoToggle = (key) => {
    const updatedTodos = [...todos];
    updatedTodos[key].isCompleted = !updatedTodos[key].isCompleted;
    setTodos(updatedTodos);
    console.log(updatedTodos[key].isCompleted);
    setEditTodoisCompleted(updatedTodos[key].isCompleted);
    console.log(updatedTodos);
  };

  // Todo 수정 값
  const handleEditTodo = (id, todo) => {
    setEditId(id);
    setEditTodo(todo);
  };

  const handleSubmitTodo = () => {
    // updateTodo
    fetch("https://www.pre-onboarding-selection-task.shop/todos/" + editId, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + jwtToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: editTodo,
        isCompleted: editTodoisCompleted,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Todo 수정에 실패했습니다.", error);
      });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditTodo("");
    setEditTodoisCompleted(false);
  };

  const handleDeleteTodo = (id) => {
    // deleteTodo
    fetch("https://www.pre-onboarding-selection-task.shop/todos/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Todo 삭제에 실패했습니다.", error);
      });
  };

  return (
    <TodoListContainer>
      <h1 style={{ color: "#007bff" }}>TO DO LIST</h1>
      <TodoWrap>
        <TodoInput
          data-testid="new-todo-input"
          value={newTodo}
          onChange={handleInputChange}
        />
        <AddButton data-testid="new-todo-add-button" onClick={handleAddTodo}>
          추가
        </AddButton>
      </TodoWrap>
      {todos.map((todo, index) => (
        <li style={{ display: "flex", marginTop: "1rem" }} key={index}>
          {editId === todo.id ? (
            <>
              <Input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleTodoToggle(index)}
              />
              <input
                data-testid="modify-input"
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                style={{ width: "10rem", height: "1.3rem" }}
              ></input>
              <SubmitButton
                data-testid="submit-button"
                onClick={handleSubmitTodo}
                style={{ marginLeft: "1.1rem" }}
              >
                제출
              </SubmitButton>
              <CancelButton
                data-testid="cancel-button"
                onClick={handleCancelEdit}
              >
                취소
              </CancelButton>
            </>
          ) : (
            <>
              <Input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleTodoToggle(index)}
              />
              <TodoText>{todo.todo}</TodoText>
              <ModifyButton
                data-testid="modify-button"
                onClick={() => handleEditTodo(todo.id, todo.todo)}
              >
                수정
              </ModifyButton>
              <DeleteButton
                data-testid="delete-button"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                삭제
              </DeleteButton>
            </>
          )}
        </li>
      ))}
    </TodoListContainer>
  );
}

export default TodoList;
