import React, { useEffect, useState } from "react";
import { MdFitnessCenter } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import "../WorkoutList.css";

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
    <div className="workout-list">
      <h2>My Workouts</h2>
      <ul>
        {workouts?.map((workout) => (
          <li key={workout.id} className="workout">
            <h3>
              <MdFitnessCenter className="icon" />
              {workout.name}
            </h3>
            <ul>
              {workout.exercises?.map((exercise) => (
                <li key={exercise.name} className="exercise">
                  <div className="name">

                    <h4>{exercise.name.toUpperCase()}</h4>
                    <p className="sets">
                      Sets:  {exercise.sets}
                    </p>
                    <br />
                    <p className="reps">
                      Reps: {exercise.reps}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={() => handleDeleteWorkout(workout)}>
              <BsTrash3Fill className="icon" /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutList;
