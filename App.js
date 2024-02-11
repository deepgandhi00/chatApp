/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS} from './utils/colors';
import MessageItem from './components/messageItem';
import MessageInput from './components/messageInput';
import {CONSTANTS} from './utils/constants';

const App = () => {
  // reference to store the timer after which user can send another message
  const intervalTimer = useRef();

  const [messages, setMessages] = useState([]);
  const [timerSec, setTimerSec] = useState(0);

  useEffect(() => {
    // clearing timer if user exits the application/screen
    return () => {
      if (intervalTimer?.current) {
        clearInterval(intervalTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (messages && messages.length) {
      let lastMessage = messages.slice(-1);

      if (lastMessage && lastMessage.length && lastMessage[0].role === 'user') {
        // adding a loading message after user sends the message
        addAutomatedReply();
      } else if (
        lastMessage &&
        lastMessage.length &&
        lastMessage[0].isLoading
      ) {
        // replacing the loading message with reply from server with 2s delay for mimicking the reply from server
        setTimeout(() => {
          let tempMessages = [...messages];
          tempMessages.pop();
          tempMessages.push({
            role: 'system',
            content: 'This is a automated reply',
          });
          setMessages(tempMessages);
        }, 2000);
      }
    }
  }, [messages]);

  const addAutomatedReply = () => {
    // adding a loading messages after 1s of delay to mimic the message sending to server
    setTimeout(() => {
      let tempMessages = [...messages];
      tempMessages.push({role: 'system', content: '...', isLoading: true});
      setMessages(tempMessages);
    }, 1000);
  };

  const sendMessage = message => {
    // adding message sent by user to list
    let tempMessages = [...messages];
    tempMessages.push({role: 'user', content: message});
    setMessages(tempMessages);
    setIntervalTimer();
  };

  // starting the interval after the user has sent the message after which user can send another message
  const setIntervalTimer = () => {
    setTimerSec(CONSTANTS.MESSAGE_INTERVAL);
    let interval = setInterval(() => {
      setTimerSec(prev => {
        if (prev === 1 && intervalTimer?.current) {
          clearInterval(intervalTimer.current);
        }
        return prev - 1;
      });
    }, 1000);
    intervalTimer.current = interval;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.PRIMARY} />
      <View style={styles.container}>
        {/* App bar for the screen */}
        <View style={styles.appBar}>
          <Text style={styles.appBarTitle}>AI</Text>
        </View>
        {/* list to show the messages */}
        <FlatList
          data={messages}
          renderItem={({item}) => <MessageItem message={item} />}
        />
        {/* message input */}
        <MessageInput sendMessage={sendMessage} timerSec={timerSec} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  appBar: {
    height: 56,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.WHITE,
  },
});

export default App;
