import React, { useState } from 'react';
import moment from 'moment';
import './styles.css';

function App() {
  const [images, setImages] = useState({});
  const [texts, setTexts] = useState({});

  const handleUpload = async event => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const date = moment(file.name.split('.')[0], 'DD-MM-YY').format('YYYY-MM-DD');
      if (file.name.endsWith('.txt')) {
        const text = await readTextFile(file);
        setTexts(texts => ({ ...texts, [date]: text }));
      } else {
        setImages(images => ({ ...images, [date]: file }));
      }
    }
  }

  const readTextFile = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => {
            resolve(event.target.result);
        };
        reader.onerror = error => {
            reject(error);
        };
        reader.readAsText(file);
    });
  };

  const firstMonday = moment('2022-01-03', 'YYYY-MM-DD');
  const lastFriday = moment('2022-12-30', 'YYYY-MM-DD');
  const days = [];
  let day = firstMonday;
  while (day.isSameOrBefore(lastFriday)) {
    days.push(day.format('YYYY-MM-DD'));
    day = day.clone().add(1, 'd');
  }

  return (
    <div className="container">
      <h1 className="title">Image Gallery</h1>
      <div className="upload-container">
        <label htmlFor="file-upload">
          <i className="fa fa-upload"></i>
          Upload Images and Texts
        </label>
        <input id="file-upload" type="file" multiple onChange={handleUpload} />
      </div>
      <div className="grid-container">
        {days.map((day, index) => (
          <div key={index} className="grid-item">
            {images[day] && <img src={URL.createObjectURL(images[day])} alt={day}/>}
            {texts[day] && (
              <div className="text-box">
              <p>{texts[day]}</p>
              </div>
              )}
              <p>{day}</p>
              </div>
              ))}
              </div>
              </div>
              );
              }

export default App;
