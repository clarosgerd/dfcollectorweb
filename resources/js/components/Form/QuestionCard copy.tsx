import React, { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';

interface Question {
  id: number;
  question_text: string;
  type: string;
  required: boolean;
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
  const [justSaved, setJustSaved] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const renderPreview = (q: Question) => {
    switch (q.type) {
      case 'text':
        return <input disabled placeholder="Respuesta corta..." className="w-full border p-2 rounded" />;
      case 'textarea':
        return <textarea disabled placeholder="Respuesta larga..." className="w-full border p-2 rounded" />;
      case 'number':
        return <input type="number" disabled placeholder="Número..." className="w-full border p-2 rounded" />;
      case 'date':
        return <input type="date" disabled className="w-full border p-2 rounded" />;
      case 'email':
        return <input type="email" disabled placeholder="correo@ejemplo.com" className="w-full border p-2 rounded" />;
      case 'dropdown':
        return (
          <select disabled className="w-full border p-2 rounded">
            <option>Opción 1</option>
            <option>Opción 2</option>
          </select>
        );
      case 'radio':
        return (
          <div className="space-y-1">
            <label><input type="radio" disabled /> Opción A</label><br />
            <label><input type="radio" disabled /> Opción B</label>
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-1">
            <label><input type="checkbox" disabled /> Opción 1</label><br />
            <label><input type="checkbox" disabled /> Opción 2</label>
          </div>
        );
      default:
        return null;
    }
  };



  useEffect(() => {
    if (autoEdit && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      inputRef.current?.focus(); // seguir enfocando el input
    }
  }, [autoEdit]);

  const handleSave = () => {
    router.put(`/questions/${question.id}`, {
      question_text: text,
      type,
      required,
    }, {
      onSuccess: () => {
        onEdit({ ...question, question_text: text, type, required });
        if (!autoEdit) setEditing(false); // seguir en edición si fue agregado
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2000);
      },
    });
  };

  if (editing) {
    return (
      <div className="p-4 mb-3 rounded border shadow-sm bg-yellow-50">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="block w-full mb-2 border p-2 rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mb-2 border p-2 rounded"
        >
          <option value="text">Texto corto</option>
          <option value="textarea">Texto largo</option>
          <option value="number">Número</option>
          <option value="date">Fecha</option>
          <option value="dropdown">Lista desplegable</option>
          <option value="email">Email</option>
          <option value="radio">Opción única</option>
          <option value="checkbox">Casillas</option>
        </select>
        <label className="inline-flex items-center mb-2">
          <input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} className="mr-2" />
          Requerido
        </label>
        <div className="space-x-2">
          <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded">Guardarffff</button>
          <button onClick={() => setEditing(false)} className="text-gray-600">Cancelar</button>
        </div>
      </div>

    );
    {
      justSaved && (
        <div className="text-green-600 text-sm mt-2">✅ Guardado</div>
      )
    }
  }

  return (
    <div ref={cardRef} className="p-4 mb-3 rounded border shadow-sm bg-white">
      <div className="text-lg font-semibold">{question.question_text}</div>
      <div className="text-sm text-gray-500 mb-2">
        Tipo: {question.type} | Requerido: {question.required ? 'Sí' : 'No'}
      </div>

      <div className="mb-2">
        {renderPreview(question)}
      </div>

      <div className="mt-2 space-x-2">
        <button onClick={() => setEditing(true)} className="text-blue-600 text-sm">Editar</button>
        <button onClick={onDelete} className="text-red-600 text-sm">Eliminar</button>
      </div>
    </div>
  );
};

export default QuestionCard;
