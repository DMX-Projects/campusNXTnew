// import React, { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { BookOpen, Layers, Search, SlidersHorizontal, Grid3X3, List, Info, Star, ChevronRight, ArrowLeft, Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// // ---------- Types ----------
// export type Category = {
//   id: string;
//   name: string;
//   code: string; // e.g., "ENG", "SCI"
//   description: string;
//   color?: string; // tailwind color name suffix, e.g., "indigo", "emerald"
//   icon?: string; // lucide icon name (optional, fallback provided)
//   bookCount: number;
//   updatedAt: string; // ISO date
//   tags?: string[];
// };

// // ---------- Mock Data (replace with API) ----------
// const MOCK_CATEGORIES: Category[] = [
//   {
//     id: "1",
//     name: "Computer Science",
//     code: "CS",
//     description:
//       "Algorithms, data structures, databases, AI/ML, and systems. Core for developers and researchers.",
//     color: "indigo",
//     icon: "Layers",
//     bookCount: 1842,
//     updatedAt: "2025-08-21T10:25:00Z",
//     tags: ["programming", "ai", "systems"],
//   },
//   {
//     id: "2",
//     name: "Mathematics",
//     code: "MATH",
//     description:
//       "Pure and applied math: calculus, algebra, number theory, probability, and statistics.",
//     color: "emerald",
//     icon: "Star",
//     bookCount: 1260,
//     updatedAt: "2025-08-20T08:15:00Z",
//     tags: ["algebra", "calculus", "stats"],
//   },
//   {
//     id: "3",
//     name: "Literature",
//     code: "LIT",
//     description:
//       "Classic to contemporary works, criticism, poetry, and comparative literature.",
//     color: "rose",
//     icon: "BookOpen",
//     bookCount: 980,
//     updatedAt: "2025-08-18T13:05:00Z",
//     tags: ["novels", "poetry"],
//   },
//   {
//     id: "4",
//     name: "Physics",
//     code: "PHY",
//     description:
//       "Mechanics, electromagnetism, quantum, and cosmology—foundations of the universe.",
//     color: "cyan",
//     icon: "Sparkles",
//     bookCount: 742,
//     updatedAt: "2025-08-19T17:40:00Z",
//     tags: ["quantum", "em", "mechanics"],
//   },
//   {
//     id: "5",
//     name: "History",
//     code: "HIS",
//     description:
//       "World, regional, and thematic histories with primary sources and analysis.",
//     color: "amber",
//     icon: "Info",
//     bookCount: 1154,
//     updatedAt: "2025-08-17T09:10:00Z",
//     tags: ["world", "regional"],
//   },
// ];

// // ---------- Utilities ----------
// const formatCount = (n: number) => new Intl.NumberFormat().format(n);
// const timeAgo = (iso: string) => {
//   const diff = Date.now() - new Date(iso).getTime();
//   const mins = Math.floor(diff / 60000);
//   if (mins < 60) return `${mins}m ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs}h ago`;
//   const days = Math.floor(hrs / 24);
//   return `${days}d ago`;
// };

// // Map of icon names to actual lucide components (extend as needed)
// const Icons: Record<string, React.ElementType> = {
//   Layers,
//   Star,
//   BookOpen,
//   Info,
//   Sparkles,
// };

// // ---------- Component ----------
// export default function Categories() {
//   // In real app, fetch via RTK Query or React Query
//   // const { data = [], isLoading } = useGetCategoriesQuery();
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [query, setQuery] = useState("");
//   const [layout, setLayout] = useState<"grid" | "list">("grid");
//   const [sortBy, setSortBy] = useState<"name" | "books" | "updated">("name");
//   const [active, setActive] = useState<Category | null>(null);
//   const [tagFilter, setTagFilter] = useState<string>("all");

//   useEffect(() => {
//     // simulate load
//     const t = setTimeout(() => setCategories(MOCK_CATEGORIES), 300);
//     return () => clearTimeout(t);
//   }, []);

