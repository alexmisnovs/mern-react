import React, { useEffect } from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import "./PlaceItem.css";

function PlaceItem(props) {
  return (
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
          <button>VIEW on MAP</button>
          <button>Edit this place</button>
          <button>Delete this place</button>
        </div>
      </Card>
    </li>
  );
}

export default PlaceItem;
