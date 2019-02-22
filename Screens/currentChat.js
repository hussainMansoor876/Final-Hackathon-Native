import React from 'react';
import { FloatingAction } from 'react-native-floating-action'
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Header, Button, CheckBox } from 'react-native-elements';
import { updateUser, removeUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import axios from 'axios';

class currentChat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    const { user } = this.props
    return (
        <ScrollView style={{flex: 1}}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <View style={styles.container}>
        </View>
      </ScrollView>
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


export default connect(mapStateToProps,mapDispatchToProps)(currentChat)