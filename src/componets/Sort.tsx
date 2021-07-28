import { Form } from "react-bootstrap";
const Sort = (props: any) => {
  const selectHandler = (e: any) => {
    props.sortField(e.target.value);
  };
  return (
    <Form.Select
      aria-label="Default select example"
      className="col"
      onChange={selectHandler}>
      <option disabled>Select field to sort</option>
      <option value="id">Id</option>
      <option value="firstName">First Name</option>
      <option value="lastName">Last Name</option>
      <option value="email">Email</option>
      <option value="birthday">Birthday</option>
      <option value="salary">Salary</option>
    </Form.Select>
  );
};
export default Sort;
