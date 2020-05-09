import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";
import PostContext from "../../context/post/postContext";
function PostList() {
  const postContext = useContext(PostContext);

  const [data, setData] = useState({
    totalpost: "",
  });
  const { totalpost } = data;

  const {
    allpost,

    publicaciones,
  } = postContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    allpost();
    // eslint-disable-next-line
  }, []);
  if (publicaciones.length === 0)
    return <p>No hay publicaciones, sigue a alguien :3</p>;

  return (
    <>
      <InfiniteScroll
       style={{
        "overflow":"none "

       }}
        dataLength={publicaciones.length}
        next={allpost}

        hasMore={true}

        loader={<h4>Cargando...</h4>}
        endMessage={
          <div horizontal>
            <span>Yay! Has visto todo</span>
          </div>
        }
      >
        {publicaciones.map((publicacion) => (
          <Post key={publicacion._id} publicacion={publicacion} />
        ))}
      </InfiniteScroll>
    </>
  );
}

export default PostList;
