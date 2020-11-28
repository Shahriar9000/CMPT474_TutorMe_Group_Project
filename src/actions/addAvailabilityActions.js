import { FETCH_ADD_AVAILABILITY } from './types';


export  const  addAvailability = inputData =>  dispatch => {
  fetch('http://localhost:3000/addAvailability',{
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
      type: FETCH_ADD_AVAILABILITY,
      payload: data
    })
  );
  
};

export  const  reset = inputData =>  dispatch => {
  dispatch({
    type: FETCH_ADD_AVAILABILITY,
    payload: {}
  })
  
};
