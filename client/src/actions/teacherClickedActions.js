import { FETCH_TEACHER_CLICKED } from './types';


export  const findTeacherClicked = inputData => dispatch => {
  fetch('http://localhost:3000/getTeacher/username/' + inputData, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: FETCH_TEACHER_CLICKED,
        payload: data
      })

    );
    
};

export  const findStudentClicked = inputData => dispatch => {
  fetch('http://localhost:3000/getStudent/username/' + inputData, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: FETCH_TEACHER_CLICKED,
        payload: data
      })

    );
    
};

export  const  resetClickedTeacher = inputData =>  dispatch => {
  dispatch({
    type: FETCH_TEACHER_CLICKED,
    payload: {}
  })
};
