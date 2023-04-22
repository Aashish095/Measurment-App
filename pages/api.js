import axios from 'axios';

export const getMeasurements = async(data)=>{
    try{
        const response = await axios.post('http://127.0.0.1:5000/measurements',data);
        console.log(response)
        return response;
    }catch (err){
        console.error(err);
        return err.response
    }
}