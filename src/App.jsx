import React from 'react';
import FormBuilder from './components/FormBuilder';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dynamic Form Builder</h1>
          <p className="text-gray-600">Create complex form schemas with nested structures</p>
        </div>
        <FormBuilder />
      </div>
    </div>
  );
}

export default App;