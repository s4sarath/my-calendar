import React, {
    useState,
    useEffect
} from 'react';
import './styles.css';
import moment from 'moment';

function App() {
    const startDate = new Date("2022-01-03"); // first Monday of 2022
    const endDate = new Date("2022-12-30"); // last Friday of 2022
    const [dates, setDates] = useState([]);
    const [images, setImages] = useState([]);
    // const [texts, setTexts] = useState({});

    useEffect(() => {
        let currentDate = startDate;
        const newDates = [];
        while (currentDate <= endDate) {
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                newDates.push({
                    date: currentDate,
                    image: null
                });
            }
            currentDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
        }
        setDates(newDates);
    }, [])


    // const readTextFile = file => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onload = event => {
    //             resolve(event.target.result);
    //         };
    //         reader.onerror = error => {
    //             reject(error);
    //         };
    //         reader.readAsText(file);
    //     });
    // };

    const readTextFile = async (fileName) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            }
            reader.onerror = (error) => {
                reject(error);
            }
            reader.readAsText(fileName);
        });
    };


    // const handleUpload = async event => {
    //     const files = event.target.files;
    //     const filesArray = Array.from(files);

    //     // const jpegFiles = Array.prototype.filter.call(files, (file) => file.name.endsWith('.jpg'));
    //     const newImages = [];
    //     for (let i = 0; i < files.length; i++) {
    //       const file = files[i];
    //       console.log(file)
    //       const date = moment(file.name.split('.')[0], 'DD-MM-YY').format('YYYY-MM-DD');
    //     //   let txtFile = file.name.replace(/\.[^/.]+$/, "") + ".txt";
    //     //   const txtFileObject = filesArray.find(file => file.name === txtFile);
    //     // //   console.log(txtFile, txtFileObject)
    //     // //   const txtFileObject = files.find(f => f.name === txtFile)
    //     let txtContent = "N/A";
    //     // //   if (txtFileObject) {
    //     // //     txtContent = await readTextFile(file);
    //     // //   }
    //       newImages.push({ date, file, txtContent });
    //     //   console.log(file.name, txtContent, date)

    //     setImages([...images, ...newImages]);

    //     setDates(dates.map(item => {
    //         const image = newImages.find(image => image.date === item.date);
    //         return { date: item.date, image: image ? image.file : null, txtContent: image ? image.txtContent : 'N/A' };
    //       }));

    //     }}


    const handleUpload = event => {
        const files = event.target.files;
        const newImages = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const date = moment(file.name, 'DD-MM-YY').toDate();
          let text = 'Something that is long line and we have to see the displaying inside the box'
          newImages.push({ date, file, text });
          console.log(file.name, date)
        }

        setImages([...images, ...newImages]);
        setDates(dates.map(item => {
          const image = newImages.find(image => image.date.toDateString() === item.date.toDateString());
          return { date: item.date, image: image ? image.file : null, text: image ? image.text : ''  };


        }));
      }



// return (
// <div className="container">
//     <h1 className="title">Image Gallery</h1>
//     <div className="upload-container">
//     <label htmlFor="file-upload">
//         <i className="fa fa-upload"></i>
//         Upload Images
//     </label>
//     <input id="file-upload" type="file" multiple onChange={handleUpload} />
//     </div>

//     {/* <div className="grid-container">
//     {dates.map((date, index) => (
//         <div key={index} className="grid-item">
//         <p>{date.date.toDateString()}</p>
//         {date.image && <img src={URL.createObjectURL(date.image)} alt={date.date.toDateString()}/>}
//         <div className="text-box">
//     <p>{date.text}</p>
//   </div>
//         </div>
//     ))}
//     </div> */}

// <div className="grid-container">
//     {dates.map((date, index) => (
//         <div key={index} className="grid-item">
//             <p>{date.date.toDateString()}</p>
//             {date.image && <img src={URL.createObjectURL(date.image)} alt={date.date.toDateString()}/>}
//             <div className="text-container">
//                 <p>{date.text}</p>
//             </div>
//         </div>
//     ))}
// </div>
// <div className="text-box">
//     {dates.map((date, index) => (
//         <div key={index} className="text-content">
//             <p>{date.text}</p>
//         </div>
//     ))}
// </div>



// </div>
// );

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
            <div className="text-box" >
              <p>{date.text}</p>
            </div>
          </div>
        ))}
</div>
    </div>
  );


 }
export default App;
