import React, { useEffect, useState } from "react";

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/workouts")
      .then((response) => response.json())
      .then((data) => setWorkouts(data));
  }, []);

  const handleDeleteWorkout = (workout) => {
    fetch(`http://localhost:3000/workouts/${workout.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedWorkouts = workouts.filter((w) => w.id !== workout.id);
        setWorkouts(updatedWorkouts);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <h3>{workout.name}</h3>
            <ul>
              {workout.exercises.map((exercise) => (
                <li key={exercise.name}>
                  <p>{exercise.name.toUpperCase()}</p>
                  <p>Sets: {exercise.sets}</p>
                  <p>Reps: {exercise.reps}</p>
                </li>
              ))}
            </ul>
            <button onClick={() => handleDeleteWorkout(workout)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutList;
