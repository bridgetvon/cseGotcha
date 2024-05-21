// Formik x React Native example
import React, {useState} from 'react';
import { TextInput, Text, View, StyleSheet, Alert, ScrollView, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';

const initialValues = {
  who: '',
  by: '',
  date: new Date(),
  what: '',
  options: [],
};

const optionsList = [
  { label: 'Humility', value: 'humility' },
  { label: 'Challenge and Growth', value: 'challenege' },
  { label: 'Integrity', value: 'integrity' },
  { label: 'Accountability', value: 'accountability' },
  { label: 'Open-Mindedness', value: 'openMindedness' },
  { label: 'Recognition', value: 'recognition' },
  { label: 'Trust', value: 'trust' },
  { label: 'Positive Impact', value: 'positiveImpact' },
  { label: 'Transparency', value: 'transparency' },
  { label: 'Team Work', value: 'teamWork' },
];

const Form = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
  
    const showDatePicker = () => {
      setDatePickerVisible(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };
  
    const handleConfirm = (date) => {
      setSelectedDate(date);
      hideDatePicker();
    };
    const [checkedItems, setCheckedItems] = useState(
        optionsList.reduce((acc, option) => {
          acc[option.value] = false;
          return acc;
        }, {})
      );
    
      const handleCheckboxChange = (optionValue) => {
        setCheckedItems(prevState => ({
          ...prevState,
          [optionValue]: !prevState[optionValue]
        }));
      };

return (
  <Formik
    initialValues={initialValues}
    onSubmit={(values, { setSubmitting }) => {
        if (!values.who || !values.by || !values.what || !values.date || !Object.values(checkedItems).some(Boolean)) {
          Alert.alert('Please fill out all fields');
          return;
        }
        console.log(values);
        setSubmitting;
      }}
    >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>Who are you recognizing:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={handleChange('who')}
          onBlur={handleBlur('who')}
          value={values.who}
        />
        <Text style={styles.label}>Recognized by:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={handleChange('by')}
          onBlur={handleBlur('by')}
          value={values.by}
        />
        <Text style={styles.label}>Date:</Text>
        <View style={styles.dateContainer}>
            <Text style={styles.selectedDate}>
                {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
            </Text>
            <Pressable style={styles.datePickerButton} onPress={showDatePicker}>
                <Ionicons name="calendar" size={16} color="white" />
            </Pressable>
        </View>
        <DateTimePickerModal
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Text style={styles.label}>What they did great:</Text>
        <TextInput
          style={styles.textInputLarge}
          onChangeText={handleChange('what')}
          onBlur={handleBlur('what')}
          value={values.what}
        />
        <Text style={styles.selectOptions}>Select Options:</Text>
        <View style={styles.optionsContainer}>
          {optionsList.map(option => (
            <View key={option.value} style={styles.optionItem}>
              <Checkbox
                  style={styles.checkbox}
                  value={checkedItems[option.value]}
                  onValueChange={() => handleCheckboxChange(option.value)}
                  color={'#1C4B97'}
                />
              <Text>{option.label}</Text>
            </View>
          ))}
        </View>
        <Pressable 
         style={styles.submit}
         onPress={handleSubmit} 
        >
        <Text style={styles.textSubmit}>Submit</Text>
        </Pressable>
      </ScrollView>
    )}
  </Formik>
)};

const styles = StyleSheet.create({
  formContainer: {
    padding: 8,
  },
  textInput: {
    color: 'black',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 5,
    padding: 8,
  },
  textInputLarge: {
    color: 'black',
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 5,
    padding: 8,
  },
  label : {
    fontWeight: 'bold'
  },
  selectOptions: {
    marginTop: 16,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    height: 24,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%', 
    marginBottom: 8,
  },
  submit: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#1C4B97',
    marginTop: 24,
  },
  textSubmit: {
    color: "#fff"
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color: 'black',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 5,
    justifyContent: 'space-between'
  },
  datePickerButton: {
    backgroundColor: '#1C4B97',
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  selectedDate: {
    fontSize: 16,
    padding: 8,
  },
});

export { Form };
