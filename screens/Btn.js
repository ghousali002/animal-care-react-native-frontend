import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

export default function Btn({ bgColor, btnLabel, textColor, Press }) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: 'center',
        width: width * 0.9,
        paddingVertical: width * 0.05, 
        marginVertical: width * 0.03, 
      }}
    >
      <Text
        style={{
          color: textColor,
          fontSize: width * 0.06,
          fontWeight: 'bold',
        }}
      >
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
