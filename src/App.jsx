import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { useState, useRef, useEffect } from 'react'
import './App.css'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

function App() {

  const [editId, setEditId] = useState(null);
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)
  const [deadline, setDeadline] = useState('');
  const [tick, setTick] = useState(0);

  // Progress Calcutaion
  const completedCount = todos.filter(todo => todo.isCompleted).length;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  // Checking deadline after every minute by rerender the specific components
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Restore the todos from localstorage 
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleEdit = (e, id) => {
    // Method 1 :

    // const newTodo = prompt("Edit your todo:", e.target.todo);
    // if (newTodo !== null && newTodo.trim() !== "") {
    //   setTodos(
    //   todos.map(item =>
    //     item.id === id? { ...item, todo: newTodo } : item
    //   )
    //   );
    // }

    const editItem = todos.find(item => item.id === id);
    setTodo(editItem.todo);
    setEditId(id);

    saveToLS();
  };

  const handleDelete = (e, Id) => {
    // Method : 1
    // let id=e.target.name;
    // setTodos(todos.filter(item => item.id !== id));

    // Method : 2
    setTodos(todos.filter(item => item.id !== Id));

    saveToLS()
  }


  const handleAdd = () => {
    if (editId) {
      setTodos(todos.map(item =>
        item.id === editId ? { ...item, todo, deadline } : item
      ));
      setEditId(null);
    } else {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          todo,
          isCompleted: false,
          deadline
        }
      ]);
    }
    setTodo("");
    setDeadline("");

    saveToLS();
  }


  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);

    saveToLS()
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }


  return (
    <>
      <Navbar />


      <div className="container max-w-2xl mx-auto m-5 px-5 py-2 bg-amber-50 rounded-xl min-h-[80vh]">
        <h1 className="text-3xl md:text-4xl m-4 font-bold text-center text-green-700 mt-6">
          🌿 ToGrow: The Task Garden by Vineet
        </h1>

        <hr />

        <div className="addTodo my-6">
          <h1 className="text-2xl font-bold mb-2">Add Todo 📝</h1>
          <div className='w-full'>
            <input onChange={handleChange} value={todo} placeholder='Your next productive move goes here...' type="text" className="border w-[80%] rounded px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
            <label className="text-xl font-bold text-black mt-4 block">
              Select deadline before it's too late ⏳
            </label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border w-[80%] rounded px-3 py-2 mr-2 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />

            <button onClick={handleAdd} disabled={todo.length == 0} className=" my-2 bg-amber-400 w-[18%] hover:bg-amber-500 text-white font-semibold px-4 py-2 rounded transition-colors duration-200 disabled:bg-amber-300 ">Save</button>
          </div>
        </div>



        <hr className='mt-4' />

        <div className='flex justify-between items-center my-3'>
          <h2 className="text-2xl font-bold mb-2 mt-4">Your Todos 🏁</h2>
          <label htmlFor="checkbox"><input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished</label>
        </div>
        {todos.length === 0 && (
          <div className="flex items-center justify-center my-8">
            <span className="text-lg font-semibold text-amber-500 bg-white px-6 py-3 rounded shadow animate-pulse">
              🎉 Nothing to do? Enjoy your free time!
            </span>
          </div>
        )}

        <div className="todos space-y-3 max-h-[50vh] overflow-auto">
          {todos.map(item => {
            return (showFinished == true || !item.isCompleted) && (
              <div
                key={item.id}
                className="Todo flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-2 justify-between bg-white p-3 rounded shadow w-full"
              >
                <div className="left flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center flex-1 min-w-0 w-full">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="mt-1 sm:mt-0"
                  />
                  <div
                    className={
                      (item.isCompleted ? "line-through " : "") +
                      "break-words whitespace-pre-line max-w-full sm:max-w-md md:max-w-lg 2xl:w-full"
                    }
                    style={{ wordBreak: "break-word" }}
                  >
                    {item.todo}

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-start sm:items-center mt-2">
                      <p className="text-xs text-gray-400">
                        Deadline: {item.deadline ? new Date(item.deadline).toLocaleString() : "No deadline"}
                      </p>

                      {item.deadline && (
                        <p className="text-xs text-red-500 font-medium">
                          {new Date(item.deadline) > new Date()
                            ? `⏳ ${Math.floor((new Date(item.deadline) - new Date()) / (1000 * 60))} min left`
                            : "❌ Deadline passed"}
                          <span style={{ display: "none" }}>{tick}</span> {/* trigger re-render */}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="button flex space-x-2 mt-2 sm:mt-0 flex-shrink-0">
                  <button
                    onClick={(e) => { handleEdit(e, item.id) }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors duration-200"
                  >
                    <RiEdit2Fill />
                  </button>
                  <button
                    name={item.id}
                    onClick={(e) => { handleDelete(e, item.id) }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors duration-200"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            )
          }
          )}
        </div>

          <hr className='mt-8' />

        {/* Progress Bar */}
        <div className='mb-10'>
          {todos.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-green-800 mb-2 text-center">
                📊 Your Progress
              </h2>

              <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-4 transition-all duration-700 ease-in-out ${progress === 100 ? "bg-blue-500" : "bg-green-500"
                    }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <p className="text-center mt-2 text-sm text-gray-700">
                {completedCount} of {todos.length} tasks completed ({Math.round(progress)}%)
              </p>
            </div>
          )}
        </div>



      </div>

      <Footer />


    </>
  )
}

export default App
