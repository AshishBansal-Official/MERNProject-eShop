import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, quantity, category, shipping } =
            req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res
                    .status(500)
                    .send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case !shipping:
                return res.status(500).send({ error: "Shipping is required" });
            case !photo && photo?.size > 1000000:
                return res.status(500).send({
                    error: "Photo is required & should be less than 1mb",
                });
        }
        const product = new productModel({
            ...req.fields,
            slug: slugify(name),
        });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Creating Product",
        });
    }
};

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, quantity, price, category, shipping } =
            req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res
                    .status(500)
                    .send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case !photo && photo?.size > 1000000:
                return res.status(500).send({
                    error: "Photo is required & should be less than 1mb",
                });
        }
        const product = await productModel.findByIdAndUpdate(
            req.params.pid,
            {
                ...req.fields,
                slug: slugify(name),
            },
            { new: true }
        );
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating product",
        });
    }
};

// Get all products
export const getProductsController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate("category")
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "All Products List",
            productsCount: products.length,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting products",
        });
    }
};

// Get single product
export const getProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched Successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting product",
        });
    }
};

// Get product photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel
            .findById(req.params.pid)
            .select("photo");
        if (product.photo.data) {
            res.set("Content-Type", product.photo.contentType);
            res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting product photo",
        });
    }
};

// Delete Product
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting product",
        });
    }
};

// filters
export const productFiltersController = async (req, res) => {
    try {
        const data = req.body;
        const checked = data.checked;
        const radio = data.radio;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) {
            const radioArr = radio.split(",");
            args.price = { $gte: radioArr[0], $lte: radioArr[1] };
        }
        console.log(args);
        const products = await productModel.find(args);
        products.map((product) => {
            console.log(product.name);
        });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error While Filtering Products",
            error,
        });
    }
};

// products Count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false,
        });
    }
};

// product list based on page
export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in per page ctrl",
            error,
        });
    }
};

// Search Product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
};

// Similar Products
export const realtedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(3)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error while geting related product",
            error,
        });
    }
};

// Get Product by Catgory
export const productCategoryController = async (req, res) => {
    try {
        console.log(req.params.slug);
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel
            .find({ category })
            .populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error While Getting Products",
        });
    }
};

// Payment
export const paymentController = async (req, res) => {
    try {
        let total = 0;
        const { cart } = req.body;
        cart.map((i) => {
            total += i.price;
        });
        const order = new orderModel({
            products: cart,
            buyer: req.user._id,
        }).save();
        res.json({ ok: true });
    } catch (error) {
        console.log(error);
    }
};
