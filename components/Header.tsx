import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Header() {
    const {user}=useUser();
  return (
    <View>
        <View style={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20
        }}>
            <Image source={{ uri:user?.imageUrl}} style={{
                width: 50,
                height: 50,
                borderRadius: 99
            }} />
            <View>
                <Text style={styles.heading}>Welcome</Text>
                <Text style={[styles.heading, {fontFamily: 'appFontBold' }]}>{user?.fullName}</Text>
            </View>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    heading:{
        fontSize: 20,
        fontFamily: 'appFont',
        fontWeight: 'bold',
        marginBottom: 10
    }

})