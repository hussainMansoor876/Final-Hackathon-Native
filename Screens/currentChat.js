import React from 'react'
import { Platform, ScrollView, View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class currentChat extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        scrollToBottom={true}
        placeholder='Type a message...'
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        bottomOffset={11}
        renderSystemMessage={()=> console.log('hello')}
        forceGetKeyboardHeight={true}
        style={{flex: 1}}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default currentChat