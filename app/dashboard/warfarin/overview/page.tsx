function getWeek() {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

  // Calculate the offset to Sunday (0) from the current day
  const sundayOffset = (currentDayOfWeek + 7 - 0) % 7;

  // Calculate the start date of the week (Sunday)
  const sundayDate = new Date(today);
  sundayDate.setDate(today.getDate() - sundayOffset);

  // Initialize an array to store the days of the week
  const weekDays = [];

  // Populate the array with the dates of the week
  for (let i = 0; i < 7; i++) {
    const date = new Date(sundayDate);
    date.setDate(sundayDate.getDate() + i);
    weekDays.push(
      date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    );
  }
  return weekDays;
}

export default function WarfarinOverview() {
  const weekDays = getWeek();

  return (
    <div>
      <h1 className="text-5xl font-bold mb-10 text-sky-700">
        Medication Overview
      </h1>
      <div>
        <h2>Current Week</h2>
        <ul>
          {weekDays.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
