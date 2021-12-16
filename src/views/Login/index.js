import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image,StyleSheet, Text, View } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import { loginUser } from '../../config/firebase';
import React,{useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/core';


const forget=()=>{
    alert('Contact Admin  Email:haziqjaved31@gmail.com')
}

  
export default Login=({navigation})=> {
    // const navigation=useNavigation();  
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // async function loginHandler() {
    //   console.log(email, password);
    //   await loginUser(email, password);
    //   navigation.navigate('dashboard')
    // }
    return (
        <View style={styles.container}>
            <Image
                style={styles.Avatar}
                source={{ uri: 'http://pngimg.com/uploads/uber/uber_PNG23.png' }}
            />
            <Text style={styles.head}>Welcome Back</Text>
            <Text style={styles.signin}>Signin to continue</Text>
            <TextInput
                label="Email"
                // onChangeText={setEmail}
                left={<TextInput.Icon name="email" />}
                style={{width:300}}
            />
            <TextInput
                label='Password'
                // onChangeText={setPassword}
                 left={<TextInput.Icon name="lock" />}
                style={{width:300,marginTop:10}}
            />
            <Text style={styles.forget}  onPress={forget}>Forget Password?</Text>
           <View style={{width:220}}><Button mode="contained"  
           onPress={() => navigation.navigate('Dashboard')} 
        //    onPress={loginHandler}
           >LogIn</Button></View>
            <Text style={styles.bottomText}>Don't have account?
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                    <Text style={styles.createAccountLink}> Create a new Account
                    </Text>
                </TouchableOpacity>
            </Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, Avatar: {
        width: 160,
        height: 160,
        backgroundColor:'transparent'
    },
    head: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    signin: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 20
    },
    forget: {
        color: 'green',
        marginLeft: 150,
        marginTop:8,
        marginBottom: 10,
    },
    createAccountLink: {
        color: 'green',
        fontSize: 15,
    },
    bottomText: {
        marginTop: 18
    }
});