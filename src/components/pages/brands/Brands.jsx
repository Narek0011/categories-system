import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import * as brandActions from "../../../redux/actions/brand-actions";
import {connect} from "react-redux";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {toast, ToastContainer} from "react-toastify";

function Brands({getBrands, deleteBrand, editBrand, brands, isLoading}) {

    const [showEditInp, setShowEditInp] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        getBrands({page: 1});
    },[]);

    const brandEdit = ({id, created_at}) => {
        editBrand({name: editText, id: id, created_at: created_at});
        setShowEditInp(null)
    };

    const deleteBrandCar = (id) => {
        deleteBrand(id).then(() => {
            toast.success('Brand deleted successfully!');
        })
    };

    if(isLoading) {
        return(
            <div>
                <div className='d-flex justify-content-end border-bottom'>
                    <Link to="/brands/add">
                        <button type="button" className="btn btn-info fs-5 me-4 mb-2">Add new brand</button>
                    </Link>
                </div>

                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className="border-bottom-0">Model Name</th>
                            <th className="border-bottom-0">Created At</th>
                        </tr>
                        </thead>
                        <tbody className="h-50">
                        {
                            brands.length > 0 ? brands.map((item, i) => (
                                    <tr key={i}>
                                        <td>
                                            {showEditInp === i && (
                                                <>
                                                    <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)}/>
                                                    <button disabled={!editText} type="button" className="btn btn-info"
                                                            onClick={() => brandEdit(item)}>Save
                                                    </button>
                                                </>
                                            )}
                                            {showEditInp !== i && item.name}
                                        </td>
                                        <td>
                                            {item.created_at}
                                        </td>
                                        <td>
                                            <button type="button"
                                                    style={{width: 100}}
                                                    className="btn btn-danger float-end"
                                                    onClick={() => deleteBrandCar(item.id)}>
                                                <i className="bi bi-trash3 me-2"/>
                                                Delete
                                            </button>
                                            <button type="button" className="btn btn-success float-end me-4" onClick={() => {
                                                setShowEditInp(i);
                                                setEditText(item.name);
                                            }}><i className="bi bi-pencil-square"/> Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                :
                                <div className="d-flex justify-content-center">
                                    <h3>
                                        Data not found
                                    </h3>
                                </div>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{marginTop: 80}}>
                <Skeleton count={5} height={25} style={{margin: 5}}/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        brands: state.brands.brands,
        isLoading: state.brands.isLoading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getBrands: (page) => brandActions.getBrands(dispatch, page),
        deleteBrand: (id) => brandActions.deleteBrand(dispatch, id),
        editBrand: (data) => brandActions.editBrand(dispatch, data),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Brands);