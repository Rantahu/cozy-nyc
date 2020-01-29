import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';

const PostForm = ({
  onSubmit, board, poster, thread
}) => (
  <Form
    onSubmit={values => onSubmit(values).then(() => {}, err => err)}
    initialValues={{ board, poster, thread }}
    render={({ handleSubmit }) => (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <Field name="image" type="file" component="input" label="image" />
        <Field name="message" type="textarea" component="input" label="message" />
        <button className="btn btn-success" type="submit">
          submit
        </button>
      </form>
    )}
  />
);

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  board: PropTypes.string.isRequired,
  poster: PropTypes.number.isRequired,
  thread: PropTypes.any.isRequired
};

export default PostForm;
