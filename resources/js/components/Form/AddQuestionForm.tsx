// src/Components/AddQuestionForm.tsx
import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

interface Props {
  formId: number;
  onSuccess: (question: any) => void;
}

const AddQuestionForm: React.FC<Props> = ({ formId, onSuccess }) => {

  const [question_text, setText] = useState('');
  const [type, setType] = useState('text');
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState<string[]>(['']);
  // const [showSaved, setShowSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const needsOptions = ['radio', 'checkbox', 'dropdown'].includes(type);

  /* const handleAddOption = () => {
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
   };*/

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    router.post(
      `/forms/${formId}/questions`,
      {
        question_text,
        type,
        required,
        options: needsOptions ? options : [],
      },
      {
        onSuccess: (page) => {

          const flash = page.props.flash as { question?: any };
          const newQuestion = flash?.question;
          if (newQuestion) {
            onSuccess(newQuestion);
          }
          setText('');
          setType('text');
          setRequired(false);
          setOptions(['', '']);
        },
        onFinish: () => setSaving(false),
      }
    );
  };

  const updateOption = (value: string, idx: number) => {
    const updated = [...options];
    updated[idx] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (idx: number) => {
    const updated = options.filter((_, i) => i !== idx);
    setOptions(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-white">
      <h2 className="text-lg font-semibold mb-2">Agregar nueva pregunta</h2>
      <input
        value={question_text}
        onChange={e => setText(e.target.value)}
        placeholder="Texto de la pregunta"
        className="w-full p-2 border rounded mb-2"
      />
      <select value={type} onChange={e => setType(e.target.value)} className="w-full p-2 border rounded mb-2">
        <option value="text">Texto</option>
        <option value="textarea">Párrafo</option>
        <option value="radio">Elección única</option>
        <option value="checkbox">Casillas</option>
        <option value="dropdown">Desplegable</option>
        <option value="number">Número</option>
        <option value="date">Fecha</option>
        <option value="email">Email</option>
      </select>
      <label className="flex items-center space-x-2 mb-2">
        <input type="checkbox" checked={required} onChange={e => setRequired(e.target.checked)} />
        <span>Requerida</span>
      </label>

      {needsOptions && (
        <div className="mb-2">
          <p className="text-sm font-medium">Opciones:</p>
          {options.map((opt, idx) => (
            <div key={idx} className="flex space-x-2 mt-1">
              <input
                type="text"
                value={opt}
                onChange={e => updateOption(e.target.value, idx)}
                className="w-full p-1 border rounded"
              />
              <button type="button" onClick={() => removeOption(idx)} className="text-red-500">✕</button>
            </div>
          ))}
          <button onClick={addOption} type="button" className="text-sm text-blue-600 mt-2">+ Agregar opción</button>
        </div>
      )}

      <button type="submit" disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded">
        {saving ? 'Guardando...' : 'Agregar pregunta'}
      </button>
    </form>
  );
};

export default AddQuestionForm;