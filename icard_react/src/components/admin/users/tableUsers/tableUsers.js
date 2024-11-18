import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import "./tableUsers.scss";

export function TableUsers(props) {
  const { users, updateUsers, onDeleteUser } = props;
  return (
    <Table className="table-users-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Gmail</Table.HeaderCell>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
          <Table.HeaderCell>Apellidos</Table.HeaderCell>
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell>Staff</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(users, (user, index) => (
          <Table.Row key={index}>
            <Table.Cell>{user.username}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.first_name}</Table.Cell>
            <Table.Cell>{user.last_name}</Table.Cell>
            <Table.Cell className="table-status">
              {user.is_active ? (
                <Icon name="check circle outline" />
              ) : (
                <Icon name="times circle outline" />
              )}
            </Table.Cell>
            <Table.Cell className="table-status">
              {user.is_staff ? (
                <Icon name="check circle outline" />
              ) : (
                <Icon name="times circle outline" />
              )}
            </Table.Cell>

            <Actions
              user={user}
              updateUsers={updateUsers}
              onDeleteUser={onDeleteUser}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const { user, updateUsers, onDeleteUser } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateUsers(user)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteUser(user)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
