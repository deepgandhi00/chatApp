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
