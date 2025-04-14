import React, { useState, useEffect } from "react";
import { FaDice, FaEdit, FaPlus, FaSave, FaTrash } from "react-icons/fa";

// Background images for the main page
const backgroundImages = [
 
 "ball-4393070_1280.jpg",
  "public/background-2734972_1920.jpg",
  "cricket-166794_1280.jpg",
  "cricket-8444899_1280.jpg"
];

// Background images for the quote section
const quoteBackgroundImages = [
  "public/man-1854195_1280.jpg",
  // "public/meadow-3712483_640.jpg",  

  "/morning-2243465_1280.jpg",
 
  "public/book-3969651_1280.jpg"
 
  
 
];

// Quotes array
const quotes = [
 
    "Believe in yourself.",
    "Every moment is a fresh beginning.",
   "“Reset. Refocus. Restart.”"
 
];

export default function App() {
  // State variables
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [bmiStatus, setBmiStatus] = useState("");
  const [bmiComment, setBmiComment] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("medium");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedPriority, setEditedPriority] = useState("medium");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const [quoteBgIndex, setQuoteBgIndex] = useState(0);
  const [dice, setDice] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submittedData, setSubmittedData] = useState([]);

  // Effect for changing the main background every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Effect for changing the quote and its background every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      setQuoteBgIndex((prevIndex) => (prevIndex + 1) % quoteBackgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask.trim(), priority }]);
      setNewTask("");
      setPriority("medium");
    }
  };

  // Function to delete a task
  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  // Function to start editing a task
  const startEdit = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
    setEditedPriority(tasks[index].priority);
  };

  // Function to save the edited task
  const saveEdit = (index) => {
    const updated = [...tasks];
    updated[index] = { text: editedTask, priority: editedPriority };
    setTasks(updated);
    setEditingIndex(null);
  };

  // Function to calculate BMI
  const calculateBMI = () => {
    if (!weight || !height) return;
    const h = height / 100;
    const result = (weight / (h * h)).toFixed(2);
    setBmi(result);

    // Determine BMI status and comment
    let status = "";
    let comment = "";

    if (result < 18.5) {
      status = "Underweight";
      comment = "You might need to eat a bit more!";
    } else if (result >= 18.5 && result < 25) {
      status = "Normal weight";
      comment = "Great job! Keep it up!";
    } else if (result >= 25 && result < 30) {
      status = "Overweight";
      comment = "Time to hit the gym!";
    } else {
      status = "Obese";
      comment = "Consult a healthcare provider.";
    }

    setBmiStatus(status);
    setBmiComment(comment);
  };

  // Function to handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmittedData((prev) => [...prev, formData]);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  // Styles for the main background
  const bgStyle = {
    backgroundImage: `url(${backgroundImages[bgIndex]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "background-image 1s ease-in-out"
  };

  // Styles for the quote section background
  const quoteBgStyle = {
    backgroundImage: `url(${quoteBackgroundImages[quoteBgIndex]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "background-image 1s ease-in-out"
  };

  const priorityColors = {
    Today: "bg-red-200 border-red-500",
    Tommorow: "bg-yellow-200 border-yellow-500",
    Later: "bg-green-200 border-green-500"
  };
  

  return (
    <div className="min-h-screen p-6 transition-all duration-1000" style={bgStyle}>
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-5xl font-bold text-center text-white drop-shadow-lg">✨ Welcome to the World of TASKS</h1>

        {/* To-Do List */}


        <div className="min-h-[800px] bg-white/80 p-6 rounded-2xl backdrop-blur text-black text-center">
          <h2 className="text-3xl mt-50 font-semibold mb-6">📝 To-Do List</h2>
          <div className="flex flex-col mt-10 md:flex-row justify-center items-center gap-4">
            <input value={newTask} onChange={(e) => setNewTask(e.target.value)} className="p-3 w-full md:w-1/2 rounded bg-gray-100 text-black" placeholder="Add task..." />
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="p-3 rounded bg-gray-200">
              <option value="Today">🔴 Today</option>
              <option value="Tommorow">🟡 Tommorow</option>
              <option value="Later">🟢 Later</option>
            </select>
            <button onClick={addTask} className="bg-blue-500 hover:bg-blue-600 p-3 rounded text-white">
              <FaPlus />
            </button>
          </div>

          <div className="mt-6 space-y-4 max-w-2xl mx-auto">
            {tasks.map((task, i) => (
              <div key={i} className={`flex justify-between items-center p-4 border-2 rounded-xl ${priorityColors[task.priority]}`}>
                {editingIndex === i ? (
                  <>
                    <input value={editedTask} onChange={(e) => setEditedTask(e.target.value)} className="flex-grow bg-white border px-3 py-1 rounded mr-2" />
                    <select value={editedPriority} onChange={(e) => setEditedPriority(e.target.value)} className="mr-2 bg-white px-2 py-1 border rounded">
                      <option value="Today">Today</option>
                      <option value="Tommorow">Tommorow</option>
                      <option value="Later">Later</option>
                    </select>
                    <button onClick={() => saveEdit(i)} className="text-green-600 mr-2"><FaSave /></button>
                  </>
                ) : (
                  <>
                    <span className="flex-grow text-left">{task.text}</span>
                    <button onClick={() => startEdit(i)} className="text-blue-600 mr-2"><FaEdit /></button>
                  </>
                )}
                <button onClick={() => deleteTask(i)} className="text-red-600"><FaTrash /></button>
              </div>
            ))}
          </div>
        </div>





        {/* Advanced BMI */}

        <div className="min-h-[800px] bg-white/80 p-8 rounded-2xl backdrop-blur text-black">
          <h2 className="text-3xl font-semibold md:ml-80 sm:ml-30 mt-5 mb-60">⚖️ Advanced BMI Checker</h2>
          <div className="grid md:grid-cols-2 gap-6"> <h1 className="absolute top-70 left-40 font-bold text-2xl">Check Your BMI</h1>
            <div className="space-y-4">
              <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-3 rounded border border-gray-300" />
              <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-3 rounded border border-gray-300" />
              <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-3 rounded border border-gray-300" />
              <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-3 rounded border border-gray-300">
                <option value="male">👨 Male</option>
                <option value="female">👩 Female</option>
                <option value="other">⚧️ Other</option>
              </select>
              <button onClick={calculateBMI} className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded font-bold">
                Calculate BMI
              </button>
            </div>
            {bmi && (
              <div className="bg-gradient-to-br from-sky-100 to-white p-6 rounded-xl shadow-md text-center space-y-4 transition-all">
                <p className="text-4xl font-bold text-sky-700">Your BMI: {bmi}</p>
                <p className="text-xl font-semibold text-gray-700">{bmiStatus}</p>
                <p className="italic text-gray-500">{bmiComment}</p>
              </div>
            )}
          </div>
        </div>





        {/* Quote of the Minute with background */}
        <div className="min-h-[800px] p-6 rounded-2xl backdrop-blur text-white text-center shadow-2xl" style={quoteBgStyle}>
          <h2 className="text-3xl font-semibold mb-4">🧘 Quote of the Minute</h2>
          <p className="text-2xl italic font-medium">"{quotes[quoteIndex]}"</p>
        </div>




        {/* Dice Roller */}

        <div className="min-h-[800px] bg-white/80 p-6 rounded-2xl backdrop-blur text-black text-center">
          <h2 className="text-3xl font-semibold mb-4 mt-50">🎲 Dice Roller</h2>
          <img src={`public/0${dice}.png`} alt={`Dice ${dice}`} className="w-32 h-32 mx-auto mb-4" />
          <h1 className="mb-5 font-bold">{dice}</h1>
          <button onClick={() => setDice(Math.ceil(Math.random() * 6))} className="bg-purple-500 px-8 py-3 rounded cursor-pointer text-white hover:bg-purple-600">
            <FaDice className="inline mr-2" />
            Roll Dice
          </button>
        </div>




        {/* Form Task */}

        <div className="min-h-[800px] bg-gradient-to-br from-white/80 to-sky-100 p-8 rounded-2xl shadow-2xl text-black">
          <h2 className="text-4xl font-bold mb-10 mt-30 text-center text-sky-700">📬 Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {["name", "email", "message"].map((field) => (
                <div key={field} className="relative">
                  {field !== "message" ? (
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleFormChange}
                      className="peer w-full px-4 pt-6 pb-2 text-lg border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                      placeholder=" "
                      required
                    />
                  ) : (
                    <textarea
                      name={field}
                      value={formData[field]}
                      onChange={handleFormChange}
                      className="peer w-full px-4 pt-6 pb-2 text-lg border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all min-h-[120px]"
                      placeholder=" "
                      required
                    />
                  )}
                  <label className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                </div>
              ))}
              <button
                type="submit"
                className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-md hover:opacity-90 transition duration-300"
              >
                Submit
              </button>
            </form>
            <div className="space-y-6">
              {submittedData.length === 0 ? (
                <div className="text-gray-400 italic text-center">No submissions yet.</div>
              ) : (
                submittedData.map((entry, index) => (
                  <div key={index} className="relative border-l-4 border-sky-400 bg-white rounded-xl p-6 shadow-md transition hover:shadow-lg">
                    <div className="absolute -left-6 top-6 text-2xl text-sky-400">💬</div>
                    <div className="pl-4">
                      <p className="text-xl font-bold text-gray-800 mb-2">{entry.name}</p>
                      <p className="text-gray-500 mb-1">📧 {entry.email}</p>
                      <p className="text-gray-600 italic">“{entry.message}”</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>



        
{/* Thank You Mentor Section */}

<div className="min-h-[800px] bg-gradient-to-br from-purple-100 to-blue-100 p-10 rounded-2xl shadow-2xl text-center text-gray-800">
  <h2 className="text-4xl font-bold mt-7 mb-30  text-purple-800"> Thank You, Mentor</h2>
  <div className="flex flex-col md:flex-row items-center justify-center gap-10">
    <img
      src="https://media.licdn.com/dms/image/v2/D5603AQEwZazb2P_ugA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1686715141711?e=1750291200&v=beta&t=Rk4qgdJvp_7nCCSuI8rRGibM1iQwenA6mVf9OOlqajA" // <- Place your mentor's image in the public folder with this name
      alt="Mentor"
      className="w-60 h-60 object-cover rounded-full  border-purple-400 shadow-lg"
    />
    <div className="text-left space-y-4 max-w-xl">
      <h3 className="text-3xl font-semibold text-purple-700">Hanumanthu Buddha</h3>
      <p className="text-lg italic">
        “A true mentor is not someone who tells you what to do, but someone who shows you how to be.”
      </p>
      <ul className="list-disc pl-5 text-md text-gray-700">
        <li>Web Developer, Technical Hub </li>
        <li>Web Devlopment Mentor</li>
        <li>Colours Aditya Website Devloper</li>
        <li>Visionary Teacher</li>
      </ul>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}
