// src/Pages/Forms/FormBuilder.tsx
import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import QuestionCard from '@/components/Form/QuestionCard';
import SortableItem from '@/components/Form/SortableItem';
import AddQuestionForm from '@/components/Form/AddQuestionForm';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';

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
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'forms',
        href: '/forms',
    },

];
const FormBuilder: React.FC<FormBuilderProps> = ({ form, questions }) => {
    const [items, setItems] = useState<Question[]>(questions);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = items.findIndex(q => q.id === active.id);
            const newIndex = items.findIndex(q => q.id === over?.id);
            const newItems = arrayMove(items, oldIndex, newIndex);
            setItems(newItems);

            router.post(`/forms/${form.id}/questions/reorder`, {
                ordered_ids: newItems.map(q => q.id),
            });
        }
    };


    const [newQuestionId, setNewQuestionId] = useState<number | null>(null);

    const handleAddQuestion = (question: Question) => {
        console.log("Question received:", question); // Add this line

        // Check if question is defined before accessing its properties.
        if (question && question.id !== undefined) {
            setItems(prev => [...prev, question]);
            setNewQuestionId(question.id);
        } else {
            console.error("Received undefined question object or question.id is undefined.");
        }
    };


    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de eliminar esta pregunta?')) {
            router.delete(`/questions/${id}`, {
                onSuccess: () => {
                    setItems(prev => prev.filter(q => q.id !== id));
                }
            });
        }
    };

    const handleEdit = (updatedQuestion: Question) => {
        setItems(prev => prev.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q)));
        setNewQuestionId(updatedQuestion.id); // mantener seleccionada
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Editando Formulario: {form.title}</h1>

                <AddQuestionForm formId={form.id} onSuccess={handleAddQuestion} />

                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    {/* Filter out any undefined or null items */}
                    <SortableContext items={items.filter(q => q).map(q => q.id)} strategy={verticalListSortingStrategy}>
                        {/* Filter out any undefined or null items before mapping */}
                        {items.filter(question => question).map((question) => (
                            <SortableItem key={question.id} id={question.id}>
                                <QuestionCard
                                    question={question}
                                    onDelete={() => handleDelete(question.id)}
                                    onEdit={handleEdit}
                                    autoEdit={question.id === newQuestionId}
                                />
                            </SortableItem>
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </AppLayout>
    );
};

export default FormBuilder;