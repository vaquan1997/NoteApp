import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Switch } from 'react-native'
import React, { useState } from 'react'
import { size } from 'lodash';
import FeatherIcon from 'react-native-vector-icons/Feather';

const SECTIONS = [
  {
    header: 'General settings',
    items: [
      { id: 'language', icon: 'globe', label: 'Language', type: 'select' },
      { id: 'darkMode', icon: 'moon', label: 'Dark mode', type: 'toggle' },
    ],
  },
  {
    header: 'User information',
    items: [
      { id: 'account', icon: 'user', label: 'Account', type: 'select' },
      { id: 'avatar', icon: 'edit-2', label: 'Change avatar', type: 'select' },
      { id: 'calendar', icon: 'calendar', label: 'Calendar sync', type: 'toggle' },
    ],
  },
  {
    header: 'Notification',
    items: [
      { id: 'notification', icon: 'bell', label: 'Notification', type: 'toggle' },
      { id: 'ringTune', icon: 'volume-1', label: 'Ringtune', type: 'select' },
      { id: 'timer', icon: 'clock', label: 'Timer', type: 'select' },
    ],
  },
  {
    header: 'Security and privacy',
    items: [
      { id: 'privacyPolicy', label: 'Privacy Policy', type: 'select' },
      { id: 'privacyStatement', label: 'Privacy Statement', type: 'select' },
    ],
  },
];

const SettingScreen = () => {

  const [form, setForm] = useState({
    language: 'English',
    // darkMode: false,
    ringTune: 'Sorry - Justin Bieber',
    timer: '8AM - 10AM'
  })
  const [darkMode, setDarkMode] = useState(false);
  const handleDarkModeChange = (value) => {
    setDarkMode(value);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F3F4' }}>
      <ScrollView contentContainerStyle={[styles.container, darkMode && styles.darkContainer]}>
        <View style={styles.header}>
          <Text style={[styles.title,darkMode && styles.darkTitle]}>Settings</Text>
          {/* <Text style={styles.subtitle}>Update your preference here</Text> */}
        </View>
        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>

            <View>
              {items.map(({ label, id, type, icon }, index) => (
                <View style={[styles.rowWrapper, darkMode && styles.darkRowWrapper, index === 0 && { borderTopWidth: 0 },]} key={id}>
                  <TouchableOpacity onPress={() => {
                    //handle onPress
                  }}>
                    <View style={styles.row}>
                      <FeatherIcon name={icon} color='#616161' size={22} style={{ marginRight: 12 }} />
                      <Text style={[styles.rowLabel,darkMode && styles.darkRowLabel]}>{label}</Text>
                      <View style={styles.rowSpacer} />

                      {type === 'select' && (
                        <Text style={styles.rowValue}>{form[id]}</Text>
                      )}
                      {type === 'toggle' && id !== 'darkMode' && <Switch value={form[id]} onValueChange={value => {
                        setForm({ ...form, [id]: value })
                      }} />}

                      {/* toggle dark mode */}
                      {type === 'toggle' && id === 'darkMode' && (
                        <Switch
                          value={darkMode}
                          onValueChange={handleDarkModeChange}
                        />
                      )}

                      {['select', 'link'].includes(type) && (
                        <FeatherIcon name="chevron-right" color='#ababab' size={22} />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>

              ))}

            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView >
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },

  darkContainer: {
    backgroundColor: '#1d1d1d',
    color : 'white'
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    // marginBottom: 6,
  },
  darkTitle : {
    fontSize: 32,
    fontWeight: '700',
    color : '#fff'
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  section: {
    // paddingTop: 10,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2
  },
  rowWrapper: {
    paddingLeft: 24,
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
    backgroundColor: '#fff'
  },
  darkRowWrapper : {
    paddingLeft: 24,
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
    backgroundColor: '#1d1d1d'
  },
  rowLabel: {
    fontWeight: '700',
    color: '#000',
    fontSize: 16,
  },
  darkRowLabel : {
    fontWeight: '700',
    color: '#fff',
    fontSize: 16,
  },
  row: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 24,
    // backgroundColor ;
  },
  rowSpacer: {
    flex: 1
  },
  rowValue: {
    fontSize: 17,
    fontWeight: '500',
    color: '#616161',
    marginRight: 4,
  }
})