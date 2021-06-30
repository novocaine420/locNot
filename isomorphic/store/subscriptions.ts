import { Dispatch } from 'redux';

import { SubscriptionState } from './types';
import { initialSubscriptionState } from './initial-states';
import { sendNotification } from '../../helpers/notifications';

const SUBSCRIPTION_LOADED = 'subscription/loaded';
const SUBSCRIPTION_START_FETCHING = 'subscription/startFetching';
const SUBSCRIPTION_SET_ERROR = 'subscription/setError';
const ADD_SUBSCRIPTION = 'subscription/addSubscription';
const SET_SUBSCRIPTION = 'subscription/setSubscription';

interface SubscriptionLoadedAction {
  type: typeof SUBSCRIPTION_LOADED;
  payload: any;
}

interface SubscriptionStartFetchingAction {
  type: typeof SUBSCRIPTION_START_FETCHING;
}

interface SubscriptionSetErrorAction {
  type: typeof SUBSCRIPTION_SET_ERROR;
  payload: any;
}

interface AddSubscriptionAction {
  type: typeof ADD_SUBSCRIPTION;
  payload: PushSubscription;
}

interface SetSubscriptionAction {
  type: typeof SET_SUBSCRIPTION;
  payload: any;
}

export type SubscriptionActions =
  | SubscriptionLoadedAction
  | SubscriptionStartFetchingAction
  | SubscriptionSetErrorAction
  | AddSubscriptionAction
  | SetSubscriptionAction;

export const setSubscription = (data: PushSubscription) => ({
  type: SET_SUBSCRIPTION,
  payload: data
});

export const addSubscription = (subscription: PushSubscription) => async (dispatch: Dispatch) => {
  dispatch({ type: SUBSCRIPTION_START_FETCHING });

  try {
    await fetch('/api/subscriptions', {
      method: 'POST',
      body: JSON.stringify({
        subscription
      })
    }).then(() => {
      dispatch({
        type: ADD_SUBSCRIPTION,
        payload: {
          data: subscription
        }
      });
      sendNotification(subscription, { message: 'Subscription successfully added' });
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: SUBSCRIPTION_SET_ERROR,
      payload: {
        err
      }
    });
  }
};

export const deleteSubscription = () => async (dispatch: Dispatch) => {
  try {
    await fetch('/api/subscriptions', {
      method: 'DELETE'
    });
    dispatch({
      type: SET_SUBSCRIPTION,
      payload: null
    });
  } catch (err) {
    dispatch({
      type: SUBSCRIPTION_SET_ERROR,
      payload: {
        err
      }
    });
  }
};

export const subscriptionReducer = (
  state: SubscriptionState = initialSubscriptionState,
  action: SubscriptionActions
) => {
  switch (action.type) {
    case SUBSCRIPTION_LOADED:
      return { ...state, ...action.payload, loading: false };
    case SUBSCRIPTION_START_FETCHING:
      return { ...state, loading: true };
    case SUBSCRIPTION_SET_ERROR:
      return { ...state, error: action.payload.error };
    case SET_SUBSCRIPTION:
      return { ...state, data: action.payload };
    case ADD_SUBSCRIPTION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
