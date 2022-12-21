import * as React from 'react';
import { Button, Tooltip, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, styled, tableCellClasses } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from "@mui/icons-material/Preview";
import { visuallyHidden } from '@mui/utils';
import Container from '../../hoc/container/container';
import Breadcrumbs from '../../component/breadcrumb';
import './student.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  width: number;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    width: 20,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    width: 200,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'username',
    numeric: false,
    width: 160,
    disablePadding: false,
    label: 'Username',
  },
  {
    id: 'phone',
    numeric: false,
    width: 200,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'email',
    numeric: false,
    width: 250,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'website',
    numeric: false,
    width: 200,
    disablePadding: false,
    label: 'Websitee',
  },
  {
    id: 'action',
    numeric: true,
    width: 150,
    disablePadding: false,
    label: 'Action',
  },
];


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            width={headCell.width}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface Data {
  id: any;
  name: any;
  username: any;
  phone: any;
  email: any;
  website: any;
  action: any;
}


export default function Listing() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [users, setUser] = React.useState([]);

  let navigate = useNavigate();


  React.useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3001/users");
    setUser(result.data);
  };

  const deleteUser = async (id: any) => {
    await axios.delete(`http://localhost:3001/users/${id}`);
    loadUsers();
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n: any, i) => n[i].name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, userid: any) => {
    const selectedIndex = selected.indexOf(userid);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userid);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: any) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (

    <Container showHeader={true}>
      <Box className='container p-t-40'>
        <Box className='p-b-30'><Breadcrumbs /></Box>
        <Box className='Dflex sp-bt al-cnt m-b-30'>
          <h1 className='heading'>Students List</h1>
          <Button variant="outlined" onClick={() => navigate("/student/add")} >Add User</Button>
        </Box>
        <Box sx={{ width: '100%' }}>
          {users.length > 0 ? (
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={users.length}
                  />
                  <TableBody>
                    {stableSort(users, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell component="th" id={labelId} scope="row">{row.id}</TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.username}</TableCell>
                            <TableCell align="left">{row.phone}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.website}</TableCell>
                            <TableCell align="right">
                              {
                                <div className={"actionButtons"}>
                                  <Button variant="text" onClick={() => navigate(`/student/user${row.id}`)} color="success">
                                    <Tooltip title={"View Details"}>
                                      <PreviewIcon className={"icons priviewIcon"} />
                                    </Tooltip>
                                  </Button>
                                  <Button variant="text" onClick={() => navigate(`/student/edit/${row.id}`)} color="primary">
                                    <Tooltip title={"Edit"}>
                                      <EditIcon className={"icons edit"} />
                                    </Tooltip>
                                  </Button>
                                  <Button variant="text" color="error" onClick={() => deleteUser(row.id)}>
                                    <Tooltip title={"Delete"}>
                                      <DeleteIcon className={"icons deleteIcon"} />
                                    </Tooltip>
                                  </Button>
                                </div>
                              }

                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          ) : (
            <Box className="notavailable">
              <h2>Not Available User</h2>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}
