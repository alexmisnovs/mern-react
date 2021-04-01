import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = props => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  const chooseImageHandler = () => {
    filePickerRef.current.click();
  };

  const choosenImageHandler = event => {
    let imageFile;
    let fileIsValid = isValid;
    // generate a preview, forward to the parent?
    if (event.target.files && event.target.files.length === 1) {
      imageFile = event.target.files[0];
      setFile(imageFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, imageFile, fileIsValid);
    console.log(event.target);
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  return (
    <div className="form-control">
      <input
        ref={filePickerRef}
        type="file"
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={choosenImageHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div
          className="image-upload__preview"
          style={!previewUrl ? { display: "none" } : { display: "block" }}
        >
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && <p>Please choose an image</p>}
        </div>
        <Button type="button" onClick={chooseImageHandler}>
          Choose an Image
        </Button>
      </div>
      {!isValid && props.errorText}
    </div>
  );
};

export default ImageUpload;
