import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions';
import {Link} from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    //params (provided by react-router) contain all wildcards (:id,...) from
    //this link <Route path="/posts/:id" component={PostsShow} />
    const {id} = this.props.match.params; //es6 extract id out of params object
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const {id} = this.props.match.params;
    this.props.deletePost(id, () => this.props.history.push('/'));
  }

  render() {
    const {post} = this.props; //retrieve post = this.props.post

    if (!post) {
      return <div>Loading...</div>
    }


    return (
        <div>
          <Link to="/">Back To Index</Link>
          <button className="btn btn-danger pull-xs-right"
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete Post
          </button>
          <h3>{post.title}</h3>
          <h6>Categories: {post.categories}</h6>
          <p>{post.content}</p>
        </div>
    )
  }
}

function mapStateToProps({posts}, ownProps) { //extract posts from state; posts = state.posts
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps,{fetchPost, deletePost})(PostsShow);
