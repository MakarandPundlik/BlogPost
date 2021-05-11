import React from "react";

function PaginationNav(props) {
  const { postsperpage, totalposts, paginate } = props; //destructuring
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalposts / postsperpage); i++)
    pageNumbers.push(i);

  return (
    <nav>
      <ul className="pagination">
       
        {pageNumbers.map((number) => (
          <li key={number} className="page-item m-1">
            <a
              className="page-link bg-custom"
              style={{ color: "#fff", textDecoration: "none" }}
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
        
      </ul>
    </nav>
  );
}

export default PaginationNav;
