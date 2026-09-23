import React, { useState } from 'react';
import { Course } from '../../types';
import { useApp } from '../../context/AppContext';
import { BookOpen, Clock, Layers, ArrowRight, ShoppingCart } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { navigateTo, t } = useApp();
  const [imageError, setImageError] = useState(false);

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <article className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col h-full">
      {/* Cover Image Slot with Fallback */}
      <div className="relative aspect-4/3 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {!imageError && course.coverImage ? (
          <img
            src={course.coverImage}
            alt={course.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 text-white p-6 text-center">
            <BookOpen className="w-10 h-10 text-amber-400 mb-2 opacity-80" />
            <span className="font-serif text-sm font-semibold tracking-wide text-slate-200">{course.title}</span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata with Typographic Separator (Zero-Pill compliant) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2.5 font-medium">
            <span>{course.category}</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>{course.level}</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug mb-2">
            {course.title}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
            {course.shortDescription}
          </p>

          {/* Course Spec Indicators */}
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 py-3 border-y border-slate-100 dark:border-slate-800 mb-4 tabular-nums">
            <span className="inline-flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              {course.modules.length} {t.course.modules}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="inline-flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              {totalLessons} {t.course.lessons}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {course.durationHours}h {t.course.hours}
            </span>
          </div>
        </div>

        {/* Pricing & Working Interactive CTA Buttons */}
        <div>
          <div className="flex items-baseline gap-2 mb-3.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">R$</span>
            <span className="font-serif text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
              {course.price.toFixed(2).replace('.', ',')}
            </span>
            {course.originalPrice > course.price && (
              <span className="text-xs text-slate-400 dark:text-slate-500 line-through tabular-nums">
                R$ {course.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => navigateTo(`/cursos/${course.slug}`)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{t.course.viewCourse}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => navigateTo(`/checkout/${course.slug}`)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white dark:text-slate-950 bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-400 rounded-md transition-colors whitespace-nowrap shadow-xs cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-amber-400 dark:text-slate-950" />
              <span>{t.course.buyNow}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
