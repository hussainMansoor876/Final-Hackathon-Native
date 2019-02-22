import React from 'react'
import { Platform, ScrollView, View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { Header, Button, Input, Card, Image, Icon } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { DrawerActions } from 'react-navigation-drawer';


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
            id: 7656576576
          },
        },
        {
          _id: 3,
          text: 'Hello developer Hey How are you?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        }
      ],
    })
  }

  onSend(messages = []) {
    console.log(messages)
    messages[0].user.avatar= 'https://placeimg.com/140/140/any'
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <View style={styles.container}>
      <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
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
        user={{
          _id: 1,
        }}
      />
      </View>
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