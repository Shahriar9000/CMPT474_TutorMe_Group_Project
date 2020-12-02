import { FETCH_AVAILABILITY } from './types';


export  const  findAvailability = inputData =>  dispatch => {
    // fetch('https://15iwsfpdy6.execute-api.us-east-1.amazonaws.com/dev/appointment/getAvailability',{
    fetch('https://ksc2toqk8k.execute-api.us-east-1.amazonaws.com/dev/appointment/getAvailability',{
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
