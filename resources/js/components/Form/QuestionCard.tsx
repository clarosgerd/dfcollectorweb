import React, { useState, useEffect } from 'react';

interface Question {
  id: number;
  question_text: string;
  type: string;
  required: boolean;
}

interface Props {
  question: Question;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onEdit: (q: Question) => void;
  onDelete: () => void;
}

const QuestionCard: React.FC<Props> = ({
  question,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onEdit,
  onDelete
}) => {
  const [formData, setFormData] = useState<Question>(question);
  useEffect(() => {

    setFormData(question);
  }, [question]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //const [checked, setChecked] = useState('')
    //setChecked(e.target.value);
    const { name, value, type ,checked} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onEdit(formData);
  };

  if (isEditing) {
    return (
      <div className="p-4 border rounded-md mb-2 bg-white">
        <input
          type="text"
          name="question_text"
          value={formData.question_text}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="text">Texto</option>
          <option value="textarea">Parrafo</option>
          <option value="radio">Elección única</option>
          <option value="checkbox">Casillas</option>
          <option value="dropdown">Desplegable</option>
          <option value="number">Número</option>
          <option value="date">Fecha</option>
          <option value="email">Email</option>
        </select>
        <label className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            name="required"
            checked={formData.required}
            onChange={handleChange}
          />
          <span>Requerida</span>
        </label>
        <div className="space-x-2">
          <button onClick={handleSubmit} className="px-3 py-1 bg-blue-600 text-white rounded">Guardar</button>
          <button onClick={onCancelEdit} className="px-3 py-1 text-sm text-gray-600">Cancelar</button>
        </div>
      </div>
    );
  }

  // Vista de solo lectura
  return (
    <div className="p-4 border rounded-md mb-2 bg-gray-50">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-medium">{question.question_text}</h4>
        <div className="space-x-2">
          <button onClick={onStartEdit} className="text-blue-600 text-sm">Editar</button>
          <button onClick={onDelete} className="text-red-600 text-sm">Eliminar</button>
        </div>
      </div>
      <p className="text-sm text-gray-600">Tipo: {question.type}</p>
      {question.required && <p className="text-xs text-red-500">* Obligatoria</p>}
    </div>
  );
};

export default QuestionCard;