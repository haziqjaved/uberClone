import React,{useState,useEffect} from 'react';
import {  StyleSheet,View,Text} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { registerUser } from '../../config/firebase';
import { useNavigation } from '@react-navigation/core';

const SignUp=({navigation})=>{

    // const navigation =useNavigation();
    // const [userName, setUserName] = useState("");
    // const [email, setemail] = useState("");
    // const [mobileNumber, setMobileNumber] = useState("");
    // const [password, setpassword] = useState("");

    // async function signupHandler() {

    //     console.log("clicked signup");
    //     console.log(userName, email, mobileNumber, password);
    //     await registerUser(userName,email, mobileNumber, password)
    //     navigation.navigate('LogIn') }
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Create Account</Text>
            <Text style={{ color: 'grey',fontWeight: 'bold', fontSize: 16,  marginBottom: 20}}>
            Create a new account</Text>
            <TextInput
            label="UserName"
                // onChangeText={setUserName}
                left={<TextInput.Icon name="person" />}
                style={{width:280,marginTop:8,}} 
            />        
            <TextInput
            label="Email"
                // onChangeText={setemail}
                left={<TextInput.Icon name="email" />}
                style={{width:280,marginTop:8}}
            />
            <TextInput
                label='Phone number'
                // onChangeText={setMobileNumber}
                left={<TextInput.Icon name="phone" />}
               style={{width:280,marginTop:8}}
               
            />
            <TextInput
                label='Password' left={<TextInput.Icon name="lock" />}
                // onChangeText={setpassword}
                style={{width:280,marginTop:10}}
            />
           <View style={{width:220}}><Button mode="contained"
            // onPress={signupHandler}
            >Create Account</Button></View>
            <Text style={styles.bottomText}>Already have a account?
            <TouchableOpacity onPress = {() => navigation.goBack()} >
        <Text style={styles.createAccountLink}>
                Login
            </Text>
            </TouchableOpacity>
            </Text>
        </View>
    );
}
export default SignUp;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head: {
        fontSize: 33,
        fontWeight: 'bold',
    },

    createAccountLink: {
        color: 'green',
    },
    bottomText: {
        marginTop: 18
    }
});