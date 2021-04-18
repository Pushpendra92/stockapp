import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { updateStockData } from "../stock/StockBoard.service";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(
  stock_name,
  nasdaq_name,
  current_price,
  second_price,
  third_price,
  fourth_price,
  fifth_price
) {
  return {
    stock_name,
    nasdaq_name,
    current_price,
    second_price,
    third_price,
    fourth_price,
    fifth_price,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  updateBtn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
  },
  stockInput: {
    width: "300px",
  },
  disableBtn: {
    background: "gray",
    padding: "0 25px",
  },
  editSection: {
    padding: "20px 20px",
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-end",
  },
});

export const CustomTable = ({ data, triggerListAPI }) => {
  const [rowData, setRowData] = useState(null);
  const [enteredValue, setEnteredValue] = useState("");
  const [editMode, setEditMode] = useState({
    mode: false,
    recordId: null,
  });
  useEffect(() => {
    if (data) {
      const rows = data.map((item) =>
        createData(
          item.stock_name,
          item.stock_price_info.nasdaq_name,
          item.stock_price_info.last_values[0],
          item.stock_price_info.last_values[1],
          item.stock_price_info.last_values[2],
          item.stock_price_info.last_values[3],
          item.stock_price_info.last_values[4]
        )
      );
      setRowData(rows);
    }
  }, [data]);

  const handleUpdate = (val) => {
    let toBeUpdated = data.find(
      (element) => element.stock_price_info.nasdaq_name === val
    );
    toBeUpdated.stock_price_info.last_values = [
      enteredValue,
      ...toBeUpdated.stock_price_info.last_values.slice(0, -1),
    ];
    updateStockData(toBeUpdated.id, toBeUpdated).then(function (response) {
      triggerListAPI();
    });
  };

  const classes = useStyles();
  return rowData !== null ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Stock Name</StyledTableCell>
            <StyledTableCell align="right">Nasdaq Name</StyledTableCell>
            <StyledTableCell align="right">Current Value</StyledTableCell>
            <StyledTableCell align="right">SEcond Value</StyledTableCell>
            <StyledTableCell align="right">Third Value</StyledTableCell>
            <StyledTableCell align="right">Fourth Valyue</StyledTableCell>
            <StyledTableCell align="right">Fifth Valyue</StyledTableCell>
            {JSON.parse(localStorage.getItem("isAdmin")) === true && (
              <StyledTableCell align="right">Action</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row, index) => (
            <>
              <StyledTableRow key={row.stock_name}>
                <StyledTableCell component="th" scope="row">
                  {row.stock_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.nasdaq_name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.current_price}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.second_price}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.third_price}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.fourth_price}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.fifth_price}
                </StyledTableCell>
                {JSON.parse(localStorage.getItem("isAdmin")) === true && (
                  // <StyledTableCell align="right">Action</StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() =>
                      setEditMode({
                        ...editMode,
                        mode: true,
                        recordId: index,
                      })
                    }
                  >
                    <EditIcon />
                  </StyledTableCell>
                )}
              </StyledTableRow>
              {editMode.mode === true && editMode.recordId === index && (
                <div
                  className={classes.editSection}
                  style={{
                    padding: "20px 20px",
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <TextField
                    className={classes.stockInput}
                    id="outlined-basic"
                    label="Update Stock Price"
                    variant="outlined"
                    onChange={(e) => setEnteredValue(e.target.value)}
                  />
                  <Button
                    className={`${
                      enteredValue.trim() == ""
                        ? classes.disableBtn
                        : classes.updateBtn
                    }`}
                    disabled={enteredValue.trim() == ""}
                    onClick={() => handleUpdate(row.nasdaq_name)}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      setEditMode({
                        ...editMode,
                        mode: false,
                        recordId: null,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <h1>Loading...</h1>
  );
};
