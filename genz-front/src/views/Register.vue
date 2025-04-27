<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { useUserStore } from '@/stores/user';
import MainLayout from "@/layout/Main-layout.vue";

// Import form components
import Form from '@/components/ui/form/Form.vue';
import FormField from '@/components/ui/form/FormField.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import FormLabel from '@/components/ui/form/FormLabel.vue';
import FormControl from '@/components/ui/form/FormControl.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';
import Input from '@/components/ui/input/Input.vue';

defineOptions({
  layout: MainLayout,
});

// Define validation schema
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  password_confirmation: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

// Initialize user store and router
const userStore = useUserStore();
const router = useRouter();

// Form state
const isSubmitting = ref(false);
const error = ref('');

// Handle form submission
const onSubmit = async (values) => {
  isSubmitting.value = true;
  error.value = '';
  
  try {
    await userStore.register(
      values.name,
      values.email,
      values.password,
      values.password_confirmation
    );
    router.push('/dashboard');
  } catch (err) {
    error.value = err.message || 'Registration failed. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto">
      <h1 class="text-2xl font-bold mb-6">Register</h1>
      
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>
      
      <Form :schema="schema" @submit="onSubmit">
        <FormField name="name">
          <FormItem>
            <FormLabel required>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        
        <FormField name="email">
          <FormItem>
            <FormLabel required>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter your email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        
        <FormField name="password">
          <FormItem>
            <FormLabel required>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Create a password" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        
        <FormField name="password_confirmation">
          <FormItem>
            <FormLabel required>Confirm Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Confirm your password" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        
        <div class="mt-6">
          <button 
            type="submit" 
            class="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Registering...' : 'Register' }}
          </button>
        </div>
        
        <div class="mt-4 text-center">
          <p>
            Already have an account?
            <router-link to="/login" class="text-primary hover:underline">Login</router-link>
          </p>
        </div>
      </Form>
    </div>
  </div>
</template>