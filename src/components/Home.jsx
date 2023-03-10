import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../Home.css'

export default function Home() {

  // State variables for the current date and the list of workouts
  const [value, onChange] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);

  // State variables for the selected date, the list of workouts for that date, the selected workout, and the calendar
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendar, setCalendar] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Effect hook to fetch the list of workouts from the API
  useEffect(() => {
    fetch("http://localhost:3000/workouts")
      .then((response) => response.json())
      .then((data) => setWorkouts(data));
  }, []);

  // Effect hook to fetch the calendar from the API
  useEffect(() => {
    fetch("http://localhost:3000/calendar")
      .then((response) => response.json())
      .then((data) => setCalendar(data));
  }, []);

  // Function to handle clicking on a tile (date) on the calendar
  const handleTileClick = (date, workout) => {
    setSelectedDate(date);
    setSelectedWorkout(workout);
  };

  // Function to handle adding a workout to the calendar
  const handleAddWorkout = (selectedWorkout) => {
    // Get the date key (in the format "MM/DD/YYYY")
    const dateKey = selectedDate.toLocaleDateString();
    // Find an existing workout for that date
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

    // Clear the selected date
    setSelectedDate(null);
  };

  // Function to handle deleting a workout from the calendar
  const handleDeleteWorkout = (id) => {
    fetch(`http://localhost:3000/calendar/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedWorkouts = calendar.filter((w) => w.id !== id);
        setCalendar(updatedWorkouts);
      })
  };

  // Function to render the content of a calendar tile
  const tileContent = ({ date, view }) => {
    const dateKey = date.toLocaleDateString();
    // Get the list of workouts for the selected date
    const dateWorkouts = calendar.filter((workout) => new Date(workout.date).toLocaleDateString() === dateKey);

    if (view === "month") {
      // If the tile is in month view
      if (selectedDate &&
        selectedDate.toLocaleDateString() === dateKey) {
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
    <div className='home'>
      <div >
        <Calendar onChange={onChange} value={value} tileContent={tileContent} />
      </div>
    </div>

  );
};
