import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CourseCard } from '../components/courses/CourseCard';
import { Search, Filter, Layers, ArrowRight } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { courses, settings, navigateTo, t } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const categories = useMemo(() => {
    const list = Array.from(new Set(courses.map((c) => c.category)));
    return ['all', ...list];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (!c.published) return false;
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === 'all' || c.category === selectedCategory;
      const matchLevel = selectedLevel === 'all' || c.level === selectedLevel;
      return matchSearch && matchCategory && matchLevel;
    });
  }, [courses, search, selectedCategory, selectedLevel]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title & Introduction */}
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
          Educação Profissional
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Catálogo Completo de Cursos
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
          Cursos práticos e objetivos com materiais digitais em PDF, exercícios orientados e certificados de conclusão individuais com verificação online.
        </p>
      </div>

      {/* Special Bundle Promo Pill Box */}
      <div className="bg-slate-900 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold">
              Prefere levar todos os 6 cursos juntos?
            </h3>
            <p className="text-xs text-slate-300">
              Economize mais de 60% com o Pacote Completo por apenas R$ {settings.bundlePrice.toFixed(2).replace('.', ',')}.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('/checkout/bundle')}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-md shadow-xs transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
        >
          <span>Garantir Pacote Completo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por título ou assunto..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-md border border-slate-200 focus:border-slate-800 focus:outline-hidden"
          />
        </div>

        {/* Filter Tabs (Interactive Segmented controls compliant with Constitution 1.A) */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'Todas Categorias' : cat}
              </button>
            ))}
          </div>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-hidden"
          >
            <option value="all">Todos os Níveis</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 space-y-3">
          <p className="font-serif text-lg font-bold text-slate-800">Nenhum curso encontrado</p>
          <p className="text-xs text-slate-500">Tente buscar com outros termos ou redefinir os filtros.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
};
