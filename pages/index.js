import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [Todos, setTodos] = useState([]);
  const [todoinput, setTodoinput] = useState("");
  const [allcom, setAllcom] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const isthatall = () => {
    let check = 0;
    for (let i = 0; i < Todos.length; i++) {
      if (Todos[i].completed === true) {
        check += 1;
      }
    }
    setAllcom(check);
  };

  const deleteTodo = (idx) => {
    Todos.splice(idx, 1);
    const newTodos = [...Todos];
    setTodos(newTodos);
  };

  const markTodo = (idx) => {
    Todos[idx].completed = !Todos[idx].completed;
    setTodos([...Todos]);
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const onchange = Todos[idx];
    Todos[idx] = Todos[idx - 1];
    Todos[idx - 1] = onchange;
    setTodos([...Todos]);
  };

  const moveDown = (idx) => {
    if (idx === Todos.length - 1) return;
    const onchange = Todos[idx];
    Todos[idx] = Todos[idx + 1];
    Todos[idx + 1] = onchange;
    setTodos([...Todos]);
  };

  const inputchange = (event) => {
    if (event.key !== "Enter") return;
    if (event.target.value === "") {
      alert("Todo cannot be emtry");
      return;
    }
    const newTodo = [{ title: event.target.value, completed: false }, ...Todos];
    setTodos(newTodo);
    setTodoinput("");
  };

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      isthatall();
      return;
    }
    saveTodos();
    isthatall();
  }, [Todos]);

  const saveTodos = () => {
    const todoStr = JSON.stringify(Todos);
    localStorage.setItem(`minimal-todos`, todoStr);
  };

  useEffect(() => {
    const todoStr = localStorage.getItem(`minimal-todos`);
    if (todoStr === null) setTodos([]);
    else {
      setTodos(JSON.parse(todoStr));
    }
  }, []);

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onKeyUp={inputchange}
          onChange={(event) => setTodoinput(event.target.value)}
          value={todoinput}
        />
        {/* Todos */}

        {Todos.map((todonow, i) => (
          <Todo
            key={i}
            title={todonow.title}
            completed={todonow.completed}
            onmoveUp={() => moveUp(i)}
            onmoveDown={() => moveDown(i)}
            onMark={() => markTodo(i)}
            onDelete={() => deleteTodo(i)}
          />
        ))}

        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({Todos.length}) </span>
          <span className="text-warning">
            Pending ({Todos.length - allcom}){" "}
          </span>
          <span className="text-success">Completed ({allcom})</span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Phanuwat Ngoenthok 640610659
        </p>
      </div>
    </div>
  );
}
