// src/Components/AddQuestionForm.tsx
import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

interface AddQuestionFormProps {
  formId: number;
  onSuccess: (question: any) => void;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ formId, onSuccess }) => {
  const [text, setText] = useState('');
  const [type, setType] = useState('text');
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState<string[]>(['']);
  const [showSaved, setShowSaved] = useState(false);

  const requiresOptions = ['radio', 'checkbox', 'dropdown'].includes(type);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const resetForm = () => {
    setText('');
    setType('text');
    setRequired(false);
    setOptions(['']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.post(`/forms/${formId}/questions`, {
      question_text: text,
      type,
      required,
      options: requiresOptions ? options.filter(o => o.trim() !== '') : [],
    }, {
      onSuccess: (page) => {
        onSuccess(page.props.newQuestion);
        resetForm();
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Agregar nueva pregunta</h2>

      <input
        type="text"
        placeholder="Texto de la pregunta"
        className="w-full border p-2 rounded mb-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <select
        className="w-full border p-2 rounded mb-2"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="text">Texto corto</option>
        <option value="textarea">Texto largo</option>
        <option value="number">Número</option>
        <option value="date">Fecha</option>
        <option value="email">Email</option>
        <option value="dropdown">Lista desplegable</option>
        <option value="radio">Opción única</option>
        <option value="checkbox">Casillas</option>
      </select>

      <label className="inline-flex items-center mb-3">
        <input
          type="checkbox"
          checked={required}
          onChange={(e) => setRequired(e.target.checked)}
          className="mr-2"
        />
        Requerido
      </label>

      {requiresOptions && (
        <div className="mb-3">
          <label className="block font-semibold mb-1">Opciones</label>
          {options.map((opt, i) => (
            <div key={i} className="flex items-center mb-2">
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(i, e.target.value)}
                className="flex-1 border p-2 rounded"
              />
              <button type="button" onClick={() => handleRemoveOption(i)} className="ml-2 text-red-500">✕</button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="mt-1 text-blue-600 text-sm"
          >
            + Agregar opción
          </button>
        </div>
      )}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Guardar pregunta
      </button>

      {showSaved && <span className="ml-4 text-green-600">Guardado ✓</span>}
    </form>
  );
};

export default AddQuestionForm;