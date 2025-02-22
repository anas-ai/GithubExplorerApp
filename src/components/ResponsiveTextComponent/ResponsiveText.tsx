import {View, Text, StyleSheet, TextStyle} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';

interface ResponsiveTextProps {
  title: string;
  fontColor?: string;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  fontStyle?: TextStyle;
  }

const ResponsiveText:React.FC<ResponsiveTextProps> = ({
  title = '',
  fontSize,
  fontColor,
  fontWeight,
  fontStyle,
}: any) => {
  return (
    <Text
      style={{
        fontSize: moderateScale(fontSize || 14),
        color: fontColor,
        fontWeight: fontWeight,
        ...fontStyle,
      }}>
      {title}
    </Text>
  );
};

export default ResponsiveText;
