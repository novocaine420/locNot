import { base64ToUint8Array } from './encryption';

type NotificationData = {
  title?: string;
  message: string;
};

export const askForNotificationPermission = async (reg: ServiceWorkerRegistration) => {
  try {
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY || '')
    });
    return sub;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const sendNotification = async (subscription: PushSubscription, data: NotificationData) => {
  try {
    await fetch('/api/notification', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription,
        data: { message: data.message, title: data.title }
      })
    });
  } catch (err) {
    console.error(err);
  }
};
