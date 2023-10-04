import React from 'react';
import axios from 'axios';

export async function getData() {
    const res:any = await axios.get(`http://localhost:3000/api/about`)
      .then(respones => {
        return respones.data;
      })
      .catch(error => console.log(error));
    console.log(res);
    return res
  }
   
 