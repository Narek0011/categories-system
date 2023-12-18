import {useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {connect} from "react-redux";
import * as userActions from '../../../redux/actions/user-action'

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    re_password: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
}).required();

function Register({signIn}) {

    const navigate = useNavigate()
    const navigateToLogin = () => {
        navigate('/login')
    }

    const {register, handleSubmit, formState: {errors}} = useForm(
        {
            resolver: yupResolver(schema)
        }
    );
    const onSubmit = data => {
        signIn(data).then(() => {
            navigate('/login')
        })
    }
    return (
        <section
            style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",}}>
            <div className="mask d-flex align-items-center gradient-custom-3">
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center mt-5">
                        <div className=" col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{borderRadius: 15}}>
                                <div className="card-body p-5">
                                    <h4 className="text-uppercase text-center">Create an account</h4>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-outline">
                                            <input
                                                type="text"
                                                id="form3Example1cg"
                                                class="form-control form-control-lg"
                                                {...register("name")}
                                            />
                                            <p style={{color: 'red'}}>{errors.name?.message}</p>
                                            <label className="form-label" for="form3Example1cg">Your Name</label>
                                        </div>
                                        <div className="form-outline">
                                            <input
                                                type="email"
                                                id="form3Example3cg"
                                                className="form-control form-control-lg"
                                                {...register("email")}
                                            />
                                            <p style={{color: 'red'}}>{errors.email?.message}</p>
                                            <label className="form-label" for="form3Example3cg">Your Email</label>
                                        </div>
                                        <div class="form-outline">
                                            <input
                                                type="password"
                                                id="form3Example4cg"
                                                className="form-control form-control-lg"
                                                {...register("password")}
                                            />
                                            <p style={{color: 'red'}}>{errors.password?.message}</p>
                                            <label className="form-label" for="form3Example4cg">Password</label>
                                        </div>
                                        <div className="form-outline">
                                            <input
                                                type="password"
                                                id="form3Example4cdg"
                                                className="form-control form-control-lg"
                                                {...register("re_password")}
                                            />
                                            <p style={{color: 'red'}}>{errors.re_password?.message}</p>
                                            <label className="form-label" for="form3Example4cdg">Repeat your
                                                password</label>
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <button type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register
                                            </button>
                                        </div>
                                        <p className="text-center text-muted mb-0">Have already an account? <a href="#!"
                                                                                                               className="fw-bold text-body"><u
                                            onClick={navigateToLogin}>Login here</u></a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


const mapStateToProps = state => {
    return {
        user: state.user.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: (data) => userActions.signIn(dispatch, data),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);