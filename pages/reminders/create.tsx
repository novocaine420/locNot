import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import StepProgressBar from '@client/components/step-progress-bar/step-progress-bar';
import GoogleMap from '@client/components/google-map/google-map';
import { RootState } from '@isomorphic/store/types';
import { Location, Reminder } from '@isomorphic/types';
import { addReminder, setReminder } from '@isomorphic/store/reminders';
import TextInput from '@client/components/text-input/text-input';
import DateAndTimePicker from '@client/components/date-picker/date-picker';
import AddPictureBlock from '@client/components/add-picture-block/add-picture-block';
import styles from './styles.module.scss';

const steps = ['Select on map', 'Add details', 'Take a picture', 'Choose time'];

const CreateReminder = () => {
  const router = useRouter();
  const reminder = useSelector<RootState, Reminder>((state) => state.reminders.data);
  const dispatch = useDispatch();

  const onMapClick = (data: Location) => {
    dispatch(setReminder({ ...reminder, location: { lat: data.lat, lng: data.lng } }));
  };

  const onTextChange = (field: string) => (text: string) => {
    dispatch(setReminder({ ...reminder, [field]: text }));
  };

  const onDropPicture = (img: string) => {
    dispatch(setReminder({ ...reminder, picture: img }));
  };

  const getStepContent = useCallback(
    (idx: number) => {
      switch (idx) {
        case 0:
          return (
            <div>
              <GoogleMap zoom={14} onClick={onMapClick} location={reminder.location} />
            </div>
          );
        case 1:
          return (
            <div>
              <div className={styles.title}>
                <TextInput label="Title" value={reminder.title} onChange={onTextChange('title')} />
              </div>
              <TextInput label="Message" value={reminder.message} onChange={onTextChange('message')} multiline />
            </div>
          );
        case 2:
          return (
            <div>
              <AddPictureBlock onDropPicture={onDropPicture} />
            </div>
          );
        case 3:
          return (
            <div>
              <DateAndTimePicker value={reminder.date} onChange={onTextChange('date')} />
            </div>
          );
        default:
          return 'Unknown step';
      }
    },
    [reminder]
  );

  const onSubmit = () => {
    dispatch(addReminder(reminder, router));
  };

  return (
    <div className={styles.createReminder}>
      <StepProgressBar steps={steps} getStepContent={getStepContent} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateReminder;
