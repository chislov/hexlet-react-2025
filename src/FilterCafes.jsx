export default function ({onFilterChange}) {
  const cafeLocations = [
    {
        name: "Арбатская",
        code: "Arbat"
    },
    {
        name: "Александровский сад",
        code: "Alexanders Garden"
    },
    {
        name: "Московская",
        code: "Moscow"
    },
    {
        name: "Парк Культуры",
        code: "Culture"
    },
    {
        name: "Театральная",
        code: "Theatr"
    }
  ];

  const handleChange = (e) => {
    onFilterChange(e.target.value);
  }
    
    return (
        <div class="controls">
            <select name="subway" id="subway" onChange={handleChange}>
                <option value="All" selected>Все</option>
                {cafeLocations.map((location) => (
                    <option key={location.code} value={location.code}>{location.name}</option>
                ))}
            </select>
        </div>
    )
}
