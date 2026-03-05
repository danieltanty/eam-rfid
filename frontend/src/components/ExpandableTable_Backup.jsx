import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import { useState } from "react";

const ExpandableTable = ({
  columns,
  data,
  isExpandable=true,
  isInspectable,
  renderExpandedContent,
  getRowSx,
  onInspect
}) => {
    const ExpandableRow = ({row}) => {
        const [open, setOpen] = useState(false);
        const rowSx = getRowSx ? getRowSx(row) : {};
        const extraColumns = (isExpandable ? 1 : 0) + (isInspectable ? 1 : 0);

        return (
            <>
            {/* Main Row */}
            <TableRow
                // hover
                onClick={() => setOpen(!open)}
                sx={{
                cursor: "pointer",
                ...rowSx,
                }}
            >
                {columns.map((col) => (
                    <TableCell key={col.field}>
                        {col.renderCell
                        ? col.renderCell(row)
                        : row[col.field] ?? "-"
                        }
                    </TableCell>
                ))}

                {(isExpandable && <TableCell sx={{ width: 40, p: 1 }}>
                {open ? (
                    <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
                ) : (
                    <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                )}
                </TableCell>)}

                {isInspectable && (
                    <TableCell sx={{ width: 48, p: 1 }}>
                        <PlagiarismIcon
                        sx={{ fontSize: 22, cursor: "pointer" }}
                        color="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            onInspect && onInspect(row);
                        }}
                        />
                    </TableCell>
                )}
            </TableRow>

            {/* Expandable Content */}
            {(isExpandable && <TableRow sx={{ ...rowSx }}>
                <TableCell colSpan={columns.length + extraColumns} sx={{ p: 0 }}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2 }}>
                    {renderExpandedContent ? (
                        renderExpandedContent(row)
                    ) : (
                        <Typography variant="body2">
                        No additional details
                        </Typography>
                    )}
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>)}
            </>
        );
    }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: "#2c3e50" }}>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.field}
                sx={{ color: "#e7e7e7", fontWeight: "bold" }}
              >
                {col.headerName}
              </TableCell>
            ))}
            {isExpandable && <TableCell sx={{ width: 40 }} />}
            {isInspectable && <TableCell sx={{ width: 40 }} />}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <ExpandableRow
              key={row.id || index}
              row={row}
              columns={columns}
              isExpandable={isExpandable}
              isInspectable={isInspectable}
              renderExpandedContent={renderExpandedContent}
              getRowSx={getRowSx}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExpandableTable