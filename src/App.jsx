/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import { Trash } from "phosphor-react";
import { v4 as uuid } from "uuid";
import Clipboard from "./assets/Clipboard.svg";

function App() {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");

  const [countTask, setCountTask] = useState(0);

  let taskCompleteCount = tasks.filter(function (task) {
    return task.isComplete;
  }).length;

  function handleSubmit(e) {
    e.preventDefault();
    setTasks([{ id: uuid(), title: newTask, isComplete: false }, ...tasks]);

    setNewTask("");

    setCountTask(tasks.length + 1);
  }

  function deleteTask(index) {
    const taskindex = tasks.filter((task) => {
      return task.id !== index;
    });
    setTasks(taskindex);
    setCountTask(tasks.length - 1);
  }

  function handleIsComplete(id) {
    setTasks(
      tasks.map(function (task) {
        if (task.id === id) {
          task.isComplete = !task.isComplete;
        }

        return task;
      })
    );
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className={styles.containerInput}>
        <input
          type="text"
          placeholder="Adicione uma tarefa"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
          required
        />
        <button>Criar</button>
      </form>
      <div className={styles.tasks}>
        <div className={styles.info}>
          <div className={styles.counter}>
            <strong>Tarefas criadas</strong>
            <p>{countTask}</p>
          </div>
          <div className={styles.counter2}>
            <strong>Concluidas</strong>
            {countTask === 0 ? (
              <p> 0 </p>
            ) : (
              <p>
                {taskCompleteCount} de {countTask}
              </p>
            )}
          </div>
        </div>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className={styles.list}>
              <button
                onClick={() => handleIsComplete(task.id)}
                className={
                  task.isComplete ? styles.btnComplete : styles.btnIncomplete
                }
              ></button>
              {task.isComplete ? (
                <p className={styles.done}> {task.title} </p>
              ) : (
                <p className={styles.notDone}> {task.title} </p>
              )}
              <button className={styles.deletebtn} title="Deletar ">
                <Trash size={20} onClick={() => deleteTask(task.id)} />
              </button>
            </div>
          ))
        ) : (
          <div className={styles.listEmptty}>
            <img src={Clipboard} />
            <strong> Você ainda não tem tarefas cadastradas</strong>

            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
