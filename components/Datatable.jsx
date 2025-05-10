import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 150 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable({ path, dataList = {}, dataColumns }) {
  const actionColumn = [
    {
      field: " ",
      width: 160,
      renderCell: (params) => {
        return (
          <Box>
            <Link
              to={(path ? path : "") + params.row.id}
              state={{ ...params.row }}
              style={{ textDecoration: "none" }}
            >
              <Button size="small" variant="outlined">
                View
              </Button>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <Box style={{ height: 650 }} p={1}>
      <DataGrid
        rows={dataList ? dataList : rows}
        columns={
          dataColumns
            ? dataColumns.concat(actionColumn)
            : columns.concat(actionColumn)
        }
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </Box>
  );
}
