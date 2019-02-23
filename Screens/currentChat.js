import React from 'react'
import { Platform, ScrollView, View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { Header, Button, Input, Card, Image, Icon, Text } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { DrawerActions } from 'react-navigation-drawer';
import { updateUser, removeUser, allUser, chatUser } from '../Redux/actions/authActions'
import { connect } from 'react-redux';
import axios from 'axios';


class currentChat extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      messages: props.chats ? props.user.chat[props.chats.id] : [],
    }
  }

  componentWillMount() {
    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'Hello developer',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //         id: 7656576576
    //       },
    //     },
    //   ],
    // })
  }

  onSend(messages = []) {
    const { chats, user } = this.props
    messages[0].user.avatar= user.avator
    messages[0].user.name = user.name
    user.chat[chats.id] = GiftedChat.append(user.chat[chats.id],messages)
    console.log('user',user)
    chats.chat[user.id] = GiftedChat.append(user.chat[chats.id],messages)
    console.log('chats',chats)
    axios.put(`https://final-hackathon.herokuapp.com/user/chat`,{
      id: user._id,
      chat: user.chat
    })
      .then((response) => {
        console.log('Rest',response)
      })
      .catch(function (error) {
        console.log('error',error);
      });
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    const { chats, user } = this.props
    return (
      <View style={styles.container}>
      {chats ?
      <View style={styles.container}>
      <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `${chats.name}`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
      <GiftedChat
        messages={user.chat[chats.id]}
        onSend={messages => this.onSend(messages)}
        scrollToBottom={true}
        placeholder='Type a message...'
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        bottomOffset={11}
        forceGetKeyboardHeight={true}
        user={{
          _id: chats.id,
        }}
      />
      </View> : <View>
      <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `${user.name}`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <Text style={{margin: 10}}>OOPS! no recent Chat Found</Text>
        </View>}
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

const mapStateToProps = (state) => {
  console.log("mapToState",state.authReducer)
  return {
    user: state.authReducer.user,
    userList: state.authReducer.userList,
    chats: state.authReducer.chats
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    allUser: (userList) => dispatch(allUser(userList)),
    removeUser: () => dispatch(removeUser()),
    chatUser: (chats) => dispatch(chatUser(chats))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(currentChat);