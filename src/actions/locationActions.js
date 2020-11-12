import { FETCH_LOCATION } from './types';


export  const findTeachers = inputData => dispatch => {
  fetch('http://localhost:3000/getTeacher/' + inputData, {
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
  fetch('http://localhost:3000/getStudent/' + inputData, {
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
