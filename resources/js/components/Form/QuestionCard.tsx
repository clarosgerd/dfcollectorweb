import React, { useState } from 'react';

interface Question {
  id: number;
  question_text: string;
  type: string;
  required: boolean;
  options?: string[];
}

interface Props {
  question: Question;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onEdit: (q: Question) => void;
  onDelete: () => void;
}

const QuestionCard: React.FC<Props> = ({ question, isEditing, onStartEdit, onCancelEdit, onEdit, onDelete }) => {
  const [formData, setFormData] = useState<Question>(question);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleOptionsChange = (index: number, value: string) => {
    const newOptions = [...(formData.options || [])];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => setFormData(prev => ({ ...prev, options: [...(prev.options || []), ''] }));
  const removeOption = (index: number) => {
    const newOptions = [...(formData.options || [])];
    newOptions.splice(index, 1);
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = () => onEdit(formData);

  const needsOptions = ['radio', 'checkbox', 'dropdown'].includes(formData.type);

  const renderPreview = () => {
    if (question.type === 'radio') {
      return question.options?.map((opt, i) => (
        <div key={i}>
          <input type="radio" disabled /> <span>{opt}</span>
        </div>
      ));
    }
    // similar para checkbox y dropdown...
  };
  if (isEditing) {
    return (
      <div className="p-4 border rounded bg-white">
        <input name="question_text" value={formData.question_text} onChange={handleChange} className="mb-2 w-full border p-2 rounded" />
        <select name="type" value={formData.type} onChange={handleChange} className="mb-2 w-full border p-2 rounded">
          <option value="text">Texto</option>
          <option value="radio">Elección única</option>
          <option value="checkbox">Casillas</option>
          <option value="dropdown">Desplegable</option>
        </select>
        <label className="flex items-center mb-2">
          <input type="checkbox" name="required" checked={formData.required} onChange={handleChange} />
          <span className="ml-2">Requerido</span>
        </label>

        {needsOptions && (
          <div className="mb-2">
            <label>Opciones:</label>
            {(formData.options || []).map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2 mt-1">
                <input
                  value={opt}
                  onChange={(e) => handleOptionsChange(idx, e.target.value)}
                  className="flex-1 p-1 border rounded"
                />
                <button type="button" onClick={() => removeOption(idx)} className="text-red-500">✕</button>
              </div>
            ))}
            <button type="button" onClick={addOption} className="mt-1 text-sm text-blue-500">+ Añadir opción</button>
          </div>
        )}

        <div className="mt-3 space-x-2">
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-3 py-1 rounded">Guardar</button>
          <button onClick={onCancelEdit} className="text-gray-600 px-3 py-1">Cancelar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded bg-gray-100">
      <div className="flex justify-between">
        <h4 className="font-semibold">{question.question_text}</h4>
        <div className="text-sm space-x-2">
          <button onClick={onStartEdit} className="text-blue-600">Editar</button>
          <button onClick={onDelete} className="text-red-600">Eliminar</button>
        </div>
      </div>
      <p className="text-sm text-gray-600">Tipo: {question.type}</p>
      {question.required && <p className="text-xs text-red-500">* Obligatoria</p>}
      {(question.options?.length ?? 0) > 0 && (
        <ul className="mt-2 text-sm">
          {question.options?.map((opt, idx) => (
            <li key={idx}>- {opt}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionCard;
