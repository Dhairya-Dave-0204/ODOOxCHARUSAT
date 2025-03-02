import React from 'react'
import axios from 'axios'
function Button() {
    const email = sessionStorage.getItem("email");



const onSubmitHandler = async() => {
    console.log("1")
    const response = await axios.post("http://localhost:8080/api/reports/generate",{
        params : { email}
    });


}    
  return (
    <button type='submit' onClick={onSubmitHandler}>Button</button>
  )
}

export default Button