import { useState, useEffect } from 'react';
import FilterCafes from "./FilterCafes";

export default function CafeList() {
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [filter, setFilter] = useState('All'); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await fetch('http://localhost:8070/cafes');
        
        if (!response.ok) {
          throw new Error('HTTP error! status: ${response.status}');
        }
        
        const data = await response.json();
        setCafes(data.cafes);
        setFilteredCafes(data.cafes);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCafes();
  }, []); 

  // фильтруем
  useEffect(() => {
    if (filter === 'All') {
      setFilteredCafes(cafes);
    } else {
      const filtered = cafes.filter(cafe => cafe.subwayCode === filter);
      setFilteredCafes(filtered);
    }
  }, [filter, cafes]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div id="container" class="container m-3">
        <div className='cafesTable'>
            <FilterCafes onFilterChange={handleFilterChange}/>
            <ul className="cardsList">
                {filteredCafes.map(cafe => {
                    return <li className="card" key={cafe.id}>
                        <img src={cafe.img.length > 0 ? cafe.img : "https://via.placeholder.com/150"} alt={cafe.code} />
                        <h2>{cafe.name}</h2>
                        <p>{cafe.decs}</p>
                        <p>{cafe.address}</p>
                        <p>{cafe.subwayCode}</p>
                        <p>{cafe.workTime}</p>
                    </li>
                })}
            </ul>
        </div>
    </div>
}
