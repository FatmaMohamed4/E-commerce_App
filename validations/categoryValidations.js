import {check} from 'express-validator'
import { validation } from '../middlewares/validation.js'
// import { deleteCategory } from './../controllers/categoryController';

export const getCategoryMW =[

    check('categoryName').notEmpty().withMessage('Category Name is required')
   , validation
]


export const updateCategoryMW =[
    check('id')
        .isMongoId().withMessage('Wrong category ID format')
        .notEmpty().withMessage('Enter category ID'),

    // check(req.body)
    //     .isEmpty().withMessage('Enter your update') ,

    validation
]

export const deleteCategoryMW =[
    check('id')
        .isMongoId().withMessage('Wrong category ID format') 
        .notEmpty().withMessage('Enter category ID'),
        
    validation
]

export const addProd_ToOrderMW =[
    check('categoryId')
        .isMongoId().withMessage('Wrong category ID format')
        .notEmpty().withMessage('Enter category ID'),

    check('productIds')
        .isMongoId().withMessage('Wrong product ID format')
        .notEmpty().withMessage('Enter product ID') ,

    validation
]

export const getProd_CategoryMW =[
    check('categoryName')
    .notEmpty().withMessage('Enter category name'),

    validation
] 