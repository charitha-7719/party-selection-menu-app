// Create folder src/components and file DishCard.js:

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function DishCard({ item, selected, onToggle, onIngredients }) {
  return (
    <View style={[styles.card, selected && styles.cardSelected]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => onToggle(item)} style={styles.btn}>
            <Text style={styles.btnText}>{selected ? 'Remove' : 'Add'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onIngredients(item)} style={styles.link}>
            <Text style={styles.linkText}>Ingredient</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageWrap}>
        {item.image ? <Image source={{ uri: item.image }} style={styles.image}/> : <View style={styles.placeholder}><Text>IMG</Text></View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 12, marginVertical: 6, marginHorizontal: 12, borderRadius: 8, backgroundColor: '#fff', elevation: 1 },
  cardSelected: { borderWidth: 2, borderColor: '#2e86de' },
  title: { fontWeight: '600', fontSize: 16 },
  desc: { color: '#444', marginTop: 4 },
  row: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
  btn: { paddingVertical: 6, paddingHorizontal: 10, backgroundColor: '#2e86de', borderRadius: 6 },
  btnText: { color: '#fff' },
  link: { marginLeft: 12 },
  linkText: { color: '#2e86de' },
  imageWrap: { width: 80, height: 60, justifyContent: 'center', alignItems: 'center' },
  placeholder: { width: 70, height: 50, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center', borderRadius: 6 },
  image: { width: 70, height: 50, borderRadius: 6 }
});
