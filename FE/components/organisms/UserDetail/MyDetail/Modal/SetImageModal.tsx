import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import Slider from '@material-ui/core/Slider';
import { Icon, Input } from '@atoms';
import { Button } from '@molecules';
import getCroppedImg from '@utils/cropImage';
import { dataURLtoFile } from '@utils/dataURLtoFile';
import { useAuthState } from '@store';

const Wrapper = styled.div`
  width: 50vw;
  height: calc(100vh - 150px);
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);

  i {
    cursor: pointer;
    position: absolute;
    top: 5%;
    right: 5%;
    z-index: 100;
  }

  .container-cropper {
    height: 90%;
    padding: 10px;
  }

  .cropper {
    height: 90%;
    position: relative;
  }

  .slider {
    height: 10%;
    display: flex;
    align-items: center;
    margin: auto;
    width: 60%;
  }

  .container-buttons {
    border: 1px solid #f5f5f5;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    .none {
      display: none;
    }
  }
`;

export default function RenderCropper({
  image,
  setImage,
  setSubmitImage,
  changeImageMode,
}: any) {
  const { user } = useAuthState();

  const inputRef = useRef<HTMLInputElement>(null);

  const triggerFileSelectPopup = () => inputRef?.current?.click();

  const [croppedArea, setCroppedArea] = useState<Area>(Object);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (
    croppedAreaPercentage: Area,
    croppedAreaPixels: Area,
  ) => setCroppedArea(croppedAreaPixels);

  const onSelectFile = (e: Event & { target: HTMLInputElement }) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => {
        setImage(reader.result);
      });
    }
  };

  const onClear = () => {
    setImage('/profile.png');
    setSubmitImage('');
  };

  const onUpload = async () => {
    if (image === '/profile.png') {
      changeImageMode();
      return;
    }
    const canvas = await getCroppedImg(image, croppedArea);
    const canvasDataUrl = canvas.toDataURL('image/jpeg');
    setImage(canvasDataUrl);
    const convertedUrlToFile = dataURLtoFile(
      canvasDataUrl,
      `${user.studentNumber}_profile.jpeg`,
    );
    setSubmitImage(convertedUrlToFile);
    changeImageMode();
  };

  return (
    <Wrapper>
      <div>
        <Icon iconName="clear" color="black" func={changeImageMode} />
      </div>
      <div className="container-cropper">
        {image ? (
          <>
            <div className="cropper">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="slider">
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
                color="secondary"
              />
            </div>
          </>
        ) : null}
      </div>

      <div className="container-buttons">
        <div className="none">
          <Input
            type="file"
            accept="image/*"
            ref={inputRef}
            func={onSelectFile}
          />
        </div>

        <Button title="초기화" func={onClear} width="80px" />

        <Button title="선택" func={triggerFileSelectPopup} width="80px" />

        <Button title="등록" func={onUpload} width="80px" />
      </div>
    </Wrapper>
  );
}
