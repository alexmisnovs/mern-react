import React from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card/Card";
import PlaceItem from "./PlaceItem";

import "./PlaceList.css";

function PlaceList(props) {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No playgounds found.. Maybe add one</h2>
          <Button to="/places/new">Maybe you could add one ?</Button>
        </Card>
      </div>
    );
  } else {
    return (
      <ul className="place-list">
        {props.items.map(place => (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            desc={place.description}
            address={place.address}
            creatorId={place.creator}
            city={place.city}
            coordinates={place.location}
            onDelete={props.onDeletePlace}
          />
        ))}
      </ul>
    );
  }
}

export default PlaceList;
