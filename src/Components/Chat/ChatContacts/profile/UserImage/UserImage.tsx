/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
import React, {
  useRef,
  useState,
  useCallback,
  FC,
  ChangeEvent,
  DragEvent,
  SyntheticEvent
} from 'react';
import ReactCrop from 'react-image-crop';
import {
  ButtonGroup,
  DeleteButton,
  DragSpan,
  UploaderBoxDiv,
  WrapperImageDiv
} from './style/userimage.style';
import '../style/ReactCrop.css';

const Delicon = require('src/assets/bin.png').default;
const imgplusicon = require('src/assets/plus.png').default;

interface TargetFiles {
  target?: DataTransfer;
}

export interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
  unit: 'px' | '%';
}

interface UserImageProps {
  handleClose: () => void;
  isMobile: boolean;
  handleSave: (basestr: string) => void;
}

const Userimage: FC<UserImageProps> = (props) => {
  const { handleClose, isMobile } = props;
  const uploadedImage = useRef<HTMLImageElement | null>(null);
  const imageUploader = useRef<HTMLInputElement>(null);
  const cropedImage = useRef<HTMLImageElement>(null);
  const [image, setimageurl] = useState('');
  const [crop, setCrop] = useState<Crop>({
    height: isMobile ? 200 : 300,
    width: isMobile ? 200 : 300,
    x: 0,
    y: 0,
    unit: 'px'
  });
  const [uploaded, setUploaded] = useState(false);
  const [completedCrop, setCompleted] = useState<Crop>();

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement> | TargetFiles
  ) => {
    const { appDispatch } = await import('src/Redux/store/store');
    const { showNotifications } = await import(
      'src/Redux/actions/notifications.actions'
    );
    const { NotificationAlerts } = await import(
      'src/Redux/dtos/notifications.dto'
    );
    const { isValidPhoto } = await import('src/utils/validations');
    const files = e.target?.files;
    if (files) {
      const file = files[0];
      const { error, value } = isValidPhoto(file);
      if (value) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e2) => {
          if (e2.target?.result) {
            const img = new Image();
            img.src = e2.target.result as string;
            img.onload = (e1: any) => {
              if (
                e1.currentTarget &&
                (e1.currentTarget?.height < 300 ||
                  e1.currentTarget?.width < 300)
              ) {
                appDispatch(
                  showNotifications({
                    message:
                      'The image is too small. Min. Image resolution should be 300 * 300 pixels.',
                    alert: NotificationAlerts.error
                  })
                );
              } else {
                setimageurl(e2.target?.result as string);
                setUploaded(true);
              }
            };
          }
        };
      } else if (error) {
        appDispatch(
          showNotifications({
            message: error,
            alert: NotificationAlerts.error
          })
        );
      }
    }
  };
  const handleReset = () => {
    setimageurl('');
    setUploaded(false);
  };

  const onLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    if (uploadedImage.current) {
      uploadedImage.current = e.currentTarget;
    }
  }, []);

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { appDispatch } = await import('src/Redux/store/store');
    const { showNotifications } = await import(
      'src/Redux/actions/notifications.actions'
    );
    const { NotificationAlerts } = await import(
      'src/Redux/dtos/notifications.dto'
    );
    if (e.dataTransfer) {
      if (e.dataTransfer.files.length > 1) {
        appDispatch(
          showNotifications({
            message: 'Please upload one at time',
            alert: NotificationAlerts.error
          })
        );
      } else {
        const data = {
          target: e.dataTransfer
        };
        handleImageUpload(data);
      }
    }
  };

  const handleInputClick = () => {
    if (imageUploader.current) {
      imageUploader.current.value = '';
    }
  };

  const cropImageNow = async () => {
    if (cropedImage.current && completedCrop) {
      const { appDispatch } = await import('src/Redux/store/store');
      const { showNotifications } = await import(
        'src/Redux/actions/notifications.actions'
      );
      const { NotificationAlerts } = await import(
        'src/Redux/dtos/notifications.dto'
      );
      const imagecroped = cropedImage.current;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const scaleX = imagecroped.naturalWidth / imagecroped.width;
        const scaleY = imagecroped.naturalHeight / imagecroped.height;
        const pixelRatio = window.navigator.userAgent.match(/iPhone/i)
          ? window.devicePixelRatio
          : 1;
        canvas.width = completedCrop.width * pixelRatio;
        canvas.height = completedCrop.height * pixelRatio;
        // ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(
          imagecroped,
          completedCrop.x * scaleX,
          completedCrop.y * scaleY,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY,
          0,
          0,
          completedCrop.width,
          completedCrop.height
        );
        const { handleSave } = props;
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                const base64data = reader.result;
                if (base64data) {
                  handleSave(base64data as string);
                } else {
                  appDispatch(
                    showNotifications({
                      message: 'Some Error occur please add another image',
                      alert: NotificationAlerts.error
                    })
                  );
                }
              };
            } else {
              appDispatch(
                showNotifications({
                  message: 'Some Error occur please add another image',
                  alert: NotificationAlerts.error
                })
              );
            }
          },
          'image/png',
          1
        );
      }
    }
  };

  const defaultDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <WrapperImageDiv
        isMobile={isMobile}
        onDrop={handleDrop}
        onDragOver={defaultDrag}
        onDragEnter={defaultDrag}
        onDragLeave={defaultDrag}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          onClick={handleInputClick}
          style={{
            display: 'none'
          }}
        />
        {!uploaded ? null : (
          <DeleteButton type="button" onClick={handleReset}>
            <img src={Delicon} alt="" />
          </DeleteButton>
        )}
        <UploaderBoxDiv
          role="button"
          aria-hidden="true"
          onClick={() => !uploaded && imageUploader.current?.click()}
        >
          {!uploaded ? null : (
            <ReactCrop
              crop={crop}
              locked
              circularCrop
              onChange={(_, newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCompleted(c)}
            >
              <img
                ref={cropedImage}
                alt="Crop me"
                src={image}
                onLoad={onLoad}
              />
            </ReactCrop>
          )}
          {!uploaded ? (
            <DragSpan>
              <img
                src={imgplusicon}
                alt="img"
                style={{
                  display: 'block',
                  margin: '0 auto',
                  cursor: 'pointer'
                }}
              />
              Click or drag file
              <br />
              to this area
            </DragSpan>
          ) : null}
        </UploaderBoxDiv>
      </WrapperImageDiv>
      <ButtonGroup uploaded={uploaded}>
        <button type="button" onClick={handleClose}>
          Cancel
        </button>
        {uploaded ? (
          <button type="button" onClick={cropImageNow}>
            Save
          </button>
        ) : null}
      </ButtonGroup>
    </>
  );
};

export default Userimage;
