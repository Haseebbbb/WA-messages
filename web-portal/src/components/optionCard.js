import  React, {useState } from "react";
import Papa from "papaparse"
import "../styles.css";
const axios = require('axios');


const OptionCard = () => {
  const [file, fileUpdate] = useState(null);
  const [data, dataUpdate] = useState([])
  const [message, messageUpdate] =useState('')

  const onChangeFile = (event) => {
    fileUpdate(event.target.files[0]);
    console.log(file)
  };

  const uploadFiles = async() => {
    console.log("1",file)
    try{
    Papa.parse(file,{
      header: false,
      complete: async(results) => {
        var numbers = Object.values(results)
        numbers = numbers[0]
        numbers = numbers.flat()
        dataUpdate(numbers)
      },})
    }
    catch(err){
      console.log(err)

    }
};

const onMessageUpdate = async(e) => {
  messageUpdate(e.target.value)
}

const sendMessage =async()=>{
  axios.post('http://localhost:5000/send-messages', {
    message: message,
    phoneNumbers: data
  }, {
    headers: {
      "Content-Type": "application/json",
    }},).then(function (response) {
    console.log(response);
  })

}

  return(
    <div>
      <div className="card option-card container-fluid">
        <div className="card-body">
          <form>
            <label
              className="form-label"
              style={{ color: "black",fontSize:"1rem", fontWeight: "600", marginBottom:"0px" }}
            >
              Phone numbers
            </label>
            <p style={{fontSize:"0.7rem"}}>
              Upload CSV file with phone numbers
            </p>
            <input
              className="form-control"
              type="file"
              name="myImage"
              style={{ backgroundColor: "white", color: "black", marginBottom : "0.5rem"
            }}
              onChange={onChangeFile}
              required
            />
            <div style={{ marginTop: 5 }}>
              <button
                variant="outlined"
                style={{
                  width: "20%",
                  backgroundColor: "#3B8AC4",
                  color: "#FFFFFF",
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                  fontWeight: 500,
                  marginBottom : "1rem"
                }}
                type="button"
                onClick={(e) => uploadFiles(e)}
              >
                Upload
              </button>
              <h6>Message</h6>
              <textarea id="w3review" onChange={onMessageUpdate} name="w3review" rows="4" cols="50"/>
              <br/>
              <input type="button" onClick={sendMessage} value="Send" style={{
                  width: "20%",
                  backgroundColor: "#3B8AC4",
                  color: "#FFFFFF",
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                  fontWeight: 500,
                }}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OptionCard;
