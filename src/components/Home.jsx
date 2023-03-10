import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../Home.css'

export default function Home() {
  const [value, onChange] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendar, setCalendar] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);


  useEffect(() => {
    fetch("http://localhost:3000/workouts")
      .then((response) => response.json())
      .then((data) => setWorkouts(data));
  }, []);


  useEffect(() => {
    fetch("http://localhost:3000/calendar")
      .then((response) => response.json())
      .then((data) => setCalendar(data));
  }, []);


  const handleTileClick = (date, workout) => {
    setSelectedDate(date);
    setSelectedWorkout(workout);
  };


  const handleAddWorkout = (selectedWorkout) => {
    const dateKey = selectedDate.toLocaleDateString();
    const existingWorkout = calendar.find((workout) => new Date(workout.date).toLocaleDateString() === dateKey);

    if (existingWorkout) {
      // Update existing workout
      const updatedWorkouts = calendar.map((workout) => {
        if (workout === existingWorkout) {
          return {
            ...workout,
            name: selectedWorkout.name,
          };
        } else {
          return workout;
        }
      });
      setCalendar(updatedWorkouts);
    } else {
      // Add new workout
      const newWorkout = {
        date: selectedDate,
        name: selectedWorkout.name,
      };
      fetch("http://localhost:3000/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorkout),
      })
        .then((response) => response.json())
        .then((data) => {
          setCalendar([...calendar, data]);
        });
    }

    setSelectedDate(null);
  };



  const handleDeleteWorkout = (id) => {
    fetch(`http://localhost:3000/calendar/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedWorkouts = calendar.filter((w) => w.id !== id);
        setCalendar(updatedWorkouts);
      })
  };



  const tileContent = ({ date, view }) => {
    const dateKey = date.toLocaleDateString();
    const dateWorkouts = calendar.filter((workout) => new Date(workout.date).toLocaleDateString() === dateKey);

    if (view === "month") {
      if (selectedDate && selectedDate.toLocaleDateString() === dateKey) {
        const availableWorkouts = workouts.filter((workout) => new Date(workout.date).toLocaleDateString() !== dateKey);
        return (
          <div>
            {availableWorkouts?.map((workout) => (
              <div key={workout.id}>
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
              {dateWorkouts?.map((workout) => (
                <div key={workout.id}>
                  <div>{workout.name}</div>
                  <button onClick={() => handleTileClick(date, workout)}>Edit</button>
                  <button onClick={() => handleDeleteWorkout(workout.id)}>Delete</button>
                </div>
              ))}
            </div>
          );
        } else {
          return (
            <button onClick={() => handleTileClick(date, null)}>+</button>
          );
        }
      }
    } else {
      return null;
    }
  };



  return (
    <body className='home'>
      <div >
        <Calendar onChange={onChange} value={value} tileContent={tileContent} />
      </div>
    </body>

  );
};
