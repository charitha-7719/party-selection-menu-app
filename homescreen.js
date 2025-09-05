import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { DISHES } from '../data/dishes';
import DishCard from '../components/DishCard';

const MEALS = ['STARTER','MAIN COURSE','DESSERT','SIDES'];

export default function HomeScreen({ navigation }) {
  const [selectedMeal, setSelectedMeal] = useState('MAIN COURSE');
  const [search, setSearch] = useState('');
  const [vegFilter, setVegFilter] = useState(true);
  const [nonVegFilter, setNonVegFilter] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  const dishesByMeal = useMemo(() => {
    return DISHES.filter(d => d.mealType === selectedMeal);
  }, [selectedMeal]);

  const filtered = useMemo(() => {
    return dishesByMeal.filter(d => {
      if (!vegFilter && d.type === 'VEG') return false;
      if (!nonVegFilter && d.type === 'NON-VEG') return false;
      if (search.trim() !== '' && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [dishesByMeal, vegFilter, nonVegFilter, search]);

  function toggleSelect(item) {
    setSelectedIds(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id]);
  }

  function goIngredients(item) {
    navigation.navigate('Ingredient', { dish: item, selected: selectedIds.includes(item.id) });
  }

  function selectedCountFor(meal) {
    return DISHES.filter(d => d.mealType === meal && selectedIds.includes(d.id)).length;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        <TextInput placeholder="Search in selected category..." value={search} onChangeText={setSearch} style={styles.search} />
        <View style={styles.filterRow}>
          <TouchableOpacity onPress={() => setVegFilter(v => !v)} style={[styles.filterBtn, vegFilter ? styles.filterActive : null]}>
            <Text>{vegFilter ? 'Veg ✓' : 'Veg'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setNonVegFilter(v => !v)} style={[styles.filterBtn, nonVegFilter ? styles.filterActive : null]}>
            <Text>{nonVegFilter ? 'Non-Veg ✓' : 'Non-Veg'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabs}>
          {MEALS.map(m => (
            <TouchableOpacity key={m} onPress={() => { setSelectedMeal(m); setSearch(''); }} style={[styles.tab, selectedMeal===m && styles.tabActive]}>
              <Text style={{ fontWeight: '600' }}>{m}</Text>
              <Text style={{ fontSize: 12 }}>{selectedCountFor(m)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DishCard item={item} selected={selectedIds.includes(item.id)} onToggle={toggleSelect} onIngredients={goIngredients} />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <View style={styles.footer}>
        <Text style={{ fontWeight: '600' }}>Total selected: {selectedIds.length}</Text>
        <TouchableOpacity style={styles.continueBtn}>
          <Text style={{ color: '#fff' }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8 },
  filterRow: { flexDirection: 'row', marginTop: 8, gap: 10 },
  filterBtn: { padding: 8, borderRadius: 6, borderWidth: 1, borderColor: '#ddd', marginRight: 8 },
  filterActive: { backgroundColor: '#dff0ff' },
  tabs: { flexDirection: 'row', marginTop: 12, justifyContent: 'space-around' },
  tab: { padding: 8, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderColor: '#2e86de' },
  footer: { position: 'absolute', left: 12, right: 12, bottom: 16, backgroundColor: '#fff', padding: 12, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 4 },
  continueBtn: { backgroundColor: '#2e86de', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 }
});