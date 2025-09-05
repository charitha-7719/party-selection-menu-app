import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function IngredientScreen({ route }) {
  const { dish } = route.params;

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={styles.title}>{dish.name}</Text>
      <Text style={styles.desc}>{dish.description}</Text>

      <Text style={{ marginTop: 16, fontWeight: '600' }}>Ingredients</Text>
      <FlatList
        data={dish.ingredients || []}
        keyExtractor={(it, idx) => String(idx)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.name}</Text>
            <Text style={{ color: '#555' }}>{item.qty}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700' },
  desc: { marginTop: 8, color: '#333' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#f0f0f0' }
});
