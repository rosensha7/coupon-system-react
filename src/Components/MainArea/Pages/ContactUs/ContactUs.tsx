import "./ContactUs.css";
import emailjs from "emailjs-com";
import{ init } from 'emailjs-com';
import { useHistory } from "react-router";
import { SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
init("user_IZg7dk0TCveocod01ck4g");

function ContactUs(): JSX.Element {
    const history = useHistory();
    const {register,handleSubmit, errors} = useForm();

    function sendEmail(e:SyntheticEvent){
        const eInput = (e.target as HTMLFormElement);
        e.preventDefault();

        emailjs.sendForm('service_7u3o2wf', 'template_goxdqpp', eInput, 'user_IZg7dk0TCveocod01ck4g')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

        history.push("/FormSubmitted")
    }

    return (
            <div className="ContactUs">
                <form onSubmit={sendEmail}>
                    <h1>Contact Us!</h1>
                    <p>Say Hello! Or whatever you want!</p>
                    <div id="logo" className="icon-ic-drafts-24px"></div>
                    <input type="hidden" name="contact_number"/>
                    <input name="user_name" type="text" placeholder="Name"  ref={register({required:true, pattern: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/})}/>
                    {errors.user_name?.type==="required" && <span>You must enter an name</span>}
                    {errors.user_name?.type==="pattern" && <span>You must enter a valid name</span>}
                    <input name="user_email" type="email" placeholder="Email" id="email" ref={register({required:true, minLength:3, pattern: /^\S+@\S+\.\S+$/})} />
                    {errors.user_email?.type==="required" && <span>You must enter an name</span>}
                    {errors.user_email?.type==="pattern" && <span>You must enter a valid name</span>}
                    <textarea name="message" placeholder="Message" required></textarea>
                    <input type="submit" value="Send" id="button-blue" />
                </form>
            </div>
    )
}

export default ContactUs;
