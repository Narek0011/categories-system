import React, {useEffect, useState} from 'react';
import styles from "./list.module.css";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import * as categoriesActions from "../../../redux/actions/category-actions";
import * as carAction from "../../../redux/actions/car-action";
import {toast} from "react-toastify";

const Cars = ({allCategories, allCategoriesData, cars, getCars, isLoading, deleteCar}) => {

    const [params] = useState({
        page: 1
    });
    useEffect(() => {
        allCategories()
    }, []);

    const deleteCarInList = (id) => {
        deleteCar(id)
            .then(() => {
                toast.success('Car deleted successfully!');
            });
    };

    useEffect(() => {
        getCars(params);
    }, []);

    const handleSelectChangeTypes = (event) => {
        const {value} = event.target;
        getCars({...params, page: 1, category_id: value});
    };

    if (!isLoading) {
        return (
            <div>
                <div className={styles.searching}>
                    <div style={{display: "flex"}}>
                        <div className={styles.selectCategories}>
                            <select onChange={handleSelectChangeTypes} className="form-select w-100 h-20  rounded-3"
                                    aria-label="Default select example">
                                <option selected disabled>type</option>
                                <option value=''>all</option>
                                {
                                    allCategoriesData && allCategoriesData.map(type => {
                                        return (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div>
                        <Link to='/cars/add'>
                            <button type="button" className="btn btn-primary">Add New Car</button>
                        </Link>
                    </div>
                </div>
                <table className="table w-100">
                    <thead>
                    <tr>
                        <th scope="col">CATEGORY</th>
                        <th scope="col">BRAND</th>
                        <th  className='d-flex justify-content-end' scope="col">ACTIONS</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        cars && cars.length > 0 ? cars.map((car) => (
                            <tr key={car.id}>
                                <td>{car.category.name}</td>
                                <td>{car.brand}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <div className='d-flex justify-content-end'>
                                        <button onClick={() => deleteCarInList(car.id)} type="button" className="btn btn-danger">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) :
                        <div className="d-flex justify-content-center">
                            <h3>
                                Data not found
                            </h3>
                        </div>
                    }
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div style={{marginTop: 60}}>
                <Skeleton count={5} height={25} style={{margin: 5}}/>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        cars: state.cars.cars,
        pagination: state.cars.pagination,
        isLoading: state.cars.isLoading,
        allCategoriesData: state.categories.allCategories,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getCars: (data) => carAction.getCars(dispatch, data),
        deleteCar: (uid) => carAction.deleteCar(dispatch, uid),
        allCategories: () => categoriesActions.allCategories(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cars);