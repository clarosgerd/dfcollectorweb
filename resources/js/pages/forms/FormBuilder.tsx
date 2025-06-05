import React, { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import QuestionCard from '@/components/Form/QuestionCard';
import SortableItem from '@/components/Form/SortableItem';
import AddQuestionForm from '@/components/Form/AddQuestionForm';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


interface Option {
  id: number;
  option_text: string;
  order: number;
  created_at: string;
  updated_at: string;
}
interface Question {
  id?: number;
  form_id: number;
  question_text: string | null;
  type: string | null;
  required: boolean;
  order?: number;
  options: Option[];
}

interface FormBuilderProps {
  form: {
    id: number;
    title: string;
    question: Question[]
  };
  questions: Question[];
  flash?: {
    success?: string;
    error?: string;
  };
}
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Lists',
    href: '/lists',
  },
];

const FormBuilder: React.FC<FormBuilderProps> = ({ form, questions, flash }) => {
  // const [items, setItems] = useState<Question[]>(questions);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [editingList, setEditingList] = useState<Question | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState<Question[]>(questions);

  useEffect(() => {
    if (flash?.success) {
      setToastMessage(flash.success);
      setToastType('success');
      setShowToast(true);
    } else if (flash?.error) {
      setToastMessage(flash.error);
      setToastType('error');
      setShowToast(true);
    }
  }, [flash]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Define Option type if not already defined or imported


  const { data, setData, post, put, processing, reset, delete: destroy } = useForm({
    id: 0,
    form_id: 0,
    question_text: '',
    type: '',
    required: false,
    order: 0,
    options: [],
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingList) {
      put(route('question.update', editingList.id), {
        onSuccess: () => {
          setIsOpen(false);
          reset();
          setEditingList(null);
        },
      });
    } else {
      post(route('question.store'), {
        onSuccess: () => {
          setIsOpen(false);
          reset();
        },
      });
    }
  };

  const handleEdit = (question: Question) => {
    setEditingList(question);
    setData({
      id: question.id,
      form_id: question.form_id,
      question_text: question.question_text || '',
      type: question.type || '',
      required: !!question.required,
      order: question.order ?? 0,
      options: Array.isArray(question.options) ? question.options : [],
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    destroy(route('question.destroy', id));
  };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Lists" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        {showToast && (
          <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white animate-in fade-in slide-in-from-top-5`}>
            {toastType === 'success' ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <span>{toastMessage}</span>
          </div>)}

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold"> {form.title}</h1>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger  >
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingList ? 'Edit List' : 'Create New List'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">question_text</Label>
                  <Input id="question_text"
                    value={data.question_text}
                    onChange={(e) => setData('question_text', e.target.value)}
                    required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">type</Label>
                  <Input id="type"
                    value={data.type}
                    onChange={(e) => setData('type', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">required</Label>
                  <Input id="type"
                    value={data.required ? 'true' : 'false'}
                    onChange={(e) => setData('type', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">order</Label>
                  <Input id="order"
                    value={data.order}
                    onChange={(e) => setData('order',parseInt(e.target.value))}
                  />
                </div>
                <Button type="submit" disabled={processing}>
                  {editingList ? 'Update' : 'Create'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(questions) && questions.map((list) => (
            <Card key={list.id} className="hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{list.question_text}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(list)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => list.id !== undefined && handleDelete(list.id)}
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                 <div className="text-sm text-gray-500 mb-2">
        Tipo: {list.type} | Requerido: {list.required ? 'Sí' : 'No'}
      </div>
                <p className="text-sm text-muted-foreground">
                  {list.question_text || 'No description'}
                </p>
                {list.type !== undefined && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {list.type} Tasks
                  </p>
                )}
              </CardContent>


            </Card>))}
        </div>
      </div>
    </AppLayout>
  );
};

export default FormBuilder;
