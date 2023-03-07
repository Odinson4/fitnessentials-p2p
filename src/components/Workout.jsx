import React from "react";

export default function Workout({ workout }) {
  return (
    <div className="workout">
      <h3>{workout.name}</h3>
      {workout.exercises.map((exercise, index) => (
        <div key={index}>
          <h4>{exercise.name}</h4>
          <p>Sets: {exercise.sets}</p>
          <p>Reps: {exercise.reps}</p>
        </div>
      ))}
    </div>
  );
}
