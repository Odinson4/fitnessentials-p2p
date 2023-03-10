import React, { useState, useEffect } from 'react';
import ExerciseList from './components/ExerciseList';
import Button from "@mui/material/Button";
import Home from './components/Home';
import WorkoutList from './components/WorkoutList';
import './index.css';
import { Route, NavLink, Routes } from 'react-router-dom';

export default function App() {
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/exercises")
      .then((r) => r.json())
      .then(setExercises);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/workouts")
      .then((r) => r.json())
      .then(setWorkouts);
  }, []);

  return (
    <div>
      <nav className='navbar'>
        <NavLink to="/" className="active-link">
          <Button>
            Home
          </Button>
        </NavLink>

        <NavLink to="/exerciselist" className="active-link">
          <Button>
            Exercise List
          </Button>
        </NavLink>

        <NavLink to="/workoutlist" className="active-link">
          <Button>
            Workout List
          </Button>
        </NavLink>
        <span className='title'>FITNESSENTIALS</span>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/exerciselist" element={<ExerciseList exercises={exercises} setExercises={setExercises} />} />

        <Route exact path="/workoutlist" element={<WorkoutList workouts={workouts} exercises={exercises} />} />
      </Routes>
    </div>
  );
}
