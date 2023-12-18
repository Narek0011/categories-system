import * as yup from "yup";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as userActions from "../../../redux/actions/user-action";
import {connect} from "react-redux";

const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}).required();

function Login({login}) {

    const navigate = useNavigate()
    const navigateToRegister = () => {
        navigate('/register')
    }

    const {register, handleSubmit, formState: {errors}} = useForm(
        {
            resolver: yupResolver(schema)
        }
    );
    const onSubmit = data => {
        login(data).then(() => {
            navigate('/cars')
        })
    }
    return (
        <div>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                 className="img-fluid" alt="Phone image"/>
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        {...register("email")}
                                    />
                                    <p style={{color: 'red'}}>{errors.email?.message}</p>
                                    <label className="form-label" htmlFor="form1Example13">Email address</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password"
                                           {...register("password")}
                                           className="form-control form-control-lg"
                                    />
                                    <p style={{color: 'red'}}>{errors.password?.message}</p>
                                    <label className="form-label" htmlFor="form1Example23">Password</label>
                                </div>
                                <div className="d-flex justify-content-around align-items-center mb-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg btn-block"
                                    >
                                        Sign in
                                    </button>
                                    <div onClick={() => navigateToRegister()}
                                         className="divider d-flex align-items-center my-4 poi">
                                        <u className="btn text-center fw-bold mx-3 mb-0 text-muted">Register</u>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        user: state.user.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        login: (data) => userActions.login(dispatch, data),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
