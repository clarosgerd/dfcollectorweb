// src/Components/SortableItem.tsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  id: string;
  children: React.ReactNode;
}

const SortableItem: React.FC<Props> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-2 group relative">
      {/* Drag handle visible al hacer hover */}
      <div
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 cursor-grab text-gray-400 group-hover:text-gray-600 transition-colors"
        title="Arrastrar"
      >
        ≡
      </div>
      <div className="pl-6">{children}</div>
    </div>
  );
};

export default SortableItem;