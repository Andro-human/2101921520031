import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@mui/material";
import axios from "axios";

const TopProduct = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    try {
      const response = await axios.get(
        "https://localhost:3030/category/:categoryName/products/:productid",
        {
          params: {
            categoryName: "AMZ",
            productId,
          },
        }
      );
      setProduct(response.data);
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
        label="ProductId"
        variant="outlined"
        type="string"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        fullWidth
        required
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Get Details
      </Button>

      {product.length > 0 && (
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
              {product.map((product) => (
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
