import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarView({ tasks }) {
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const taskDate = tasks.find(task =>
        task.dueDate && new Date(task.dueDate).toDateString() === date.toDateString()
      );
      return taskDate ? <p>{taskDate.title}</p> : null;
    }
    return null;
  };

  return (
    <div className="calendar-view">
      <h2>Calendar</h2>
      <Calendar tileContent={tileContent} />
    </div>
  );
}

export default CalendarView;