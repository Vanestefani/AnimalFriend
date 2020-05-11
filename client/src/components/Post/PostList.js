import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";
import PostContext from "../../context/post/postContext";
import AlertaContext from "../../context/alertas/alertaContext";

function PostList() {
  const postContext = useContext(PostContext);
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const [data, setData] = useState({
    totalpost: "",
  });
  const { totalpost } = data;

  const { allpost, mensaje, publicaciones } = postContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    allpost();
  }, [mensaje]);

  if (publicaciones.length === 0)
    return <p>No hay publicaciones, sigue a alguien :3</p>;

  return (
    <>
      <InfiniteScroll
        style={{
          overflow: "none ",
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
