import { useState } from "react";
import { size } from "lodash";
import {
  getTablesApi,
  addTableApi,
  updateTableApi,
  deleteTableApi,
  getTableApi,
  getTableByNumberApi,
} from "../api/tables";
import { useAuth } from "./";

export function useTable() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tables, setTables] = useState(null);
  const [table, setTable] = useState(null);

  const { auth } = useAuth();

  // function para traer todas la tablas
  const getTables = async () => {
    try {
      setLoading(true);
      const response = await getTablesApi(auth.token);
      setLoading(false);
      setTables(response);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  //  function para crear todas la tablas
  const addTable = async (data) => {
    try {
      setLoading(true);
      await addTableApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  // function para actualizar todas la tablas
  const updateTable = async (id, data) => {
    try {
      setLoading(true);
      await updateTableApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  // function para eliminar todas la tablas
  const deleteTable = async (id) => {
    try {
      setLoading(true);
      await deleteTableApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getTable = async (idTable) => {
    try {
      setLoading(true);
      const response = await getTableApi(idTable);
      setLoading(false);
      setTable(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const isExistTable = async (tableNumber) => {
    try {
      const response = await getTableByNumberApi(tableNumber);
      if (size(response) === 0) throw Error();
      return true;
    } catch (error) {
      setError(error);
    }
  };

  const getTableByNumber = async (tableNumber) => {
    try {
      const response = await getTableByNumberApi(tableNumber);
      return response;
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    error,
    tables,
    table,
    getTables,
    addTable,
    updateTable,
    deleteTable,
    getTable,
    isExistTable,
    getTableByNumber,
  };
}
