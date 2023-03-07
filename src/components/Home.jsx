import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Home() {
  const [value, onChange] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);


  useEffect(() => {
    fetch("http://localhost:3000/workouts")
      .then((response) => response.json())
      .then((data) => setWorkouts(data));
  }, []);

  const handleTileClick = (date) => {
    setSelectedDate(date);
  };


  const handleAddWorkout = (selectedWorkout) => {
    const dateKey = selectedDate.toLocaleDateString();
    const existingWorkout = workouts.find((workout) => new Date(workout.date).toLocaleDateString() === dateKey);

    if (existingWorkout) {
      // Update existing workout
      const updatedWorkouts = workouts.map((workout) => {
        if (workout === existingWorkout) {
          return {
            ...workout,
            name: selectedWorkout.name,
          };
        } else {
          return workout;
        }
      });
      setWorkouts(updatedWorkouts);
    } else {
      // Add new workout
      const newWorkout = {
        date: selectedDate,
        name: selectedWorkout.name,
      };
      setWorkouts([...workouts, newWorkout]);
    }

    setSelectedDate(null);
  };



  const tileContent = ({ date, view }) => {
    const dateKey = date.toLocaleDateString();
    const dateWorkouts = workouts.filter((workout) => new Date(workout.date).toLocaleDateString() === dateKey);
    console.log(dateWorkouts)
    if (view === "month") {
      if (selectedDate && selectedDate.toLocaleDateString() === dateKey) {
        const availableWorkouts = workouts.filter((workout) => new Date(workout.date).toLocaleDateString() !== dateKey);
        return (
          <div>
            {availableWorkouts.map((workout) => (
              <div>
                <div>{workout.name}</div>
                <button onClick={() => handleAddWorkout(workout)}>Add</button>
              </div>
            ))}
          </div>
        );
      } else {
        if (dateWorkouts.length > 0) {
          return (
            <div>
              {dateWorkouts.map((workout) => (
                <div>
                  <div>{workout.name}</div>
                  <button onClick={() => handleTileClick(date)}>Edit</button>
                </div>
              ))}
            </div>
          );
        } else {
          return (
            <button onClick={() => handleTileClick(date)}>+</button>
          );
        }
      }
    }
  };

  return (
    <div>
      <Calendar onChange={onChange} value={value} tileContent={tileContent} />
    </div>
  );
};
