import { Table } from "react-bootstrap";
import { Badge } from "react-bootstrap";
import users from "./data/users.json";
import { useState, useMemo } from "react";
import TableBody from "./componets/TableBody";
import MyPagination from "./componets/MyPagination";
import Search from "./componets/Search";
import Sort from "./componets/Sort";
const App: React.FC = () => {
  // Declare state and variable
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [totalUsers, setTotalUsers] = useState(users.length);
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const [searchData, setSearchData] = useState("");
  const [sortField, setSortField] = useState("");

  // Convert Iso Date to dd/mm/yy format
  const formatDate = (isoDate: string) => {
    let date = new Date(isoDate);
    let year = date.getFullYear();
    let month: number | string = date.getMonth() + 1;
    let dt: number | string = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return `${dt}/${month}/${year}`;
  };
  // Convert phone number
  const formatPhoneNumber = (num: string, code: number) => {
    let newNum = num.match(/[0-9]/g)?.join("");
    return `(+${code})${newNum}`;
  };
  // active page (change page when click in pagination)
  const activePage = (num: number) => {
    setCurrentPage(num);
  };
  // firstPage
  const firstPage = () => {
    setCurrentPage(1);
  };
  // previous page
  const prevPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((num) => num - 1);
  };
  // next page
  const nextPage = () => {
    console.log(currentPage);
    console.log(totalPages);

    if (currentPage === totalPages) {
      return;
    }
    setCurrentPage((num) => num + 1);
  };
  // last page
  const lastPage = () => {
    setCurrentPage(totalPages);
  };
  // onSearch handle function
  const onSearchHandler = (searchText: string) => {
    setSearchData(searchText);
    setCurrentPage(1);
  };
  // Final data
  const finalUsers = useMemo(() => {
    let myUsers = users;
    //  on search handler
    if (searchData) {
      const regex = new RegExp(searchData, "gmi");
      let matches = users.filter((user) => {
        return (
          user.id.toString().match(regex) ||
          user.firstName.match(regex) ||
          user.lastName.match(regex) ||
          user.birthday.match(regex) ||
          user.email.match(regex) ||
          user.phone.match(regex) ||
          user.gender.match(regex) ||
          user.salary.toString().match(regex)
        );
      });

      // Replace matches search and highlight them
      myUsers = matches.map((user) => {
        return {
          id: user.id,
          firstName: user.firstName.replace(
            regex,
            `<span style="background-color:yellow;">${searchData}</span>`,
          ),
          lastName: user.lastName.replace(
            regex,
            `<span style="background-color:yellow;">${searchData}</span>`,
          ),
          email: user.email.replace(
            regex,
            `<span style="background-color:yellow;">${searchData}</span>`,
          ),
          gender: user.gender.replace(
            regex,
            `<span style="background-color:yellow;">${searchData}</span>`,
          ),
          birthday: user.birthday,
          salary: user.salary,
          phone: formatPhoneNumber(user.phone, 84),
        };
      });
    }
    setTotalUsers(myUsers.length);
    // sort field
    if (sortField) {
      myUsers = myUsers.sort(
        (a: Record<string, any>, b: Record<string, any>) => {
          if (sortField === "id" || sortField === "salary") {
            return a[sortField] - b[sortField];
          }
          return a[sortField].localeCompare(b[sortField]);
        },
      );
    }
    // Get current user for each page (this logic use for pagination every time)
    let indexOfLastUser = currentPage * usersPerPage;
    let indexOfFirstUser = indexOfLastUser - usersPerPage;
    // return users data of current page
    return myUsers.slice(indexOfFirstUser, indexOfLastUser);
  }, [searchData, currentPage, sortField]);
  return (
    <div className="container-fluid px-4">
      <h1 className="my-4">
        A simple <Badge bg="secondary">Table App</Badge>
      </h1>
      <div className="row justify-content-between mb-4">
        <div className="col-md-3">
          <div className="row justify-content-start">
            <div className="col-4 align-self-center h5">Order by</div>
            <Sort sortField={(value: string) => setSortField(value)} />
          </div>
        </div>
        <div className="col-md-5">
          <Search onSearchHandler={onSearchHandler} />
        </div>
      </div>

      <Table striped hover bordered size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Birthday</th>
            <th>Salary</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <TableBody
            usersData={finalUsers}
            formatPhoneNumber={formatPhoneNumber}
            formatDate={formatDate}
          />
        </tbody>
      </Table>
      {finalUsers.length > 0 && (
        <MyPagination
          totalPages={totalPages}
          activePage={activePage}
          currentPage={currentPage}
          nextPage={nextPage}
          lastPage={lastPage}
          prevPage={prevPage}
          firstPage={firstPage}
        />
      )}
      {finalUsers.length === 0 && <h3 className="centered">User not Found!</h3>}
    </div>
  );
};

export default App;
