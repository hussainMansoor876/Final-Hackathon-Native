import React from 'react';
import { FloatingAction } from 'react-native-floating-action'
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { updateUser, removeUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';

class Services extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: true
    }
    console.log('props***',props)
  }

  changeVisibility(){
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

  render() {
    const { visible } = this.state
    const { user } = this.props
    return (
        <View style={styles.container}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <FloatingAction
          // actions={actions}
          onPressMain={ () => this.props.navigation.navigate('CreateCompany')}
          showBackground= {false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const actions = [ {
    text: 'Location',
    icon: require('../Images/location.png'),
    name: 'bt_room',
    position: 1
  }, {
    text: 'Video',
    icon: require('../Images/Video.png'),
    name: 'bt_videocam',
    position: 2
  }];

const mapStateToProps = (state) => {
  console.log("mapToState",state.authReducer)
  return {
    user: state.authReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    removeUser: () => dispatch(removeUser())
  }
}


export default connect(mapStateToProps)(Services)