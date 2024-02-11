import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../utils/colors';

const MessageItem = ({message}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageContainer,
          message.role === 'user' ? styles.userMessage : styles.replyMessage,
        ]}>
        <Text
          style={[
            styles.messageText,
            message.role === 'user'
              ? styles.userMessageText
              : styles.replyMessageText,
          ]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 16,
  },
  messageContainer: {
    width: '70%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: COLORS.MESSAGES_SENT,
    alignSelf: 'flex-end',
    marginEnd: 8,
  },
  userMessageText: {
    color: COLORS.WHITE,
  },
  replyMessage: {
    backgroundColor: COLORS.MESSAGES_REPLY,
    alignSelf: 'flex-start',
    marginStart: 8,
  },
  replyMessageText: {
    color: COLORS.MESSAGES_REPLY_TEXT,
  },
  messageText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default MessageItem;
