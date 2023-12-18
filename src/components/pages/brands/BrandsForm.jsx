import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {useNavigate} from "react-router";
import * as brandActions from "../../../redux/actions/brand-actions";
import * as categoriesActions from '../../../redux/actions/category-actions'
import {toast} from "react-toastify";

const BrandsForm = ({allCategories, addBrand, allCategoriesData}) => {
    const [name, setName] = useState('');
    const [brandData, setBrandData] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        addBrand(brandData)
            .then(() => {
                toast.success('Brand created successfully!')
                navigate('/brands')
            });
    };

    useEffect(() => {
        allCategories()
    }, [])

    const handleChangeTypes = (e) => {
        const {value} = e.target;
        setBrandData({...brandData, category_id: value})
    };

    return (
        <>
            <div>
                <div className='d-flex justify-content-evenly'>
                    <form onSubmit={handleSubmit} className="w-75">
                        <button
                            disabled={!brandData.category_id}
                            type="submit"
                            className="btn btn-info me-4 mb-2"
                        >Add
                        </button>
                        <input
                            value={brandData.name}
                            onChange={e => setBrandData({...brandData, name: e.target.value})}
                            type="text"
                            className="form-control w-50 d-inline rounded-4 me-5"
                            placeholder="Brand Name"
                        />
                    </form>
                    <select onChange={handleChangeTypes} className="form-select d-inline w-25 h-100 rounded-4 fst-normal"
                            aria-label="Default select example">
                        <option selected disabled> add category</option>
                        {
                            allCategoriesData.map(({name, id}) => (
                                <option key={id} value={id}>{name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
        allCategoriesData: state.categories.allCategories,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addBrand: (page) => brandActions.addBrand(dispatch, page),
        allCategories: () => categoriesActions.allCategories(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandsForm);

