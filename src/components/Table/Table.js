import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Export, { downloadCSV } from "./TableAction";

const Table = () => {
  const [filterText, setFilterText] = useState("");
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
  ];

  const customStyles = {
    header: {
      style: {
        backgroundColor: "#2196F3", // Customize the header background color
      },
    },
    rows: {
      style: {
        backgroundColor: "#f0f0f0", // Customize the row background color
      },
    },
  };

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(data, data)} />,
    []
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={handleFilterChange}
      />
      <DataTable
        defaultSortFieldId={1}
        pagination
        columns={columns}
        data={filteredData}
        customStyles={customStyles}
        actions={actionsMemo}
      />
    </div>
  );
};

export default Table;
