import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, TableListAdmin } from "../../components/admin";
import { useTable } from "../../hooks";

export function OrdersAdmin() {
  const { loading, tables, getTables } = useTable();

  useEffect(() => {
    getTables();
  }, []);

  return (
    <>
      <HeaderPage title="Pedidos del Restaurante" />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableListAdmin tables={tables} />
      )}
    </>
  );
}
