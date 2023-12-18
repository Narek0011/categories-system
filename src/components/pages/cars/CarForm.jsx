import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import * as categoriesActions from '../../../redux/actions/category-actions'
import * as brandActions from "../../../redux/actions/brand-actions";
import {useNavigate} from "react-router";
import * as carAction from "../../../redux/actions/car-action";
import {toast} from "react-toastify";

const CarForm = ({allCategories, allCategoriesData, getBrandsByCategory, allBrands, addCar}) => {
    const [brandName, setBrandName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        allCategories()
    },[]);

    const handleChangeTypes = (e) => {
        const {value} = e.target;
        setCategoryId(value);
        getBrandsByCategory(value)
    };

    const handleChangeBrands = (e) => {
        const {value} = e.target;
        setBrandName(value)
    };

    const handleSubmit  = (e) => {
        e.preventDefault();
        if(categoryId && brandName) {
            addCar({
                category_id: categoryId,
                brand: brandName,
            }).then(() => {
                toast.success('Car created successfully!');
                navigate('/cars')
            })
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-content-between">
                    <div className="mb-2">
                        <label className="form-check-label mb-1 d-block">Car Category</label>
                        <select onChange={handleChangeTypes} className="form-select d-inline w-25 h-100 rounded-4 fst-normal"
                                aria-label="Default select example">
                            <option selected disabled>add category</option>
                            {
                                allCategoriesData.map(({name, id}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label className="form-check-label mb-1 d-block">Car Brand</label>
                        <select onChange={handleChangeBrands} className="form-select d-inline w-25 h-100 rounded-4 fst-normal"
                                aria-label="Default select example">
                            <option selected disabled>add brand</option>
                            {
                                allBrands.map(({name, id}) => (
                                    <option key={id} value={name}>{name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add</button>
            </form>
        </>
    );
};


const mapStateToProps = state => {
    return {
        allBrands: state.brands.allBrands,
        pagination: state.cars.pagination,
        isLoading: state.cars.isLoading,
        allCategoriesData: state.categories.allCategories,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addCar: (data) => carAction.addCar(dispatch, data),
        getCars: (data) => carAction.getCars(dispatch, data),
        deleteCar: (uid) => carAction.deleteCar(dispatch, uid),
        allCategories: () => categoriesActions.allCategories(dispatch),
        getBrandsByCategory: (id) => brandActions.getBrandsByCategory(dispatch,id),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CarForm);

