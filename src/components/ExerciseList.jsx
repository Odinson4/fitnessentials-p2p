import React, { useState } from 'react';
import WorkoutForm from './WorkoutForm';
import Button from "@mui/material/Button";
import '../ExerciseList.css'
// import Workout from "./Workout";

export default function ExerciseList({ exercises }) {
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Function to add the selected exercise to the workout form
  const addExerciseToForm = (exercise) => {
    // setSelectedExercise(exercise);
  };


  // Filter and sort the exercises based on the current options
  const filteredExercises = exercises.filter(exercise => {
    if (!filter) return true;
    return exercise.bodyPart === filter || exercise.target === filter;
  }).sort((a, b) => {
    if (!sort) return 0;
    if (sort === 'name') return a.name.localeCompare(b.name);
    return a[sort] - b[sort];
  });

  return (
    <div>
      <div>
        <WorkoutForm
          selectedExercise={selectedExercise}
        />
        <div>
          <label>Filter by:</label>
          <select onChange={e => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="arms">Arms</option>
            <option value="legs">Legs</option>
            <option value="back">Back</option>
            <option value="chest">Chest</option>
            <option value="shoulders">Shoulders</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>
        <div>
          <label>Sort by:</label>
          <select onChange={e => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="target">Target</option>
          </select>
        </div>
      </div>
      <div className='box' >

        {filteredExercises?.map(({ id, name, bodyPart, target, gifUrl }) => (
          <div key={id}>
            <div className='card' >
              <img src={gifUrl} alt={name} />
              <div>
                <h4>{name.toUpperCase()}</h4>
                <p>
                  Bodypart: {bodyPart.toUpperCase()}
                  <br />
                  Target: {target.toUpperCase()}
                  <br />
                </p>
                <div className='button'>
                  <Button size='large' onClick={() => {
                    setSelectedExercise({ id, name, sets: 3, reps: 10 });
                  }}>Add to Workout</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
