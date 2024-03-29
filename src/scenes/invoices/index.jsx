import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const Invoices = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    const columns = [
        { field: "id", headName: "ID" },
        {
            field: "name",
            headName: "Name",
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: "phone",
            headName: "Phone Number",
            flex: 1,
        },
        {
            field: "email",
            headName: "Email",
            flex: 1,
        },
        {
            field: "cost",
            headName: "Cost",
            flex: 1,
            renderCell: (params) => (
                <Typography color={colors.greenAccent[500]}>
                    ${params.row.cost}
                </Typography>
            )
        },
        {
            field: "date",
            headName: "Date",
            flex: 1,
        },
    ];

    return (
        <div className="app">
    <Sidebar/>
    <main className="content">
      <Topbar/>
        <Box m="20px">
            <Header title="INVOICES" subtitle="List of Invoices Balances" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`
                    }
                }}
            >
                <DataGrid
                    checkboxSelection
                    rows={mockDataInvoices}
                    columns={columns}
                />
            </Box>
        </Box>
        </main>
        </div>
    )
}

export default Invoices