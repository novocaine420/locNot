import AWS from 'aws-sdk';
import uniqid from 'uniqid';

declare module 'aws-sdk/lib/config-base' {
  interface ConfigurationOptions {
    endpoint: string;
  }
}

AWS.config.update({
  region: process.env.AWS_REGION,
  s3BucketEndpoint: false,
  // The endpoint should point to the local or remote computer where DynamoDB (downloadable) is running.
  endpoint: 'http://dynamodb.eu-central-1.amazonaws.com',
  /*
      accessKeyId and secretAccessKey defaults can be used while using the downloadable version of DynamoDB. 
      For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    */
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const dynamodb = new AWS.DynamoDB();
export const docClient = new AWS.DynamoDB.DocumentClient();

export function createTable() {
  const params = {
    TableName: 'Reminders',
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };

  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
}

export const getItems = () => {
  const params = {
    TableName: 'Reminders',
    ProjectionExpression: '#id, title, message, #loc, #date',
    ExpressionAttributeNames: {
      '#id': 'id',
      '#loc': 'location',
      '#date': 'date'
    }
  };

  docClient.scan(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
};

export const createReminder = () => {
  const params = {
    TableName: 'Reminders',
    Item: {
      id: uniqid(),
      title: 'The Big Bang',
      message: 'A new message',
      date: '2021-06-02T13:59',
      location: {
        lat: 49.8555485354789,
        lng: 24.024861892628138
      }
    }
  };
  docClient.put(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
};

export const readItem = () => {
  const params = {
    TableName: 'Reminders',
    Key: {
      id: 'kpohiq1t'
    }
  };
  docClient.get(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
};

export const deleteTable = () => {
  const params = {
    TableName: 'Reminders'
  };

  dynamodb.deleteTable(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
};
