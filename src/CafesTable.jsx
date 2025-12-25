import { useState, useEffect } from 'react';

export default function CafeList() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await fetch('http://localhost:8070/cafes');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCafes(data.cafes); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCafes();
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

    return <div className='cafesTable'>
        <ul className="cardsList">
            {cafes.map(cafe => {
                return <li className="card">
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
}
