// src/Components/QuestionCard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';

interface Option {
  id?: number;
  option_text: string;
}

interface Question {
  id: number;
  question_text: string;
  type: string;
  required: boolean;
  options?: Option[];
}

interface QuestionCardProps {
  question: Question;
  onDelete: () => void;
  onEdit: (updated: Question) => void;
  autoEdit?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onDelete, onEdit, autoEdit = false }) => {
  const [editing, setEditing] = useState(autoEdit);
  const [text, setText] = useState(question.question_text);
  const [type, setType] = useState(question.type);
  const [required, setRequired] = useState(question.required);
  const [options, setOptions] = useState<Option[]>(question.options || []);
  const [showSaved, setShowSaved] = useState(false);

  const requiresOptions = ['radio', 'checkbox', 'dropdown'].includes(type);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoEdit]);
  const handleAddOption = () => {
    setOptions([...options, { option_text: '' }]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index].option_text = value;
    setOptions(updated);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    router.put(`/questions/${question.id}`, {
      question_text: text,
      type,
      required,
      options: requiresOptions ? options.map(o => o.option_text).filter(o => o.trim() !== '') : [],
    }, {
      onSuccess: () => {
        onEdit({
          ...question,
          question_text: text,
          type,
          required,
          options: requiresOptions ? options : [],
        });
        setEditing(false);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
      },
    });
  };

  return (
    <div className="p-4 mb-3 rounded border shadow-sm bg-white" id={`question-${question.id}`}>
      {editing ? (
        <>
          <input value={text} onChange={(e) => setText(e.target.value)} className="block w-full mb-2 border p-2 rounded" />

          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full mb-2 border p-2 rounded">
            <option value="text">Texto corto</option>
            <option value="textarea">Texto largo</option>
            <option value="number">Número</option>
            <option value="date">Fecha</option>
            <option value="email">Email</option>
            <option value="dropdown">Lista desplegable</option>
            <option value="radio">Opción única</option>
            <option value="checkbox">Casillas</option>
          </select>

          <label className="inline-flex items-center mb-2">
            <input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} className="mr-2" />
            Requerido
          </label>

          {requiresOptions && (
            <div className="mb-2">
              <label className="block font-semibold mb-1">Opciones</label>
              {options.map((opt, i) => (
                <div key={i} className="flex items-center mb-1">
                  <input
                    type="text"
                    value={opt.option_text}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    className="flex-1 border p-2 rounded"
                  />
                  <button type="button" onClick={() => handleRemoveOption(i)} className="ml-2 text-red-500">✕</button>
                </div>
              ))}
              <button type="button" onClick={handleAddOption} className="text-sm text-blue-600 mt-1">+ Agregar opción</button>
            </div>
          )}

          <div className="space-x-2 mt-2">
            <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded">Guardar</button>
            <button onClick={() => setEditing(false)} className="text-gray-600">Cancelar</button>
            {showSaved && <span className="ml-4 text-green-600">Guardado ✓</span>}
          </div>
        </>
      ) : (
        <>
          <div className="text-lg font-semibold">{question.question_text}</div>
          <div className="text-sm text-gray-500 mb-2">
            Tipo: {question.type} | Requerido: {question.required ? 'Sí' : 'No'}
          </div>

          {requiresOptions && question.options && (
            <ul className="mb-2 pl-4 list-disc text-sm text-gray-700">
              {question.options.map((opt, i) => (
                <li key={i}>{opt.option_text}</li>
              ))}
            </ul>
          )}

          <div className="space-x-2">
            <button onClick={() => setEditing(true)} className="text-blue-600 text-sm">Editar</button>
            <button onClick={onDelete} className="text-red-600 text-sm">Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionCard;