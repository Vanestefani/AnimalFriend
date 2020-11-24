import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  CardHeader,
  Card,
  CardBody,

} from "reactstrap";
import Post from "./Post";

function PostList(props) {
  if (props.publicaciones.length === 0)
    return <Card className="m-2"><h1 className="text-center">No hay publicaciones 😅</h1><br></br>
    <center><img width="400px" src={require("../../assets/img/q.png")}></img></center>
    </Card>;

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
