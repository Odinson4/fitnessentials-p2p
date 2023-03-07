import React from 'react';

const ExerciseListItem = ({ exercise, onAddToWorkout }) => {
  return (
    <div className="exercise-item">
      <div className="exercise-name">{exercise.name}</div>
      <div className="exercise-description">{exercise.description}</div>
      <button onClick={() => onAddToWorkout(exercise)}>Add to Workout</button>
    </div>
  );
}

export default ExerciseListItem;
