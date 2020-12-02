import { FETCH_LOCATION } from './types';


export  const findTeachers = inputData => dispatch => {
  // fetch('https://thbrt8c830.execute-api.us-east-1.amazonaws.com/dev/getTutor/' + inputData, {
  fetch('https://ksc2toqk8k.execute-api.us-east-1.amazonaws.com/dev/getTutor/{location}' + inputData, {

    method: 'GET'
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: FETCH_LOCATION,
        payload: data
      })

    );
    
};


export  const findStudents = inputData => dispatch => {
  fetch('https://ksc2toqk8k.execute-api.us-east-1.amazonaws.com/dev/getStudent/{location}' + inputData, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: FETCH_LOCATION,
        payload: data
      })

    );
    
};
