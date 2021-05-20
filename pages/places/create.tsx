import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import StepProgressBar from '@client/components/step-progress-bar/step-progress-bar';
import GoogleMap from '@client/components/google-map/google-map';
import { RootState } from '@isomorphic/store/types';
import { Location, Place } from '@isomorphic/types';
import { setPlace } from '@isomorphic/store/place';
import TextInput from '@client/components/text-input/text-input';
import DateAndTimePicker from '@client/components/date-picker/date-picker';
import { addPlace } from '@isomorphic/store/places';
import AddPictureBlock from '@client/components/add-picture-block/add-picture-block';

const steps = ['Select on map', 'Add content', 'Invite people', 'Choose time'];

const CreatePlace = () => {
  const place = useSelector<RootState, Place>((state) => state.place.newPlace);
  const dispatch = useDispatch();

  const onMapClick = (data: Location) => {
    dispatch(setPlace({ ...place, location: { lat: data.lat, lng: data.lng } }));
  };

  const onTextChange = (field: string) => (text: string) => {
    dispatch(setPlace({ ...place, [field]: text }));
  };

  const onDropPicture = (img: string) => {
    dispatch(setPlace({ ...place, content: [...place.content, img] }));
  };

  const getStepContent = (idx: number) => {
    switch (idx) {
      case 0:
        return (
          <div>
            <GoogleMap zoom={14} onClick={onMapClick} location={place.location} />
            <TextInput label="Name" value={place.name} onChange={onTextChange('name')} />
          </div>
        );
      case 1:
        return (
          <div>
            <AddPictureBlock onDropPicture={onDropPicture} />
            <TextInput label="Message" value={place.message} onChange={onTextChange('message')} multiline />
          </div>
        );
      case 2:
        return (
          <div>
            <TextInput
              label="Peoples"
              value={place.peoples}
              onChange={onTextChange('peoples')}
              placeholder="Just start entering"
            />
          </div>
        );
      case 3:
        return (
          <div>
            <DateAndTimePicker onChange={onTextChange('date')} />
          </div>
        );
      default:
        return 'Unknown step';
    }
  };

  const onSubmit = () => {
    const id = Date.now().toString();
    dispatch(addPlace({ ...place, id }));
  };

  return (
    <div>
      <StepProgressBar steps={steps} getStepContent={getStepContent} onSubmit={onSubmit} />
    </div>
  );
};

export default CreatePlace;
