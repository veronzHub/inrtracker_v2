"use client";
export default function WarfarinTable({ warfarinDosages }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          {warfarinDosages.map((item) => (
            <RowData key={item.start_date} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RowData({ item }) {
  return (
    <tr>
      <td>{item.start_date}</td>
      {item.days.map((day) => {
        {
          console.log(day);
        }
        return (
          <td key={day.day}>
            {day.doses.map((dose, index) => (
              <p key={index}>
                {dose.dose} pills ({dose.strength}mg)
              </p>
            ))}
          </td>
        );
      })}
    </tr>
  );
}
