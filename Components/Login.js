import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { Facebook } from 'expo'
// import { updateUser } from '../Redux/actions/authActions'
// import { connect } from 'react-redux'

import firebase from '../Config/firebase'

var provider = new firebase.auth.FacebookAuthProvider();

class Login extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log("props***",this.props)
  }

  async logIn() {
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync('314830379241742', {
          permissions: ['public_profile'],
        });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const data = await response.json()
          Alert.alert('Logged in!', `Hi ${data.name}!`);
          console.log('data***',data)
          data && this.props.login(true,data)
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }

      loginFirebase(){
        firebase.auth().signInWithPopup(provider).then((result)=> {
          var user = result.user
          console.log(user)
        })
        .then((user)=>{
          // console.log(user)
        })
        .catch(function(error) {
          // Handle Errors here.
          // var errorCode = error.code
          // var errorMessage = error.message
          // The email of the user's account used.
          // var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // var credential = error.credential;
          // ...
        });
      }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button
         onPress={()=> this.logIn()}
         title="Login"
          />
        {/* <Button
         onPress={()=> this.loginFirebase()}
         title="LoginWithFirebase"
          /> */}
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

// const mapStateToProps = (state) => {
//   console.log("mapToState",state)
//   return {
//     user: state.user
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateUser: (user) => dispatch(updateUser(user))
//   }
// }

export default Login;