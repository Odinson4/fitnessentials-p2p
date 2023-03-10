import React, { useState } from 'react';


export default function WorkoutForm({ selectedExercise, onSubmit }) {
  const [exercises, setExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState('');

  function addExercise() {
    setExercises([...exercises, selectedExercise]);
  };

  function removeExercise(id) {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  function updateExercise(id, field, value) {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === id) {
          return { ...exercise, [field]: value };
        }
        return exercise;
      })
    );
  };

  function handleNameChange(event) {
    setWorkoutName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const workout = {
      name: workoutName,
      exercises: exercises.map(({ name, sets, reps }) => ({ name, sets, reps }))
    };

    try {
      const response = await fetch('http://localhost:3000/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workout)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setExercises([]);
      setWorkoutName('');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <label>
        Workout Name:
        <input type="text" value={workoutName} onChange={handleNameChange} />
      </label>
      {selectedExercise && (
        <div>
          <h3>Add Exercise:</h3>
          <p>
            {selectedExercise.name.toUpperCase()}
          </p>
          <button type="button" onClick={addExercise}>
            Add
          </button>
        </div>
      )}
      {exercises.length > 0 && (
        <div>
          <h3>Exercises:</h3>
          <ul>
            {exercises.map((exercise) => (
              <li key={exercise.id}>
                <div>{exercise.name.toUpperCase()}</div>
                <div>
                  <label>
                    Sets:
                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(event) =>
                        updateExercise(exercise.id, 'sets', parseInt(event.target.value))
                      }
                    />
                  </label>
                  <label>
                    Reps:
                    <input
                      type="number"
                      value={exercise.reps}
                      onChange={(event) =>
                        updateExercise(exercise.id, 'reps', parseInt(event.target.value))
                      }
                    />
                  </label>
                  <button type="button" onClick={() => removeExercise(exercise.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button onSubmit={onSubmit} type="submit">Save Workout</button>
        </div>
      )}
    </form>
  );
}
