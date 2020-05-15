import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";

function PostList(props) {
  if (props.publicaciones.length === 0)
    return <p>No hay publicaciones, sigue a alguien :3</p>;

  return (
    <>
      <InfiniteScroll
        style={{
          overflow: "none ",
        }}
        dataLength={props.publicaciones.length}
        next={props.next}
        hasMore={true}
        loader={<h4>Cargando...</h4>}
        endMessage={
          <div horizontal>
            <span>Yay! Has visto todo</span>
          </div>
        }
      >
        {props.publicaciones.map((publicacion) => (
          <Post key={publicacion._id} publicacion={publicacion} />
        ))}
      </InfiniteScroll>
    </>
  );
}

export default PostList;
