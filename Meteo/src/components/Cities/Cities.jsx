import { nanoid } from "nanoid";

const Cities = ({ list = [] }) => {
    console.log(list)
  return (
    <table>
      <thead>
        <tr>
          <th>Nom de la ville</th>
          <th>Température</th>
          <th>Description météo</th>
          <th>Représentation</th>
        </tr>
      </thead>
      <tbody>
        {list.map((city) => (
          <tr key={nanoid()}>
            <td>{city.city}</td>
            <td>
              {city.temp.toLocaleString("fr-FR", {
                style: "unit",
                unit: "celsius",
              })}
            </td>
            <td>{city.weather.description}</td>
            <td>
              {" "}
              <img
                src={`https:/openweathermap.org/img/w/${city.weather.icon}.png`}
                alt={city.weather.description}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Cities;
