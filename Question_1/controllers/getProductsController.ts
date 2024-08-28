import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";
import productModel from "../models/productModel";
import { IProduct } from "../models/productModel";

interface IProductQuery {
  n: number;
  page: number;
  sortBy: string;
}

const addProuctsToDatabase = async (products: IProduct[]): Promise<void> => {
  try {
    const bulkOps = products.map((product: IProduct) => ({
      updateOne: {
        filter: {
          productName: product.productName,
          price: product.price,
          rating: product.rating,
        },
        update: { $set: product },
        upsert: true,
      },
    }));

    await productModel.bulkWrite(bulkOps, {
      ordered: false,
    });
  } catch (error) {
    console.log("error inserting products to database", error);
  }
};

const fetchProductsFromDatabase = async (
  page: number,
  sortBy: string
): Promise<IProduct[]> => {
  const itemsPerPage: number = 10;
  const skip: number = (page - 1) * itemsPerPage;
  const products: IProduct[] = await productModel
    .find({})
    .sort(sortBy)
    .select("-__v")
    .skip(skip)
    .limit(itemsPerPage);

  return products;
};

// req.body = {n, page, sortBy[price, rating, discount]}
const topProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { categoryName } = req.params;
    const { n, page, sortBy } = req.body as IProductQuery;
    const bearerToken: string = req.headers.authorization || "";

    // external API URL
    const externalApiUrl: string = `http://20.244.56.144/test/companies/AMZ/categories/${categoryName}/products`;

    // Sending a GET request to the external API with query parameters
    const response: AxiosResponse = await axios.get(externalApiUrl, {
      params: {
        top: n,
        minPrice: 1,
        maxPrice: 10000,
      },
      headers: {
        Authorization: bearerToken,
      },
    });

    // Add to product collection in database
    addProuctsToDatabase(response.data);

    // Fetching data from product collection for user
    const productData: IProduct[] = await fetchProductsFromDatabase(
      page,
      sortBy
    );

    return res.send({
      status: 200,
      message: "Product data fetched!",
      data: {
        count: productData.length,
        data: productData,
      },
    });
  } catch (error: any) {
    console.log("error in product controller", error);
    return res.send({
      status: 500,
      message: "Internal server error",
      error,
    });
  }
};

const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { productid } = req.params;
    const product = await productModel.findById(productid).select("-__v");

    return res.send({
      status: 200,
      message: "Product fetched!",
      data: product,
    });
  } catch (error: any) {
    console.log("error in product controller", error);
    return res.send({
      status: 500,
      message: "Internal server error",
      error,
    });
  }
};

export { topProductController, getProductById };
