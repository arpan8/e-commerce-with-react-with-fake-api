import { useSelector } from "react-redux"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
export const Cartdetails = () => {
    const { cartItems } = useSelector((store) => store.cart)

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    const invoiceSubtotal = subtotal(cartItems);
    const invoiceTotal = subQuantity(cartItems) *  subtotal(cartItems);;


    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    function subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
    }

    function subQuantity(items){
        return items.map(({ quantityInCart }) => quantityInCart).reduce((sum, i) => sum + i, 0);
    }

    return (
        <>
            <Box>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" colSpan={3}>
                                Cart Details
                            </StyledTableCell>
                            <StyledTableCell align="right"colSpan={3}>All Prices</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Quantity.</TableCell>
                            <TableCell align="right">Rate</TableCell>
                            <TableCell align="right">Sum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell>{row.title}</StyledTableCell>
                                <StyledTableCell>{row.description}</StyledTableCell>
                                <StyledTableCell align="right">{row.quantityInCart}</StyledTableCell>
                                <StyledTableCell align="right">{row.price}</StyledTableCell>
                                <StyledTableCell align="right">{ccyFormat(row.price * row.quantityInCart)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                        {/* <TableRow>
                            <TableCell>Subtotal</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                        </TableRow> */}
                        <StyledTableRow>
                            <StyledTableCell colSpan={3}>Total</StyledTableCell>
                            <StyledTableCell align="right">{ccyFormat(invoiceTotal)}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>

        </>
    )
}

