import parse from "html-react-parser";
import React from "react";
const TableBody = (props: any) => {
  return (
    <>
      {props.usersData.map((user: any) => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{parse(user.firstName)}</td>
          <td>{parse(user.lastName)}</td>
          <td>{parse(user.email)}</td>
          <td>{parse(user.gender)}</td>
          <td>{props.formatDate(user.birthday)}</td>
          <td>{user.salary}</td>
          <td>{props.formatPhoneNumber(user.phone, 84)}</td>
        </tr>
      ))}
    </>
  );
};
export default TableBody;
