Getting Started:

1. clone this Repository
2. Run npm install
3. run the app
  - for ios: npx react-native run-ios
  - for android: npx react-native run-android

Unique Features/Constraints:

1. Rate Limit: Added a 10s delayed with Indicator to limit the amount of messages send to the server
2. Message Delay: Added a 2 sec delay with loading to indicate thinking/typing for the reply messages
3. Character limit: Added 200 character limit with UI indication to limit the user from sending very long messages

Approach:

when user sends a message have added a delay of 1s to simulate the api call to send the message to server, then 2 events are triggered a timer and a addition of loading message to the list, after 2s of delay the loading message is replaced by a static string simulating the reply from system/expert and delay is added to show thinking or typing by the system/expert
