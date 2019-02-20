import React from 'react';
import { StyleSheet, Text, View, Platform, Alert } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { Header, Button, Input } from 'react-native-elements';
import { Constants, Location, Permissions } from 'expo';
import { updateUser, removeUser } from '../Redux/actions/authActions'
import { connect } from 'react-redux';
import axios from 'axios';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount(){
    const { user } = this.props
    axios.get(`https://final-hackathon.herokuapp.com/user/get/${user.id}`)
    .then((response) => {
      this.props.updateUser(response.data[0])
    })
    .catch(function (error) {
      console.log('error',error);
    });
  }


  checkUser(name){
    name == "Hospital" && this.props.navigation.navigate('Company')
  }

  render() {
    const { user } = this.props
    // console.log('state***',this.state)   
    return (
        <View style={styles.container}>
        <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
            centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
            rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
          />
          <View style={{margin: 5}}>
           <Input
            placeholder='INPUT WITH ICON'
            leftIcon={{ type: 'font-awesome', name: 'search' }}
            inputContainerStyle={{borderColor: 'black', borderStyle: 'solid', borderWidth: 1, borderRadius: 15}}
          />
          </View>
          <View style={{margin: 5}}>
          <Button
            title="UPDATE SERVICES"
          />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(Home);