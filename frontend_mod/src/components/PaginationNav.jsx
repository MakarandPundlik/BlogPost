import React from "react";

function PaginationNav(props) {
  const { postsperpage, totalposts, paginate } = props; //destructuring
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalposts / postsperpage); i++)
    pageNumbers.push(i);

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item ">
          <a
            className="page-link bg-custom"
            style={{ color: "#fff", textDecoration: "none" }}
            onClick={() => paginate(-1)}
          >
            Previous
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              className="page-link bg-custom"
              style={{ color: "#fff", textDecoration: "none" }}
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className="page-link bg-custom"
            style={{ color: "#fff", textDecoration: "none" }}
            onClick={() => paginate(0)}
          >
            next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default PaginationNav;