//   const allTags = useMemo(() => {
//     const t = new Set<string>();
//     categories.forEach((c) => c.tags?.forEach((x) => t.add(x)));
//     return Array.from(t);
//   }, [categories]);

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     let arr = categories.filter((c) =>
//       [c.name, c.code, c.description, ...(c.tags || [])]
//         .join(" ")
//         .toLowerCase()
//         .includes(q)
//     );
//     if (tagFilter !== "all") {
//       arr = arr.filter((c) => c.tags?.includes(tagFilter));
//     }
//     switch (sortBy) {
//       case "books":
//         arr = arr.sort((a, b) => b.bookCount - a.bookCount);
//         break;
//       case "updated":
//         arr = arr.sort(
//           (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
//         );
//         break;
//       default:
//         arr = arr.sort((a, b) => a.name.localeCompare(b.name));
//     }
//     return arr;
//   }, [categories, query, sortBy, tagFilter]);

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-b from-muted/40 to-background">
//       {/* Header */}
//       <div className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
//           <Button variant="ghost" size="icon" className="rounded-2xl" onClick={() => history.back()} aria-label="Go back">
//             <ArrowLeft className="h-5 w-5" />
//           </Button>
//           <div className="flex items-center gap-3">
//             <div className="p-2 rounded-2xl bg-primary/10 text-primary">
//               <Layers className="h-6 w-6" />
//             </div>
//             <div>
//               <h1 className="text-xl sm:text-2xl font-semibold">Library Categories</h1>
//               <p className="text-sm text-muted-foreground">Browse, filter, and explore category details</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//           <div className="col-span-2 flex gap-2">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search category name, code, or tags..."
//                 className="pl-9 rounded-2xl"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//               />
//             </div>
//             <Select value={tagFilter} onValueChange={setTagFilter}>
//               <SelectTrigger className="rounded-2xl min-w-[140px]">
//                 <SlidersHorizontal className="h-4 w-4 mr-2" />
//                 <SelectValue placeholder="Tag" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All tags</SelectItem>
//                 {allTags.map((t) => (
//                   <SelectItem key={t} value={t}>
//                     #{t}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="flex justify-between sm:justify-end gap-2">
//             <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
//               <SelectTrigger className="rounded-2xl min-w-[160px]">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="name">Name (A→Z)</SelectItem>
//                 <SelectItem value="books">Most Books</SelectItem>
//                 <SelectItem value="updated">Recently Updated</SelectItem>
//               </SelectContent>
//             </Select>

//             <div className="flex items-center gap-2 border rounded-2xl px-1">
//               <Button
//                 variant={layout === "grid" ? "default" : "ghost"}
//                 size="icon"
//                 className="rounded-2xl"
//                 onClick={() => setLayout("grid")}
//                 aria-label="Grid view"
//               >
//                 <Grid3X3 className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant={layout === "list" ? "default" : "ghost"}
//                 size="icon"
//                 className="rounded-2xl"
//                 onClick={() => setLayout("list")}
//                 aria-label="List view"
//               >
//                 <List className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Tag pills */}
//         <div className="mt-4 flex flex-wrap gap-2">
//           <Badge variant={tagFilter === "all" ? "default" : "outline"} className="rounded-2xl cursor-pointer" onClick={() => setTagFilter("all")}>
//             All
//           </Badge>
//           {allTags.map((t) => (
//             <Badge
//               key={t}
//               variant={tagFilter === t ? "default" : "secondary"}
//               className="rounded-2xl cursor-pointer"
//               onClick={() => setTagFilter(t)}
//             >
//               #{t}
//             </Badge>
//           ))}
//         </div>

//         {/* Content */}
//         <AnimatePresence mode="popLayout">
//           {layout === "grid" ? (
//             <motion.div
//               key="grid"
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -8 }}
//               className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
//             >
//               {filtered.length === 0 && <EmptyState />}
//               {filtered.map((cat) => (
//                 <CategoryCard key={cat.id} category={cat} onOpen={() => setActive(cat)} />
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div
//               key="list"
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -8 }}
//               className="mt-6 space-y-3"
//             >
//               {filtered.length === 0 && <EmptyState />}
//               {filtered.map((cat) => (
//                 <CategoryRow key={cat.id} category={cat} onOpen={() => setActive(cat)} />
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Details Drawer */}
//       <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
//         <SheetContent side="right" className="max-w-xl w-full">
//           <SheetHeader>
//             <SheetTitle className="flex items-center gap-2">
//               <span className={`inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10 text-primary`}>
//                 <BookOpen className="h-4 w-4" />
//               </span>
//               {active?.name}
//             </SheetTitle>
//           </SheetHeader>

