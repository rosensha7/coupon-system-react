import "./Home.css"
import CouponList from "../../Coupons/CouponList/CouponList"

function Home():JSX.Element{

    return(
        <div className="Home">
            <CouponList/>
        </div>
    );
}

export default Home;