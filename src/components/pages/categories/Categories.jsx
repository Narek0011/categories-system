import React, {useState, useEffect} from 'react'
import {connect} from "react-redux";
import * as categoriesActions from '../../../redux/actions/category-actions'
import {Link} from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {toast} from "react-toastify";

function Categories({categories, getCategories, deleteCategory, updateCategory, isLoading, pagination}) {

    const [showEditInp, setShowEditInp] = useState(null);
    const [editText, setEditText] = useState('');

    const brandEdit = ({id, created_at}) => {
        updateCategory({name: editText, id: id, created_at: created_at});
        setShowEditInp(null)
    };

    useEffect(() => {
        getCategories({page: 1})
    }, []);

    const categoryDelete = (id) => {
        deleteCategory(id).then(() => {
            toast.success('Car deleted successfully!');
        })
    }

    if(isLoading) {
        return (
            <div>
                <div className='d-flex justify-content-end border-bottom'>
                    <Link to="/categories/add">
                        <button type="button" className="btn btn-info fs-5 me-4 mb-2">Add new category</button>
                    </Link>
                </div>

                <div className="card-body">
                    <table className="table">
                        <thead>
                        <tr>
                            <th className="border-bottom-0">Category Name</th>
                            <th className="border-bottom-0">Created At</th>
                        </tr>
                        </thead>
                        <tbody className="h-50">
                        {
                            categories.length > 0 ? categories.map((item, i) => (
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
                                                    onClick={() => categoryDelete(item.id)}
                                            >
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
        categories: state.categories.categories,
        isLoading: state.categories.isLoading,
        pagination: state.categories.pagination,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getCategories: (page) => categoriesActions.getCategories(dispatch, page),
        deleteCategory: (id) => categoriesActions.deleteCategory(dispatch, id),
        updateCategory: (data) => categoriesActions.updateCategory(dispatch, data),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);