//           {active && (
//             <div className="mt-6 space-y-6">
//               <div>
//                 <p className="text-sm text-muted-foreground">Code</p>
//                 <p className="font-medium">{active.code}</p>
//               </div>

//               <div>
//                 <p className="text-sm text-muted-foreground">About</p>
//                 <p>{active.description}</p>
//               </div>

//               <div className="grid grid-cols-3 gap-3">
//                 <Stat label="Books" value={formatCount(active.bookCount)} />
//                 <Stat label="Updated" value={timeAgo(active.updatedAt)} />
//                 <Stat label="Tags" value={active.tags?.length || 0} />
//               </div>

//               <Tabs defaultValue="popular">
//                 <TabsList className="rounded-2xl">
//                   <TabsTrigger value="popular">Popular</TabsTrigger>
//                   <TabsTrigger value="new">New</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="popular" className="mt-3">
//                   <MiniList title="Top books in this category" />
//                 </TabsContent>
//                 <TabsContent value="new" className="mt-3">
//                   <MiniList title="Recently added" variant="new" />
//                 </TabsContent>
//               </Tabs>

//               <div className="flex flex-wrap gap-2">
//                 {active.tags?.map((t) => (
//                   <Badge key={t} variant="secondary" className="rounded-2xl">#{t}</Badge>
//                 ))}
//               </div>

//               <div className="pt-4 border-t flex justify-end">
//                 <Button className="rounded-2xl">
//                   View all books <ChevronRight className="h-4 w-4 ml-1" />
//                 </Button>
//               </div>
//             </div>
//           )}
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// }

// // ---------- Subcomponents ----------
// function CategoryCard({ category, onOpen }: { category: Category; onOpen: () => void }) {
//   const Icon = category.icon && Icons[category.icon] ? Icons[category.icon] : Layers;
//   return (
//     <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
//       <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onOpen}>
//         <CardHeader>
//           <div className="flex items-start justify-between gap-3">
//             <div className="flex items-center gap-3">
//               <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-${category.color || "indigo"}-100 text-${category.color || "indigo"}-700`}> 
//                 <Icon className="h-5 w-5" />
//               </span>
//               <div>
//                 <CardTitle className="text-lg leading-tight">{category.name}</CardTitle>
//                 <p className="text-xs text-muted-foreground">{category.code}</p>
//               </div>
//             </div>
//             <Badge variant="outline" className="rounded-2xl">{formatCount(category.bookCount)} books</Badge>
//           </div>
//         </CardHeader>
//         <CardContent className="pt-0">
//           <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
//           <div className="mt-3 flex flex-wrap gap-2">
//             {(category.tags || []).slice(0, 3).map((t) => (
//               <Badge key={t} variant="secondary" className="rounded-2xl">#{t}</Badge>
//             ))}
//           </div>

//           <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
//             <span>Updated {timeAgo(category.updatedAt)}</span>
//             <span className="inline-flex items-center gap-1">
//               Details <ChevronRight className="h-3 w-3" />
//             </span>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }

