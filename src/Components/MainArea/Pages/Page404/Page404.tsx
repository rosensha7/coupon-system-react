import "./Page404.css";

function Page404(): JSX.Element {
    return (
        <div className="Page404">
            <section className="notfound">
                <div className="title">Hmm. It seems you are lost.</div>
                <div className="circles">
                    <p>404<br/>
                        <small>PAGE NOT FOUND</small>
                    </p>
                    <span className="circle big"></span>
                    <span className="circle med"></span>
                    <span className="circle small"></span>
                </div>
            </section>
    </div>
    );
}

export default Page404;