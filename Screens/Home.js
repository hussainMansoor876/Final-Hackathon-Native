import React from 'react';
import { FloatingAction } from 'react-native-floating-action'
import { StyleSheet, Text, View, Platform, Alert } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { Header, Button } from 'react-native-elements';
import { Constants, Location, Permissions } from 'expo';
import { removeUser } from '../Redux/actions/authActions'
import { connect } from 'react-redux';
import axios from 'axios';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errorMessage: ''
    }
  }

  componentWillMount(){
    const { user } = this.props
    axios.get(`https://final-hackathon.herokuapp.com/user/get/${user.id}`)
    .then(function (response) {
      console.log('response',response);
    })
    .catch(function (error) {
      console.log('error',error);
    });
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    // const check = await Location.getProviderStatusAsync()
    // console.log('check',check.gpsAvailable)
    // if(!check.gpsAvailable){
    //   Alert.alert("Please Enable GPS")
    // }
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  checkUser(name){
    name == "Hospital" && this.props.navigation.navigate('Company')
  }

  render() {
    const { user } = this.props
    console.log('state***',this.state)   
    return (
        <View style={styles.container}>
        <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
            centerComponent={{ text: 'Mansoor Hussain Service App', style: { color: '#fff' } }}
            rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
          />
        <FloatingAction
          actions={actions}
          onPressItem={
            (name) => this.checkUser(name) }
        />
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

const actions = [ {
    text: 'Are You a Company?',
    icon: require('../Images/hospital.png'),
    name: 'Hospital',
    position: 1
  }, {
    text: 'Normal User',
    icon: require('../Images/user.png'),
    name: 'Normal User',
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
      removeUser: () => dispatch(removeUser())
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Home);