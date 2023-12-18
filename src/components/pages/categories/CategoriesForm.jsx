import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import * as categoriesActions from '../../../redux/actions/category-actions'
import {useNavigate} from "react-router";
import {toast} from "react-toastify";

const CategoriesForm = ({addCategory}) => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addCategory(name)
            .then(() => {
                toast.success('Category created successfully!')
                navigate('/categories')
            });
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex justify-content-between">
                    <label className="form-check-label mb-1 d-block">Car Name</label>
                    <input onChange={handleChange} value={name} type="text" class="form-control" id="exampleInputEmail1"
                           aria-describedby="emailHelp" placeholder="Enter car name"/>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add</button>
            </form>
        </>
    );
};


const mapDispatchToProps = dispatch => {
    return {
        addCategory: (name) => categoriesActions.addCategory(dispatch, name),
    }
};

export default connect(null, mapDispatchToProps)(CategoriesForm);

