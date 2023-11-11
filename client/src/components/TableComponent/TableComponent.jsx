import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";

export default function TableComponent(props) {
  const { rows = [], columns = [], isLoading = false } = props;
  return (
    <div style={{ height: 540, width: "100%" }}>
      {isLoading ? (
        <CircularProgress sx={{ marginLeft: "20px" }} size="25px" />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
          rowHeight={80}
        />
      )}
    </div>
  );
}
