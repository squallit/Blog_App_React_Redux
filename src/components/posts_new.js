import React, {Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {


  //field.input is an object including event handlers from Field
  //JSX syntax equal
  //onChange={field.input.onChange}
  //onFocus={field.input.onFocus}
  //onBlur={field.input.onBlur}
  renderField(field) {
    const {meta : {touched, error}} = field;
    //const meta = field.meta;
    //const touched = meta.touched;
    //const error = meta.error;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {field.meta.touched ? field.meta.error : ""}
        </div>
      </div>
    )
  }

  onSubmit(values) {

    this.props.createPost(values, ()=>this.props.history.push('/') );//redirect to index});
  }

  render() {
    //const handleSubmit = this.props.handleSubmit;
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Content"
          name="content"
          component={this.renderField}
        />
        <div className="btn-toolbar">
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </div>
      </form>
    )
  }
}

function validate(values) {
  //values:{title:'test',categories:'test',content:'content'}
  const errors = {};

  //validate inputs from values
  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.categories) {
    errors.categories = "Enter a category!";
  }
  if (!values.content) {
    errors.content = "Enter some content!";
  }

  //if errors are empty, the form is ok and ready to be submitted
  return errors;
}

export default reduxForm({
  validate:validate,
  form: "PostsNewForm"
})(
  connect(null,{createPost})(PostsNew)
);
