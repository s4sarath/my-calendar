import React, { useState, useEffect } from 'react';
import './styles.css';
import moment from 'moment';

function App() {
  const startDate = new Date("2022-01-03"); // first Monday of 2022
  const endDate = new Date("2022-12-30"); // last Friday of 2022
  const [dates, setDates] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    let currentDate = startDate;
    const newDates = [];
    while (currentDate <= endDate) {
      if(currentDate.getDay() !== 0 && currentDate.getDay() !== 6){
        newDates.push({ date: currentDate, image: null });
      }
      currentDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
    }
    setDates(newDates);
  }, [])


//   const handleUpload = event => {
//     const files = event.target.files;
//     const newImages = [];
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];

//       let fileName = file.name.split(".")[0];
//       let date = moment(fileName, "DD-MM-YY");

//     //   let day = file.name.substring(0,2);
//     //   let month = file.name.substring(3,5);
//     //   let year = file.name.substring(6,8);
//     //   let date = new Date(year + '-' + month + '-' + day);
//       console.log(file.name);
//       console.log(date);
//       newImages.push({ date, file });
//     }
//     setImages([...images, ...newImages]);
//     setDates(dates.map(item => {
//       const image = newImages.find(image => image.date.toDateString() === item.date.toDateString());
//       return { date: item.date, image: image ? image.file : null };
//     }));
//   }

const handleUpload = event => {
    const files = event.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const date = moment(file.name, 'DD-MM-YY').toDate();
      newImages.push({ date, file });
      console.log(file.name, date)
    }

    setImages([...images, ...newImages]);
    setDates(dates.map(item => {
      const image = newImages.find(image => image.date.toDateString() === item.date.toDateString());
      return { date: item.date, image: image ? image.file : null };
    }));
  }


  return (
    <div className="container">
      <h1 className="title">Image Gallery</h1>
      <div className="upload-container">
        <label htmlFor="file-upload">
          <i className="fa fa-upload"></i>
          Upload Images
        </label>
        <input id="file-upload" type="file" multiple onChange={handleUpload} />
      </div>
      <div className="grid-container">
        {dates.map((date, index) => (
          <div key={index} className="grid-item">
            <p>{date.date.toDateString()}</p>
            {date.image && <img src={URL.createObjectURL(date.image)} alt={date.date.toDateString()}/>}
          </div>
        ))}
      </div>
    </div>
  );

        }

        export default App;

