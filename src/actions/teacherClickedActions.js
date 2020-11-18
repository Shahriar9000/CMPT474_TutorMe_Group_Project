import { FETCH_TEACHER_CLICKED } from './types';


export  const findTeacherClicked = inputData => dispatch => {

  fetch('https://kzas28fxv0.execute-api.us-east-1.amazonaws.com/dev/getTutor/username/' + inputData, {

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

  fetch('https://kzas28fxv0.execute-api.us-east-1.amazonaws.com/dev/getStudent/username/' + inputData, {

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
