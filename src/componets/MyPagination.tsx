import { Pagination } from "react-bootstrap";
const MyPagination = (props: any) => {
  let pageNumbers = [];
  for (let i = 1; i <= props.totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => props.firstPage()} />
      <Pagination.Prev onClick={() => props.prevPage()} />
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          onClick={() => props.activePage(number)}
          active={props.currentPage === number}>
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => props.nextPage()} />
      <Pagination.Last onClick={() => props.lastPage()} />
    </Pagination>
  );
};
export default MyPagination;
