import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";

const TopProduct = () => {
  const [numProducts, setNumProducts] = useState("");
  const [page, setPage] = useState("");
  const [sortPreference, setSortPreference] = useState("");
  const [products, setProducts] = useState([]);

  const sortOptions = [
    { value: "price", label: "Price" },
    { value: "rating", label: "Rating" },
    { value: "discount", label: "discount" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    try {
      const response = await axios.get(
        "http://localhost:3030/category/:categoryName/products",
        {
          params: {
            categoryName: "AMZ",
            numProducts,
            page,
            sort: sortPreference,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "25rem",
        margin: "auto",
        marginTop: "10rem",
        // justifyContent: "center",
        // alignItems: "center",
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <TextField
        label="Number of Products"
        variant="outlined"
        type="number"
        value={numProducts}
        onChange={(e) => setNumProducts(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Pages"
        variant="outlined"
        type="number"
        value={page}
        onChange={(e) => setPage(e.target.value)}
        fullWidth
        required
      />
      <FormControl fullWidth>
        <InputLabel id="sort-preference-label">Sort By</InputLabel>
        <Select
          labelId="sort-preference-label"
          value={sortPreference}
          onChange={(e) => setSortPreference(e.target.value)}
          label="Sort By"
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Apply Filters
      </Button>

      {products.length > 0 && (
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Rating</TableCell>
                {/* Add more table headers as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.rating}</TableCell>
                  {/* Add more table cells as needed */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TopProduct;
