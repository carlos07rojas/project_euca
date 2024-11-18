import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useTable } from "../../../hooks";
import "./selectTable.scss";

export function SelectTable(props) {
  const { history } = props;
  const [tableNum, setTableNum] = useState(null);
  const [error, setError] = useState(null);
  const { isExistTable } = useTable();

  const onSubmit = async () => {
    setError(null);
    if (!tableNum) {
      setError("No has introducido ningun numero de mesa");
    } else {
      const exist = await isExistTable(tableNum);
      if (exist) history.push(`/client/${tableNum}`);
      else setError("El numero de mesa que ingreso es incorrecto"); 
    }
  };

  return (
    <div className="select-table">
      <div className="select-table__content">
        <h1>Bienveniedo a Los Eucaliptos</h1>
        <h2>Introduce el numero de mesa</h2>

        <Form onSubmit={onSubmit}>
          <Form.Input
            placeholder="Ejemplo: 1, 2, 3, 4..."
            type="number"
            onChange={(_, data) => setTableNum(data.value)}
          />
          <Button primary fluid>
            Acceder
          </Button>
        </Form>
        <p className="select-table__content-error">{error}</p>
      </div>
    </div>
  );
}
