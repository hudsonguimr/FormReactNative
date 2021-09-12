import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
  ButtonItems,
  TextItems
 } from './styles';

interface ItemsCardsProps extends TouchableOpacityProps {
  name: string;
  email: string;
  telefone: string;

}

export function ItemsCards({ name,email,telefone, ...rest }: ItemsCardsProps) {
  return (
    <ButtonItems 
      {...rest}
    >
      <TextItems style={{fontSize:10}}>{name}</TextItems>
      <TextItems style={{fontSize:15}}>{email}</TextItems>
      <TextItems style={{fontSize:20}}>{telefone}</TextItems>
     
    </ButtonItems>
  )
}