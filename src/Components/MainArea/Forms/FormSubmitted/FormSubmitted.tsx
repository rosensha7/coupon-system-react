import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./FormSubmitted.css"

interface FormSubmittedState {
    redirect: boolean,
    timeoutId: any
}

class FormSubmitted extends Component<{}, FormSubmittedState>{
    id: NodeJS.Timeout;

    public constructor(props: {}) {
        super(props);
        this.state = {
            redirect: false,
            timeoutId: 0
        }
    }

    componentDidMount() {
        this.id = setTimeout(() => this.setState({ redirect: true }), 4000)
    }

    componentWillUnmount() {
        clearTimeout(this.id);
    }

    public render(): JSX.Element {
        return this.state.redirect ? <Redirect to="/home" /> : (
            <div className="FormSbmitted content">
                <div className="FormSbmitted wrapper-1">
                    <div className="FormSbmitted wrapper-2">
                        <h1>Thank you !</h1>
                        <p>Thanks for filling that out.  </p>
                        <p>Your form was successfully submitted. </p>
                        <p>You'll be redirected in a couple of seconds. </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormSubmitted;
