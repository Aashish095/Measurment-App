import { useState } from 'react';
import { getMeasurements } from './api';

export default function Home() {
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [waistMeasurement, setWaistMeasurement] = useState('');
  const [measurements, setMeasurements] = useState([]);
  const [errorMessage,setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { height, age, weight, waist_measurement: waistMeasurement };
    try{
      const response = await getMeasurements(data);
      if(response.status === 200){
        if(response.data.waist_measurements){
            setMeasurements(response.data.waist_measurements)
            setErrorMessage('');
        }

      }else{

        setMeasurements([]);
        setErrorMessage('Invalid input')
      }
    }catch(error){

      setMeasurements([]);
      setErrorMessage('Server Error');
    }


    };

  return (
    <div className="container">
      <div className="result"
      >
         {errorMessage ?(
          <p  className="error">{errorMessage}</p>
      ):(
          measurements.length > 0 ?(
            measurements.map((measurement) => (
          <p key={measurement}>Waist Measurement: {measurement}</p>
        ))
            ):(
                <p className="no-results"></p>
            )
      )}
      </div>

      <form onSubmit={handleSubmit} className="form">
         <h2 className="form-title">Calculate Your Waist Measurement</h2><br/>
        <div className="form-group">
          <label className="form-label">
          Height:
          <input type="text" className="form-input"  value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        </div>

        <div className="form-group">
          <label className="form-label">
          Age:
          <input type="text" className="form-input" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        </div>

        <div className="form-group">
          <label className="form-label">
          Weight:
          <input type="text" className="form-input"  value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        </div>

        <div className="form-group">
          <label className="form-label">
          Waist Measurement:
          <input
               className="form-input"
            type="text"
            value={waistMeasurement}
            onChange={(e) => setWaistMeasurement(e.target.value)}
          />
        </label>
        </div>

        <button  className="btn-submit" type="submit">Submit</button>
      </form>


    </div>
  );
}
