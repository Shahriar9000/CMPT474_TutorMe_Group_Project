import { FETCH_AVAILABILITY } from './types';


  export  const  findAvailability = inputData =>  dispatch => {
    fetch('http://localhost:3000/getAvailability',{
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(inputData)
  })
    .then(
      res => res.json())
    .then( data =>
      dispatch({
        type: FETCH_AVAILABILITY,
        payload: data
      })
    );
    
};

export  const  reset = inputData =>  dispatch => {
  dispatch({
    type: FETCH_AVAILABILITY,
    payload: {}
  })
  
};
