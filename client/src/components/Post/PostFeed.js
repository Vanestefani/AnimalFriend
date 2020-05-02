import { connect } from 'react-redux';
import PostList from './PostList';
import {
  addComment,
  deleteComment,
  editComment,
  deletePost,
  getPosts,
  editPost,
  updatePostLikes
} from '../../actions/postsActions';

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  user: state.authReducer.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);