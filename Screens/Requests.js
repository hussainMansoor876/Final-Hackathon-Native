import React from 'react';
import { FloatingAction } from 'react-native-floating-action'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Header, Button, CheckBox, Icon } from 'react-native-elements';
import { updateUser, removeUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import axios from 'axios';

class Requests extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
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
    user: state.authReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    removeUser: () => dispatch(removeUser())
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Requests)