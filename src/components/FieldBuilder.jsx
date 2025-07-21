import React from 'react';
import { X, Plus } from 'lucide-react';

const fieldTypes = ['string', 'number', 'boolean', 'nested', 'objectId', 'float'];

const FieldBuilder = ({
  field,
  onUpdate,
  onDelete,
  onAddNested,
  level
}) => {
  const handleNameChange = (e) => {
    onUpdate(field.id, { name: e.target.value });
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    onUpdate(field.id, { 
      type: newType,
      children: newType === 'nested' ? field.children : []
    });
  };

  const handleRequiredChange = (e) => {
    onUpdate(field.id, { required: e.target.checked });
  };

  const indentClass = level > 0 ? `ml-${Math.min(level * 6, 24)} border-l-2 border-gray-200 pl-4` : '';

  return (
    <div className={`space-y-3 ${indentClass}`}>
      <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
        {/* Field Name Input */}
        <div className="flex-1">
          <input
            type="text"
            value={field.name}
            onChange={handleNameChange}
            placeholder="Field Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Field Type Select */}
        <div className="w-32">
          <select
            value={field.type}
            onChange={handleTypeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {fieldTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Required Toggle */}
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={field.required}
              onChange={handleRequiredChange}
              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Required</span>
          </label>
        </div>

        {/* Add Nested Button */}
        {field.type === 'nested' && (
          <button
            onClick={() => onAddNested(field.id)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
            title="Add nested field"
          >
            <Plus size={16} />
          </button>
        )}

        {/* Delete Button */}
        <button
          onClick={() => onDelete(field.id)}
          className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
          title="Delete field"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nested Fields */}
      {field.type === 'nested' && field.children && field.children.length > 0 && (
        <div className="space-y-3">
          {field.children.map((childField) => (
            <FieldBuilder
              key={childField.id}
              field={childField}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onAddNested={onAddNested}
              level={level + 1}
            />
          ))}
        </div>
      )}

      {/* Add Item Button for Nested */}
      {field.type === 'nested' && (
        <div className={`${level > 0 ? 'ml-6' : ''}`}>
          <button
            onClick={() => onAddNested(field.id)}
            className="w-full py-2 px-4 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            + Add Item
          </button>
        </div>
      )}
    </div>
  );
};

export default FieldBuilder;