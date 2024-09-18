import React from 'react';
import { FlatList } from 'react-native';

const YourListWrapperComponent = ({ data, renderItem, keyExtractor, numColumns }) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
    />
  );
};

export default YourListWrapperComponent;
