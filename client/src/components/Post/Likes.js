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

  const { getlikes, likePost, unlikePost, likes } = postContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    getlikes();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (likes.includes(usuario._id)) {
      likePost(props.publicacion._id);

      getlikes();
    } else {
      unlikePost(props.publicacion._id);
      getlikes();
    }
  };
  return (
    <>
      <div className="pull-left">
        {likes.includes(usuario._id) ? (
          <Button size="sm" color="neutral" onClick={handleSubmit}>
            <i className="fas fa-bone"></i>{" "}
          </Button>
        ) : (
          <Button size="sm" color="neutral" onClick={handleSubmit}>
            <i color="danger" className="fas fa-bone"></i>
          </Button>
        )}
        {props.publicacion.likes.length} personas les gusto
      </div>
    </>
  );
}

export default Likes;
