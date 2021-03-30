import React, { useContext, useState } from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import Button from "../../shared/components/FormElements/Button";
// import Map from "../../shared/components/UIElements/OpenLayerMap/Map";
import Map from "../../shared/components/UIElements/MapBoxMap/Map";
import AuthContext from "../../shared/context/auth-context";
import "./PlaceItem.css";

function PlaceItem(props) {
  const appStateContext = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("deleting..");
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
          <Map center={props.coordinates} zoom={15} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button onClick={cancelDeleteHandler} inverese>
              Cancel
            </Button>
            <Button onClick={confirmDeleteHandler} danger>
              Delete
            </Button>
          </>
        }
      >
        <p>Do you want to delete this place forever?</p>
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
            {/* todo: only display buttons if you are the owner of the place */}
            {appStateContext.isLoggedIn && (
              <>
                <Button to={`/place/${props.id}`}>Edit</Button>
                <Button onClick={showDeleteWarningHandler} danger>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
