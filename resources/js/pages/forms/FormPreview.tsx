import React from 'react';
import { usePage } from '@inertiajs/react';

interface Question {
  id: number;
  question_text: string;
  type: string;
  required: boolean;
  options?: { id: number; option_text: string }[];
}

interface FormData {
  id: number;
  title: string;
  questions: Question[];
}

export default function FormPreview() {
  const { form } = usePage().props as unknown as { form: FormData };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>

      <form>
        {form.questions.map((q) => (
          <div key={q.id} className="mb-6">
            <label className="block font-semibold mb-1">
              {q.question_text}
              {q.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {q.type === 'text' && (
              <input type="text" className="w-full border rounded p-2" />
            )}

            {q.type === 'textarea' && (
              <textarea className="w-full border rounded p-2" rows={4}></textarea>
            )}

            {q.type === 'number' && (
              <input type="number" className="w-full border rounded p-2" />
            )}

            {q.type === 'date' && (
              <input type="date" className="w-full border rounded p-2" />
            )}

            {q.type === 'email' && (
              <input type="email" className="w-full border rounded p-2" />
            )}

            {(q.type === 'radio' || q.type === 'checkbox') && (
              <div className="space-y-2">
                {q.options?.map((opt) => (
                  <label key={opt.id} className="block">
                    <input
                      type={q.type}
                      name={`q_${q.id}`}
                      value={opt.option_text}
                      className="mr-2"
                    />
                    {opt.option_text}
                  </label>
                ))}
              </div>
            )}

            {q.type === 'dropdown' && (
              <select className="w-full border rounded p-2">
                {q.options?.map((opt) => (
                  <option key={opt.id} value={opt.option_text}>
                    {opt.option_text}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
}