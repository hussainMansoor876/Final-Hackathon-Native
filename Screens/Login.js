import React from 'react';
import { StyleSheet, View, Alert, TextInput,Text } from 'react-native';
import { Facebook, Google } from 'expo'
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { updateUser, newUser } from '../Redux/actions/authActions'
import { connect } from 'react-redux'
import axios from 'axios';
import Navigator from '../navigation/AppNavigator'

import firebase from '../Config/firebase'

const provider = new firebase.auth.FacebookAuthProvider();
const providerGoogle = new firebase.auth.GoogleAuthProvider();

const secretId = '--Gtc8Phtm930WPcOKaqcUIY'
const firebaseClientId = '978845703836-lvmi5o7e87jl3dbbknu6dad0vgll6uvi.apps.googleusercontent.com'
const firebaseSecretId = '2eL7fBh-WSRcCBjJPTcnDDz_'

class Login extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log("props***",this.props.new)
    this.props.newUser(false)
    // this.props.updateUser({name: 'mansoor'})
    // console.log("props***",this.props)    
  }

  async logIn(){
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync('787190688316212', {
          permissions: ['groups_access_member_info'],
        });
        console.log('this',this.props)
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const user = await response.json()
          // Alert.alert('Logged in!', `Hi ${data.name}!`);
          axios.get(`https://final-hackathon.herokuapp.com/user/get/${user.id}`)
          .then((response) => {
            console.log('response',response.data);
            const { data } = response
            if(!data.length){
              this.props.newUser(true)
            }
          })
          .catch(function (error) {
            console.log('error',error);
          });
          this.props.updateUser(user)      
          console.log('data***',user)
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }

     

      async googleLogin(){
        const clientId  = '777635686273-80tsm7h4k70oue449p34ontp0o86q1e5.apps.googleusercontent.com'
        const { type, accessToken, user } = await Google.logInAsync({ clientId })
        console.log('user***',user);        
        if (type === 'success') {
          /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
          console.log('user***',user);
          // Alert.alert('Logged in!', `Hi ${user.email}!`);
          this.props.updateUser(user)
        }
      }

  render() {
    const { user } = this.props
    console.log('props+',this.props)
    return (
      <View style={styles.container}>
      { user ? <Navigator />
       :
      <View>
        <View style={{marginTop: 150, marginBottom: 2, marginLeft: 1, marginRight: 1}}>
        <Button
          icon={
            <Icon
            name="google"
            size={25}
            color="white"
            />
          }
          onPress = {() => this.googleLogin()}
          title="Login with Google"
          />
        </View>
        <View style={{marginTop: 5, marginBottom: 70, marginLeft: 1, marginRight: 1}}>
        <Button
          icon={
            <Icon
            name="facebook"
            size={25}
            color="white"
            />
          }
          style={{backgroundColor: "green"}}
          color= '#fff'
          onPress={()=> this.logIn()}
          title="Login with Facebook"
          />
        </View>
          <Text>Wellcome to Mansoor Hussain Hospital Token App</Text>
      </View>}
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
  }
});


const mapStateToProps = (state) => {
  console.log("mapToState",state.authReducer)
  return {
    user: state.authReducer.user,
    new: state.authReducer.new
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    newUser: (bool) => dispatch(newUser(bool))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);