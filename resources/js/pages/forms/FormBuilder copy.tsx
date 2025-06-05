import React, { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import QuestionCard from '@/components/Form/QuestionCard';
import SortableItem from '@/components/Form/SortableItem';
import AddQuestionForm from '@/components/Form/AddQuestionForm';

interface Question {
  id: number;
  question_text: string;
  type: string;
  required: boolean;
  options?: string[];
}

interface FormBuilderProps {
  form: { id: number; title: string };
  questions: Question[];
}

const FormBuilder: React.FC<FormBuilderProps> = ({ form, questions }) => {
  const [items, setItems] = useState<Question[]>(questions);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(q => q.id === Number(active.id));
      const newIndex = items.findIndex(q => q.id === Number(over?.id));
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      router.post(`/forms/${form.id}/questions/reorder`, { ordered_ids: newItems.map(q => q.id) });
    }
  };

  const handleAddQuestion = (question: Question) => {
    setItems(prev => [...prev, question]);
    setEditingId(question.id);
    setHighlightedId(question.id);
    setTimeout(() => questionRefs.current[question.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Eliminar esta pregunta?')) {
      router.delete(`/questions/${id}`, {
        onSuccess: () => setItems(prev => prev.filter(q => q.id !== id)),
      });
    }
  };

  const handleEdit = (updated: Question) => {
    setItems(prev => prev.map(q => q.id === updated.id ? updated : q));
    setEditingId(null);
    setHighlightedId(updated.id);
    setTimeout(() => questionRefs.current[updated.id]?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editando Formulario: {form.title}</h1>

      <AddQuestionForm formId={form.id} onSuccess={handleAddQuestion} />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(q => q.id.toString())} strategy={verticalListSortingStrategy}>
          {items.map((question) => (
            <SortableItem key={question.id} id={question.id.toString()}>
              <div
                ref={el => questionRefs.current[question.id] = el}
                className={`transition-all duration-500 rounded-md ${highlightedId === question.id ? 'ring-2 ring-blue-500 animate-pulse' : ''}`}
              >
                <QuestionCard
                  question={question}
                  isEditing={editingId === question.id}
                  onStartEdit={() => setEditingId(question.id)}
                  onCancelEdit={() => setEditingId(null)}
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(question.id)}
                />
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default FormBuilder;
