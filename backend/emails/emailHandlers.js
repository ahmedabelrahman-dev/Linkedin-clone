import axios from 'axios';
import {
  createCommentNotificationEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createWelcomeEmailTemplate,
} from './emailTemplates.js';
import dotenv from 'dotenv';

dotenv.config();

// Mailtrap Sending API endpoint
const MAILTRAP_URL = 'https://send.api.mailtrap.io/api/send';

// Common Mailtrap "from" config
const fromConfig = {
  email: process.env.MAILTRAP_SENDER_EMAIL,
  name: process.env.MAILTRAP_SENDER_NAME,
};
console.log('Mailtrap From Config:', fromConfig);

// -------------------------
// SEND WELCOME EMAIL
// -------------------------
export const sendWelcomeEmail = async (email, name, profileUrl) => {
  try {
    const response = await axios.post(
      MAILTRAP_URL,
      {
        from: fromConfig,
        to: [{ email }],
        subject: 'Welcome to UnLinked',
        html: createWelcomeEmailTemplate(name, profileUrl),
        category: 'welcome',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MAILTRAP_TOKEN}`,
        },
      }
    );

    console.log('Welcome email sent successfully:', response.data);
  } catch (error) {
    console.error(
      'Welcome email failed:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// -------------------------
// SEND COMMENT NOTIFICATION
// -------------------------
export const sendCommentNotificationEmail = async (
  recipientEmail,
  recipientName,
  commenterName,
  postUrl,
  commentContent
) => {
  try {
    const response = await axios.post(
      MAILTRAP_URL,
      {
        from: fromConfig,
        to: [{ email: recipientEmail }],
        subject: 'New Comment on Your Post',
        html: createCommentNotificationEmailTemplate(
          recipientName,
          commenterName,
          postUrl,
          commentContent
        ),
        category: 'comment_notification',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MAILTRAP_TOKEN}`,
        },
      }
    );

    console.log('Comment notification email sent:', response.data);
  } catch (error) {
    console.error(
      'Comment notification failed:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// -------------------------
// SEND CONNECTION ACCEPTED EMAIL
// -------------------------
export const sendConnectionAcceptedEmail = async (
  recipientEmail,
  senderName,
  acceptedByName,
  profileUrl
) => {
  try {
    const response = await axios.post(
      MAILTRAP_URL,
      {
        from: fromConfig,
        to: [{ email: recipientEmail }],
        subject: `${acceptedByName} accepted your connection request`,
        html: createConnectionAcceptedEmailTemplate(
          senderName,
          acceptedByName,
          profileUrl
        ),
        category: 'connection_accepted',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MAILTRAP_TOKEN}`,
        },
      }
    );

    console.log('Connection accepted email sent:', response.data);
  } catch (error) {
    console.error(
      'Connection accepted email failed:',
      error.response?.data || error.message
    );
    throw error;
  }
};
