import './App.css';
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

function App() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch('products.json', {
      crossDomain: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Basic ZXNfZGV2X29mZXJ0aWE6VVpXbW1IMkhSV3g1',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson.offer);
        setData(myJson.offer);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className='header'> Cashback Products</div>
      <div className='grid auto-fill'>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <div key={item.displayName}>
              <div>
                <b>
                  {item.brand.name} -{' '}
                  {item.offerProductCategories.offerProductCategory[0].name}
                </b>
              </div>
              <div>{item.displayName}</div>

              <div>
                {format(parseISO(item.startOn), 'dd/MM/yyyy')} -{' '}
                {format(parseISO(item.endOn), 'dd/MM/yyyy')}
              </div>
              <img src={item.imageUrl} alt={item.displayName} />
              <div className='price'>{item.displayValue}</div>
              <div>{item.limit.individual.quantity} ud/usuario</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
