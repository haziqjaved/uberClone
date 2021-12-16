import React,{useState,useEffect} from 'react';
import {  StyleSheet,View,Text} from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default SignUp=({navigation})=>{

    return (
        <View style={styles.container}>
            <Text style={styles.head}>Create Account</Text>
            <Text style={{ color: 'grey',fontWeight: 'bold', fontSize: 16,  marginBottom: 20}}>
            Create a new account</Text>
            <TextInput
            label="UserName"
                left={<TextInput.Icon name="" />}
                style={{width:280,marginTop:8,}} 
            />        
            <TextInput
            label="Email"
                left={<TextInput.Icon name="email" />}
                style={{width:280,marginTop:8}}
            />
            <TextInput
                label='Phone number'
                left={<TextInput.Icon name="phone" />}
               style={{width:280,marginTop:8}}
               
            />
            <TextInput
                label='Password' left={<TextInput.Icon name="lock" />}
                style={{width:280,marginBottom:10,marginTop:8}}
            />
           <View style={{width:220}}><Button mode="contained"
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