import "./styles.css";
import { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error(error));
  }, []);

  const addAlbum = () => {
    const newAlbum = {
      userId: 1,
      title: "New Album"
    };

    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify(newAlbum),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(...albums, data);
        setAlbums([...albums, data]);
      })
      .catch((error) => console.error(error));
  };

  const updateAlbum = (albumId) => {
    const updatedAlbum = {
      id: albumId,
      userId: 1,
      title: "Updated Album"
    };

    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
      method: "PUT",
      body: JSON.stringify(updatedAlbum),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const index = albums.findIndex((album) => album.id === albumId);
        console.log(...albums, data);
        setAlbums([
          ...albums.slice(0, index),
          data,
          ...albums.slice(index + 1)
        ]);
      })
      .catch((error) => console.error(error));
  };

  const deleteAlbum = (albumId) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`, {
      method: "DELETE"
    })
      .then(() => {
        const index = albums.findIndex((album) => album.id === albumId);
        setAlbums([...albums.slice(0, index), ...albums.slice(index + 1)]);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-4">
      <Container fluid="md">
        <Row>
          <h1 className="text-center">Albums</h1>
          <Button variant="primary" className="mb-4" onClick={addAlbum}>
            Add Album
          </Button>
          {albums.map((album) => (
            <Col xs={12} md={4} lg={3} className="mb-2" key={album.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{album.title}</Card.Title>
                  <Button
                    className="me-2"
                    variant="secondary"
                    onClick={() => updateAlbum(album.id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteAlbum(album.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
