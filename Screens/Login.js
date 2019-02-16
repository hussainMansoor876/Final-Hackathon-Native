import React from 'react';
import { StyleSheet, View, Alert, TextInput,Text, Image } from 'react-native';
import { Facebook, Google, ImagePicker } from 'expo'
import { Button, Header, Input, FormLabel, FormInput } from 'react-native-elements';
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
    this.state = {
      imageName: null,
      image: null
    }
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
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const user = await response.json()
          axios.get(`https://final-hackathon.herokuapp.com/user/get/${user.id}`)
          .then((response) => {
            console.log('response',response.data);
            const { data } = response
            if(!data.length){
              this.props.newUser(true)
              this.props.updateUser(user)
            }
            else{
              this.props.updateUser(user)
            }
          })
          .catch(function (error) {
            console.log('error',error);
          });             
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
          axios.get(`https://final-hackathon.herokuapp.com/user/get/${user.id}`)
          .then((response) => {
            console.log('response',response.data);
            const { data } = response
            if(!data.length){
              this.props.newUser(true)
              this.props.updateUser(user)
            }
            else{
              this.props.updateUser(user)
            }
          })
          .catch(function (error) {
            console.log('error',error);
          });
        }
      }

      async pickImage(){
        console.log("hello")
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        })
        console.log('Result***',result)
    
        if (!result.cancelled) {
          this.uploadImage(result.uri,"mansoor")
            .then((res) => {
              console.log("Success***")
              console.log("Res***",res)
              this.setState({ image: res, imageName: result.uri });
            })
            .catch(error => {
              console.log("Error==>",error)
            })
        }
      };
      

      uploadImage = async (uri,imageName) => {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        })
        return await blob;
      }
      

  render() {
    const { user } = this.props
    const { imageName, image } = this.state
    console.log('this',this.state)
    return (
      <View style={styles.container}>
      {/* { user ? <Navigator />
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
      </View>} */}
      <Input
          placeholder='BASIC INPUT'
        />
        <Input
        placeholder='INPUT WITH ICON'
        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
      />

      <Input
        placeholder='INPUT WITH CUSTOM ICON'
        leftIcon={
          <Icon
            name='user'
            size={24}
            color='black'
          />
        }
      />
      <Button
            title={!imageName ? "Pick Image" : imageName.slice(imageName.length - 20,imageName.length)}
            onPress={() => this.pickImage()}
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