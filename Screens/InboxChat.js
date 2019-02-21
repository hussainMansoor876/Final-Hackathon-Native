import React from 'react';
import { FloatingAction } from 'react-native-floating-action'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Header, Button, ListItem } from 'react-native-elements';
import { updateUser, removeUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
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

class Inbox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    const { user, userList } = this.props
    console.log(userList)
    return (
        <View style={{flex: 1}}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <ScrollView>
        {userList.map((l, i) => (
              <ListItem
                key={i}
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95} //
                linearGradientProps={{
                  colors: ['azure', 'aqua'],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                badge={{ value: 1, textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
                leftAvatar={{ rounded: true, source: { uri: l.avator } }}
                title={l.name}
                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                subtitleStyle={{ color: 'white' }}
                subtitle={l.phone}
                containerStyle={{borderColor: 'white', borderWidth: 0.5, borderStyle: 'solid', marginLeft: 5, marginRight: 5, borderRadius: 5}}
              />
            ))
          }
        </ScrollView>
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
    userList: state.authReducer.userList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    removeUser: () => dispatch(removeUser())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Inbox)