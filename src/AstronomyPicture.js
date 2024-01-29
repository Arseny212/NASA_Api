import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AstronomyPicture = () => {
  const [apodData, setApodData] = useState(null);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [loading, setLoading] = useState(false);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    
    return `${year}-${month}-${day}`;
  }

  const fetchData = async (date) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=USqikwakkGK0FrEtjyfmFRHM18WEIpvZe2avq7az&date=${date}`);
      setApodData(response.data);
    } catch (error) {
      console.error('Ошибка получения картинки:', error);
      setError('Ошибка получения данных');
    } finally {setLoading(false);}
  };

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const showPicture = () => {
    fetchData(selectedDate);
  };

  return (
    <div>
      <style>
        {`
          body {background-color: rgba(240, 255, 253, 0.9);}
        `}
      </style>
      <h1>Картинка дня НАСА</h1>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          {apodData && apodData.url ? (
            <>
              <img
                src={apodData.url}
                alt={apodData.title}
                style={{ maxWidth: '100%', borderRadius: '10px', marginTop: '20px' }}
              />
              <p>{apodData.title}</p>
              <p>{apodData.explanation}</p>
            </>
          ) : (
            <p>Ошибка получения данных от НАСА</p>
          )}
          {error && <p>Ошибка: {error}</p>}
        </>
      )}
      <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <label htmlFor="datePicker" style={{ color: 'white', marginRight: '10px' }}>Выберите дату:</label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
          max={new Date().toISOString().split('T')[0]}
          style={{
            padding: '8px',
            borderRadius: '15px',
            border: '2px solid #2196F3',
            backgroundColor: '#2196F3',
            color: 'white',
            marginRight: '10px',
          }}
        />
        <button
          onClick={showPicture}
          style={{
            padding: '8px',
            borderRadius: '15px',
            border: '2px solid #2196F3',
            backgroundColor: '#2196F3',
            color: 'white',
            marginRight: '10px',
          }}>Показать
        </button>
      </div>
    </div>);};

export default AstronomyPicture;