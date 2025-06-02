// src/Pages/Forms/FormBuilder.tsx
import React, { useState, useEffect, useRef } from 'react';
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
}

interface FormBuilderProps {
  form: {
    id: number;
    title: string;
  };
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
      const oldIndex = items.findIndex(q => q.id === parseInt(active.id as string));
      const newIndex = items.findIndex(q => q.id === parseInt(over?.id as string));
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      router.post(`/forms/${form.id}/questions/reorder`, {
        ordered_ids: newItems.map(q => q.id),
      });
    }
  };

  const handleAddQuestion = (question: Question) => {
    if (question && typeof question === 'object' && question.id !== undefined) {

      setItems(prev => [...prev, question]);
      setEditingId(question.id);
      setHighlightedId(question.id);
      setTimeout(() => {
        questionRefs.current[question.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      console.log("New question ID:", question.id);
    }
    else {
      console.error("handleAddQuestion received invalid data:", question);


    }
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta pregunta?')) {
      router.delete(`/questions/${id}`, {
        onSuccess: () => {
          setItems(prev => prev.filter(q => q.id !== id));
          if (editingId === id) setEditingId(null);
        }
      });
    }
  };

  const handleEdit = (updatedQuestion: Question) => {
    setItems(prev => prev.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q)));
    setEditingId(null);
    setHighlightedId(updatedQuestion.id);
    setTimeout(() => {
      questionRefs.current[updatedQuestion.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editando Formulario: {form.title}</h1>

      <AddQuestionForm formId={form.id} onSuccess={handleAddQuestion} />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(q => q.id.toString())} strategy={verticalListSortingStrategy}>

          {items && items.filter(item => item !== undefined).map((question) => (
            <SortableItem key={question.id} id={question.id.toString()}>
              <div
                ref={(el) => (questionRefs.current[question.id] = el)}
                className={`group relative transition-all duration-500 ease-in-out ${highlightedId === question.id ? 'ring-2 ring-blue-500 rounded-md animate-pulse' : ''}`}
                onAnimationEnd={() => setHighlightedId(null)}
              >
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-2 cursor-grab text-gray-400 group-hover:text-gray-600 transition-colors"
                  title="Arrastrar"
                >
                  ≡
                </div>
                <div className="pl-6">
                  <QuestionCard
                    question={question}
                    isEditing={editingId === question.id}
                    onStartEdit={() => setEditingId(question.id)}
                    onCancelEdit={() => setEditingId(null)}
                    onEdit={handleEdit}
                    onDelete={() => handleDelete(question.id)}
                  />
                </div>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default FormBuilder;
