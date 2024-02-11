import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {COLORS} from '../utils/colors';
import {CONSTANTS} from '../utils/constants';

const MessageInput = ({sendMessage, timerSec}) => {
  const [formattedText, setFormattedText] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.messageInputContainer}>
        {/* input for the message */}
        <TextInput
          style={styles.messageInput}
          placeholder="Send message..."
          placeholderTextColor={COLORS.MESSAGE_INPUT_PLACEHOLDER_TEXT}
          onChangeText={setFormattedText}
          value={formattedText}
          maxLength={CONSTANTS.MESSAGE_CHARACTER_LIMIT}
        />
        {/* send button and once send it will be disabled and will show timer for next message */}
        <TouchableWithoutFeedback
          onPress={() => {
            sendMessage(formattedText);
            setFormattedText(null);
          }}>
          <View style={timerSec !== 0 ? styles.sendDisable : styles.sendButton}>
            <Image
              source={require('../assets/images/send.png')}
              style={styles.sendButtonImage}
            />
            {timerSec !== 0 ? (
              <Text style={styles.timerText}>{`${timerSec}s`}</Text>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* Text to show the entered character by user and limit */}
      <Text
        style={[
          styles.inputCharText,
          formattedText &&
          formattedText.length === CONSTANTS.MESSAGE_CHARACTER_LIMIT
            ? styles.inputCharTextRed
            : null,
        ]}>{`${formattedText ? formattedText.length : 0}/${
        CONSTANTS.MESSAGE_CHARACTER_LIMIT
      }`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  messageInputContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  messageInput: {
    flex: 1,
    backgroundColor: COLORS.MESSAGES_REPLY,
    marginEnd: 8,
    borderRadius: 8,
    color: COLORS.MESSAGES_REPLY_TEXT,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisable: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.MESSAGE_INPUT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonImage: {
    width: 24,
    height: 24,
    tintColor: COLORS.WHITE,
  },
  bold: {
    fontWeight: '700',
  },
  timerText: {
    fontSize: 10,
    color: COLORS.WHITE,
  },
  inputCharText: {
    fontSize: 12,
    color: COLORS.PRIMARY,
  },
  inputCharTextRed: {
    color: COLORS.RED,
  },
});

export default MessageInput;
