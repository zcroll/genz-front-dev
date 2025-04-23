// Debug file to check which theme store is being used
import { useThemeStore as useThemeStore1 } from './stores/theme'
import { useThemeStore as useThemeStore2 } from './stores/theme/themeStore'

console.log('Theme store from /stores/theme:', useThemeStore1)
console.log('Theme store from /stores/theme/themeStore:', useThemeStore2)

// Check if they are the same store
console.log('Are they the same store?', useThemeStore1 === useThemeStore2)

// Create instances
const store1 = useThemeStore1()
const store2 = useThemeStore2()

// Check available methods and properties
console.log('Store1 methods:', Object.keys(store1))
console.log('Store2 methods:', Object.keys(store2))

// Check if getThemeClasses exists
console.log('Store1 has getThemeClasses?', 'getThemeClasses' in store1)
console.log('Store2 has getThemeClasses?', 'getThemeClasses' in store2)
