// src/pages/examination/hooks/useExamEvaluations.ts
import { useState, useEffect } from "react";

export const useExamEvaluations = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Example: fetch exam evaluations
    fetch("/api/exams/evaluations")
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
