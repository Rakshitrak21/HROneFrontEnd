import React, { useState } from 'react';
import FieldBuilder from './FieldBuilder';
import JsonPreview from './JsonPreview';
import { Plus } from 'lucide-react';

const FormBuilder = () => {
  const [fields, setFields] = useState([
    {
      id: '1',
      name: 'user',
      type: 'nested',
      required: true,
      children: [
        {
          id: '2',
          name: 'firstName',
          type: 'string',
          required: true,
          children: []
        },
        {
          id: '3',
          name: 'lastName',
          type: 'string',
          required: true,
          children: []
        },
        {
          id: '4',
          name: 'age',
          type: 'number',
          required: false,
          children: []
        },
        {
          id: '5',
          name: 'isActive',
          type: 'boolean',
          required: false,
          children: []
        },
        {
          id: '6',
          name: 'profile',
          type: 'nested',
          required: false,
          children: [
            {
              id: '7',
              name: 'bio',
              type: 'string',
              required: false,
              children: []
            },
            {
              id: '8',
              name: 'avatar',
              type: 'string',
              required: false,
              children: []
            },
            {
              id: '9',
              name: 'socialMedia',
              type: 'nested',
              required: false,
              children: [
                {
                  id: '10',
                  name: 'twitter',
                  type: 'string',
                  required: false,
                  children: []
                },
                {
                  id: '11',
                  name: 'linkedin',
                  type: 'string',
                  required: false,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '12',
      name: 'company',
      type: 'nested',
      required: true,
      children: [
        {
          id: '13',
          name: 'name',
          type: 'string',
          required: true,
          children: []
        },
        {
          id: '14',
          name: 'employeeCount',
          type: 'number',
          required: false,
          children: []
        },
        {
          id: '15',
          name: 'revenue',
          type: 'float',
          required: false,
          children: []
        },
        {
          id: '16',
          name: 'companyId',
          type: 'objectId',
          required: true,
          children: []
        },
        {
          id: '17',
          name: 'departments',
          type: 'nested',
          required: false,
          children: [
            {
              id: '18',
              name: 'engineering',
              type: 'nested',
              required: false,
              children: [
                {
                  id: '19',
                  name: 'teamLead',
                  type: 'string',
                  required: false,
                  children: []
                },
                {
                  id: '20',
                  name: 'memberCount',
                  type: 'number',
                  required: false,
                  children: []
                }
              ]
            },
            {
              id: '21',
              name: 'marketing',
              type: 'nested',
              required: false,
              children: [
                {
                  id: '22',
                  name: 'budget',
                  type: 'float',
                  required: false,
                  children: []
                },
                {
                  id: '23',
                  name: 'campaigns',
                  type: 'number',
                  required: false,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: '24',
      name: 'metadata',
      type: 'nested',
      required: false,
      children: [
        {
          id: '25',
          name: 'createdAt',
          type: 'string',
          required: true,
          children: []
        },
        {
          id: '26',
          name: 'updatedAt',
          type: 'string',
          required: false,
          children: []
        },
        {
          id: '27',
          name: 'version',
          type: 'number',
          required: true,
          children: []
        },
        {
          id: '28',
          name: 'tags',
          type: 'nested',
          required: false,
          children: [
            {
              id: '29',
              name: 'category',
              type: 'string',
              required: false,
              children: []
            },
            {
              id: '30',
              name: 'priority',
              type: 'number',
              required: false,
              children: []
            }
          ]
        }
      ]
    }
  ]);

  const addField = () => {
    const newField = {
      id: Date.now().toString(),
      name: '',
      type: 'string',
      required: false,
      children: []
    };
    setFields([...fields, newField]);
  };

  const updateField = (id, updates) => {
    const updateFieldRecursive = (fields) => {
      return fields.map(field => {
        if (field.id === id) {
          return { ...field, ...updates };
        }
        if (field.children && field.children.length > 0) {
          return {
            ...field,
            children: updateFieldRecursive(field.children)
          };
        }
        return field;
      });
    };
    
    setFields(updateFieldRecursive(fields));
  };

  const deleteField = (id) => {
    const deleteFieldRecursive = (fields) => {
      return fields
        .filter(field => field.id !== id)
        .map(field => ({
          ...field,
          children: field.children ? deleteFieldRecursive(field.children) : []
        }));
    };
    
    setFields(deleteFieldRecursive(fields));
  };

  const addNestedField = (parentId) => {
    const newField = {
      id: Date.now().toString(),
      name: '',
      type: 'string',
      required: false,
      children: []
    };

    const addToParent = (fields) => {
      return fields.map(field => {
        if (field.id === parentId) {
          return {
            ...field,
            children: [...(field.children || []), newField]
          };
        }
        if (field.children && field.children.length > 0) {
          return {
            ...field,
            children: addToParent(field.children)
          };
        }
        return field;
      });
    };

    setFields(addToParent(fields));
  };

  const generateSchema = () => {
    const buildSchema = (fields) => {
      const schema = {};
      
      fields.forEach(field => {
        if (field.name.trim()) {
          if (field.type === 'nested' && field.children && field.children.length > 0) {
            schema[field.name] = buildSchema(field.children);
          } else {
            schema[field.name] = field.type;
          }
        }
      });
      
      return schema;
    };

    return buildSchema(fields);
  };

  const handleSubmit = () => {
    const schema = generateSchema();
    console.log('Generated Schema:', schema);
    alert('Form schema submitted! Check console for details.');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Builder Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Form Fields</h2>
          
        </div>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {fields.map((field) => (
            <FieldBuilder
              key={field.id}
              field={field}
              onUpdate={updateField}
              onDelete={deleteField}
              onAddNested={addNestedField}
              level={0}
            />
          ))}
        </div>

        <button
          onClick={addField}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          Add Field
        </button>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Submit
        </button>
      </div>

      {/* JSON Preview Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Schema Preview</h2>
        <JsonPreview schema={generateSchema()} />
      </div>
    </div>
  );
};

export default FormBuilder;