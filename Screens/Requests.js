import React from 'react';
import { FloatingAction } from 'react-native-floating-action'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Header, Button, CheckBox, Icon, ListItem } from 'react-native-elements';
import { updateUser, removeUser, allUser, chatUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import axios from 'axios';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]

class Requests extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      received: {}
    }
  }

  componentWillMount(){
    const { user, userList } = this.props
    // console.log('user',user)
    userList.map((v,i) => {
      user['request']['received'] && Object.entries(user['request']['received']).forEach(([key,value])=>{
        // key == v.id && this.setState({
        //   received: {
        //     ...this.state.received,

        //   }
        // })
        console.log('value',value)
    })
    })
  }

  render() {
    const { visible, services, checkBool } = this.state
    const { user } = this.props
    return (
        <View style={{flex: 1}}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, margin: 0.5}}>
        <Button
            icon={<Icon type='font-awesome' name='comments' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'green'}}
            title='RECEIVED' />
            <View>
          {
            list.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.name}
                subtitle={l.subtitle}
              />
            ))
          }
        </View>
        </View>
        <View style={{flex: 1, margin: 0.5}}>
        <Button
            icon={<Icon type='font-awesome' name='plus' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 5, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='SEND' />
            </View>
        </View>
        </View>
      </View>
    );
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


export default connect(mapStateToProps,mapDispatchToProps)(Requests)