import React from 'react';
import styled from 'styled-components/native';
import {Text, View} from 'react-native';

const InstructionContainer = styled(View)`
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90%;
`;

const StepsText = styled(Text)`
  margin-right: 5px;
`;

const Instructions = ({step}) => {
  return (
    <InstructionContainer>
      <StepsText>Step {step.number}:</StepsText>
      <View>
        <Text>{step.step}</Text>
      </View>
    </InstructionContainer>
  );
};

export default Instructions;
