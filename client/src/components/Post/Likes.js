import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";
import PostContext from "../../context/post/postContext";
import { Button } from "reactstrap";
import AuthContext from "../../context/autenticacion/authContext";

function Likes(props) {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  const postContext = useContext(PostContext);

  const { likePost, unlikePost, allpost, publicaciones } = postContext;
  const checkedlike = (likes) => {
    let match = likes.includes(usuario._id);
    return match;
  };
  const [values, setvalues] = useState({
    likes: props.publicacion.likes.length,
    like: checkedlike(props.publicacion.likes),
  });

  const clicklike = (e) => {
    e.preventDefault();
    const postId = props.publicacion._id;

    if (values.like) {
      unlikePost({ postId: postId });
    } else {
      likePost({ postId: postId });
    }
  };

  useEffect(() => {
    setvalues({
      ...values,
      likes: props.publicacion.likes.length,
      like: checkedlike(props.publicacion.likes),
    });
  }, [publicaciones]);
  return (
    <>
      <div className="pull-left">
        {values.like ? (
          <Button size="sm" color="danger" onClick={clicklike}>
            <i className="fas fa-bone"></i>{" "}
          </Button>
        ) : (
          <Button size="sm" color="neutral" onClick={clicklike}>
            <i color="" className="fas fa-bone"></i>
          </Button>
        )}
        {values.likes}
      </div>
    </>
  );
}

export default Likes;
