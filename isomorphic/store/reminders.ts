import { Dispatch } from 'redux';
import { NextRouter } from 'next/router';

import { RemindersState } from './types';
import { initialRemindersState } from './initial-states';
import { firebase } from '../../helpers/firebase-api';
import { Reminder } from '@isomorphic/types';

const db = firebase.database().ref('reminders');

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

  db.on('value', (snapshot) => {
    const reminders = Object.entries(snapshot.val()).map((obj) => obj[1]);
    dispatch({
      type: REMINDERS_LOADED,
      payload: {
        list: reminders
      }
    });
  });
};

export const fetchReminder = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: REMINDERS_START_FETCHING });

  db.child(id).on('value', (snapshot) => {
    dispatch({
      type: REMINDERS_LOADED,
      payload: {
        data: snapshot.val()
      }
    });
  });
};

export const setReminder = (data: Reminder) => ({
  type: SET_REMINDER,
  payload: data
});

export const addReminder = (reminder: Reminder, router: NextRouter) => async (dispatch: Dispatch) => {
  dispatch({ type: REMINDERS_START_FETCHING });
  const newReminderRef = db.push();
  const id = newReminderRef?.key || '';
  const newReminder = { ...reminder, id };

  db.child(id)
    .set(newReminder, (error) => {
      dispatch({
        type: REMINDERS_SET_ERROR,
        payload: {
          error
        }
      });
    })
    .then(() => {
      dispatch({
        type: ADD_REMINDER,
        payload: {
          data: newReminder
        }
      });
      router.push(`/reminders/${id}`);
    });
};

export const deleteReminder = (id: string) => async (dispatch: Dispatch) => {
  db.child(id)
    .remove()
    .catch((err) => {
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