// function CategoryRow({ category, onOpen }: { category: Category; onOpen: () => void }) {
//   const Icon = category.icon && Icons[category.icon] ? Icons[category.icon] : Layers;
//   return (
//     <Card className="rounded-2xl hover:shadow-md transition-shadow">
//       <CardContent className="p-4">
//         <div className="flex items-center gap-4">
//           <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-${category.color || "indigo"}-100 text-${category.color || "indigo"}-700`}>
//             <Icon className="h-5 w-5" />
//           </span>
//           <div className="min-w-0 flex-1">
//             <div className="flex items-center justify-between gap-2">
//               <div className="min-w-0">
//                 <p className="font-medium truncate">{category.name}</p>
//                 <p className="text-xs text-muted-foreground truncate">{category.description}</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Badge variant="outline" className="rounded-2xl">{category.code}</Badge>
//                 <Badge variant="secondary" className="rounded-2xl">{formatCount(category.bookCount)} books</Badge>
//                 <Button onClick={onOpen} className="rounded-2xl" size="sm">
//                   View <ChevronRight className="h-4 w-4 ml-1" />
//                 </Button>
//               </div>
//             </div>
//             <div className="mt-2 flex flex-wrap gap-2">
//               {(category.tags || []).map((t) => (
//                 <Badge key={t} variant="secondary" className="rounded-2xl">#{t}</Badge>
//               ))}
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function Stat({ label, value }: { label: string; value: React.ReactNode }) {
//   return (
//     <div className="p-3 rounded-2xl bg-muted">
//       <p className="text-xs text-muted-foreground">{label}</p>
//       <p className="text-lg font-semibold">{value}</p>
//     </div>
//   );
// }

// function MiniList({ title, variant }: { title: string; variant?: "new" | "popular" }) {
//   const items = Array.from({ length: 5 }).map((_, i) => ({
//     id: i + 1,
//     title: variant === "new" ? `New Book #${i + 1}` : `Popular Book #${i + 1}`,
//     author: ["A. Turing", "K. Gödel", "V. Nabokov", "E. Noether", "M. Curie"][i % 5],
//   }));
//   return (
//     <div className="space-y-2">
//       <p className="text-sm text-muted-foreground">{title}</p>
//       <ul className="space-y-1">
//         {items.map((b) => (
//           <li key={b.id} className="flex items-center justify-between rounded-xl border p-2">
//             <div className="min-w-0">
//               <p className="truncate font-medium">{b.title}</p>
//               <p className="text-xs text-muted-foreground">{b.author}</p>
//             </div>
//             <Button size="sm" variant="ghost" className="rounded-xl">Open</Button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <Card className="rounded-2xl">
//       <CardContent className="py-16 flex flex-col items-center text-center gap-3">
//         <div className="p-3 rounded-2xl bg-primary/10 text-primary">
//           <Sparkles className="h-6 w-6" />
//         </div>
//         <h3 className="text-lg font-semibold">No categories found</h3>
//         <p className="text-sm text-muted-foreground max-w-sm">
//           Try changing the search or filters. You can search by name, code, or #tag.
//         </p>
//       </CardContent>
//     </Card>
//   );
// }

// // ---------- How to wire with API (example) ----------
// // Example RTK Query slice (pseudo-code):
// // import { api } from "@/lib/api";
// // export const categoriesApi = api.injectEndpoints({
// //   endpoints: (build) => ({
// //     getCategories: build.query<Category[], void>({
// //       query: () => ({ url: "/library/categories" }),
// //       providesTags: ["Categories"],
// //     }),
// //   }),
// // });
// // export const { useGetCategoriesQuery } = categoriesApi;
// import React from 'react';

// const LibraryBookList: React.FC = () => {
//   return (
//     <div className="p-4 sm:p-6 md:p-8 bg-white min-h-screen">
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Library Book List</h1>
//         <div className="flex mt-4 sm:mt-0">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
//             🔍
//           </button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="p-3 border">Book ISBN</th>
//               <th className="p-3 border">Book ID</th>
//               <th className="p-3 border">Book Title</th>
//               <th className="p-3 border">Book Author</th>
//               <th className="p-3 border">Published On</th>
//               <th className="p-3 border">Program</th>
//               <th className="p-3 border">Subject</th>
//               <th className="p-3 border">Copies Available</th>
//               <th className="p-3 border">Book Barcode</th>
//               <th className="p-3 border">Date of Purchase</th>
//               <th className="p-3 border">Date of Removal</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* No data row */}
//             <tr>
//               <td colSpan={11} className="text-center py-10 text-gray-500">
//                 <div className="flex flex-col items-center space-y-2">
//                   <span className="text-4xl">🖨️</span>
//                   <p>No data available</p>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-6 text-right">
//         <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
//           Add Book
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LibraryBookList;
import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { books } from './Data/mockData';
import { Book } from '../Library/types/index';

export default function BookList() {
  const [bookList, setBookList] = useState<Book[]>(books);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ['All', ...new Set(books.map(book => book.category))];

  const filteredBooks = bookList.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = filterCategory === 'All' || book.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Issued': return 'bg-orange-100 text-orange-800';
      case 'Reserved': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Books & Journals</h2>
          <p className="text-gray-600">{filteredBooks.length} books found</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New Book
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search books by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{book.title}</div>
                      <div className="text-sm text-gray-500">by {book.author}</div>
                      <div className="text-xs text-gray-400">ISBN: {book.isbn}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.availableCopies} / {book.totalCopies}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(book.status)}`}>
                      {book.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {book.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md m-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Book</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Fiction</option>
                  <option>Technology</option>
                  <option>Science</option>
                  <option>History</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}