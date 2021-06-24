import { Dispatch } from 'redux';
import { NextRouter } from 'next/router';
import uniqid from 'uniqid';

import { RemindersState } from './types';
import { initialRemindersState } from './initial-states';
import { Reminder } from '@isomorphic/types';
import { dataURItoBlob } from '../../helpers/file-utils';

const REMINDERS_LOADED = 'reminders/loaded';
const REMINDERS_START_FETCHING = 'reminders/startFetching';
const REMINDERS_SET_ERROR = 'reminders/setError';
const ADD_REMINDER = 'reminders/addReminder';
const SET_REMINDER = 'reminders/setReminder';

interface RemindersLoadedAction {
  type: typeof REMINDERS_LOADED;
  payload: any;
}

interface RemindersStartFetchingAction {
  type: typeof REMINDERS_START_FETCHING;
}

interface RemidersSetErrorAction {
  type: typeof REMINDERS_SET_ERROR;
  payload: any;
}

interface AddReminderAction {
  type: typeof ADD_REMINDER;
  payload: Reminder;
}

interface SetReminderAction {
  type: typeof SET_REMINDER;
  payload: any;
}

export type RemindersActions =
  | RemindersLoadedAction
  | RemindersStartFetchingAction
  | RemidersSetErrorAction
  | AddReminderAction
  | SetReminderAction;

export const fetchReminders = () => async (dispatch: Dispatch) => {
  dispatch({ type: REMINDERS_START_FETCHING });

  await fetch('/api/reminders', {
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: REMINDERS_LOADED,
        payload: {
          list: data.Items
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: REMINDERS_SET_ERROR,
        payload: {
          err
        }
      });
    });
};

export const fetchReminder = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: REMINDERS_START_FETCHING });

  const data = await fetch(`/api/reminders/${id}`).then((response) => response.json());

  dispatch({
    type: REMINDERS_LOADED,
    payload: {
      data
    }
  });
};

export const setReminder = (data: Reminder) => ({
  type: SET_REMINDER,
  payload: data
});

export const addReminder = (reminder: Reminder, router: NextRouter) => async (dispatch: Dispatch) => {
  dispatch({ type: REMINDERS_START_FETCHING });

  const { blob } = dataURItoBlob(reminder.picture);

  const newReminder = new FormData();
  newReminder.append('title', reminder.title);
  newReminder.append('message', reminder.message);
  newReminder.append('date', reminder.date);
  newReminder.append('location', JSON.stringify(reminder.location));
  newReminder.append('file', blob, uniqid());

  await fetch(`/api/reminders`, {
    method: 'POST',
    body: newReminder
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: ADD_REMINDER,
        payload: {
          data
        }
      });
      router.push(`/reminders/${data.id}`);
    })
    .catch((err) => {
      dispatch({
        type: REMINDERS_SET_ERROR,
        payload: {
          err
        }
      });
    });
};

export const deleteReminder = (id: string) => async (dispatch: Dispatch) => {
  await fetch(`/api/reminders/${id}`, {
    method: 'DELETE'
  }).catch((err) => {
    dispatch({
      type: REMINDERS_SET_ERROR,
      payload: {
        err
      }
    });
  });
};

export const remindersReducer = (state: RemindersState = initialRemindersState, action: RemindersActions) => {
  switch (action.type) {
    case REMINDERS_LOADED:
      return { ...state, ...action.payload, loading: false };
    case REMINDERS_START_FETCHING:
      return { ...state, loading: true };
    case REMINDERS_SET_ERROR:
      return { ...state, error: action.payload.error };
    case SET_REMINDER:
      return { ...state, data: action.payload };
    case ADD_REMINDER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
