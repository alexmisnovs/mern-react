import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import Button from "../../shared/FormElements/Button";
import "./PlaceItem.css";

function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };
  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>MAP WILL GO |HeRE</h2>
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.desc}</p>
          </div>
          <div className="place-item__actions">
            <Button onClick={openMapHandler} inverse>
              VIEW on MAP
            </Button>
            <Button to={`/places/${props.id}/edit`}>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
