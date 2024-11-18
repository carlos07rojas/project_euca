import React, { useEffect } from "react";
import { useCategory } from "../../hooks";
import { ListCategories } from "../../components/client";

export function Categorias() {
  const { loading, categories, getCategories } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h3 text-align="center">Categorias</h3>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ListCategories categories={categories} />
      )}
    </div>
  );
}
