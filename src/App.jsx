import React, { useState, useEffect } from 'react';
import ExerciseList from './components/ExerciseList';
import WorkoutForm from './components/WorkoutForm';
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
      <nav>
        <NavLink to="/" className="active-link">
          Home
        </NavLink>

        <NavLink to="/exerciselist" className="active-link">
          Exercise List
        </NavLink>

        <NavLink to="/workoutlist" className="active-link">
          Workout List
        </NavLink>

        <NavLink to="/workoutform" className="active-link">
          Create Workout
        </NavLink>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/exerciselist" element={<ExerciseList exercises={exercises} setExercises={setExercises} />} />

        <Route exact path="/workoutlist" element={<WorkoutList workouts={workouts} exercises={exercises} />} />

        <Route exact path="/workoutform" element={<WorkoutForm exercises={exercises} setExercises={setExercises} />} />
      </Routes>
    </div>
  );
}
